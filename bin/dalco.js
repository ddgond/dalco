#! /usr/bin/env node

import { Command } from 'commander';
import compress from './subcommands/compress.js';

const program = new Command();

program
  .name('dalco')
  .description('A swiss army knife of tools.')
  .version('1.0.4');
  
compress(program);
  
program.parse();