// 石头 (A - X)
// 布 (B - Y)
// 剪刀 (C - Z)

let myDic = {
  "X": 1,
  "Y": 2,
  "Z": 3,
}

let scoreDic = {
  "C X": 6,
  "A Y": 6,
  "B Z": 6,
  "A X": 3,
  "B Y": 3,
  "C Z": 3,
}

const fs = require('fs');

const inputFile = 'input.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');

// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

// 处理每一行
let score = 0;
lines.map(x => {
  let gameScore = Number(scoreDic[x]) || 0
  let myScore = Number(myDic[x.at(-1)])
  // console.log([gameScore, myScore])
  score = score + gameScore + myScore
})

console.log(score)
