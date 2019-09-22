const path = require('path');
const config = {
    entry: './app/js/main.js',
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

};

module.exports = config;
