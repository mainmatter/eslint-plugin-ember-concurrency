'use strict';

const TASK_TYPES = ['task', 'restartableTask', 'dropTask', 'keepLatestTask', 'enqueueTask'];

module.exports = { hasTaskDecorator, hasTaskCallExpression };

function hasTaskDecorator(node) {
  if (!node.decorators) return false;

  return node.decorators.some(decorator => {
    let { expression } = decorator;
    if (!expression) return false;
    if (expression.type === 'Identifier' && TASK_TYPES.includes(expression.name)) return true;
    return (
      expression.type === 'CallExpression' &&
      expression.callee &&
      expression.callee.type === 'Identifier' &&
      TASK_TYPES.includes(expression.callee.name)
    );
  });
}

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
