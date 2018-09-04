const path =require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports ={
  //Where to read where to output
  entry:'./scr/index.js',
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'scr/components'),
      pages: path.resolve(__dirname, 'scr/pages'),
      store: path.resolve(__dirname, 'scr/store'),
      helpers: path.resolve(__dirname, 'scr/helpers'),
      settings$: path.resolve(__dirname, 'scr/setting.js')
    }
  },
  output:{
    path:path.resolve('dist'),
    filename:'webpack-bundle.js'
  },
  devServer:{
    inline:true,
    contentBase:'./dist',
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
