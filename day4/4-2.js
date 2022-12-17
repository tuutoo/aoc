const fs = require('fs');
// const inputFile = '4-2.sample.txt';
const inputFile = '4-2.txt';
// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

function isOverlap (str) {
  const arr = str.split(',')
  const left = arr[0]
  const right = arr[1]

  const pair1 = left.split('-')
  const s1 = Number(pair1[0])
  const e1 = Number(pair1[1])

  const pair2 = right.split('-')
  const s2 = Number(pair2[0])
  const e2 = Number(pair2[1])

  // console.log(pair1, pair2)

  if (e1 >= s2 && e1 <= e2) {
    return true
  }
  else if (e2 >= s1 && e2 <= e1) {
    return true
  }
  else {
    return false
  }
}

let sum = 0
lines.map(x => {
  if(isOverlap(x)) sum += 1
})

console.log(sum)