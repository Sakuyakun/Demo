const normal = () => {
  console.log('result1')
}
const hot = () => {
  console.log('result2')
}
const cold = () => {
  console.log('result3')
}

function* generator (...mode) {
  for(let i=0,fn,len=mode.length; fn = mode[i++];){
    yield fn()
    if(i===len) {
      i =0
    }
  }
}

const exec = generator(normal, hot, cold)
document.querySelector(".switch").addEventListener('click',(event) => {
  exec.next()
}, false)
