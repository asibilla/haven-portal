module.exports = {
  plugins: ['emotion'],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            mode: 'remove',
            ignoreFilenames: ['node_modules'],
            removeImport: true,
          },
        ],
        ['babel-plugin-jsx-remove-data-test-id'],
      ],
    },
  },
};
