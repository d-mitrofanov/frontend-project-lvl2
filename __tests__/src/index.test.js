import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const resultJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');

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
});

test('json', () => {
  formats.forEach((format) => {
    expect(genDiff(getFixturePath(`before.${format}`), getFixturePath(`after.${format}`), 'json')).toEqual(resultJson);
  });
});
