const fs = require('fs');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootFolderPath = '/src/';

function getAliases() {
  const filesAndFolders = fs.readdirSync(resolve(__dirname + '/../src'));
  const folders = filesAndFolders.filter((folder) => /^((?!\.).)*$/i.test(folder));

  return folders.reduce((result, folder) => {
    if (folder === 'webpack') return result;
    result[folder] = resolve(__dirname, rootFolderPath + folder);
    return result;
  }, {});
}

module.exports = {
  entry: resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    alias: { ...getAliases() },
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: resolve(__dirname, '..', './build'),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', './public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
