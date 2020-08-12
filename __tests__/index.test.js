/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */

import { test, expect, beforeEach } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const inputFormats = ['json', 'yml', 'ini'];

let resultStylish;
let resultPlain;
let resultJson;

beforeEach(() => {
  resultStylish = readFixture('resultStylish.txt');
  resultPlain = readFixture('resultPlain.txt');
  resultJson = readFixture('resultJson.txt');
});

test.each(inputFormats)('genDiff for %s input format', (format) => {
  const file1 = getFixturePath(`file1.${format}`);
  const file2 = getFixturePath(`file2.${format}`);
  expect(genDiff(file1, file2, 'stylish')).toEqual(resultStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(resultPlain);
  expect(genDiff(file1, file2, 'json')).toEqual(resultJson);
});
