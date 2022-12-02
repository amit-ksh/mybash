import process from 'process'
import { isExecutable } from '../helpers.js';
import { echo, pwd, ls, clear, cd, exit, executeBinary, listProcesses, showPath } from './commands.js';

function runner(userInput) {
  if (isExecutable(userInput)) {
    const [exe, args] = userInput.split(".exe ")
    // append the empty string if no args is passed
    executeBinary([exe, args || ''])
    return;
  }
  
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
    
    case "ps":
      commandLibrary.ps()
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

  showPath()
}

const commandLibrary = { 
  "echo": echo,
  "exit": exit,
  "clear": clear,
  "cls": clear,
  "pwd": pwd,
  "ps": listProcesses,
  "cd": cd,
  "ls": ls,
};

export default runner