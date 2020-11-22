const path = require('path');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const makeFilename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const getWebpackPlugins = () => {
    return [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/logo.png',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: makeFilename('css'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/manifest.json'),
                    to: path.resolve(__dirname, 'dist')
                }, {
                    from: path.resolve(__dirname, 'public/robots.txt'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        isDev && new Dotenv(),
        isProd && new webpack.EnvironmentPlugin(['REACT_APP_API_URL', 'NODE_ENV']),
        isDev && new ESLintPlugin(),
    ].filter(Boolean);
};

const getWebpackRules = () => {
    return [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',

                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', ],
                    plugins: ['@babel/plugin-proposal-class-properties', ],
                }
            }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', ],
        },
        {
            test: /\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', ],
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader', ],
        },
    ];
}


module.exports = {
    context: __dirname,
    mode: isDev ? 'development' : 'production',

    entry: {
        main: [
            '@babel/polyfill',
            './src/index.js',
        ],
    },

    output: {
        filename: makeFilename('js'),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    module: {
        rules: getWebpackRules(),
    },

    plugins: getWebpackPlugins(),

    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            isProd && new CssMinimizerPlugin(),
            isProd && new TerserPlugin({extractComments: true}),
        ].filter(Boolean),
    },

    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 4200,
        contentBase: path.resolve(__dirname, 'dist'),
        watchContentBase: isDev,
        hot: isDev,
        historyApiFallback: true,
    }
};
