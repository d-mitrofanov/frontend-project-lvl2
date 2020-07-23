import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);

const expectedResult1 = `{
   host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;

const expectedResult2 = `{
 + timeout: 50
 - timeout: 20
 - verbose: true
   host: hexlet.io
 + proxy: 123.234.53.22
 + follow: false
}`;

test('gendiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResult1);
});

test('gendiffReversed', () => {
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'))).toEqual(expectedResult2);
});
