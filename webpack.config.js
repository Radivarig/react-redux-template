const packageJson = require("./package.json")
const HtmlWebPackPlugin = require("html-webpack-plugin")

const mainFile = "index.js"

module.exports = {
  entry: {
    main: `./src/${mainFile}`,
  },

  output: {
    filename: "[name].js",
    library: mainFile.substring (0, mainFile.indexOf(".")),
    libraryTarget: "umd",
  },

  externals: process.env.NODE_ENV == "development" ? [] :
    Object.keys(packageJson.peerDependencies),

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "eslint-loader",
            options: { fix: true }
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
}
