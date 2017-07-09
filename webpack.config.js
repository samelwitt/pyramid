const path = require('path')
const webpack = require('webpack')
const HotModuleReplacementPlugin = require('react-hot-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegRecompress = require('imagemin-jpeg-recompress')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const chalk = require('chalk')

let config
let setPlugins
let setStyleRules
let isDev
let publicPath

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
isDev = process.env.NODE_ENV !== 'production'
//publicPath = path.join(__dirname, 'build')
publicPath = isDev ? '/' : path.join(__dirname, 'build')

console.log('environment: ' + chalk.bgGreen(` ${process.env.NODE_ENV} `) + '\n')

//plugins assigned to a variable so dev and prod can each have their own plugins
setPlugins = () => {
  if (!isDev) { //prod
    return [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new ExtractTextPlugin({
        filename: path.join('css','[name].css')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('_lib') !== -1);
        }
      })
    ]
  }
  else { //dev
    return [
      new HtmlWebpackPlugin({
        template: './app/index.tpl.html',
        inject: 'head',
        filename: 'index.html'
      }),
      new ImageminPlugin({
        test: /\.(png|jpg|svg)$/,
        plugins: [
          imageminJpegRecompress({max: 75}),
          imageminPngquant({quality: '65-80'})
        ]
      })
    ]
  }
}

// css/less rules object assigned to a variable so we can use it in both dev and prod flow
setStyleRules = () => {

  let loaders = isDev ? ['style-loader'] : []

  loaders.push(
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [autoprefixer],
        minimize: !isDev
      },
    }
  )

  return isDev ? loaders : ExtractTextPlugin.extract({use: loaders})
}

//main config
config = {
  entry: {
    app: [path.join(__dirname, 'app', 'index.js')]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      //*** js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',

          {
            loader: 'babel-loader',
            options: {
              'presets': ['react', 'es2015', 'stage-0']
            }
          }
        ]
      },
      //*** styles
      {
        test: /\.(less|css)$/,
        use: setStyleRules()
      },
      //*** bundled images
      {
        test: /\.(png|jpg|svg|mp3)$/,
        use: {
          loader: 'file-loader',
          options: {
            //outputPath: '',
            name: 'static/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: setPlugins(),
  output: {
    path: path.join(__dirname, 'build'),
    filename: path.join('js', '[name].js'),
    publicPath: publicPath
  },
  devServer: {
    publicPath: publicPath
  },
  devtool: isDev ? 'eval-sourcemap' : false
}

module.exports = config
