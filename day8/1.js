const util = require('util')
const fs = require('fs');
// const inputFile = 'sample.txt';
const inputFile = 'input.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

function transpose(array) {
  return array[0].map((col, i) => array.map(row => row[i]));
}

let matrix = []
lines.map(x => {
  matrix.push(x.split(''))
})

let transposedArr = transpose(matrix)

let rowCount = matrix.length
let colCount = transposedArr.length

let pos = {}

// scan horizontal
for (let i = 0; i < matrix.length; i++) {
  const row = matrix[i];
  let leftMax = -1
  let rightMax = -1

  for (let j = 0; j < row.length; j++) {
    // scan left -> right
    const el_1 = Number(row[j])

    if(el_1 > leftMax) {
      pos[`${i}','${j}`] = el_1
      leftMax = el_1
    }

    if (i === 0 || j === 0 || i === colCount - 1 || j === rowCount - 1) {
      pos[`${i}','${j}`] = el_1
    }

    // scan right -> left
    let j2 = row.length -1 - j
    const el_2 = Number(row[j2])

    if(el_2 > rightMax) {
      pos[`${i}','${j2}`] = el_2
      rightMax = el_2
    }
  }
}

// scan vertical
for (let i = 0; i < transposedArr.length; i++) {
  const row = transposedArr[i];
  let leftMax = -1
  let rightMax = -1

  for (let j = 0; j < row.length; j++) {
    // scan top -> bottom
    const el_1 = Number(row[j])

    if(el_1 > leftMax) {
      pos[`${j}','${i}`] = el_1
      leftMax = el_1
    }

    if (i === 0 || j === 0 || i === rowCount - 1 || j === colCount - 1) {
      pos[`${j}','${i}`] = el_1
    }

    // scan bottom -> top
    let j2 = row.length -1 - j
    const el_2 = Number(row[j2])

    if(el_2 > rightMax) {
      pos[`${j2}','${i}`] = el_2
      rightMax = el_2
    }
  }
}

// console.log(matrix)
// console.log(transposedArr)
console.log(pos, Object.keys(pos).length)