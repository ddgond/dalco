import {configPath} from "../dalco.js";
import fs from "fs";

const config = (program, config) => {
	program
		.command('config')
		.description('Configure dalco.')
		.argument('<key>', 'key to configure')
		.argument('<value>', 'value to set')
		.action((key, value) => {
			config[key] = value;
			fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
			console.log(`Set \`${key}\` value.`);
		});
};

export default config;