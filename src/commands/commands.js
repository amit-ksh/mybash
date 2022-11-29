import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(process.cwd());

const isAbsolute = (input) => {
  const re = /(\w:)/ig

  return re.test(input)
}

export function echo(input) {
  process.stdout.write(input.trim('"'));
}

export function exit() {
  process.exit()
}

export function clear() {
  console.clear()
}

export function pwd() {
  process.stdout.write(process.cwd() + '\n')
}

export function cd(path) {
  try {
    process.chdir(path)
  } catch {
    console.log('Invalid Path!!');
  }
}

export function ls(input) {
  let dirName = '.';

  if (!input) dirName = '.'
  else if (isAbsolute(input)) dirName = input
  else dirName = path.join(__dirname + input)

  const files = fs.readdirSync(path.dirname(dirName), (err, files) => {
    if (err) {
      process.stdout.write('Invalid Path!')
      return;
    }
    return files;
  })

  files.forEach(file => {
    console.log(" " + file);
  });
}
