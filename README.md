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
    'ember-concurrency/no-perform-without-catch': 'error',
    'ember-concurrency/require-task-name-suffix': 'error',
  },
};
```


Rules
------------------------------------------------------------------------------

- [no-native-promise-helpers](./rules/no-native-promise-helpers) – Prevents
  usage of `Promise.all/race()` in tasks

- [no-perform-without-catch](./rules/no-perform-without-catch.md) – Ensures
  all `.perform()` calls have some kind of error handling

- [require-task-name-suffix](./rules/require-task-name-suffix.md) – Ensures
  consistent task property names


License
------------------------------------------------------------------------------

This projects is developed by and &copy; [simplabs GmbH](http://simplabs.com)
and contributors. It is released under the [MIT License](LICENSE.md).
