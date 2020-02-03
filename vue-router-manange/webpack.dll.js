const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dllPath = 'public/vendor'

module.exports ={
    entry:{
        vendor:['lodash']
    },
    output:{
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
            context: process.cwd()
        })
    ]
}