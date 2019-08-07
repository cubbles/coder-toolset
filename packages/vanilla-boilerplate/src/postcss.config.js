/**
 * PostCss Configuration
 *
 * PostCSS: A tool for transforming CSS with JavaScript
 * @see https://postcss.org/
 * @see https://github.com/postcss/postcss#webpack
 * @see https://github.com/postcss/postcss/blob/master/docs/plugins.md
 */

module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    autoprefixer: {},
    cssnano: {}
  }
};
