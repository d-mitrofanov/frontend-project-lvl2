#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<FirstFile> <SecondFile>')
  .action((firstFile, secondFile) => {
    const result = genDiff(firstFile, secondFile, program.format);
    console.log(result);
  })
  .parse(process.argv);
