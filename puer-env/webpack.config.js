const path = require("path");
const webpack = require("webpack");

function resolve (dir) {
  return path.resolve(__dirname, '.', dir)
}

module.exports = {
  resolve: { 
    extensions: [".js", ".css"]
  },
  entry: {
    app: resolve('./src/app')
  },
  output: {
    path: resolve('dist'),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/,
        include: resolve('src'),
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      { 
        test: /\.json$/, 
        loader: 'json-loader' 
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    compress: true,
    port: 3005
  }
}