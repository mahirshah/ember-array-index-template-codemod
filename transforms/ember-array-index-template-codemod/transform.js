const recast = require('ember-template-recast');
const { builders } = recast;
const R_NUM = /^\d+$/;

module.exports = function transform(fileInfo, config = {}) {
  const { code: toGetHelper } = recast.transform(fileInfo.source, () =>
    transformToGetHelper(fileInfo, config)
  );

  return toGetHelper;
};

function transformToGetHelper() {
  return {
    /**
     * Handle special cases of the form {{foo.0.bar}} and transform to a
     * mustache statement containing the get helper
     */
    MustacheStatement(node) {
      const { path, params, hash } = node;
      if (path.type === 'PathExpression' && params.length === 0 && hash.pairs.length === 0) {
        const maybeFirstPathIndex = path.parts.findIndex(part => R_NUM.test(part));

        if (maybeFirstPathIndex !== -1) {
          return builders.mustache('get', getHelperParams(path, maybeFirstPathIndex));
        }
      }
    },
    /**
     * Handle all other cases such for path expressions such as inside HashPairs
     * or block statement params and transform to a get helper subexpression
     */
    PathExpression(node) {
      const maybeFirstPathIndex = node.parts.findIndex(part => R_NUM.test(part));

      if (maybeFirstPathIndex !== -1) {
        return builders.sexpr('get', getHelperParams(node, maybeFirstPathIndex));
      }
    },
  };
}

/**
 * Given a path expression node to be transformed into a `get` helper (for example,
 * a path expression node of the form "foo.0.bar"), return the `get` helper params
 * needed when building the `get` helper
 * @param pathExpressionNode - the path expression node to be transformed into a get helper
 * @param firstPathIndex - index of the first digit contained in the path
 * expression node
 * @return {[PathExpression, StringLiteral]} - tuple containing the path expression
 * and the string literal path to be used as params to a get helper expression
 */
function getHelperParams(pathExpressionNode, firstPathIndex) {
  let firstPathPart = pathExpressionNode.parts.slice(0, firstPathIndex);

  if (pathExpressionNode.this) {
    firstPathPart.unshift('this');
  }

  const path = builders.path(firstPathPart.join('.'));
  const literal = builders.literal(
    'StringLiteral',
    pathExpressionNode.parts.slice(firstPathIndex).join('.')
  );

  return [path, literal];
}
