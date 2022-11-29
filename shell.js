import chalk from 'chalk';
import process from 'process';

import runner from './src/commands/index.js'

// process.chdir(process.env.HOME);
process.chdir('D:\\personal\\assignment\\mybash')
process.stdout.write(chalk.cyan(process.cwd() + '$') + ' ');

// the stdin 'data' event triggers after a user types in a line
process.stdin.on('data', (userInput) => {
    userInput = userInput.toString().trim();
    runner(userInput);
    process.stdout.write(chalk.cyanBright(`\n${process.cwd()}$ `));
}); 

process.on('exit', () => {
    const goodbye = chalk.bold(chalk.green('Bye Bye!! 👋'))
    console.log(goodbye);
});

