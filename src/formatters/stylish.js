import _ from 'lodash';

const indent = '  ';

const getIndent = (level) => indent.repeat(level);

const formatValue = (element, level) => {
  if (!_.isObject(element)) {
    return element;
  }

  const entries = Object.entries(element);
  const result = entries.map(([key, value]) => `${getIndent(level)}  ${key}: ${formatValue(value)}`);
  return `{\n${result.join('\n')}\n${getIndent(level - 1)}}`;
};

const renderStylish = (nodes) => {
  const iter = (data, level) => {
    const result = data.flatMap((el) => {
      const {
        key, value, type, oldValue, newValue, children,
      } = el;

      switch (type) {
        case 'nested':
          return `${getIndent(level)}  ${key}: ${iter(children, level + 2)}`;

        case 'added':
          return `${getIndent(level)}+ ${key}: ${formatValue(value, level + 2)}`;

        case 'removed':
          return `${getIndent(level)}- ${key}: ${formatValue(value, level + 2)}`;

        case 'unchanged':
          return `${getIndent(level)}  ${key}: ${formatValue(value, level)}`;

        case 'changed':
          return [`${getIndent(level)}+ ${key}: ${formatValue(newValue, level + 2)}`,
            `${getIndent(level)}- ${key}: ${formatValue(oldValue, level + 2)}`];

        default:
          throw new Error(`The type of node ${type} is not supported for stylish formatter`);
      }
    });
    return `{\n${result.join('\n')}\n${getIndent(level - 1)}}`;
  };

  return iter(nodes, 1);
};

export default renderStylish;
