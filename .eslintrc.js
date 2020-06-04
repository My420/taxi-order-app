/*module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['airbnb','plugin:react/recommended','plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "react/jsx-filename-extension": "off"
    }
};*/

module.exports = {
  extends: ['airbnb-typescript'],
  rules: {
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
