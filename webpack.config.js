const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    chunkFilename: '[chunkhash].js'
  },
  devServer: {
    clientLogLevel: 'warning',
    contentBase: path.join(__dirname, 'dist'), // 设置入口
    port: 8080, // 端口号
    host:'localhost', // 主机号
    open: true, // 是否自动打开浏览器
    quiet: true, // 当它被设置为true的时候，控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容，包括错误和警告
    compress: true, // 是否开启压缩
    overlay: {
      warnings: false,
      errors: true
    }, // 浏览器上开启错误提示
    hot: true // 热加载
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filname: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, './static'),
          to: 'static',
          ignore: ['.*']
      }
    ]),
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

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {

      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running at here: http://${devWebpackConfig.devServer.host}:${port}`]
        }
      }))

      resolve(devWebpackConfig)
    }
  })
})
