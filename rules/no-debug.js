'use strict';

const { hasTaskDecorator, hasTaskCallExpression } = require('../utils/utils');

module.exports = {
  create(context) {
    return {
      Property(node) {
        if (node.method || node.shorthand || node.computed) return;
        let { key, value } = node;
        if (hasTaskCallExpression(value) && hasDebugCallee(value)) {
          context.report({
            node: key,
            message: 'Unexpected task debugger',
          });
        }
      },
      MethodDefinition(node) {
        let { key, value, decorators } = node;
        if (!decorators) return;
        if (!value) return;
        if (!value.generator) return;
        if (hasTaskDecorator(node) && hasDebugArgument(node)) {
          context.report({
            node: key,
            message: 'Unexpected task debugger',
          });
        }
      },
      ClassProperty(node) {
        if (node.static || node.computed) return;

        let { key, value, decorators } = node;
        if (value !== null) return;
        if (!decorators) return;

        for (let decorator of node.decorators) {
          if (hasTaskCallExpression(decorator.expression) && hasDebugCallee(decorator.expression)) {
            context.report({
              node: key,
              message: 'Unexpected task debugger',
            });
          }
        }
      },
    };
  },
};

function hasDebugCallee(node) {
  let { callee } = node;
  return (
    callee.type === 'MemberExpression' &&
    callee.property &&
    callee.property.type === 'Identifier' &&
    callee.property.name === 'debug'
  );
}

function hasDebugArgument(node) {
  if (!node.decorators) return false;

  return node.decorators.some(decorator => {
    let { expression } = decorator;

    if (!expression) return false;
    if (!expression.arguments) return false;

    return expression.arguments.some(argument => {
      if (argument.type !== 'ObjectExpression') return false;

      return argument.properties.some(property => {
        return property.key && property.key.name === 'debug';
      });
    });
  });
}
