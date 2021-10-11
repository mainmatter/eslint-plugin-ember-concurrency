'use strict';

const TASK_TYPES = ['task', 'restartableTask', 'dropTask', 'keepLatestTask', 'enqueueTask'];

module.exports = { hasTaskDecorator };

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
