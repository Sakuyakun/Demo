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
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
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
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
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
},
```

8. add dev common
```js
// package.json
"scripts": {
  // ...
  "dev": "npm run start"
},
```
