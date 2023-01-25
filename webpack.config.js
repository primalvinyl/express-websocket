const path = require('path');

module.exports = () => {
    return {
        entry: path.resolve(__dirname, 'src', 'index'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'index.js',
        },
        target: 'node',
        mode: 'production',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)?$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'src'),
                    use: 'ts-loader',
                },
            ],
        },
        stats: {
            errorDetails: true,
        },
    }
};
