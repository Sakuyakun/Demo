const fn = obj => {
  return new Promise((resolve, reject) => {
    let num = Math.floor(Math.random() * 3000)
    setTimeout(() => {
      resolve(`请求了${obj.url}传了${obj.params.val} 用时${num}sec`)
    }, num)
  })
}

function limitQueue (urls, limit) {
  let finishedNum = 0

  for (let excuteCount = 0; excuteCount < limit; excuteCount++) {
    run()
  }

  function run () {
    new Promise((resolve, reject) => {
      console.log('发起请求')
      const url = urls[finishedNum]
      finishedNum++
      resolve(
        fn(url).then(data => {
          console.log(data)
        }).catch(e => {
          console.log('请求错误')
        })
      )
    }).then(() => {
      if (finishedNum < urls.length) run()
    })
  }
}

const urls = [
  { url: 'someurl/aaa', params: { val: '111' } },
  { url: 'someurl/aaa', params: { val: '222' } },
  { url: 'someurl/aaa', params: { val: '333' } },
  { url: 'someurl/aaa', params: { val: '444' } },
  { url: 'someurl/aaa', params: { val: '555' } },
  { url: 'someurl/aaa', params: { val: '666' } },
  { url: 'someurl/aaa', params: { val: '777' } },
  { url: 'someurl/aaa', params: { val: '888' } },
  { url: 'someurl/aaa', params: { val: '999' } },
];

(async _ => {
    await limitQueue(urls, 4);
})()