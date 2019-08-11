const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin([{ from: "public" }]),
    new CopyPlugin([{ from: "src/assets", to: "assets" }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html"
    })
  ]
};
