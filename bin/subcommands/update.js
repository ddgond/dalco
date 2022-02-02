import { exec } from 'child_process';
import ora from 'ora';

const update = (program) => {
  program
    .command('update')
    .description('Updates dalco to the latest version.')
    .action(() => {
      const spinner = ora({
        text: 'Updating dalco...',
        spinner: 'soccerHeader'
      }).start();
      const child = exec('npm i -g https://github.com/ddgond/dalco', (error, stdout, stderr) => {
        if (error) {
          spinner.fail(`${error}`);
        } else {
          spinner.succeed('Update complete!');
        }
      });
    });
}

export default update;