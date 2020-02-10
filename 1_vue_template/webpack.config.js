const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    // 배포는 hidden-source-map
    devtool: 'eval',
    entry: {
        app: path.join(__dirname, 'main.js')
    },
    module: {
        rules: [{ test: /\.vue$/, loader: 'vue-loader' }]
    },
    plugins: [new VueLoaderPlugin()],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    }
};
