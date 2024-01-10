// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path, { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from "url";
import CompressionPlugin from 'compression-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';

const config = {
    entry: {
        "StatusApp": './src/index.tsx',
    },
    devtool: 'source-map',
    output: {
        filename: '[name].min.js',
        path: resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: 'StatusApp',
        libraryExport: 'default',
        libraryTarget: 'commonjs2',
        clean: true,
        publicPath: '/'
    },
    optimization: {
        minimize: (isProduction)? true : false,
        minimizer: [
          new TerserPlugin({
            parallel: true,
          })
        ],
      },
    plugins: [
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
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
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
