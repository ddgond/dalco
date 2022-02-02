#! /usr/bin/env node

import { Command } from 'commander';
import compress from './subcommands/compress.js';
import update from './subcommands/update.js';

const program = new Command();

program
  .name('dalco')
  .description('A swiss army knife of tools.')
  .version('1.1.5', '-v, --version');
  
compress(program);
update(program);
  
program.parse();