# Date、Calendar的常用操作和计算

## 一、Date

Date类的使用

```java
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
 
public class TestTime {
	
public static void main(String[] args) {
	try {
        //获取Date对象，存放的是时间戳
        Date date = new Date();
        //获取时间戳(毫秒)
        long seconds = date.getTime();
        System.out.println("当前时间戳: " + seconds);
       
        //当前GMT(格林威治)时间、当前计算机系统所在时区的时间
        SimpleDateFormat beijingFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("本地(东八区)时间: " + beijingFormat.format(date) +"; GMT时间: " + date.toGMTString());
        
        //东八区时间转换成东九区(东京)时间,比北京早一个小时
        SimpleDateFormat tokyoFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        tokyoFormat.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));
        System.out.println("东京(东九区)时间: "+tokyoFormat.format(date));
        
        //时间戳转化成Date
        SimpleDateFormat timestampFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String fotmatString = timestampFormat.format(seconds);
        Date parseDate = timestampFormat.parse(fotmatString);
        System.out.println("时间戳转化成Date之后的时间: "+parseDate + ";格式化之后的: "+ fotmatString);
	            
	} catch (Exception e) {
		e.printStackTrace();
	}
}
}
```







## 二、Calendar

### Calendar获取当前日期，或前几天，或后几天的日期



. 获取系统当前时间

```
 
```

1. `// 获取系统当前时间`
2. `Calendar now = Calendar.getInstance();`
3. `String res = sdf.format(now.getTime());`
4. `System.out.println(res); // 2018-07-04 11:50:37`

\2. 获取前几天的时间

```
 
```

1. `// 前几天的时间`
2. `Calendar before7 = Calendar.getInstance();`
3. `before7.add(Calendar.DAY_OF_MONTH, - 7);`
4. `String res = sdf.format(before7.getTime());`
5. `System.out.println(res); // 2018-06-27 13:15:07`

\3. 获取后几天的时间

```
 
```

1. `// 后几天的时间`
2. `Calendar after7 = Calendar.getInstance();`
3. `after7.add(Calendar.DAY_OF_MONTH, + 7);`
4. `String res = sdf.format(after7.getTime());`
5. `System.out.println(res); // 2018-07-11 11:59:51`