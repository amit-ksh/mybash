var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// shell.js
var import_chalk2 = __toESM(require("chalk"), 1);
var import_process3 = __toESM(require("process"), 1);

// src/commands/commands.js
var import_chalk = __toESM(require("chalk"), 1);
var import_child_process = require("child_process");
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_process = __toESM(require("process"), 1);

// src/helpers.js
var isPathAbsolute = (input) => {
  const re = /(\w:)/ig;
  return re.test(input);
};
var isExecutable = (input) => {
  if (input.split(".").at(-1) === "exe")
    return true;
  return false;
};

// src/commands/commands.js
var __dirname = import_path.default.dirname(import_process.default.cwd());
var showPath = () => {
  import_process.default.stdout.write(import_chalk.default.cyanBright(`
${import_process.default.cwd()}$ `));
};
function echo(input) {
  import_process.default.stdout.write(input.trim('"'));
}
function exit() {
  import_process.default.exit();
}
function clear() {
  console.clear();
}
function pwd() {
  import_process.default.stdout.write(import_process.default.cwd() + "\n");
}
function cd(path2) {
  try {
    import_process.default.chdir(path2);
  } catch {
    console.log("Invalid Path!!");
  }
}
function ls(input) {
  let dirName = ".";
  if (!input)
    dirName = ".";
  else if (isPathAbsolute(input))
    dirName = input;
  else
    dirName = import_path.default.join(__dirname + input);
  const files = import_fs.default.readdirSync(import_path.default.dirname(dirName), (err, files2) => {
    if (err) {
      import_process.default.stdout.write("Invalid Path!");
      return;
    }
    return files2;
  });
  files.forEach((file) => {
    console.log(" " + file);
  });
}
async function executeBinary(inputArray) {
  const exe = inputArray[0];
  const args = inputArray.slice(1);
  const child = (0, import_child_process.spawnSync)(exe, args);
  console.info("Process Running with PID: ", child == null ? void 0 : child.pid);
  if (child.error) {
    console.error(child.error);
  }
  if (child.output) {
    for (const out of child.output) {
      if (!out)
        continue;
      import_process.default.stdout.write(out + "\n");
    }
  }
}
function listProcesses() {
  const ps = (0, import_child_process.spawnSync)("ps");
  for (const out of ps.output) {
    if (!out)
      continue;
    import_process.default.stdout.write(out);
  }
}

// src/commands/index.js
var import_process2 = __toESM(require("process"), 1);
function runner(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];
  if (isExecutable(command)) {
    executeBinary(userInputArray);
    return;
  }
  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "exit":
      commandLibrary.exit();
      break;
    case "clear":
      commandLibrary.clear();
      break;
    case "pwd":
      commandLibrary.pwd();
      break;
    case "ps":
      commandLibrary.ps();
      break;
    case "cd":
      if (userInputArray.length === 2)
        commandLibrary.cd(userInputArray[1]);
      break;
    case "ls":
      commandLibrary.ls(userInputArray[1] || "");
      break;
    default:
      import_process2.default.stdout.write("Typed command is not accurate");
  }
}
var commandLibrary = {
  "echo": echo,
  "exit": exit,
  "clear": clear,
  "cls": clear,
  "pwd": pwd,
  "ps": listProcesses,
  "cd": cd,
  "ls": ls
};
var commands_default = runner;

// shell.js
import_process3.default.chdir("D:\\personal\\assignment\\mybash");
showPath();
import_process3.default.stdin.on("data", async (userInput) => {
  userInput = userInput.toString().trim();
  commands_default(userInput);
  showPath();
});
import_process3.default.on("exit", () => {
  const goodbye = import_chalk2.default.bold(import_chalk2.default.green("\nBye Bye!! \u{1F44B}"));
  console.log(goodbye);
});
