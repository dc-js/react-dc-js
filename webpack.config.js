const path = require('path')

const isEnvProduction = process.env.NODE_ENV === 'production'
const isEnvDevelopment = process.env.NODE_ENV === 'development'

const config = target => ({
  mode: isEnvProduction ? 'production' : 'development',
  // Stop compilation early in production
  bail: isEnvProduction,
  entry: ['./index.js'],
  performance: {
    hints: false,
  },
  context: path.join(__dirname, 'src'),
  devtool: isEnvDevelopment ? 'inline-source-map' : false,
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
          // Process any JS outside of the app with Babel.
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
    library: 'ReactDc',
    libraryTarget: target,
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
    },
    dc: 'dc',
  },
})

// noinspection WebpackConfigHighlighting
module.exports = [config('umd')]
