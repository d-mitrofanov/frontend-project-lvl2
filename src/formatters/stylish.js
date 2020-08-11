import _ from 'lodash';

const formTabSpace = (level) => {
  const tab = '  ';
  return tab.repeat(level);
};

const formatValue = (element, level) => {
  if (!_.isObject(element)) {
    return element;
  }

  const entries = Object.entries(element);
  const result = entries.map(([key, value]) => `${formTabSpace(level)}  ${key}: ${formatValue(value)}`);
  return `{\n${result.join('\n')}\n${formTabSpace(level - 1)}}`;
};

const renderStylish = (dataArr) => {
  const iter = (data, level) => {
    const result = data.flatMap((el) => {
      const {
        key, value, type, oldValue, newValue, children,
      } = el;

      switch (type) {
        case 'nested':
          return `${formTabSpace(level)}  ${key}: ${iter(children, level + 2)}`;

        case 'added':
          return `${formTabSpace(level)}+ ${key}: ${formatValue(value, level + 2)}`;

        case 'removed':
          return `${formTabSpace(level)}- ${key}: ${formatValue(value, level + 2)}`;

        case 'unchanged':
          return `${formTabSpace(level)}  ${key}: ${formatValue(value, level)}`;

        case 'changed':
          return [`${formTabSpace(level)}+ ${key}: ${formatValue(newValue, level + 2)}`,
            `${formTabSpace(level)}- ${key}: ${formatValue(oldValue, level + 2)}`];

        default:
          throw new Error(`This type - ${type} is not supported`);
      }
    });
    return `{\n${result.join('\n')}\n${formTabSpace(level - 1)}}`;
  };

  return iter(dataArr, 1);
};

export default renderStylish;
