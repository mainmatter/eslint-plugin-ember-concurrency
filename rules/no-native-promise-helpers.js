'use strict';

const HELPERS = ['all', 'race', 'allSettled'];

module.exports = {
  create(context) {
    let parentTask = null;

    return {
      FunctionExpression(node) {
        if (parentTask) return;

        let { generator, parent } = node;
        if (!generator) return;
        if (parent.type !== 'CallExpression' || parent.arguments[0] !== node) return;

        let { callee } = parent;
        if (callee.type !== 'Identifier' || callee.name !== 'task') return;

        parentTask = node;
      },

      'FunctionExpression:exit'(node) {
        if (node === parentTask) {
          parentTask = null;
        }
      },

      CallExpression(node) {
        if (!parentTask) return;

        let { callee } = node;
        if (callee.type !== 'MemberExpression') return;

        let { object, property } = callee;
        if (object.type !== 'Identifier' || object.name !== 'Promise') return;
        if (property.type !== 'Identifier' || !HELPERS.includes(property.name)) return;

        context.report({
          node,
          message: `Use \`import { ${property.name} } from 'ember-concurrency';\` instead of \`Promise.${property.name}()\``,
        });
      },
    };
  },
};
