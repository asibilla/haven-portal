module.exports = {
  plugins: ['emotion', '@babel/plugin-proposal-class-properties'],
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
        ['transform-async-to-generator'],
      ],
    },
  },
};
