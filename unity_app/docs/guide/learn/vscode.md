# vscode 相关

## 安装nrm
nrm 用于管理npm的镜像路径, 一般配置为淘宝的镜像.

运行安装命令如下
```bash
npm i nrm
```
安装好后运行
```bash
nrm ls 
```
运行后如下展示, 说明配置成功
```
   npm ---- https://registry.npmjs.org/
   cnpm --- http://r.cnpmjs.org/
 * taobao - https://registry.npm.taobao.org/
   nj ----- https://registry.nodejitsu.com/
   rednpm - http://registry.mirror.cqupt.edu.cn/
   npmMirror  https://skimdb.npmjs.com/registry/
   edunpm - http://registry.enpmjs.org/
```

## vscode 的配置文件
在项目下面的`.vscode`文件夹中包括三个文件
- bookmarks.json, bookmarks插件的标记文件, 所有在代码里面做的bookmarks标记都会在吗文件里面有对应的代码体现
- launch.json, nodejs调试的文件配置
- setting.json 项目的vscode配置文件

## 插件
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
  
  自动添加 HTML/XML 的闭合标签

- [Auto Import](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import)

  自动查找，解析并提供所有可用导入的代码操作和代码完成。 与JavaScript和TypeScript一起使用。

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

   自动重命名配对的 HTML/XML 标签

- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
   
   美化VS Code的代码

- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)
  
  标记代码的一行, 点击后能跳转过去

- [Chinese (Simplified) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)
  
  vscode 的中文翻译插件

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  
  代码的拼写检查

- [Color Picker](https://marketplace.visualstudio.com/items?itemName=anseki.vscode-color)

  GUI的帮助程序，用于生成颜色代码，例如CSS颜色符号。

- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

  在Chrome浏览器或任何其他支持Chrome Debugger协议的目标中调试JavaScript代码。

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  
   将ESLint JavaScript集成到VS Code中。

- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
  
  查看git日志，文件历史记录，比较分支或提交

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  
  增强Visual Studio Code中内置的Git功能—通过Git注释和代码透镜一目了然地可视化代码作者，无缝导航和浏览Git存储库，通过强大的比较命令获得有价值的见解，等等。

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

  编写Markdown所需的一切（键盘快捷键，目录，自动预览等）

-[npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)

  让vscode对npm支持

-[SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer)

  在vscode中预览svg

-[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

  突出显示TODO，FIXME和所有关键字，注释...

-[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

  Vue tooling for VS Code

