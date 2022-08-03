const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Add mutiple page in pages array
const pages = ["index"];
module.exports = {

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: pages.reduce((config, page) => {
        config[page] = `./main/${page}.js`;
        return config;
    }, {}),
    // https://webpack.js.org/concepts/output/
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist/"),
    },
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.html?$/,
                use: 'html-loader',
            },
            {
                test: /\.s?css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            }

        ]
    },
    //https://webpack.js.org/concepts/plugins/
    plugins: [
        new webpack.ProvidePlugin({
            // gsap: 'gsap'
        }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].[contenthash].css",
        //     chunkFilename: "[id].[contenthash].css",
        // }),
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery',
            // 'window.jQuery': 'jquery'
        }),
    ].concat(
        pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    template: `./${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                })
        )
    )
};
