#! /usr/bin/env node
import os from 'os';
import Path from 'path';
import fs from "fs";

const home = os.homedir();
export const configPath = Path.join(home, '.dalco.json');
if (!fs.existsSync(configPath)) {
	fs.writeFileSync(configPath, '{}');
}
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

import { Command } from 'commander';
import compress from './subcommands/compress.js';
import config from './subcommands/config.js';
import ffmpaid from './subcommands/ffmpaid.js';
import generateSpell from './subcommands/generateSpell.js';
import serve from './subcommands/serve.js';
import update from './subcommands/update.js';

const program = new Command();

program
  .name('dalco')
  .description('A swiss army knife of tools.')
  .version('1.4.0', '-v, --version');
  
compress(program);
config(program, configData);
ffmpaid(program, configData);
generateSpell(program);
serve(program);
update(program);

program.parse();