const generate = require('nanoid/generate')
export default {
  // 元件移动
  moving (state, payload) {
    var target = state.selectWidget
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var left = state.originX + dx
    var top = state.originY + dy

    target.left = left > 0 ? left : 0
    target.top = top > 0 ? top : 0
  },
  // 初始化移动属性
  initmove (state, payload) {
    state.moveState = true
    state.startX = payload.startX
    state.startY = payload.startY
    state.originX = payload.originX
    state.originY = payload.originY
  },
  moveEnd (state) {
    state.moveState = false
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
