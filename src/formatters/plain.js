import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const joinPathParts = (pathParts) => pathParts.join('.');

const renderPlain = (dataArr) => {
  const iter = (data, pathParts) => {
    const result = data.flatMap((el) => {
      const {
        key, value, type, oldValue, newValue, children,
      } = el;
      const pathPartsAcc = pathParts.concat(key);
      switch (type) {
        case 'nested':
          return iter(children, pathPartsAcc);

        case 'added':
          return `Property '${joinPathParts(pathPartsAcc)}' was added with value: ${formatValue(value)}`;

        case 'removed':
          return `Property '${joinPathParts(pathPartsAcc)}' was removed`;

        case 'changed':
          return `Property '${joinPathParts(pathPartsAcc)}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;

        case 'unchanged':
          return [];

        default:
          throw new Error(`This type - ${type} is not supported`);
      }
    });
    return result.join('\n');
  };

  return iter(dataArr, []);
};

export default renderPlain;
