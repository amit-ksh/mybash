import process from 'process'
import { echo, pwd, ls, clear, cd, exit } from './commands.js';

function runner(userInput){
  // parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0]; 
    
  switch (command) {
    case "echo":
        commandLibrary.echo(userInputArray.slice(1).join(" "));
        break;
    
    case "exit":
      commandLibrary.exit()
      break;
    
    case "clear":
      commandLibrary.clear()
      break;
    
    case "pwd":
        commandLibrary.pwd()
        break;
    
    case "cd":
      if (userInputArray.length === 2) 
        commandLibrary.cd(userInputArray[1])
      break;
    
    case "ls":
      commandLibrary.ls(userInputArray[1] || '')
      break;

    default: 
        process.stdout.write('Typed command is not accurate');
    }
}

const commandLibrary = { 
  "echo": echo,
  "exit": exit,
  "clear": clear,
  "cls": clear,
  "pwd": pwd,
  "cd": cd,
  "ls": ls,
};

export default runner