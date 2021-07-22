# Git Commit 规范参考

## 目录

[TOC]

## 想法

在 github 上逛逛就可以发现，其提交的 commit 都有一定格式，工作中也有相应的规定，时间长了就能体会到其中的好处。这种约束是一种良好的实践。抽出一些时间，更详细的了解相关的资料，然后做了一些实践和总结。

## 规范 Commit 的好处

1.  提供更明确的历史信息，方便判断提交目的和浏览
2.  可以过滤某些不必要的提交，方便快速查找信息
3.  自动化生成 Changelog
4.  向同事、公众与其他利益关系人传达变化的性质
5.  基于提交的类型，自动决定语义化的版本变更

以上的好处，个人认为要有一个大的前提，就是每一个提交，尽量保证其目的单一性，比如说几个 bug 看似类似，就一次性修改提交。这样做，让 commit 的信息变的复杂化，阅读不方便，也容易让人想到一些不必要的关联性。

## Commit 的格式

找了几个 start 较多的库，看看提交的格式。

1.  [react\-commit](https://github.com/facebook/react/commits/master)

![react-commit](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f72656163742d636f6d6d69742e706e67)

2.  [vuejs\-commit](https://github.com/vuejs/vue/commits/dev)

![vuejs-commit](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f7675656a732d636f6d6d69742e706e67)

3.  [angular\-commit](https://github.com/angular/angular/commits/master)

![angular-commit](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f616e67756c61722d636f6d6d69742e706e67)

网上推荐的写法是第 2 和 3 种，也就是 [Angular 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)，并有配套的工具。有一个文档对 commit 的格式要求有个描述叫[约定式提交](https://conventionalcommits.org/lang/zh-Hans)。下面就根据 [Angular 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)和对应 [文档](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)，看看详细的说明。

这次主要介绍 AngularJS 的规范，它是由 Google 推出的一套提交消息规范标准，也是目前使用范围最广的规范。有一套合理的[手册](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)也较为[系统化](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#toc10)；并且还有配套的工具可以供我们使用。

规范执行方案如下：　　

![img](images.assets/328599-20190123104101160-845368160.png)


既然有了方案，就会按照某些规则执行，以下是 Google AnguarJS 规范的要求：

每个 commit message 包含一个 **header**，**body** 和 **footer**。**header** 有一个特殊的格式包含有 **type**，**scope** 和 **subject**：

```shell
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

header、body、footer 之间都要空一行，**header** 是必填项，**scope** 是选填项。commit message 的每一行的文字不能超过 100 个字符。这样子在 github 和 git 工具上更便于阅读。



相应的中文参考：

```
# 标题行：50个字符以内，描述主要变更内容
#
# 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险? 
#
# 尾部：如果需要的化可以添加一个链接到issue地址或者其它文档，或者关闭某个issue。

```



![img](images.assets/328599-20190123104458539-2041029483.png)

### Type

**type** 用于说明 commit 的类别，必须为以下类型的一种：

*   **feat**: 新的功能
*   **fix**: 修复 bug
*   **docs**: 只是文档的更改
*   **style**: 不影响代码含义的更改 (例如空格、格式化、少了分号)
*   **refactor**: 既不是修复 bug 也不是添加新功能的代码更改
*   **perf**: 提高性能的代码更改
*   **test**: 添加或修正测试
*   **chore**: 对构建或者辅助工具的更改，例如生成文档



### Scope

**scope** 用于说明 commit 影响的范围，当影响的范围有多个时候，可以使用 `*`。



### Subject

**subject** 用于对 commit 变化的简洁描述：

*   使用[祈使句](https://baike.baidu.com/item/%E7%A5%88%E4%BD%BF%E5%8F%A5/19650285?fr=aladdin)，一般以动词原形开始，例如使用 change 而不是 changed 或者 changes
*   第一个字母小写
*   结尾不加句号（.）



### Body

**body** 用于对 commit 详细描述。使用[祈使句](https://baike.baidu.com/item/%E7%A5%88%E4%BD%BF%E5%8F%A5/19650285?fr=aladdin)，一般以动词原形开始，例如使用 change 而不是 changed 或者 changes。

body 应该包含这次变化的动机以及与之前行为的对比。



### Footer

**footer** 目前用于两种情况。

**1 不兼容的变动**

所有不兼容的变动都必须在 footer 区域进行说明，以 `BREAKING CHANGE:` 开头，后面的是对变动的描述，变动的理由和迁移注释。

```shell
BREAKING CHANGE: isolate scope bindings definition has changed and
    the inject option for the directive controller injection was removed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
      myBind: 'bind',
      myExpression: 'expression',
      myEval: 'evaluate',
      myAccessor: 'accessor'
    }

    After:

    scope: {
      myAttr: '@',
      myBind: '@',
      myExpression: '&',
      // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
      myAccessor: '=' // in directive's template change myAccessor() to myAccessor
    }

 The removed `inject` wasn't generaly useful for directives so there should be no code using it.

```

**2 关闭 issue**

如果 commit 是针对某个 issue，可以在 footer 关闭这个 issue。

```shell
## 关闭单个
Closes #234
## 关闭多个
Closes #123, #245, #992

```

### Revert

如果 commit 用于撤销之前的 commit，这个 commit 就应该以 `revert:` 开头，后面是撤销这个 commit 的 header。在 body 里面应该写 `This reverts commit <hash>.`，其中的 hash 是被撤销 commit 的 SHA 标识符。

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### 示例

```shell
feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)

```

```shell
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #351

```

```shell
style($location): add couple of missing semi colons

```

```shell
docs(guide): updated fixed docs from Google Docs

Couple of typos fixed:
- indentation
- batchLogbatchLog -> batchLog
- start periodic checking
- missing brace

```



## Commit 相关的工具

### 填写提示工具 [commitizen](https://github.com/commitizen/cz-cli)

这个工具是用来给 commit 一个引导的作用，根据提示一步一步的完善 commit。

在 Windows 环境下安装，个人遇到的问题有：

#### 1、安装 commitizen 后，进行初始化，找不到命令

![7-failed1](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f6661696c6564312e706e67)

尝试成功的解决方法是用 yarn 执行指令:

```shell
yarn commitizen init cz-conventional-changelog --save-dev --save-exact
```

#### 2、按照说明里面直接执行 `npx git-cz`无效，安装了 npx 也无效

发现在 `node_modules\bin\` 目录下，并没有 `npx` 相关可执行文件，需要安装 npx。

安装后还是无效，需要用 yarn 来执行指令

```shell
yarn npx git-cz
```

![7-npx](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f6e70782e706e67)

可以发现执行指令后，显示了对应的可执行文件的路径。

如果配置了 scripts，那么提交的时候需要执行对应的指令，才会触发这个工具的作用。

还有操作的问题，在自己的戴尔笔记本用上下键切换无效，也尝试过各种组合键，也是无效，外接的键盘有效。



### 格式校验工具 [commitlint](https://github.com/conventional-changelog/commitlint)

原 [validate\-commit\-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg) 已不被推荐使用。安装对应要使用的提交规范，

```shell
#it also works for Windows
yarn add @commitlint/{config-conventional,cli} --dev

# Configure commitlint to use angular config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

示例用的是 `config-conventional` 规范，这个安装后，还需要使用 `commitmsg` hook，推荐使用 [husky](https://github.com/typicode/husky/tree/master)。安装husky

```shell
yarn add husky --dev
```

然后配置 package.json

```json
{
  "scripts": {
    "commitmsg": "commitlint -E GIT_PARAMS"
  }
}
```

提交时候就会触发校验，效果如下图。

![7-validate-commit](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f76616c69646174652d636f6d6d69742e706e67)

**2018.12.09：**
在最新的版本中，由于 `GIT_PARAMS` 参数的问题，进行了更新，配置变化如下：

```diff
{
  "scripts": {
-   "commitmsg": "commitlint -E GIT_PARAMS"
  },
+ "husky": {
+   "hooks": {
+     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
+   }
+ }
}
```

或者在项目文件夹下执行下面的命令，会自动进行更正。

```
./node_modules/.bin/husky-upgrade
```



### 生成 Changelog 工具 [Conventional Changelog](https://github.com/conventional-changelog)

使用的工具是 [Conventional Changelog](https://github.com/conventional-changelog)，推荐使用 [standard\-version](https://github.com/conventional-changelog/standard-version)。commit 符合 [Conventional Commits Specification](https://conventionalcommits.org/) 中描述的格式，就可以用程序自动生成 Changelog。

先进行安装。

```shell
yarn add standard-version --dev
```

然后配置package.json配置执行的脚本。

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

执行该脚本命令，产生的结果：生成文件 CHANGELOG、自动修改库的版本号、产生一个 commit，用工具查看如下图所示。

![7-changelog](images.assets/68747470733a2f2f7878686f6c69632e6769746875622e696f2f7365676d656e742f696d616765732f372f6368616e67656c6f672e706e67)

每一次执行，不会覆盖之前的 CHANGELOG，只会在 CHANGELOG 的顶部添加新的内容。

## 感受

网上有很多类似的介绍，自己动手去实践，得到的比看到的多的多。

## 参考资料

*   [Conventional Commits 1.0.0\-beta.2](https://conventionalcommits.org/)
*   [keep a changelog](https://keepachangelog.com/en/1.0.0/)
*   [Semantic Versioning](https://semver.org/)
*   [Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
*   [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
*   [AngularJS 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#toc10)
*   [中文规范](https://github.com/feflow/git-commit-style-guide) 




本文转载，作者[XXHolic](https://github.com/XXHolic)：https://github.com/XXHolic/blog/issues/16

