#! /usr/bin/env node

import { Command } from 'commander';
import compress from './subcommands/compress.js';
import generateSpell from './subcommands/generateSpell.js';
import serve from './subcommands/serve.js';
import update from './subcommands/update.js';

const program = new Command();

program
  .name('dalco')
  .description('A swiss army knife of tools.')
  .version('1.3.0', '-v, --version');
  
compress(program);
generateSpell(program);
serve(program);
update(program);

program.parse();