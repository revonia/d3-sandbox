module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "plugin:vue/recommended",
    "standard"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "d3": "readonly",
    "_": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "linebreak-style": ["error", "unix"]
  }
};
