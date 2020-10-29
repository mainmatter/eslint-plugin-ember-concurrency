'use strict';

module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        let { callee } = node;
        if (callee.type !== 'MemberExpression') return;

        let { property } = callee;
        if (property.type !== 'Identifier') return;
        if (property.name !== 'perform') return;

        let effectiveParent = getParentSkippingThen(node);
        if (effectiveParent.type !== 'ExpressionStatement') return;

        context.report({
          node: node,
          message: 'Unhandled promise error from `perform()` call',
        });
      },
    };
  },
};

function getParentSkippingThen(node) {
  let { parent } = node;
  if (!parent) return parent;
  if (parent.type !== 'MemberExpression') return parent;

  let { property, parent: greatParent } = parent;
  if (property.type !== 'Identifier') return parent;
  if (property.name !== 'then') return parent;

  if (!greatParent) return parent;
  if (greatParent.type !== 'CallExpression') return parent;

  return getParentSkippingThen(greatParent);
}
