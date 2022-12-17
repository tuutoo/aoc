const fs = require('fs');
const inputFile = 'c2.txt';
// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

const inputFile2 = 's2.txt';
const fileContent2 = fs.readFileSync(inputFile2, 'utf8');

const steps = fileContent2.split('\n');

let craneObj = {}
lines.map((x, index) => {
  craneObj[`${index + 1}`] = x.split(' ').reverse()
})

let reMove = /move (.+) from/;
let reFrom = / from (.+) to /;
let reTo = /to (.+)$/;

let stepsObj = steps.map(x => {
  let obj = {
    move: Number(x.match(reMove)[1]),
    from: x.match(reFrom)[1],
    to: x.match(reTo)[1],
  }

  return obj
})

function arrange(data, steps) {
  steps.map(x => {
    const move = x.move
    const from = x.from
    const to = x.to

    const block = data[from].slice(-move)
    data[to] = data[to].concat(block)
    data[from] = data[from].slice(0, data[from].length - move)

    // console.log(block, data)
  })
}

// console.log(stepsObj)

arrange(craneObj, stepsObj)

let finalStr = ''

Object.keys(craneObj).map(x => {
  finalStr += craneObj[x].slice(-1)
})

console.log(finalStr)
// console.log(craneObj, stepsObj)