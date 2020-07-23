import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const getDifference = (before, after) => {
  const difference = _.reduce(before, (acc, value, key) => {
    if (_.has(after, key)) {
      if (value !== after[key]) {
        acc.push(`+ ${key}: ${after[key]}\n - ${key}: ${value}`);
      } else {
        acc.push(`  ${key}: ${value}`);
      }
    } else {
      acc.push(`- ${key}: ${value}`);
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
  const data1 = JSON.parse(fileData1);
  const data2 = JSON.parse(fileData2);
  return `{\n ${getDifference(data1, data2)}\n}`;
};

export default genDiff;
