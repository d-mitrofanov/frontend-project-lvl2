#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .description('Find difference between files')
  .parse(process.argv);
