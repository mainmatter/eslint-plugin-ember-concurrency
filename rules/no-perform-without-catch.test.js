const { RuleTester } = require('eslint');

const rule = require('./no-perform-without-catch');

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-perform-without-catch', rule, {
  valid: [
    `function foo() { this.submitTask.perform().catch(error => {}); }`,
    `function foo() { this.submitTask.perform().then().then().catch(error => {}); }`,
    `function foo() { return this.submitTask.perform(); }`,
    `function foo() { return this.submitTask.perform().then().then(); }`,
    `async function foo() { await this.submitTask.perform(); }`,
    `async function foo() { await this.submitTask.perform().then().then(); }`,
    `function* foo() { yield this.submitTask.perform(); }`,
    `function* foo() { yield this.submitTask.perform().then().then(); }`,
    `function foo() { let promise = this.submitTask.perform(); }`,
    `function foo() { let promise = this.submitTask.perform().then().then(); }`,
    `perform()`,
    `foo['bar']()`,
  ],

  invalid: [
    {
      code: `function foo() { this.submitTask.perform(); }`,
      errors: [
        { message: 'Unhandled promise error from `perform()` call', column: 34, endColumn: 41 },
      ],
    },
    {
      code: `function foo() { this.submitTask.perform().then().then(); }`,
      errors: [
        { message: 'Unhandled promise error from `perform()` call', column: 34, endColumn: 41 },
      ],
    },
  ],
});
