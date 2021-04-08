var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
const MpvueEntry = require('mpvue-entry')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: MpvueEntry.getEntry('./src/router/index.js'),
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      'flyio': 'flyio/dist/npm/wx',
      'config'  : resolve('config'),
      'components'  : resolve('src/components'),
      'assets'  : resolve('src/assets'),
      'pages'   : resolve('src/pages'),
      'utils'   : resolve('src/utils'),
      'store'   : resolve('src/store'),
      'mixins'  : resolve('src/mixins'),
      'plugins' : resolve('src/plugins'),
      'api'     : resolve('src/api'),
      'router'  : resolve('src/router'),
    },
    symlinks: false
  },
  module: {
    rules: [
      /*{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.vue$/,
        loader: 'mpvue-loader-sebe',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader-sebe',
            options: {
              checkMPEntry: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20480,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name]].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new MpvueEntry(),
    new MpvuePlugin(),
    new webpack.ProvidePlugin({
      'CONFIG': ['config/hostConfig.js', 'default'],
      'WXP': ['minapp-api-promise', 'default'],
    }),
  ]
}
