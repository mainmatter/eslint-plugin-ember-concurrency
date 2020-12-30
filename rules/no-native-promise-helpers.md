# no-native-promise-helpers

`Promise.all()` and `Promise.race()` do not cancel their child promises or
tasks, because they are not aware of cancellation in the way that
ember-concurrency has implemented it. ember-concurrency does provide
alternative, cancellation-aware `all()` and `race()` implementations though,
but they need to be explicitly imported.

see <http://ember-concurrency.com/api/global.html>

This rule warns about usage of `Promise.all()` and `Promise.race()` inside of
ember-concurrency tasks.

## Examples

This rule **forbids** the following:

```js
submitTask: task(function*() {
  yield Promise.all([
    this.saveTask.perform(),
    this.loadingSpinnerTask.perform(),
  ]);
})
```

This rule **allows** the following:

```js
import { all } from 'ember-concurrency';

submitTask: task(function*() {
  yield all([
    this.saveTask.perform(),
    this.loadingSpinnerTask.perform(),
  ]);
})
```
