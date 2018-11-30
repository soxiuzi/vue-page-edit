const generate = require('nanoid/generate')
export default {
  moving (state) {
    console.log('组件移动')
  },
  addWidget (state, payload) {
    state.widgets.push(payload)
    localStorage.setItem('widgets', JSON.stringify(state.widgets))
    var modelId = generate('1234567890qwer', 10)
    console.log(modelId)
  },
  deleteWidget (state) {
    console.log('删除组件')
  },
  test () {
    console.log('test')
  }
}
