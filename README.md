# 從零開始配置vue+webpack
## 涉及到的相關內容
*	vue
*	vue-loader
*	babel
*	webpack
*	webpack-dev-server

## 相關依賴版本
<pre>
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.10",
    "vue": "^2.5.15",
    "vue-loader": "^14.2.1",
    "vue-template-compiler": "^2.5.15",
    "webpack": "^4.1.1",
    "webpack-cli": "^2.0.11",
    "webpack-dev-server": "^3.1.1"
  }
</pre>

## 項目結構
<pre>
-bundle
----編譯後輸出部分
-node_modules
----npm依賴安裝部份
-src
----入口文件，組件
----index.js
----test.vue
-index.html
-package.json
-package.lock.json
-webpack.config.js
</pre>

## 簡略步驟
### 依賴安裝部份
在項目根目錄下，通過命令：

`npm init`

來獲得package.json文件，並依次根據需要裝上依賴：

`npm install webpack vue --save-dev`

`npm install babel-core babel-loader babel-preset-es2015 --save-dev`

`npm install vue-loader`

**特別需要注意的是：**

1.	當前版本建議使用 `babel-preset-env` ，但按照webpack4的配置方式會出錯，暫未有解決辦法
2.	webpack4下，執行webpack相關命令會需要手動安裝依賴 `webpack-cli`
3.	安裝 `vue-loader` 後會提示需要手動安裝 `css-loader`, `vue-template-compiler` 兩個依賴。

### webpack配置部分
<pre>
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
</pre>

**特別需要注意的是：**

1.	webpack4下，module.prototype不存在loaders（但webpack官方文檔babel配置部分依然存在這種寫法）,取而代之使用的是 `rules`
2.	`resolve:{alias:{'vue': 'vue/dist/vue.js'}}` 部分是必要的。在vue2.*版後，由於默認輸出的是不帶編譯器的版本，在進行開發編譯時會導致vue相關編譯出錯。

###webpack-dev-server
相關用途：模塊熱切換

[具體使用](https://segmentfault.com/a/1190000006670084)：這篇介紹的蠻好的，感覺webpack官方文檔越來越混亂了。

其他：...蠻神奇的，至少不需要不停的刷新。但是實際使用起來還是有不少問題，最大的問題大概就是編譯速度的問題。簡單的測試組件就能達到有感的等待時間，是否真的有用有待考量

###package.json開發命令部分

<pre>
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch",
    "dev": "webpack-dev-server --hot --inline"
  },
</pre>









