'use strict';

const { hasTaskDecorator } = require('../utils/utils');

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

function hasTaskCallExpression(node) {
  return Boolean(findTaskCallExpression(node));
}

function findTaskCallExpression(node) {
  if (isTaskCallExpression(node)) {
    return node;
  }

  if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
    return findTaskCallExpression(node.callee.object);
  }
}

function isTaskCallExpression(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'task' &&
    node.arguments[0] &&
    node.arguments[0].type === 'FunctionExpression' &&
    node.arguments[0].generator
  );
}
