#  TkMybatis-PageHelper-查询碰到IndexOutOfBoundsException: Index: 0, Size: 0

> 关联框架mybatis-plus、mybatis、tkMybatis、pageHelper
>
> [PageHelper自定义COUNT](https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/Changelog.md#504---2017-08-01)

## 问题描述

`PageHelper`通过自定义的`COUNT`查询总记录数，报错`IndexOutOfBoundsException: Index: 0, Size: 0`

一般这种现象的原因是

- **返回值null的问题**，`count`语句出现`null`

- **Lombok问题/映射实体的问题**（找不到构造方法），如果项目中使用了`lombok`注解，尤其要注意`@Builder`，它会屏蔽无参构造

  - 建议在实体中手动添加无参构造并结合`@Tolerate`使用。

  ```java
      @Tolerate
      public User() {
      }
  ```

  - 或者`@AllArgsConstructor `，`@NoArgsConstructor`来声明构造

## 起因

分析某段sql查询比较慢，发现是PageHelper自己生成的统计sql，查询比较慢；后来使用自定义的`_COUNT`后，直接报错`IndexOutOfBoundsException: Index: 0, Size: 0`

自定义的sql（类似业务sql）

```sql
SELECT
	COUNT(a.id)
FROM
	a_table a
	-- a 一对多 b
	LEFT JOIN b_table b ON b.batch_id = a.id 
WHERE
	a.status <> 0 
	AND b.admin_id = 2 
GROUP BY
	a.id 
ORDER BY
	a.create_time DESC,
	a.`status` DESC
```

通过调试PageHepler的拦截器部分`com.github.pagehelper.PageInterceptor`

```java
public class PageInterceptor implements Interceptor {
    
    // ...
    
    private Long count(Executor executor, MappedStatement ms, Object parameter,
                       RowBounds rowBounds, ResultHandler resultHandler,
                       BoundSql boundSql) throws SQLException {
        String countMsId = ms.getId() + countSuffix;
        Long count;
        //先判断是否存在手写的 count 查询
        MappedStatement countMs = ExecutorUtil.getExistedMappedStatement(ms.getConfiguration(), countMsId);
        if (countMs != null) {
            count = ExecutorUtil.executeManualCount(executor, countMs, parameter, boundSql, resultHandler);
        } else {
            countMs = msCountMap.get(countMsId);
            //自动创建
            if (countMs == null) {
                //根据当前的 ms 创建一个返回值为 Long 类型的 ms
                countMs = MSUtils.newCountMappedStatement(ms, countMsId);
                msCountMap.put(countMsId, countMs);
            }
            count = ExecutorUtil.executeAutoCount(dialect, executor, countMs, parameter, boundSql, rowBounds, resultHandler);
        }
        return count;
    }
}    
```

走了`ExecutorUtil.executeManualCount(executor, countMs, parameter, boundSql, resultHandler);`

```java
    /**
     * 执行手动设置的 count 查询，该查询支持的参数必须和被分页的方法相同
     *
     * @param executor
     * @param countMs
     * @param parameter
     * @param boundSql
     * @param resultHandler
     * @return
     * @throws SQLException
     */
    public static Long executeManualCount(Executor executor, MappedStatement countMs,
                                          Object parameter, BoundSql boundSql,
                                          ResultHandler resultHandler) throws SQLException {
        CacheKey countKey = executor.createCacheKey(countMs, parameter, RowBounds.DEFAULT, boundSql);
        BoundSql countBoundSql = countMs.getBoundSql(parameter);
        //countResultList是空的，所以造成 IndexOutOfBoundsException
        Object countResultList = executor.query(countMs, parameter, RowBounds.DEFAULT, resultHandler, countKey, countBoundSql);
        Long count = ((Number) ((List) countResultList).get(0)).longValue();
        return count;
    }
```

那到这里，比较容易判断了，pagehelper生成的count查询返回是`[0]`；自定义的返回是`[]`，一个空集合，所以报错`Index: 0, Size: 0`

基本百分百是我们自己写的sql问题了。



## 解决方案

分析sql，使用了`group by`，这种是容易出现`null`值的，实际我们的自定义sql查询的到也是`null`

这个解决方式就是嵌套count。

修改自定义countSQL如下，程序运行正常

```sql
SELECT COUNT(1) FROM (
SELECT
	a.id
FROM
	a_table a
	-- a 一对多 b
	LEFT JOIN b_table b ON b.batch_id = a.id 
WHERE
	a.status <> 0 
	AND b.admin_id = 2 
GROUP BY
	a.id 
ORDER BY
	a.create_time DESC,
	a.`status` DESC ) temp
```

