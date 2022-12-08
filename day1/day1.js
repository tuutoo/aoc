var fs = require('fs');

function add(accumulator, a) {
  return accumulator + a;
}

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log(err)
  }
  else {
    let arr = data.toString().split('\r\n\r\n')
    // console.log(arr)
    let newArr = arr.map((x, index) => {
      let row = x.split('\r\n').map(i => Number(i))
      return {
        index,
        data: row,
        rawData: x,
        total: row.reduce(add, 0)
      }
    })
    let sorted = newArr.sort((a,b) => b.total - a.total)
    console.log(sorted[0].total + sorted[1].total + sorted[2].total)
  }
})

