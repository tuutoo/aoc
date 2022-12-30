const util = require('util')
const fs = require('fs');
// const inputFile = 'sample2.txt';
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

function getScenicScore(el, arr) {
  let score = 0
  for (let i = 0; i < arr.length; i++) {
    num = Number(arr[i])
    score += 1
    if (num >= el) {
      break
    }
  }

  return score
}

// walk through the matrix and look right, left, top, bottom
let topScore = 0
for (let i = 0; i < matrix.length; i++) {
  const row = matrix[i];
  for (let j = 0; j < row.length; j++) {
    const col = transposedArr[j]
    const el = Number(row[j])
    const rArr = row.slice(j + 1, row.length)
    const lArr = row.slice(0, j).reverse()
    const tArr = col.slice(0, i).reverse()
    const bArr = col.slice(i + 1, col.length)
    const lScore = getScenicScore(el, lArr)
    const rScore = getScenicScore(el, rArr)
    const tScore = getScenicScore(el, tArr)
    const bScore = getScenicScore(el, bArr)
    // console.log(`(${i},${j})`, el, tArr, lArr, bArr, rArr, row, col)
    // console.log(`(${i},${j})`, el, tScore, lScore, bScore, rScore)
    let score = tScore * lScore * bScore * rScore
    if(score >= topScore) topScore = score
  }
}

// console.log(matrix, transposedArr)

console.log(topScore)