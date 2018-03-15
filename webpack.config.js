const path = require('path');

const config = {
    entry: "./src/index.js",
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, "bundle")
    },
    module:{
        rules:[
            {
                test: /\.js$/,                              // 匹配打包文件后缀名的正则
                exclude: /(node_modules|bower_components)/, // 这些文件夹不用打包
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    resolve:{
        alias: { 'vue': 'vue/dist/vue.js' }
    }
};
module.exports = config;