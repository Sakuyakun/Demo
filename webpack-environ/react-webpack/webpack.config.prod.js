const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

// 抽离css样式
const extractPlugin = new ExtractTextPlugin({
  filename: '[name]-[chunkhash].css',  //生成文件的文件名
  ignoreOrder: true //禁用顺序检查 对css模块非常有用
})

module.exports = {
  entry: {
    app: PATHS.app,
    vendor: ['react', 'react-dom']
  },
  output: {
    path: PATHS.build,
    filename: '[name]-[chunkhash].js',
  },
  resolve: { extensions: ['.js', '.json', '.scss', '.less', 'jsx'] },
  module: {
    rules: [
      // sass
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                Composing: true
              },
            },
            {loader: "sass-loader"}
          ],
          fallback: 'style-loader'
        })
      },
      // jsx
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['transform-runtime'], //es6 api转码  https://github.com/brunoyang/blog/issues/20
          presets: ['react', 'es2015']
        }
      },
      // img font
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=10000&name=assets/[name].[ext]'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
    ]
  },
  plugins: [
    extractPlugin,
    new clean([PATHS.build]),
    // HTML模板插件
    new HtmlWebpackPlugin({
      // filename: 'index-[hash].html',
      template: './src/index.html',
      minify: {
        // https://github.com/kangax/html-minifier
        removeComments: true, 
        collapseWhitespace: false,
        removeAttributeQuotes: true
      }
    }),
    // key to reducing React's size
    // UglifyJs会删除react中控制台警告代码
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
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
    // 提取第三方库
    new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'manifest']}),
  ]
}