import fs from 'fs';
import process from 'process';
import path from 'path';
import parse from './parser.js';
import chooseFormatter from './formatters/index.js';
import getDifference from './getDifference.js';

const genDiff = (firstFilePath, secondFilePath, format) => {
  const fileData1 = fs.readFileSync(path.resolve(process.cwd(), firstFilePath), 'utf-8');
  const fileData2 = fs.readFileSync(path.resolve(process.cwd(), secondFilePath), 'utf-8');

  const fileExt = path.extname(firstFilePath).slice(1);

  const data1 = parse(fileData1, fileExt);
  const data2 = parse(fileData2, fileExt);

  const difference = getDifference(data1, data2);
  return chooseFormatter(difference, format);
};

export default genDiff;
