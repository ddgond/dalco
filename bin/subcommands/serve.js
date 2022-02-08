import { spawn } from 'child_process';

const serve = (program) => {
  program
    .command('serve')
    .description('Runs a file server.')
    .argument('<port>', 'port number')
    .action((port) => {
      spawn(`python3`, ['-m', 'http.server', port], { stdio: 'inherit' });
    });
}

export default serve;