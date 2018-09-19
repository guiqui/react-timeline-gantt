const path =require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports ={
  //Where to read where to output
  entry:'./src/lib/TimeLine.js',
  output:{
    path:path.resolve('dist'),
    filename:'index.js',
    libraryTarget: 'umd',
    library: 'react-gantt-timeline',
    umdNamedDefine: true  
  },
  resolve: {      
    alias: {
        'moment' : path.resolve(__dirname, './node_modules/moment'),         
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),    
        'react-sizeme': path.resolve(__dirname, './node_modules/react-sizeme'),     
         libs: path.resolve(__dirname, 'src/lib/'),
    }  
  },  
  externals: {      
      // Don't bundle react or react-dom      
      react: {          
          commonjs: "react",          
          commonjs2: "react",          
          amd: "React",          
          root: "React"      
      },      
      "react-dom": {          
          commonjs: "react-dom",          
          commonjs2: "react-dom",          
          amd: "ReactDOM",          
          root: "ReactDOM"      
      } ,
      "react-sizeme": {          
        commonjs: "react-sizeme",          
        commonjs2: "react-sizeme",          
        amd: "ReactDOM",          
        root: "ReactDOM"      
    },
      moment: {          
        commonjs: "moment",          
        commonjs2: "moment",          
        amd: "moment",          
        root: "moment"      
    },
  },
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
