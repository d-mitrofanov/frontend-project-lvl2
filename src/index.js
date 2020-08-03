import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import chooseParser from './parser.js';
import chooseFormatter from './formatters/index.js';

const getDifference = (before, after) => {
  // removed added changed notChanged nested
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

const genDiff = (firstFilePath, secondFilePath, format) => {
  const fileData1 = fs.readFileSync(path.resolve(process.cwd(), firstFilePath), 'utf-8');
  const fileData2 = fs.readFileSync(path.resolve(process.cwd(), secondFilePath), 'utf-8');

  const fileExt = path.extname(firstFilePath);

  const data1 = chooseParser(fileExt, fileData1);
  const data2 = chooseParser(fileExt, fileData2);

  const difference = getDifference(data1, data2);
  return chooseFormatter(difference, format);
};

export default genDiff;
