const generate = require('nanoid/generate')
export default {
  // 元件移动
  moving (state) {
    console.log('组件移动')
  },
  // 添加元件
  addWidget (state, payload) {
    state.widgets.push(payload)
    // localStorage.setItem('widgets', JSON.stringify(state.widgets))
    var modelId = generate('1234567890qwer', 10)
    // console.log(modelId)
  },
  // 删除元件
  deleteWidget (state) {
    console.log('删除组件')
  },
  // 选中元件
  selectWidget (state, payload) {
    let widget = state.widgets.find(widget => widget.id === payload.id)
    state.selectWidget = widget
  },
  // 保存元件
  save (state, payload) {
    localStorage.setItem('widgets', JSON.stringify(payload))
  },
  test () {
    console.log('test')
  }
}
