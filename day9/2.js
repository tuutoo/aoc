const fs = require('fs');
// const inputFile = 'sample1.txt';
// const inputFile = 'sample2.txt';
const inputFile = 'input.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

let nodes = []
let pathArr = {}
for (let i = 0; i < 10; i++) {
  nodes.push(
    {
      x: 0,
      y: 0,
      oldPos: {
        x: 0,
        y: 0
      },
      key: '',
      move: {
        x: 0,
        y: 0
      }
    }
  )
  pathArr[i] = []
}

function moveA(row) {
  let [direction, steps] = row.split(' ')
  steps = Number(steps)

  // R * L = move X, else move Y
  let key = ['R', 'L'].indexOf(direction) >= 0 ? 'x' : 'y'

  // R & U move positive, else move negative
  let move = ['R', 'U'].indexOf(direction) >= 0 ? 1 : -1

  for (let i = 0; i < steps; i++) {
    nodes[0].oldPos.x = nodes[0].x
    nodes[0].oldPos.y = nodes[0].y

    nodes[0][key] = nodes[0][key] + move
    nodes[0].move.x = 0
    nodes[0].move.y = 0
    nodes[0].move[key] = move

    pathArr[0].push(`${nodes[0].x},${nodes[0].y}`)
    let xy1 = `${nodes[0].x},${nodes[0].y}`
    if(!pathArr[0].includes(xy1)) pathArr[0].push(xy1)
    // moveNextNode(nodes[0], nodes[1])
    // pathArr.push(`${nodes[1].x},${nodes[1].y}`)

    for (let j = 0; j < 9; j++) {
      moveNextNode(nodes[j], nodes[j+1], `${direction}${i}`, j+1)

      let xy = `${nodes[`${j+1}`].x},${nodes[`${j+1}`].y}`
      if(!pathArr[`${j+1}`].includes(xy)) pathArr[`${j+1}`].push(xy)
    }

    // // console.log(row)
    // // 打印出每一步运行完成时, 每个节点的旧位置和当前位置
    // Object.keys(nodes).map(n => {
    //   console.log(`${direction}${i} node${n}:(${nodes[n].oldPos.x},${nodes[n].oldPos.y}) -> (${nodes[n].x},${nodes[n].y})`)
    // })
  }

  // console.log(row)
  // Object.keys(nodes).map(i => {
  //   console.log(`${i}: (${nodes[i].oldPos.x},${nodes[i].oldPos.y}) -> (${nodes[i].x},${nodes[i].y})`)
  // })
}

function moveNextNode(prevNode, nextNode, row, node) {
  nextNode.oldPos.x = nextNode.x
  nextNode.oldPos.y = nextNode.y

  // 在x轴横向移动中
  if (prevNode.move.x !== 0) {
    if (Math.abs(prevNode.x - nextNode.oldPos.x) >= 2) {
      nextNode.x = prevNode.x - prevNode.move.x
      nextNode.y = prevNode.y
    }
  }

  // 在y轴横向移动中
  if (prevNode.move.y !== 0) {
    if (Math.abs(prevNode.y - nextNode.oldPos.y) >= 2) {
      nextNode.x = prevNode.x
      nextNode.y = prevNode.y - prevNode.move.y
    }
  }

  // 斜向移动
  if (Math.abs(prevNode.x - nextNode.oldPos.x) >= 2 && Math.abs(prevNode.y - nextNode.oldPos.y) >= 2) {
    nextNode.x = prevNode.oldPos.x
    nextNode.y = prevNode.oldPos.y
  }

  nextNode.move.x = nextNode.x - nextNode.oldPos.x
  nextNode.move.y = nextNode.y - nextNode.oldPos.y
  // if(row === 'U3' && node === 5) console.log(`(${prevNode.oldPos.x},${prevNode.oldPos.y}) -> (${prevNode.x},${prevNode.y})`, `(${prevNode.move.x},${prevNode.move.y})`, `(${nextNode.oldPos.x},${nextNode.oldPos.y}) -> (${nextNode.x},${nextNode.y})`)
}

lines.map(x => {
  moveA(x)
})

console.log(pathArr[9].length, pathArr[9])