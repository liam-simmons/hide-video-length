/* eslint-disable @typescript-eslint/no-var-requires */

const mix = require('laravel-mix');
const Dotenv = require('dotenv-webpack');

mix.disableNotifications();

mix
  .ts('src/scripts/background.ts', '')
  .ts('src/scripts/content.ts', '')
  .ts('src/scripts/popup.ts', '')
  .ts('src/scripts/options.ts', '')
  .vue()
  .sass('src/styles/background.scss', '')
  .options({
    processCssUrls: false,
  })
  .sass('src/styles/popup.scss', '')
  .options({
    processCssUrls: false,
  })
  .sass('src/styles/options.scss', '')
  .options({
    processCssUrls: false,
  })
  .copy('src/static', 'build')
  .setPublicPath('build');

mix.webpackConfig({
  output: {
    publicPath: '',
  },
  plugins: [new Dotenv()],
});
