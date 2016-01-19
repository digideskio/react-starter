const PATH = require('path');

const webpack = require("webpack");

const ROOT = '../../../';

const APP_FOLDER = PATH.resolve(__dirname, ROOT, 'app/');
const APP_ENTRY_FILE = PATH.resolve(__dirname, ROOT, APP_FOLDER, 'client.js');

const BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'app/public/js/');
const PUBLIC_PATH = '/public/js/';

const BUILD_FILE = 'app.js';

const ESLINT_CONFIG_FILE = PATH.resolve(__dirname, ROOT, 'tools/build/config/eslint-config.json');

const envConfig = {
    development: {
        plugins: [
            [
                'react-transform',
                {
                    transforms: [
                        {
                            transform: 'react-transform-catch-errors',
                            imports: ['react', 'redbox-react']
                        }
                    ]
                }
            ]
        ]
    }
};

const webpackConfig = {
    entry: {
        app: APP_ENTRY_FILE
    },
    output: {
        path: BUILD_FOLDER,
        publicPath: PUBLIC_PATH,
        filename: BUILD_FILE
    },
    devtool: 'inline-source-map',
    debug: true,
    bail: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    APP_FOLDER
                ],
                loader: 'babel',
                query: {
                    compact: false,
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    // env: envConfig
                }
            }
        ]
    },
    externals: {
        'axios': 'axios',
        'react': 'React',
        'react-router': 'ReactRouter',
        'history': 'History',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = webpackConfig;
