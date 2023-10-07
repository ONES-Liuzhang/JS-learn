const obj = {
  a: 1,
  b: 2
} as const

function t(key: string) {
  obj[key]
  if(key in obj) {
    console.log(obj[key])
  }
}