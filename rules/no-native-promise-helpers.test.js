const { RuleTester } = require('eslint');

const rule = require('./no-native-promise-helpers');

let ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-native-promise-helpers', rule, {
  valid: [
    `
      import { all } from 'ember-concurrency';

      export default Component.extend({
        submitTask: task(function*() {
          yield all([
            this.saveTask.perform(),
            this.loadingSpinnerTask.perform(),
          ]);
        })
      });
    `,
    `
      import { all } from 'ember-concurrency';

      export default class extends Component {
        @task(function*() {
          yield all([
            this.saveTask.perform(),
            this.loadingSpinnerTask.perform(),
          ]);
        })
        submitTask;
      }
    `,
    `
      import { all } from 'ember-concurrency';

      export default Component.extend({
        async submit() {
          await Promise.all([foo(), bar()]);
        },
      });
    `,
    `
      import { all } from 'ember-concurrency';

      export default class extends Component {
        async submit() {
          await Promise.all([foo(), bar()]);
        }
      }
    `,
    `
      import { all } from 'ember-concurrency';

      export default class extends Component {
        *submit() {
          yield Promise.all([foo(), bar()]);
        }
      }
    `,
    `
      export default Component.extend({
        submitTask: foo(function*() {
          yield Promise.all([
            this.saveTask.perform(),
            this.loadingSpinnerTask.perform(),
          ]);
        })
      });
    `,
    `
      import { all } from 'ember-concurrency';

      export default class extends Component {
        @task *submitTask() {
          yield all([
            this.saveTask.perform(),
            this.loadingSpinnerTask.perform(),
          ]);
        };
      }
    `,
    `
    import { all } from 'ember-concurrency';

    export default class extends Component {
      @restartableTask *submitTask() {
        yield all([
          this.saveTask.perform(),
          this.loadingSpinnerTask.perform(),
        ]);
      };
    }
  `,
    `
  import { all } from 'ember-concurrency';

  export default class extends Component {
    @dropTask *submitTask() {
      yield all([
        this.saveTask.perform(),
        this.loadingSpinnerTask.perform(),
      ]);
    };
  }
`,
    `
import { all } from 'ember-concurrency';

export default class extends Component {
  @keepLatestTask *submitTask() {
    yield all([
      this.saveTask.perform(),
      this.loadingSpinnerTask.perform(),
    ]);
  };
}
`,
    `
import { all } from 'ember-concurrency';

export default class extends Component {
  @enqueueAsk *submitTask() {
    yield all([
      this.saveTask.perform(),
      this.loadingSpinnerTask.perform(),
    ]);
  };
}
`,
  ],

  invalid: [
    {
      code: `
        export default Component.extend({
          submitTask: task(function*() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          })
        });
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @task(function*() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          })
          submitTask;
        }
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @task(function*() {
            yield Promise.race([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          })
          submitTask;
        }
      `,
      errors: [
        {
          message: "Use `import { race } from 'ember-concurrency';` instead of `Promise.race()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @task(function*() {
            yield Promise.allSettled([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          })
          submitTask;
        }
      `,
      errors: [
        {
          message:
            "Use `import { allSettled } from 'ember-concurrency';` instead of `Promise.allSettled()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @task *submitTask() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          }
        }
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @restartableTask *submitTask() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          }
        }
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @dropTask *submitTask() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          }
        }
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @keepLatestTask *submitTask() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          }
        }
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
    {
      code: `
        export default class extends Component {
          @enqueueTask *submitTask() {
            yield Promise.all([
              this.saveTask.perform(),
              this.loadingSpinnerTask.perform(),
            ]);
          }
        }
      `,
      errors: [
        {
          message: "Use `import { all } from 'ember-concurrency';` instead of `Promise.all()`",
          line: 4,
          column: 19,
          endLine: 7,
          endColumn: 15,
        },
      ],
    },
  ],
});
