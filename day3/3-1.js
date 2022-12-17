const fs = require('fs');
const inputFile = '3-1.txt';
// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8');
// 将文件内容按行分割成数组
const lines = fileContent.split('\n');

const regex = new RegExp('[a-z]');

function getNumber(code) {
  if (regex.test(code)) {
    return code.charCodeAt() - 96
  } else {
    return code.charCodeAt() - 38
  }
}

let sum = 0;
lines.map(x => {
  const firstHalf = x.substring(0, x.length / 2);
  const secondHalf = x.substring(x.length / 2, x.length);
  const firstHalfArray = firstHalf.split('');
  const secondHalfArray = secondHalf.split('');

  const commonCharacters = firstHalfArray.filter(char => secondHalfArray.includes(char));
  let priority = getNumber(commonCharacters[0]);
  // console.log(commonCharacters[0], getNumber(commonCharacters[0]))
  sum += priority
})

console.log(sum)