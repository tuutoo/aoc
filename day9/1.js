const fs = require('fs');
// const inputFile = 'sample1.txt';
const inputFile = 'input.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

let posA = {
  x: 0,
  y: 0
}

let posB = {
  x: 0,
  y: 0
}

let pathBArr = []

function moveA(row) {
  let [direction, steps] = row.split(' ')
  steps = Number(steps)
  // console.log({direction, steps})

  // R * L = move X, else move Y
  let key = ['R', 'L'].indexOf(direction) >= 0 ? 'x' : 'y'

  // R & U move positive, else move negative
  let move = ['R', 'U'].indexOf(direction) >= 0 ? 1 : -1

  for (let i = 0; i < steps; i++) {
    posA[key] = posA[key] + move
    moveB(key, move)
  }
}

function moveB(key, move) {
  // 在x轴横向移动中
  if (key === 'x') {
    if (Math.abs(posA.x - posB.x) >= 2) {
      posB[key] = posB[key] + move
      posB.y = posA.y
    }
  }

  // 在y轴横向移动中
  if (key === 'y') {
    if (Math.abs(posA.y - posB.y) >= 2) {
      posB[key] = posB[key] + move
      posB.x = posA.x
    }
  }

  // console.log(key, posA, posB)
  pathBArr.push(`${posB.x},${posB.y}`)
}

lines.map(x => {
  moveA(x)
})

pathBArr = [...new Set(pathBArr)]

console.log(pathBArr.length)