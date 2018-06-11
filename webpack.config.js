var Path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
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
  ],
  resolve: {
    /* When doing development workflow we want to make sure webpack picks up development build of inferno */
    alias: {
      inferno: __dirname + '/node_modules/inferno/dist/index.dev.esm.js'
    }
  },
  devServer: {
    contentBase: Path.join(__dirname, 'images'),
    publicPath: ''
  }
}
