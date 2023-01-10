import * as fs from 'fs'
import { threadId } from 'worker_threads'

const inputFile: string = 'input.txt'

// 读取文件内容
const fileContent = fs.readFileSync(inputFile, 'utf8')
// 将文件内容按行分割成数组
const lines = fileContent.split('\n')

let sharedBucket = [[79, 98], [54, 65, 75, 74], [79, 60, 97], [74]]
let itemInspected = [0 ,0 ,0 ,0]

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
  abstract throw(): void
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
    this.newItems = this.startingItems.map(x => x * 19)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 23 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 2 : 3)
  }

  throw() {
    this.worriedItems.map((item, index) => {
      sharedBucket[this.throwTo[index]].push(item)
      sharedBucket[this.id].pop()
      itemInspected[this.id] += 1
    })
  }
}

class Monkey1 extends Monkey {
  constructor() {
    super()
    this.id = 1
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 6)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 19 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 2 : 0)
  }

  throw() {
    this.worriedItems.map((item, index) => {
      sharedBucket[this.throwTo[index]].push(item)
      sharedBucket[this.id].pop()
      itemInspected[this.id] += 1
    })
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
    this.testResults = this.worriedItems.map(x => (x % 13 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 1 : 3)
  }

  throw() {
    this.worriedItems.map((item, index) => {
      sharedBucket[this.throwTo[index]].push(item)
      sharedBucket[this.id].pop()
      itemInspected[this.id] += 1
    })
  }
}

class Monkey3 extends Monkey {
  constructor() {
    super()
    this.id = 3
  }

  operation() {
    this.startingItems = sharedBucket[this.id]
    this.newItems = this.startingItems.map(x => x + 3)
    this.worriedItems = this.newItems.map(x => Math.floor(x / 3))
  }

  test() {
    this.testResults = this.worriedItems.map(x => (x % 17 === 0))
    this.throwTo = this.testResults.map(x => x === true ? 0 : 1)
  }

  throw() {
    this.worriedItems.map((item, index) => {
      sharedBucket[this.throwTo[index]].push(item)
      sharedBucket[this.id].pop()
      itemInspected[this.id] += 1
    })
  }
}

let monkey0 = new Monkey0();
let monkey1 = new Monkey1();
let monkey2 = new Monkey2();
let monkey3 = new Monkey3();

for (let i = 0; i < 20; i++) {
  monkey0.play()
  monkey1.play()
  monkey2.play()
  monkey3.play()
}

let sum = itemInspected.sort((a, b) => b-a).slice(0,2).reduce((a,b)=> a*b)

console.log(monkey0, monkey1, monkey2, monkey3, sharedBucket, itemInspected, sum);