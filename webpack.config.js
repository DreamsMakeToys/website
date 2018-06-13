var Path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  var config = {
    entry: './src/index.js',
    output: {
      path: __dirname + '/docs',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          loader:
            'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'DreamsMakeToys'
      })
    ]
  }

  if (argv.mode == 'development') {
    config.output.path = __dirname + '/dist'
    config.resolve = {
      alias: {
        inferno: __dirname + '/node_modules/inferno/dist/index.dev.esm.js'
      }
    }
  }

  return config
}
