const move = {
  methods: {
    initMovement(e) {
      var target = this.$store.state.selectWidget

      //   初始化移动元件的值
      this.$store.commit('initmove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: target.left,
        originY: target.top
      })
    },
    eleMouseMove(e) {
      console.log('移动事件')
    },
    eleMouseUp(e) {
      console.log('移动停止事件')
    }
  }
}

export default move
