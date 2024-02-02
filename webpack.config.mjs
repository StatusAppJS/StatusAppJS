// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path, { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from "url";
//import CompressionPlugin from 'compression-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';

const config = {
    entry: {
        "app": {
            import: './src/index.tsx'
        }
    },
    devtool: (isProduction) ? 'source-map' : 'inline-source-map',
    output: {
        filename: (isProduction) ? '[name]-[contenthash].bundle.min.js' : '[name].bundle.js',
        chunkFilename: (isProduction) ? '[name]-[contenthash].chunk.min.js' : '[name].chunk.js',
        path: resolve(__dirname, 'dist'),
        clean: true,
        publicPath: 'auto'
    },
    optimization: {
        minimize: (isProduction) ? true : false,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
                compress: {
                    ecma: '2017',
                    drop_console: (isProduction) ? true : false,
                },
            }
          })
        ],
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    },
    plugins: [
        /*new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.7,
            deleteOriginalAssets: true
        }),*/
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
