import _ from 'lodash';

/*
level 1 = 1 tab;
level 2 = 3 tabs;
level 3 = 5 tabs;
*/

const tab = '  ';

const turnToString = (element, level) => {
  if (!(_.isObject(element))) {
    return element;
  }

  const entries = Object.entries(element);
  const result = entries.map(([key, value]) => `${tab.repeat(level)}  ${key}: ${turnToString(value)}`);
  return `{\n${result.join('\n')}\n${tab.repeat(level - 1)}}`;
};

const turnToStringChanged = (key, oldV, newV, level) => {
  const result = `${tab.repeat(level)}+ ${key}: ${turnToString(newV, level + 2)}\n${tab.repeat(level)}- ${key}: ${turnToString(oldV, level + 2)}`;
  return result;
};

const renderStylish = (data, level = 1) => {
  const result = data.map((el) => {
    const {
      key, value, type, oldValue, newValue, children,
    } = el;

    switch (type) {
      case 'nested':
        return `${tab.repeat(level)}  ${key}: ${renderStylish(children, level + 2)}`;

      case 'added':
        return `${tab.repeat(level)}+ ${key}: ${turnToString(value, level + 2)}`;

      case 'removed':
        return `${tab.repeat(level)}- ${key}: ${turnToString(value, level + 2)}`;

      case 'notChanged':
        return `${tab.repeat(level)}  ${key}: ${turnToString(value, level)}`;

      case 'changed':
        return turnToStringChanged(key, oldValue, newValue, level);

      default:
        return '';
    }
  });
  return `{\n${result.join('\n')}\n${tab.repeat(level - 1)}}`;
};

export default renderStylish;
