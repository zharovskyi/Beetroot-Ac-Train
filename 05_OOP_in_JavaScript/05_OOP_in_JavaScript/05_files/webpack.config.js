const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const files = fs.readdirSync(path.join(__dirname, "public"));
  const templatesFiles =
    files.filter((el) => /\.html$/.test(el) && el !== "index.html") || [];

  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
  ];

  templatesFiles.length &&
    templatesFiles.map((item) => {
      plugins.push(
        new HtmlWebpackPlugin({
          filename: `${item}`,
          template: path.resolve(__dirname, `public/${item}`),
        })
      );
    });

  return {
    mode: argv.mode,
    devtool: "eval-source-map",

    entry: {
      index: ["./src/index.js"],
      panel: ["./src/panel.js"],
      playlist: ["./src/playList.js"],
      todos: ["./src/todos.js"],
      chat: ["./src/chat.js"],
      table: ["./src/table.js"],
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "js/[name].bundle.js",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    plugins,

    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000,
      overlay: true,
      inline: true,
      clientLogLevel: "silent",
      stats: {
        modules: false,
      },
    },
  };
};
