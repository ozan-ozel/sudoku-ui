const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/dist';


const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' }
  },
  // {
  //   test: /\.scss$/,
  //   exclude: /node_modules/,
  //   loaders: ["css-loader", "sass-loader"]
  // },
  {
    test: /\.(scss|sass|css)$/,
    exclude: /node_modules/,
    loaders: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1
        }
      },
    'sass-loader',
    ]
  },
  {
    test: /\.svg/,
    use: {
      loader: 'svg-url-loader',
      options: {}
    }
  }
]

module.exports ={
  devtool: 'eval-source-map',
  entry: [
    SRC_DIR + '/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  module: {rules},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  devServer:{
    contentBase: ['./src', './build'],
    inline:true,
    hot: true,
    port: 8080
 }
}

  