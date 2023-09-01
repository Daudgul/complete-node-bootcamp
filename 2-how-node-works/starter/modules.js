// console.log(arguments)
// console.log(require('module').wrapper)

//module.exports
const C = require('./test-modules')
const calc1 = new C();
console.log(calc1.multiply(6,8))

// exports
// const calc2 = require("./text-modules-2")
const { add } = require("./test-modules-2")

console.log(add(9,5))

// Cashing
require("./test-module-3")()
require("./test-module-3")()
require("./test-module-3")()