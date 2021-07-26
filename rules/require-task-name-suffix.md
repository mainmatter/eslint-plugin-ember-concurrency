# require-task-name-suffix

This rule ensures that the names of all `ember-concurrency` tasks in the app
end with `Task` to distinguish them from regular methods, actions or other
properties on the classes.


## Examples

This rule **forbids** the following:

```js
export default Component.extend({
  submit: task(function*() {
    //...
  }),
})
```

```js
export default class extends Component {
  @task *submit() {
    //...
  };
}
```

This rule **allows** the following:

```js
export default Component.extend({
  submitTask: task(function*() {
    //...
  }),
})
```

```js
export default class extends Component {
  @task *submitTask() {
    //...
  };
}
```
