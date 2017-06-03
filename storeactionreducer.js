function stateChange (state, action) {
  if(!state){
    return {
      title: {
        text: 'title here',
        color: 'red',
      },
      content: {
        text: 'contont here',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return{
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    case 'UPDATE_CONTENT_TEXT':
      return {
        ...state,
        content: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_CONTENT_COLOR':
      return{
        ...state,
        content: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

// 定义dispatch getState 和 subscribe订阅数据修改事件
function createStore (reducer) {
  let state = null;
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    // 当dispatch修改state时，将遍历执行listeners订阅的方法
    listeners.map(fn => fn()) 
  }
  //通过stateChange方法 初始化state
  dispatch({}) 
  return {
    getState,
    dispatch,
    subscribe
  }
}


const store = createStore(stateChange)

// 对比oldState与newState判断是否进行渲染
let oldState = store.getState()
// 当dispatch一个action后将触发传给store.subscribe的函数
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

// ----------------------------------------

// 渲染
function renderApp (appState, old = {}) {
  if(appState === old) return
  console.log('renderapp')
  renderTitle(appState.title)
  renderContent(appState.content)
}

// 渲染标题
function renderTitle (title, old = {}) {
  if(title === old) return
  console.log('renderTitle')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

// 渲染内容
function renderContent (content, old = {}) {
  if(content === old) return
  console.log('content')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

// 初始化渲染视图
renderApp(store.getState())

// 必须通过 dispatch 修改 共享state
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'title already change'})