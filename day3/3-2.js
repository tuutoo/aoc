const fs = require('fs');
// const inputFile = '3-2.sample.txt';
const inputFile = '3-2.txt';
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

let sum = 0
for (let index = 0; index < lines.length; index = index + 3) {
  const firstHalf = lines[index];
  const secondHalf = lines[index + 1];
  const thirdHalf = lines[index + 2];
  const firstHalfArray = firstHalf.split('');
  const secondHalfArray = secondHalf.split('');
  const thirdHalfArray = thirdHalf.split('');

  const commonCharacters = (firstHalfArray.filter(char => secondHalfArray.includes(char))).filter(char => thirdHalfArray.includes(char));
  // console.log(commonCharacters[0])

  sum += getNumber(commonCharacters[0])
}

console.log(sum)
