import fs from 'fs';
import process from 'process';
import path from 'path';
import parse from './parsers.js';
import render from './formatters/index.js';
import getDifference from './getDifference.js';

const genDiff = (firstFilePath, secondFilePath, format) => {
  const fileData1 = fs.readFileSync(path.resolve(process.cwd(), firstFilePath), 'utf-8');
  const fileData2 = fs.readFileSync(path.resolve(process.cwd(), secondFilePath), 'utf-8');

  const formatName1 = path.extname(firstFilePath).slice(1);
  const formatName2 = path.extname(secondFilePath).slice(1);

  const data1 = parse(fileData1, formatName1);
  const data2 = parse(fileData2, formatName2);

  const difference = getDifference(data1, data2);
  return render(difference, format);
};

export default genDiff;
