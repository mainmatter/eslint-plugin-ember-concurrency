'use strict';

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
