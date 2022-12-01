import chalk from 'chalk';
import { fork, spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import process from 'process';

import { isPathAbsolute } from '../helpers.js';

const __dirname = path.dirname(process.cwd());

export const showPath = () => {
  process.stdout.write(chalk.cyanBright(`\n${process.cwd()}$ `));
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
  else if (isPathAbsolute(input)) dirName = input
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

export async function executeBinary(inputArray) {
  const exe = inputArray[0];
  const args = inputArray.slice(1);

  const controller = new AbortController();
  const { signal } = controller;
  
  const child = spawn(exe, args, { signal });
  console.info("Process Running with PID: ", child?.pid)

  let gotFirstLog = false
  child.stdout.on('data', (data) => {
    if (!gotFirstLog) {
      gotFirstLog = true;
      process.stdout.write('\n')
    }
    process.stdout.write(data)
  })

  child.stdout.on('error', (err) => {
    if (!gotFirstLog) {
      gotFirstLog = true;
      process.stdout.write('\n')
    }
    process.stdout.write('\n')
    process.stdout.write(err)
  })

  child.stdout.on('close', () => {
    showPath()
  })
}

export function listProcesses() {
  const ps = spawnSync('ps')

  for (const out of ps.output) {
    if (!out) continue;
    process.stdout.write(out)
  }
}