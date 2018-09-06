const path =require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports ={
  //Where to read where to output
  entry:'./src/demo/index.js',
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib/'),
      pages: path.resolve(__dirname, 'src/demo/pages')
    }
  },
  output:{
    path:path.resolve('dist'),
    filename:'webpack-bundle.js'
  },
  devServer:{
    inline:true,
    contentBase:'./demo',
    port:4444,
    historyApiFallback: true,
  }
  ,
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
       },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: ["url-loader"]
      }
      // ,
      // {
      //   test: /\.json$/,
      //   exclude: /node_modules/,
      //   use: ["json-loader"]
      // }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  }
}
