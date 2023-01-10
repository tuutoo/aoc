import * as fs from 'fs'
import { threadId } from 'worker_threads'

const inputFile: string = 'input.txt'

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8')
// 将文件内容按行分割成数组
const lines = fileContent.split('\n')

let sharedBucket = [
  [56, 52, 58, 96, 70, 75, 72]
  ,[75, 58, 86, 80, 55, 81]
  ,[73, 68, 73, 90]
  ,[72, 89, 55, 51, 59]
  ,[76, 76, 91]
  ,[88]
  ,[64, 63, 56, 50, 77, 55, 55, 86]
  ,[79, 58]
]
let itemInspected = [0 ,0 ,0 ,0, 0 ,0 ,0 ,0]

abstract class Monkey {
  id: number = -1
  startingItems: number[] = []
  newItems: number[] = []
  worriedItems: number[] = []
  testResults: boolean[] = []
  throwTo: number[] = []

  constructor() {}

  abstract operation(): void
  abstract test(): void

  throw() {
    this.worriedItems.map((item, index) => {
      sharedBucket[this.throwTo[index]].push(item)
      sharedBucket[this.id].pop()
      itemInspected[this.id] += 1
    })
  }

  clean() {
    this.startingItems = []
    this.newItems = []
    this.worriedItems = []
    this.testResults = []
    this.throwTo = []
  }

  play() {
    console.log(`playing ${this.id}`)
    this.operation()
    this.test()
    this.throw()
    this.clean()
  }
}

class Monkey0 extends Monkey {
  constructor() {
    super()
    this.id = 0
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x * 17)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 11 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 2 : 3)
  }
}

class Monkey1 extends Monkey {
  constructor() {
    super()
    this.id = 1
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 7)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 3 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 6 : 5)
  }
}

class Monkey2 extends Monkey {
  constructor() {
    super()
    this.id = 2
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x * x)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 5 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 1 : 7)
  }
}

class Monkey3 extends Monkey {
  constructor() {
    super()
    this.id = 3
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 1)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 7 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 2 : 7)
  }
}

class Monkey4 extends Monkey {
  constructor() {
    super()
    this.id = 4
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x * 3)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 19 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 0 : 3)
  }
}

class Monkey5 extends Monkey {
  constructor() {
    super()
    this.id = 5
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 4)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 2 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 6 : 4)
  }
}

class Monkey6 extends Monkey {
  constructor() {
    super()
    this.id = 6
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 8)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 13 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 4 : 0)
  }
}

class Monkey7 extends Monkey {
  constructor() {
    super()
    this.id = 7
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 6)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 17 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 1 : 5)
  }
}

let monkey0 = new Monkey0();
let monkey1 = new Monkey1();
let monkey2 = new Monkey2();
let monkey3 = new Monkey3();
let monkey4 = new Monkey4();
let monkey5 = new Monkey5();
let monkey6 = new Monkey6();
let monkey7 = new Monkey7();

for (let i = 0; i < 20; i++) {
  monkey0.play()
  monkey1.play()
  monkey2.play()
  monkey3.play()
  monkey4.play()
  monkey5.play()
  monkey6.play()
  monkey7.play()
}

let sum = itemInspected.sort((a, b) => b-a).slice(0,2).reduce((a,b)=> a*b)

console.log(sharedBucket, itemInspected, sum);