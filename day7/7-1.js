const util = require('util')
const fs = require('fs');
// const inputFile = '7-1.sample.txt';
const inputFile = '7-1.input.txt';

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');


let dataArr = []

let parentPath = ''
lines.map(x => {
  // console.log(x)
  row = {
    path: '',
    parentPath: '',
    name: '',
    prop: '',
    size: ''
  }

  if (x.startsWith("$ cd ")) {
    let path = x.split('$ cd ')[1]
    if (path === '/') {
      parentPath = '/'

      row.path = '/'
      row.parentPath = null
      row.name = '/'
      row.prop = 'd'
      row.size = null
      dataArr.push(row)
    }
    else if (path !== '..') {
      path = parentPath === '/' ? path : `/${path}`
      parentPath += path
    }
    else {
      parentPath = (/\/.*(?=\/{1})/).test(parentPath) ? parentPath.match(/\/.*(?=\/{1})/)[0] : '/'
    }

    // console.log(`parentPath is ${parentPath}`)
  }
  else if (!x.startsWith("$ ")) {
    let obj = x.split(' ')
    let prefix = obj[0]
    let suffix = obj[1]

    row.path = parentPath === '/' ? (parentPath + suffix) : (parentPath + '/' + suffix)
    row.parentPath = parentPath
    row.name = suffix
    row.prop = prefix === 'dir' ? 'd' : 'f'
    row.size = row.prop === 'd' ? null : Number(prefix)
    dataArr.push(row)
  }
})

console.table(dataArr)

function getSize(path){
  sizeArr = dataArr.filter(x => x.parentPath === path)
  let sum = 0
  sizeArr.map(s => {
    if(s.size) {
      sum += s.size
    }
    else {
      sum += getSize(s.path)
    }
  })
  return sum
}

let folderArr = dataArr.filter(x => x.prop === 'd')
let sizeSum = 0

folderArr.map(d => {
  let size = getSize(d.path)
  if(size <= 100000) sizeSum += size
})

console.log('sizeSum: ', sizeSum)