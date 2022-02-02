#! /usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import { exec } from 'child_process';
import ora from 'ora';

const program = new Command();

program
  .name('dalco')
  .description('A swiss army knife of tools.')
  .version('1.0.0');

// https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg
program
  .command('compress')
  .description('Compresses a video to a specific size.')
  .argument('<input>', 'input file')
  .argument('<output>', 'output file')
  .option('-b, --bitrate <MB/s>', 'output file bitrate')
  .option('-c, --crf <CRF>', 'Constant Rate Factor, the higher the more compressed')
  .action((input, output, options) => {
    if (!fs.existsSync(input)) {
      console.log(`${input} does not exist.`);
      return;
    }
    if (fs.existsSync(output)) {
      console.log(`${output} already exists.`);
      return;
    }
    const defaultCRF = 30;
    const setBitrateInfo = `-b:v ${options.bitrate}MB`;
    const setCRFInfo = `-c:v libx264 -crf ${options.crf || defaultCRF}`;
    const sizeInfo = `${options.bitrate ? setBitrateInfo : setCRFInfo}`;
    const spinner = ora({
      text: 'Compressing video...',
      spinner: 'soccerHeader'
    }).start();
    const child = exec(`ffmpeg -i ${input} -loglevel quiet -preset faster ${sizeInfo} ${output}`, (error, stdout, stderr) => {
      if (error) {
        spinner.fail(`${error}`);
        console.log(`stdout: ${stderr}`);
      } else {
        spinner.succeed('Compression complete!');
      }
    });
  });
  
program.parse();