module.exports = function loader(source) {
  let script = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.body.appendChild(style)
  `
  return script
}