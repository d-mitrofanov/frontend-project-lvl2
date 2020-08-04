import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const inputFormats = ['json', 'yml', 'ini'];
const outputFormats = ['stylish', 'plain', 'json'];

const getInputPath = (formats) => formats.map((format) => [
  getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`),
]);

const getResult = (format) => {
  const pathToFile = getFixturePath(`result${format.charAt(0).toUpperCase() + format.slice(1)}.txt`);
  return fs.readFileSync(pathToFile, 'utf-8');
};

// let cases;

// beforeEach(() => {
//   cases = getInputPath(inputFormats);
// });

test.each(getInputPath(inputFormats))('allFormats', (filePath1, filePath2) => {
  outputFormats.forEach((format) => {
    expect(genDiff(filePath1, filePath2, format)).toEqual(getResult(format));
  });
});
