const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  plugins: [
    new CopyPlugin([{ from: "public" },{ from: "src/assets", to: "assets" }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
