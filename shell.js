import chalk from 'chalk';
import process from 'process';
import { showPath } from './src/commands.js';

import runner from './src/runner.js'
import emitter from './src/emitter.js';

process.chdir(process.env.HOME);
showPath()

// the stdin 'data' event triggers after a user types in a line
process.stdin.on('data', async (userInput) => {
    if (process.stdin.isPaused()) return;

    process.stdin.pause();
    userInput = userInput.toString().trim();
    runner(userInput);
    process.stdin.resume();
}); 

process.on('exit', () => {
    const goodbye = chalk.bold(chalk.green('\nBye Bye!! 👋'))
    console.log(goodbye);
});

process.on('SIGINT', () => {
    if (emitter.emit('terminate')) 
        return;
    else 
        process.exit(process.pid)
})

process.on('uncaughtException', (err) => {
    console.error(err.message);
})