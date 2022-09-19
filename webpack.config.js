const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/assets/js/main.js",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "theme/assets/js"),
    filename: "main.js",
  },
};