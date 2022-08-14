module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path:  __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module : {
        rules : [
        {
            test: /\.js/,
            use: 'babel-loader'
        },
        {
            test: /\.svg/,
            use: 'svg-url-loader'
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: 'file-loader'
        }
        ]
    }
};