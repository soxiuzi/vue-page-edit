<template>
  <!-- <div class="wrapper" id="wrapper"> -->
    <button contenteditable="true" class="move" v-if="type == 'button'">我是按钮</button>
    <!-- <input class="text" v-if="type == 'text'" placeholder="测试" type="text"> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "Button",
  components: {},
  props: {
      type: String
  },
  data() {
    return {
        drag: false
    };
  },
  watch: {},
  computed: {},
  methods: {
      move(e) {
      console.log(e);
      var move = document.getElementById("button");
      var that = this;
      move.onmousedown = function(e) {
        e = e || window.event;
        that.x = e.clientX - move.offsetLeft;
        that.y = e.clientY - move.offsetTop;
        that.drag = true;
      };
    },
    onMove() {
      console.log('测试');
      var move = document.getElementById("button");
      var that = this;
      document.onmousemove = function(e) {
        if (that.drag) {
          e = e || window.event;
          var left = e.clientX - that.x;
          var top = e.clientY - that.y;
          move.style.left = left < 0 ? "0px" : left + "px";
          move.style.top = top < 0 ? "0px" : top + "px";
          console.log(move.style.left);
          console.log(move.style.top);
        }
      };
    },
    mouseUp() {
      this.drag = false;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
}
.move {
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
}
</style>