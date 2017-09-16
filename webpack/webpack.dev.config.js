import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WarnCaseSensitiveModulesPlugin from 'webpack/lib/WarnCaseSensitiveModulesPlugin';
import SimpleProgressPlugin from 'webpack-simple-progress-plugin';
import config from './config';

const paths = config.UTILS_PATH;

process.traceDeprecation = true;

WarnCaseSensitiveModulesPlugin.prototype.apply = function() {};
const DevServerURL = `http://${config.HOST}:${config.DEV_SERVER_PORT}/`;
const webpackConfig = {
    node: {
        fs: 'empty'
    },
    module: {},
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new StyleLintPlugin(),
        new htmlWebpackPlugin({
            template:`${paths.client('index.html.hbs')}`,
            hash: false,
            filename: 'index.html',
            chunks: ['polyfill', 'app'],
            chunksSortMode: (chunkA, chunkB) => {
                return (chunkA.names[0] < chunkB.names[0]) ? 1 : -1
            },
            inject: 'body',
            minify: {
                collapseWhitespace: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.REDUX_DEVTOOLS_PORT': process.env.REDUX_DEVTOOLS_PORT ? JSON.stringify(process.env.REDUX_DEVTOOLS_PORT) : 8000
        }),
        new webpack.HotModuleReplacementPlugin(),
        new SimpleProgressPlugin()
    ]
};

const APP_ENTRY_PATH = `${paths.base(config.APP_PATH)}/${config.APP_MAIN}`;

webpackConfig.entry = {
    polyfill: ['babel-polyfill'],
    app: [
        `webpack-dev-server/client?${DevServerURL}`,
        'webpack/hot/only-dev-server',
        APP_ENTRY_PATH
    ]
};

webpackConfig.resolve = {
    modules: [
        paths.base(config.APP_PATH),
        paths.base('node_modules')
    ],
    alias: {
        envConfig: paths.base('config', process.env.EXEC_ENV || 'development'),
        AliasStyles: path.resolve(__dirname, '../src/styles'),
        AliasCommon: path.resolve(__dirname, '../src/common'),
        AliasUI: path.resolve(__dirname, '../src/common/ui'),
        AliasImages: path.resolve(__dirname, '../src/styles/images'),
        AliasPages: path.resolve(__dirname, '../src/pages'),
        'elmer-react-router': 'D:\\node\\elmer-react-router\\src\\index.js',
        'elmer-react-axios': 'D:\\node\\elmer-react-axios\\src\\index.js'
    }
};

webpackConfig.output = {
    filename: '[name].[hash].js',
    path: paths.base(config.DIST_PATH),
    publicPath: DevServerURL
};

webpackConfig.devServer = {
    historyApiFallback: true,
    inline: true,
    open: true,
    port: config.DEV_SERVER_PORT,
};

let scssLoader = ['modules', 'localIdentName=[local]:[hash:base64]', 'importLoaders=1', 'sourceMap'];
let cssLoader = ['modules', 'localIdentName=[local]:[hash:base64]', 'sourceMap'];

webpackConfig.devtool = 'source-map';

scssLoader = 'css-loader?' + scssLoader.join('&');
cssLoader = 'css-loader?' + cssLoader.join('&');

const jsLoaders = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [/example/, /config/, /src/],
        use: ['react-hot-loader', 'babel-loader?retainLines=true', 'eslint-loader']
    }
];

const styleLoaders = [
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            scssLoader,
            'postcss-loader',
            'sass-loader'
        ]
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            cssLoader,
            'postcss-loader'
        ]
    }
];

const fontLoader = [
    {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
            name: 'fonts/[name].[ext]',
            limit: '10000'
        }
    }
];

const imageLoader = [
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
            name: 'img/img-[hash:6].[ext]',
            limit: '5000'
        }
    }
];

const jsonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
];

const handlebarsLoaders = [
    {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
    }
]

const lessLoader = [
    {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
    }
]

webpackConfig.module.rules = [
    ...styleLoaders,
    ...lessLoader,
    ...fontLoader,
    ...imageLoader,
    ...jsonLoaders
];

export default webpackConfig;
