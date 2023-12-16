const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: './lib/index.js',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    comments: false
                }
            }),
        ],
    },
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'JsonView',
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            'node_modules'
        ]
    },
    externals: {
        vue: 'vue',
        clipboard: 'clipboard'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../lib/index.d.ts"),
                to: path.resolve(__dirname, "../dist/index.d.ts"),
            },
        ],
        )
    ]
}

if (process.argv.some(a => a === '--report')) {
    module.exports.plugins.push(new BundleAnalyzerPlugin());
}