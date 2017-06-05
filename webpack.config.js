var path = require('path');

module.exports = {
    entry: './client/app/index.js',
    output: {
        path: path.resolve(__dirname, 'public/app/'),
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/app/'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
