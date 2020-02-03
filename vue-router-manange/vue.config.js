const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require('./public/vendor/vendor-manifest.json')
            })
        ]
    }
}