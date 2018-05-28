module.exports = {
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
	},
	devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
