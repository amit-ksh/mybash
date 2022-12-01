export const isPathAbsolute = (input) => {
  const re = /(\w:)/ig

  return re.test(input)
}

export const isExecutable = (input) => {
  if (input.split('.').at(-1) === 'exe')
    return true
  return false
}