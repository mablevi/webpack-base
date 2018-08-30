const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    clientLogLevel: 'warning',
    contentBase: path.join(__dirname, 'dist'), // 设置入口
    port: 7000, // 端口号
    host:'0.0.0.0', // 主机号
    open: true, // 是否自动打开浏览器
    quiet: true, // 当它被设置为true的时候，控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容，包括错误和警告
    compress: true, // 压缩
    overlay: {
      warnings: false,
      errors: true
    }, // 浏览器上开启错误提示
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filname: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running at here: http://0.0.0.0:7000`]
      }
    })
  ]
}
