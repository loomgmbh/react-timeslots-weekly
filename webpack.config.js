const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
 
const config = {
 entry: './src/index.jsx',
 devtool: (process.env.NODE_ENV === 'production') ? false : 'inline-source-map',
 mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
 output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'app.bundle.js'
 },
 module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader"
        }
      ]
    },
    {
      test:/\.s?css$/,
      use:['style-loader','css-loader', 'sass-loader']
    }
    ]
  },
plugins: [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })
]
};
 
module.exports = config;
