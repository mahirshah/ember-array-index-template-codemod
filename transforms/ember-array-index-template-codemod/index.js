const { getOptions } = require('codemod-cli');
const transform = require('./transform');

module.exports = function transformer(file) {
  try {
    return transform(file, getOptions());
  } catch (err) {
    throw new Error(`Transformation errored on file ${file.path}. Reason ${err}.`);
  }
};
