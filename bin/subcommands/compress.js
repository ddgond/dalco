import fs from 'fs';
import { exec } from 'child_process';
import ora from 'ora';

// https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg

const compress = (program) => {
  program
    .command('compress')
    .description('Compresses a video to a specific size using ffmpeg.')
    .argument('<input>', 'input file')
    .argument('<output>', 'output file')
    .option('-b, --bitrate <MB/s>', 'output file bitrate')
    .option('-c, --crf <CRF>', 'Constant Rate Factor, the higher the more compressed. Default: 30')
    .action((input, output, options) => {
      if (!fs.existsSync(input)) {
        console.error(`${input} does not exist.`);
        return;
      }
      if (fs.existsSync(output)) {
        console.error(`${output} already exists.`);
        return;
      }
      input = input.replace(/"/g, '\\"');
      output = output.replace(/"/g, '\\"');
      const defaultCRF = 30;
      const setBitrateInfo = `-b:v ${options.bitrate}MB`;
      const setCRFInfo = `-c:v libx264 -crf ${options.crf || defaultCRF}`;
      const sizeInfo = `${options.bitrate ? setBitrateInfo : setCRFInfo}`;
      const spinner = ora({
        text: 'Compressing video...',
        spinner: 'soccerHeader'
      }).start();
      exec(`ffmpeg -i "${input}" -loglevel quiet -preset faster ${sizeInfo} "${output}"`, (error, stdout, stderr) => {
        if (error) {
          spinner.fail(`${error}`);
          if (stderr.includes('command not found') || stderr.includes('not recognized')) {
            console.error('Please install ffmpeg from https://ffmpeg.org/download.html before continuing.');
          }
        } else {
          spinner.succeed('Compression complete!');
        }
      });
    });
}

export default compress;