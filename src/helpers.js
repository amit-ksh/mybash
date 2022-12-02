export const isPathAbsolute = (input) => {
  const re = /(\w:)/ig

  return re.test(input)
}

export const isExecutable = (input) => {
  console.log(input);
  if (input.includes('.exe'))
    return true
  return false
}