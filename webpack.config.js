const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/popup.ts"),
    contentScript: path.join(__dirname, "src/contentScript.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
