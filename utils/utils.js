'use strict';

const TASK_TYPES = ['task', 'restartableTask', 'dropTask', 'keepLatestTask', 'enqueueTask'];

module.exports = { hasTaskDecorator };

function hasTaskDecorator(node) {
  if (!node.decorators) return false;

  return node.decorators.some(decorator => {
    let { expression } = decorator;
    return expression && expression.type === 'Identifier' && TASK_TYPES.includes(expression.name);
  });
}
