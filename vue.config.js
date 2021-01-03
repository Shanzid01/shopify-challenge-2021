module.exports = {
    productionSourceMap: process.env.NODE_ENV != "production",
    configureWebpack: {
        devtool: "source-map"
    },
    devServer: {
        port: '8080',
        host: 'localhost'
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/shopify-challenge-2021/' : '/'
};