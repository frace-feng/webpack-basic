# webpack-basic

搭建webpack，0 -> 1

- 首先需要安装webpack构建相关依赖: npm i webpack webpack-cli -D
- 开发和生产构建目标不同，需要做区分：npm install webpack-merge -D
- css:

  1. 使用 css-loader 来处理 css,需要安装依赖: npm i css-loader -D
  2. style-loader 就是将处理好的 css 通过 style 标签的形式添加到页面上
  3. css兼容性，post-css自动添加 CSS3 部分属性的浏览器前缀，npm install postcss postcss-loader postcss-preset-env -D
  4. less：npm i less-loader -D
  5. sass: npm i sass-loader node-sass -D
  6. 开发模式使用style-loader将css插入到html中，生产模式，把css文件单独提取出来npm install mini-css-extract-plugin -D
  7. 压缩css：
   webpack4:npm install -D optimize-css-assets-webpack-plugin
   webpack5:css-minimizer-webpack-plugin
  8. 清除无用css：npm i -D purgecss-webpack-plugin

- 开发模式中，
  需要将资源文件自动插入到html中，需要依赖： npm i html-webpack-plugin -D
  需要配置本地服务，启动 npm i webpack-dev-server -D
  
- 图片
  - webpack4时，需要搭配file-loader、url-loader去处理图片的引入问题，
    - file-loader：解决图片引入问题，并将图片 copy 到指定目录，默认为 dist
    - url-loader：当图片小于 limit 值的时候，会将图片转为 base64 编码，大于 limit 值的时候依然是使用 file-loader 进行拷贝
    - img-loader：压缩图片
  - webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
    - asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
    - asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
    - asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
    - asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource
- js
  - 压缩js:因为 webpack5 内置了terser-webpack-plugin 插件，所以我们不需重复安装，直接引用就可以了
  -
- 浏览器兼容
  - npm install babel-loader @babel/core @babel/preset-env -D
    - babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
    - @babel/core Babel 编译的核心包
    - @babel/preset-env Babel 编译的预设，可以理解为 Babel 插件的超集
- 构建结果分析：npm i -D webpack-bundle-analyzer
