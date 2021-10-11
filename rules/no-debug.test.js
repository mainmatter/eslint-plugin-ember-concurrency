const { RuleTester } = require('eslint');

const rule = require('./no-debug');

let VALID = [`export default Component.extend({ submitTask: task(function*() {}) });`];

let INVALID = [
  {
    code: `export default Component.extend({ submitTask: task(function*() {}).debug() });`,
    errors: [{ message: 'Unexpected task debugger', column: 35 }],
  },
];

let VALID_BABEL = [
  `export default class extends Component { @task *submitTask() { }; }`,
  `export default class extends Component { @restartableTask *submitTask() { }; }`,
  `export default class extends Component { @dropTask *submitTask() { }; }`,
  `export default class extends Component { @keepLatestTask *submitTask() { }; }`,
  `export default class extends Component { @enqueueTask *submitTask() { }; }`,
  `export default class extends Component { @task(function*() {}) submitTask; }`,
  `export default class extends Component { @(task(function*() {})) submitTask; }`,
];

let INVALID_BABEL = [
  {
    code: `export default class extends Component { @(task(function*() {}).debug()) submitTask; }`,
    errors: [{ message: 'Unexpected task debugger', column: 74 }],
  },
  {
    code: `export default class extends Component { @(task(function*() {}).debug()) submitTask; }`,
    errors: [{ message: 'Unexpected task debugger', column: 74 }],
  },
  {
    code: `export default class extends Component { @task({ debug: true }) *submitTask() { } }`,
    errors: [{ message: 'Unexpected task debugger', column: 66 }],
  },
  {
    code: `export default class extends Component { @restartableTask({ debug: true }) *submitTask() { } }`,
    errors: [{ message: 'Unexpected task debugger', column: 77 }],
  },
  {
    code: `export default class extends Component { @dropTask({ debug: true }) *submitTask() { } }`,
    errors: [{ message: 'Unexpected task debugger', column: 70 }],
  },
  {
    code: `export default class extends Component { @keepLatestTask({ debug: true }) *submitTask() { } }`,
    errors: [{ message: 'Unexpected task debugger', column: 76 }],
  },
  {
    code: `export default class extends Component { @enqueueTask({ debug: true }) *submitTask() { } }`,
    errors: [{ message: 'Unexpected task debugger', column: 73 }],
  },
];

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-debug', rule, {
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

babelRuleTester.run('no-debug', rule, {
  valid: [...VALID, ...VALID_BABEL],
  invalid: [...INVALID, ...INVALID_BABEL],
});
