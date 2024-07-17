const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动清空打包目录
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  module:{
    rules:[
      {
        test: /\.(le|s[ac]|c)ss$/i, //匹配所有的 css 文件
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        // 配置提取模块的方案
        // default: false,
        styles: {
          name: "styles",
          test: /\.(s?css|less|sass)$/,
          chunks: "all",
          enforce: true,
          priority: 10,
        },
        common: {
          name: "chunk-common",
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 3,
          // minSize: 0,
          priority: 1,
          // enforce: true,
          // reuseExistingChunk: true,
        },
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 2,
          enforce: true,
          reuseExistingChunk: true,
        },
        // ... 根据不同项目再细化拆分内容
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      // generateStatsFile: true, // 是否生成stats.json文件
    }),
    new MiniCssExtractPlugin({ // 添加插件
      filename: '[name].[hash:8].css'
    }),
  ],
});
