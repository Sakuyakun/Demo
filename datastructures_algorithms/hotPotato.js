// 循环队列 击鼓传花

class Queue {
  constructor() {
    this.items = []
  }
  enqueue(ele) {
    this.items.push(ele)
  }
  dequeue() {
    let r = this.items.shift()
    return r
  }
  size() {
    return this.items.length
  }
}


function hotPotato(nameList, num) {
  let queue = new Queue()
  
  for (let i = 0, len = nameList.length; i < len; i++) {
    queue.enqueue(nameList[i])
  }
  
  let eliminated = ''
  while (queue.size() > 1){
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated = queue.dequeue()
    console.log(`${eliminated} 被淘汰`) 
  }
  return queue.dequeue()
}

let names = ['john', 'jack', 'camila', 'ingrid', 'carl']
let winner = hotPotato(names, 7)
console.log(`${winner} 获得胜利`)
