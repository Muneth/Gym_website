const path = require('path');

module.exports = {
    entry: {
        index: './scripts/app.js',
        address: './scripts/address.js',
        burger: './scripts/burger.js',
        form: './scripts/appform.js'
        // class: './scripts/httpclass.js'
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};