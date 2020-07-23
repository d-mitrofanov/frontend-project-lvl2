#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<FirstFile> <SecondFile>')
  .action((firstFile, secondFile) => {
    const result = genDiff(firstFile, secondFile);
    console.log(result);
  })
  .parse(process.argv);
