const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",//选择一种 source map 风格来增强调试过程
  devServer: {
    // 直接到对应的静态目录下面去读取文件，而不需对文件做任何移动，节省了时间和性能开销。
    static: path.resolve(__dirname, "public"), // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    open: true, // 是否自动打开浏览器
  },
  module:{
    rules:[
      {
        test: /\.(c|le)ss$/, //匹配所有的 css 文件
        include: [
          path.resolve(__dirname, 'src/style'),
        ],
        exclude: [
          path.resolve(__dirname, 'src/iconfont'),
        ],
        use: ['style-loader', "css-loader", "postcss-loader", "less-loader"],
      },
    ]
  }
});
