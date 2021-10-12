# no-debug

This rule ensures that all `ember-concurrency` tasks in the app
do not have debug shipped into production.


## Examples

This rule **forbids** the following:

```js
export default Component.extend({
  submit: task(function*() {
    //...
  }).debug(),
})
```

```js
export default class extends Component {
  @(task(function*() {
    //...
  }).debug()) submitTask;
}
```

```js
export default class extends Component {
  @task({ debug: true }) *submitTask() {
    //...
  }
}

```

This rule **allows** the following:

```js
export default class extends Component {
  @task *submitTask() { };
}
```

```js
export default Component.extend({
  submit: task(function*() {
    //...
  }).debug(),
})
```

```js
export default class extends Component {
  @(task(function*() {
    //...
  }).debug()) submitTask;
}
```
