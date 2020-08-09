import fs from 'fs';
import process from 'process';
import path from 'path';
import parse from './parsers.js';
import render from './formatters/index.js';
import getDifference from './getDifference.js';

const getFileData = (filePath) => path.resolve(process.cwd(), filePath);
const getFormatName = (filePath) => path.extname(filePath).slice(1);

const genDiff = (firstFilePath, secondFilePath, format) => {
  const fileData1 = fs.readFileSync(getFileData(firstFilePath), 'utf-8');
  const fileData2 = fs.readFileSync(getFileData(secondFilePath), 'utf-8');

  const formatName1 = getFormatName(firstFilePath);
  const formatName2 = getFormatName(secondFilePath);

  const data1 = parse(fileData1, formatName1);
  const data2 = parse(fileData2, formatName2);

  const difference = getDifference(data1, data2);
  return render(difference, format);
};

export default genDiff;
