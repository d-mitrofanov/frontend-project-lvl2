import _ from 'lodash';

const convertString = (value) => {
  if (!(_.isObject(value)) && typeof value === 'boolean') {
    return value;
  }

  if (!(_.isObject(value))) {
    return `'${value}'`;
  }
  return '[complex value]';
};

const plain = (data, nextKey = []) => {
  const array = data.map((el) => {
    const {
      key, value, type, oldValue, newValue,
    } = el;
    const accumulator = nextKey.concat(key);
    switch (type) {
      case 'nested':
        return plain(value, accumulator);

      case 'added':
        return `Property '${accumulator.join('.')}' was added with value: ${convertString(value)}`;

      case 'removed':
        return `Property '${accumulator.join('.')}' was removed`;

      case 'changed':
        return `Property '${accumulator.join('.')}' was updated. From ${convertString(oldValue)} to ${convertString(newValue)}`;

      default:
        return '';
    }
  });
  const result = array.filter((x) => x.length !== 0);
  return `${result.join('\n')}`;
};

export default plain;
