'use strict';

module.exports = {
  rules: {
    'no-native-promise-helpers': require('./rules/no-native-promise-helpers'),
    'no-perform-without-catch': require('./rules/no-perform-without-catch'),
    'require-task-name-suffix': require('./rules/require-task-name-suffix'),
  },
};
