
let scssLoader = ['modules', 'localIdentName=[local]:[hash:base64]', 'importLoaders=1', 'sourceMap'];
let cssLoader = ['modules', 'localIdentName=[local]:[hash:base64]', 'sourceMap'];

scssLoader = 'css-loader?' + scssLoader.join('&');
cssLoader = 'css-loader?' + cssLoader.join('&');

const jsLoaders = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: [/example/, /config/, /src/],
    use: ['react-hot-loader', 'babel-loader?retainLines=true', 'eslint-loader']
};

const styleLoaders = {
    test: /\.scss$/,
    use: [
        'style-loader',
        scssLoader,
        'postcss-loader',
        'sass-loader'
    ]
};

const cssStyleLoader = {
    test: /\.css$/,
    use: [
        'style-loader',
        cssLoader,
        'postcss-loader'
    ]
};

const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    exclude: /node_modules/,
    loader: 'url-loader',
    options: {
        name: 'fonts/[name].[ext]',
        limit: '10000'
    }
};

const imageLoader = {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    exclude: /node_modules/,
    loader: 'url-loader',
    options: {
        name: 'img/img-[hash:6].[ext]',
        limit: '5000'
    }
};

const jsonLoaders = {
    test: /\.json$/,
    loader: 'json-loader'
};

const handlebarsLoaders = {
    test: /\.hbs$/,
    loader: 'handlebars-loader'
};

const lessLoader = {
    test: /\.less$/,
    loader: "style-loader!css-loader!less-loader"
};

module.exports = [
    // jsLoaders,
    styleLoaders,
    cssStyleLoader,
    fontLoader,
    imageLoader,
    jsonLoaders,
    lessLoader
    // handlebarsLoaders
];
