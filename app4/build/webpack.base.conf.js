var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// 定义当前项目的根目录
// var projectRoot = require(__dirname,"../")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// webpack的配置
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    // 项目的输出目录.对应config文件夹下的index.js里面的build对象下的assereRoot的值
    path: config.build.assetsRoot,
    // 对应entry的名字app.js
    filename: '[name].js',
    // publicPath表示请求的静态资源的绝对路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // require,es6,export,模块的一些设置
  resolve: {
    // 在模块的路径中自动补全文件名后缀
    extensions: ['.js', '.vue', '.json'],
    // 设置路径别名.缩短字符串路径的名字
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    // webpack的编译工作,就是对不同文件的用各种loader进行编译
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        // include对指定的目录编译
        include: [resolve('src'), resolve('test')],
        // include排除的目录编译
        exclude:[],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 图片文件小于10kb,会生成baseurl字符串,打包到编译后的js文件
          limit: 10000,
          // 图片大小大于10kb,单独生成一个文件,文件名拼接后为:
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
