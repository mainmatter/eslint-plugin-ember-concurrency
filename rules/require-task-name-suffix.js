'use strict';

const { hasTaskDecorator, hasTaskCallExpression } = require('../utils/utils');

module.exports = {
  create(context) {
    return {
      Property(node) {
        if (node.method || node.shorthand || node.computed) return;

        let { key, value } = node;
        if (key.type !== 'Identifier' || key.name.endsWith('Task')) return;

        if (hasTaskCallExpression(value)) {
          context.report({
            node: node.key,
            message: 'Task names should end with `Task`',
          });
        }
      },
      MethodDefinition(node) {
        let { key, value, decorators } = node;
        if (key.type !== 'Identifier' || key.name.endsWith('Task')) return;
        if (!decorators) return;
        if (!value) return;
        if (!value.generator) return;

        if (hasTaskDecorator(node)) {
          context.report({
            node: node.key,
            message: 'Task names should end with `Task`',
          });
        }
      },
      ClassProperty(node) {
        if (node.static || node.computed) return;

        let { key, value, decorators } = node;
        if (key.type !== 'Identifier' || key.name.endsWith('Task')) return;
        if (value !== null) return;
        if (!decorators) return;

        for (let decorator of node.decorators) {
          if (hasTaskCallExpression(decorator.expression)) {
            context.report({
              node: node.key,
              message: 'Task names should end with `Task`',
            });
          }
        }
      },
    };
  },
};
