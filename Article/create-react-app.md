conf step:

1. npm install -g create-react-app

2. create-react-app projectName

3. yarn run eject

4. yarn install babel-plugin-import babel-plugin-transform-decorators-legacy babel-preset-env

5. add .babelrc

```js
{
  "presets": [
    "react-app",
    ["env",{
      "target": { 
        "browsers": ["last 2 versions", "safari >= 7"],
        "node": true
      }
    }]
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}

```

6. add tsconfig.json

```js
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "allowJs": true
  }
}
```

7. yarn add stylus stylus-loader

```js
// webpack.config.dev.js
{
  test: /\.styl$/,
  use: [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    require.resolve('stylus-loader')
  ]
},

// webpack.config.prod.js
{
  test: /\.styl$/,
  loader: ExtractTextPlugin.extract(
      Object.assign(
          {
              fallback: require.resolve('style-loader'),
              use: [
                  {
                      loader: require.resolve('css-loader'),
                      options: {
                          importLoaders: 1,
                          minimize: true,
                          sourceMap: shouldUseSourceMap,
                      },
                  },
                  {
                    loader: require.resolve('stylus-loader'),
                  }
              ],
          },
          extractTextPluginOptions
      )
  ),
  // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
},
```
