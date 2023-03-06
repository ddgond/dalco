import { Configuration, OpenAIApi} from "openai";
import * as readline from "readline";
import { exec } from "child_process";

const ffmpaid = (program, configData) => {
	program
		.command('ffmpaid')
		.description('Gives you an ffmpeg command that accomplishes the explained task.')
		.argument('<task>', 'task to accomplish')
		.argument('<inputs>', 'input file list')
		.argument('<output>', 'output file')
		.action((task, inputs, output) => {
			const config = new Configuration({
				apiKey: configData.openai,
			});
			if (!config.apiKey) {
				console.error('You must set your OpenAI API key using `dalco config openai <key>` before continuing.');
				return;
			}
			const openai = new OpenAIApi(config);
			const prompt = `Give me a one-line ffmpeg command for the following parameters:\nInputs: ${inputs}\nOutput: ${output}\nTask: ${task}`
			openai.createChatCompletion({
				model: 'gpt-3.5-turbo-0301',
				messages: [
					{
						'role': 'system',
						'content': "I am an ffmpeg command generator."
					},
					{
						'role': 'user',
						'content': prompt
					}
				]
			}).then((completion) => {
				const response = completion.data.choices[0].message.content;
				console.log(response);
				let command;
				const codeBlocks = response.match(/```[\s\S]*?```/g);
				if (!codeBlocks || codeBlocks.length === 0) {
					command = response.trim().split('\n')[0].trim();
				} else {
					command = codeBlocks[0].replace(/```/g, '').trim();
				}
				if (!command || command.length === 0 || !command.startsWith('ffmpeg')) {
					console.error('No command found.');
					return;
				}
				console.log('\nCommand:');
				console.log(command);
				// Prompt user to execute command
				const rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
				rl.question('Execute command? [y/n] ', (answer) => {
					if (answer === 'y') {
						console.log(`Executing command...`);
						exec(command, (err, stdout, stderr) => {
							if (err) {
								console.error(err);
								return;
							}
							console.log(stdout);
							console.error(stderr);
						});
					}
					rl.close();
				});
			}).catch((err) => {
				if (err.response) {
					if (err.response.data.error.code === 'invalid_api_key') {
						console.error(`Invalid API key ${config.apiKey}. You must set your OpenAI API key using \`dalco config openai <key>\` before continuing.`);
					} else {
						console.error(err.response.status);
						console.error(err.response.data);
					}
				} else {
					throw err;
				}
			});
		});
}

export default ffmpaid;