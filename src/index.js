import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import chooseParser from './parser.js';

const getDifference = (before, after) => {
  const difference = _.reduce(before, (acc, value, key) => {
    if (!_.has(after, key)) {
      acc.push(`- ${key}: ${value}`);
    } else if (value !== after[key]) {
      acc.push(`+ ${key}: ${after[key]}\n - ${key}: ${value}`);
    } else {
      acc.push(`  ${key}: ${value}`);
    }

    return acc;
  }, []);

  const afterDifference = _.reduce(after, (acc, value, key) => {
    if (!_.has(before, key)) {
      acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, difference);

  return afterDifference.join('\n ');
};

const genDiff = (firstFilePath, secondFilePath) => {
  const fileData1 = fs.readFileSync(path.resolve(process.cwd(), firstFilePath), 'utf-8');
  const fileData2 = fs.readFileSync(path.resolve(process.cwd(), secondFilePath), 'utf-8');

  const fileExt = path.extname(firstFilePath);

  const data1 = chooseParser(fileExt, fileData1);
  const data2 = chooseParser(fileExt, fileData2);

  return `{\n ${getDifference(data1, data2)}\n}`;
};

export default genDiff;
