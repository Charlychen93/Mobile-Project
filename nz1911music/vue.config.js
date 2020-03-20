const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath:'/',
    lintOnSave: false,
    devServer: {
        proxy: {
            '/xixi': {
                target: 'http://ustbhuangyi.com',
                changeOrigin: true,
                pathRewrite: {
                    "^/xixi": ''
                }
            },
            '/hehe': {
                target: 'http://47.95.207.1:3000',
                changeOrigin: true,
                pathRewrite: {
                    "^/hehe": ''
                }
            },
            '/haha':{
                target:'https://c.y.qq.com',
                changeOrigin: true,
                pathRewrite: {
                    "^/haha": ''
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api', resolve('src/api'))
            .set('style', resolve('src/style'))
            .set('components', resolve('src/components'))
    }
}