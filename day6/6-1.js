const fs = require('fs');
const inputFile = '6-1.sample.txt';
// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

let charPassed = 0
function getMarker(str) {
  for (let i = 0; i < str.length - 3; i++) {
    let j = i + 4
    const slice = str.slice(i, j)
    const isDup = /(.+)(?=.*\1)/.test(slice)
    // console.log(slice, isDup)
    if (!isDup) {
      break;
    }
    else {
      charPassed = i + 5
    }
  }
}

lines.map(x => {
  getMarker(x)
})

console.log(charPassed)