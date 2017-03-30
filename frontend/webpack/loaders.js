const scss = [
  'css-loader',
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        'assets/_constants.scss',
        'assets/_mixins.scss'
      ]
    }
  }
];

module.exports = {
  scss
};
