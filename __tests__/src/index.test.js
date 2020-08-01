import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);

<<<<<<< HEAD
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

test('json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResult1);
});

test('jsonRev', () => {
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'))).toEqual(expectedResult2);
});

test('yml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedResult1);
});

test('ini', () => {
  expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'))).toEqual(expectedResult1);
=======
const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');

const formats = ['json', 'yml', 'ini'];

test('stylish', () => {
  formats.forEach((format) => {
    expect(genDiff(getFixturePath(`before.${format}`), getFixturePath(`after.${format}`), 'stylish')).toEqual(resultStylish);
  });
});

test('plain', () => {
  formats.forEach((format) => {
    expect(genDiff(getFixturePath(`before.${format}`), getFixturePath(`after.${format}`), 'plain')).toEqual(resultPlain);
  });
>>>>>>> 5b737f5... step 8
});
