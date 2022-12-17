// 石头 (A - X)
// 布 (B - Y)
// 剪刀 (C - Z)

// X - Lose
// Y - Draw
// Z - Win

let strategyDic = {
  "A X": "A Z",
  "A Y": "A X",
  "A Z": "A Y",
  "B X": "B X",
  "B Y": "B Y",
  "B Z": "B Z",
  "C X": "C Y",
  "C Y": "C Z",
  "C Z": "C X",
}

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

const inputFile = 'input2.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');

// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

// 处理每一行
let score = 0;
lines.map(x => {
  let realX = strategyDic[x]
  let gameScore = Number(scoreDic[realX]) || 0
  let myScore = Number(myDic[realX.at(-1)])
  // console.log([gameScore, myScore])
  score = score + gameScore + myScore
})

console.log(score)
