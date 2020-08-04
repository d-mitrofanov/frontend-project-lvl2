import _ from 'lodash';

const getDifference = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  const result = keys.map((key) => {
    const valueBefore = before[key];
    const valueAfter = after[key];

    if (!_.has(before, key) && _.has(after, key)) {
      return { key, type: 'added', value: valueAfter };
    }

    if (_.has(before, key) && !_.has(after, key)) {
      return { key, type: 'removed', value: valueBefore };
    }

    if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
      return { key, type: 'nested', value: getDifference(valueBefore, valueAfter) };
    }

    if (valueBefore !== valueAfter) {
      return {
        key, type: 'changed', oldValue: valueBefore, newValue: valueAfter,
      };
    }

    return { key, type: 'notChanged', value: valueBefore };
  });

  return result;
};

export default getDifference;
