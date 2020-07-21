import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const getDifference = (before, after) => {
  const difference = _.reduce(before, (acc, value, key) => {
    if (_.has(after, key)) {
      if (value !== after[key]) {
        // console.log(`+ ${key}: ${after[key]} \n- ${key}: ${value}`);
        acc.push(`+ ${key}: ${after[key]} \n - ${key}: ${value}`);
      } else {
        // console.log(`  ${key}: ${value}`);
        acc.push(`  ${key}: ${value}`);
      }
    } else {
      // console.log(`- ${key}: ${value}`);
      acc.push(`- ${key}: ${value}`);
    }
    return acc;
  }, []);

  const afterDifference = _.reduce(after, (acc, value, key) => {
    if (!_.has(before, key)) {
      // console.log(`+ ${key}: ${value}`);
      acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, difference);

  // `{\n${afterDifference.join('\n')}\n}`
  return afterDifference.join('\n ');
};

const genDiff = (firstFilePath, secondFilePath) => {
  const fileData1 = fs.readFileSync(path.resolve(process.cwd(), firstFilePath), 'utf-8');
  const fileData2 = fs.readFileSync(path.resolve(process.cwd(), secondFilePath), 'utf-8');
  const data1 = JSON.parse(fileData1);
  const data2 = JSON.parse(fileData2);
  return getDifference(data1, data2);
};

export default genDiff;
