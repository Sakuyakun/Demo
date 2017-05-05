export default {
  namespace: 'common',
  state: {
    // 面包屑数据
    breadcrumb:[
      {
        name:'首页',
        path:'/dashboard'
      }
    ]
  },
  reducers: {
    changeBreadcrumb(state,{ payload: breadcrumb }) {
      return {...state, ...breadcrumb}
    }
  },
  effects: {},
  subscriptions: {},
}
