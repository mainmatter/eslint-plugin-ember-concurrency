const { RuleTester } = require('eslint');

const rule = require('./require-task-name-suffix');

let VALID = [
  `export default Component.extend({ something: task() });`,
  `export default Component.extend({ submitTask: task(function*() {}) });`,
  `export default Component.extend({ submitTask: task(function*() {}).drop() });`,
  `export default Component.extend({ foo: 42 });`,
  `export default Component.extend({ [foo]: 42 });`,
  `export default Component.extend({ foo() {} });`,
  `export default Component.extend({ foo: computed() });`,
];

let INVALID = [
  {
    code: `export default Component.extend({ submit: task(function*() {}) });`,
    errors: [{ message: 'Task names should end with `Task`', column: 35 }],
  },
  {
    code: `export default Component.extend({ submit: task(function*() {}).drop() });`,
    errors: [{ message: 'Task names should end with `Task`', column: 35 }],
  },
];

let VALID_BABEL = [
  `export default class extends Component { @task something; }`,
  `export default class extends Component { @task *submitTask() { }; }`,
  `export default class extends Component { @restartableTask *submitTask() { }; }`,
  `export default class extends Component { @dropTask *submitTask() { }; }`,
  `export default class extends Component { @keepLatestTask *submitTask() { }; }`,
  `export default class extends Component { @enqueueTask *submitTask() { }; }`,
  `export default class extends Component { @task(function*() {}) submitTask; }`,
  `export default class extends Component { @(task(function*() {})) submitTask; }`,
  `export default class extends Component { @(task(function*() {}).drop()) submitTask; }`,
  `export default class extends Component { foo = 42 }`,
  `export default class extends Component { [foo] = 42 }`,
  `export default class extends Component { foo() {} }`,
  `export default class extends Component { @computed() foo }`,
];

let INVALID_BABEL = [
  {
    code: `export default class extends Component { @task(function*() {}) submit; }`,
    errors: [{ message: 'Task names should end with `Task`', column: 64 }],
  },
  {
    code: `export default class extends Component { @(task(function*() {})) submit; }`,
    errors: [{ message: 'Task names should end with `Task`', column: 66 }],
  },
  {
    code: `export default class extends Component { @(task(function*() {}).drop()) submit; }`,
    errors: [{ message: 'Task names should end with `Task`', column: 73 }],
  },
  {
    code: `export default class extends Component { @task *submit() { } }`,
    errors: [{ message: 'Task names should end with `Task`', column: 49 }],
  },
  {
    code: `export default class extends Component { @restartableTask *submit() { } }`,
    errors: [{ message: 'Task names should end with `Task`', column: 60 }],
  },
  {
    code: `export default class extends Component { @dropTask *submit() { } }`,
    errors: [{ message: 'Task names should end with `Task`', column: 53 }],
  },
  {
    code: `export default class extends Component { @keepLatestTask *submit() { } }`,
    errors: [{ message: 'Task names should end with `Task`', column: 59 }],
  },
  {
    code: `export default class extends Component { @enqueueTask *submit() { } }`,
    errors: [{ message: 'Task names should end with `Task`', column: 56 }],
  },
  {
    code: `export default class extends Component { @task({ maxConcurrency: 3, }) *submit() { } }`,
    errors: [{ message: 'Task names should end with `Task`', column: 73 }],
  },
];

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('require-task-name-suffix', rule, {
  valid: VALID,
  invalid: INVALID,
});

let babelRuleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

babelRuleTester.run('require-task-name-suffix', rule, {
  valid: [...VALID, ...VALID_BABEL],
  invalid: [...INVALID, ...INVALID_BABEL],
});
