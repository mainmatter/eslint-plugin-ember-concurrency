eslint-plugin-ember-concurrency
==============================================================================

[ESLint] plugin for [ember-concurrency]

[ESLint]: https://eslint.org/
[ember-concurrency]: http://ember-concurrency.com


Installation
------------------------------------------------------------------------------

```bash
yarn add --dev eslint-plugin-ember-concurrency
```


Usage
------------------------------------------------------------------------------

```js
// .eslintrc.js

module.exports = {
  plugins: ['ember-concurrency'],

  rules: {
    'ember-concurrency/require-task-name-suffix': 'error',
  },
};
```


Rules
------------------------------------------------------------------------------

- [require-task-name-suffix](./rules/require-task-name-suffix.md) – Ensures
  consistent task property names


License
------------------------------------------------------------------------------

This projects is developed by and &copy; [simplabs GmbH](http://simplabs.com)
and contributors. It is released under the [MIT License](LICENSE.md).
