import Promise from "./PromiseA.js";

const p = new Promise((resolve, reject) => {
  resolve(true)
}).then(d => {
  console.log(d)
})
console.log(p)