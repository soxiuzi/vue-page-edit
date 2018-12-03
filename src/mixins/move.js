const move = {
  methods: {
    initMovement (e) {
      var target = this.$store.state.selectWidget
      if (target) {
        //   初始化移动元件的值
        this.$store.commit('initmove', {
          startX: e.pageX,
          startY: e.pageY,
          originX: target.left,
          originY: target.top
        })
        // 绑定鼠标移动事件
        document.addEventListener('mousemove', this.eleMouseMove, true)
        // 取消鼠标移动事件
        document.addEventListener('mouseup', this.eleMouseUp, true)
      }
    },
    eleMouseMove (e) {
      e.preventDefault()
      e.stopPropagation()

      this.$store.commit('moving', {
        x: e.pageX,
        y: e.pageY
      })
    },
    eleMouseUp (e) {
      document.removeEventListener('mousemove', this.eleMouseMove, true)
      document.removeEventListener('mouseup', this.eleMouseUp, true)
      this.$store.commit('moveEnd')
    }
  }
}

export {
  move
}
