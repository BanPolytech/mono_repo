const mix = require('laravel-mix');
const Dotenv = require('dotenv-webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
.sass('resources/sass/app.scss', 'public/css')
.webpackConfig({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss?$/,
        loader: 'sass-loader',
        exclude: /node_modules/,
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
      allowEmptyValues: true,
      systemvars: true,
    }),
  ],
});
