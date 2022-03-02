const path = require('path');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const config = target => ({
  mode: isEnvProduction ? 'production' : 'development',
  // Stop compilation early in production
  entry: ['./index.js'],
  performance: {
    hints: false,
  },
  context: path.join(__dirname, 'src'),
  devtool: isEnvProduction
    ? 'source-map'
    : isEnvDevelopment && 'cheap-module-source-map',
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
          // Process application JS with Babel.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: /src/,
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: false,
              compact: isEnvProduction,
            },
          },
          // Process any JS outside the app with Babel.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      crossfilter: 'crossfilter2',
    },
    extensions: ['.css', '.js', '.jsx', '.mjs'],
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: `react-dc.${target}.js`,
    library: {
      name: target !== 'module' ? 'ReactDc' : undefined,
      type: target,
    },
  },
  experiments: {
    outputModule: target === 'module',
  },
  optimization: {
    minimize: isEnvProduction,
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      module: 'react',
    },
    dc: 'dc',
  },
});

// noinspection WebpackConfigHighlighting
module.exports = [config('umd'), config('module')];
