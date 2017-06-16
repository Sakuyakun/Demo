const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const clean = require('clean-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};
//获取环境
const env = process.env.NODE_ENV;
console.log(env)

const extractPlugin = new ExtractTextPlugin({
  filename: '[name].css',  //生成文件的文件名
  ignoreOrder: true //禁用顺序检查 对css模块非常有用
})

module.exports = {
  devServer: {
    host: process.env.HOST, // Defaults to `localhost`
    port: 3000, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true
    },
    // hot: true,
    // inline: true,
  },
  resolve: { extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx', '.vue'] },
  entry: {
    app: PATHS.app,
    vendor: 'moment'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    rules: [
      // jshint
      {
        loader: 'eslint-loader',
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        options: {
          emitWarning: true,
        },
      },
      // css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractPlugin.extract({
          // use：loader 被用于将资源转换成一个 CSS 导出模块
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              Composing: true
            },
          },
          fallback: 'style-loader',
        })
      },
      // js
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      },
      // sass
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractPlugin.extract({
          use: [
            {loader: "css-loader"},
            {loader: "sass-loader"}
          ],
          fallback: 'style-loader'
        })
      },
      // img font
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=10000&name=assets/[name].[ext]'
      }
    ]
  },
  plugins: [
    new clean(['build']),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      htmlWebpackPlugin: {
        "files": {
          "css": ["apxp.css"],
          "js": ["vendor.js", "bundle.js"]
        }
      },
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true
      }
    }),
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false,
      except: ['$super', '$', 'exports', 'require']
    }),
    // 提取第三方库 https://doc.webpack-china.org/guides/code-splitting-libraries/#manifest-
    new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'manifest']}),
    extractPlugin
  ],
};