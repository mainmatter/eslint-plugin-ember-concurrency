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

- [no-native-promise-helpers](./rules/no-native-promise-helpers.md) – Prevents
  usage of `Promise.all/race()` in tasks

- [no-perform-without-catch](./rules/no-perform-without-catch.md) – Ensures
  all `.perform()` calls have some kind of error handling

- [require-task-name-suffix](./rules/require-task-name-suffix.md) – Ensures
  consistent task property names

- [no-debug](./rules/no-debug.md) - Ensures task debuggers are not shipped to production


License
------------------------------------------------------------------------------

This projects is developed by and &copy; [Mainmatter GmbH](http://mainmatter.com)
and contributors. It is released under the [MIT License](LICENSE.md).
