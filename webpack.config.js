const path = require('path');

module.exports = (env) => {
  let config = {
    mode: env.mode ?? 'production',

    entry: {
      main: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: env.mode === 'production' ? 'evadessp.js' : 'evadessp-dev.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
  };
  env.mode === 'development' ? (config.devtool = 'inline-source-map') : 'none';
  return config;
};
