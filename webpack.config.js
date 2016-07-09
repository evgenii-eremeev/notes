const path = require('path')

module.exports = {

  entry: "./client.js",

  output: {
    path: path.resolve(__dirname, 'public') ,
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=es2015&presets[]=react']
      }
    ]
  },
};
