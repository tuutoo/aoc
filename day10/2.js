const util = require('util')
const fs = require('fs');
// const inputFile = 'sample1.txt';
const inputFile = 'input.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

let result = {}
let x = 1
let cycle = 1
lines.map((row, i) => {
  let [command, number] = row.split(' ')
  let v = Number(number) === NaN ? 0 : Number(number)
  let round = 1

  if (command === 'addx') {
    round = 2
  }

  for (let index = 0; index < round; index++) {
    let obj = {
      row,
      i: cycle,
      c: i + 1,
      x,
      index: index + 1,
      total: cycle * x
    }

    result[cycle] = obj
    cycle += 1

    if (command === 'addx' && index === 1) {
      x += v
    }
  }

})
let line = ''
for (let i = 1; i <= Object.keys(result).length; i++) {
  let ele = result[i]
  let column = i % 40 === 0 ? 40 : i % 40

  let pixel =  (column >= ele.x && column < ele.x+3) ? '#' : '.'

  line = line + pixel

  if (i % 40 === 0) {
    console.log(line)
    line = ''
  }
  else {

  }
}

// console.log(result)

// console.log(util.inspect(result['20']) + util.inspect(result['60']) + util.inspect(result['100']) + util.inspect(result['140']) + util.inspect(result['180']) + util.inspect(result['220']))
// console.log(result['20'].total + result['60'].total + result['100'].total + result['140'].total + result['180'].total + result['220'].total)
