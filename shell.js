import chalk from 'chalk';
import process from 'process';
import { showPath } from './src/commands/commands.js';

import runner from './src/commands/index.js'

// process.chdir(process.env.HOME);
process.chdir('D:\\personal\\assignment\\mybash')
showPath()

// the stdin 'data' event triggers after a user types in a line
process.stdin.on('data', async (userInput) => {
    userInput = userInput.toString().trim();
    runner(userInput);
    showPath()
}); 

process.on('exit', () => {
    const goodbye = chalk.bold(chalk.green('\nBye Bye!! 👋'))
    console.log(goodbye);
});

