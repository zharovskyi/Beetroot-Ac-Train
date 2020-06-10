const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    const isProduction = argv.mode === "production"
    const isDevelopment = argv.mode === "development"

    const plugins = [
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
    ];


    return {
        mode: argv.mode,
        devtool: "source-map",
        entry: {
            app: ["./src/js/app.js", "./src/scss/style.scss"]
        },
        output: {
            path: path.join(__dirname, "dist"),
            filename: "js/[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                },
                {
                    // Load all images
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

            ]
        },
        plugins,
        devServer: {
            contentBase: path.join(__dirname, "src"),
            compress: true,
            port: 9000,
            overlay: true,
            stats: {
                modules: false
            }
        }

    }
}