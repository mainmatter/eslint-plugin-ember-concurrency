# no-perform-without-catch

Similar to [catch-or-return], we want to make sure that any
`this.someTask.perform()` calls have either a `.catch(...)` attached to it, they
are returned from a function, or they are used with `yield` or `await`.

The reason for this is that without explicit error handling on the `perform()`
calls you will up with "Unhandled promise error" issues if you use error
reporting services like [Sentry].

[catch-or-return]: https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/catch-or-return.md
[Sentry]: https://sentry.io

## Examples

This rule **forbids** the following:

```js
this.submitTask.perform();
```

This rule **allows** the following:

```js
this.submitTask.perform().catch(error => { ... });
```

```js
try {
  await this.submitTask.perform();
} catch (error) {
  ...
}
```

```js
return this.submitTask.perform();
```
