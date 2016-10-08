const autoprefixer = require('autoprefixer');

module.exports = {
    postcss() {
        return [autoprefixer];
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
};
