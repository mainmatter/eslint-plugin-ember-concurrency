const { RuleTester } = require('eslint');

const rule = require('./require-task-name-suffix');

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('require-task-name-suffix', rule, {
  valid: [
    `export default Component.extend({ something: task() });`,
    `export default Component.extend({ submitTask: task(function*() {}) });`,
    `export default Component.extend({ submitTask: task(function*() {}).drop() });`,
    `export default Component.extend({ foo: 42 });`,
    `export default Component.extend({ [foo]: 42 });`,
    `export default Component.extend({ foo() {} });`,
    `export default Component.extend({ foo: computed() });`,
  ],
  invalid: [
    {
      code: `export default Component.extend({ submit: task(function*() {}) });`,
      errors: [{ message: 'Task names should end with `Task`', column: 35 }],
    },
    {
      code: `export default Component.extend({ submit: task(function*() {}).drop() });`,
      errors: [{ message: 'Task names should end with `Task`', column: 35 }],
    },
  ],
});
