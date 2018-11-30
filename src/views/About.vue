<template>
  <div class="wrapper">
    <div class="buttons">
      <button v-for="(button, index) in buttons" :key="index" @click="addWidget(button)">{{button}}</button>
    </div>
    <div id="viewport" class="viewport">
      <!-- <div id="move" @mousedown="move" @mousemove="onMove" @mouseup="mouseUp" class="move"></div> -->
      <!-- <div > -->
      <component
        v-for="(widget, index) in widgets"
        :key="index"
        :type="widget.type"
        :is="widget.type"
        :id="widget.id"
        class="move"
      ></component>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
const generate = require('nanoid/generate')
import Button from "../components/button.vue";
import Input from "../components/input.vue";
export default {
  name: "About",
  components: {
    Button,
    Input
  },
  data() {
    return {
      drag: false,
      buttons: ["按钮1", "按钮2", "按钮3"],
      x: 0,
      y: 0,
      template: "",
      type: "",
      currentTarget: "",
      originX: 0, // 选中移动组件时组件的左偏移量
      originY: 0, // 选中移动组件时组件的上偏移量
      startX: 0, //  按下鼠标时的横坐标
      startY: 0 // 按下鼠标时的纵坐标
    };
  },
  watch: {
    type(newval, oldval) {
      if (newval == "button") {
        // console.log(newval);
        this.template = Button;
      } else if (newval == "text") {
        // console.log(newval);
        this.template = Input;
      }
    }
  },
  created() {
    // console.log(Array.isArray(JSON.parse(localStorage.getItem("widgets"))));
    this.widgets = JSON.parse(localStorage.getItem("widgets"));
  },
  computed: {
    widgets: {
      get: function() {
        return localStorage.getItem("widgets")
          ? JSON.parse(localStorage.getItem("widgets"))
          : this.$store.state.widgets;
      },
      set: function() {}
    }
  },
  mounted() {
    document
      .getElementById("viewport")
      .addEventListener("mousedown", this.test, false);
    document.addEventListener("mouseup", this.mouseUp, false);
  },
  methods: {
    test(e) {
      e = e || window.event;
      // console.log(e);
      this.currentTarget = e;
      let target = e.target.type;
      console.log(target);
      if(target) {
        this.initMove(this.currentTarget);
      }
      // if (target == "button") {
      //   console.log('button')
      //   this.initMove(this.currentTarget);
      // } else if (target == "input") {
      //   console.log('input');
      //   this.initMove(this.currentTarget);
      // }
    },
    initMove(e) {
      var move = document.getElementById(e.target.id);

      this.startX = e.pageX;
      this.startY = e.pageY;
      this.originX = e.target.style.left ? parseInt(e.target.style.left) : 0;
      this.originY = e.target.style.top ? parseInt(e.target.style.top) : 0;
      // console.log(this.originX);
      // console.log(this.originY);
      this.drag = true;
      this.onMove(e.target.id);
    },
    addWidget(buttonName) {
      if (buttonName == "按钮1") {
        this.type = "button";
        this.$store.commit("addWidget", { type: this.type, id: generate('1234567qwe', 10) });
      } else if (buttonName == "按钮2") {
        this.type = "input";
        this.$store.commit("addWidget", { type: this.type, id: generate('1234567qwe', 10) });
      }
    },
    onMove(targetId) {
      var that = this;
      var move = document.getElementById(targetId);
      document.addEventListener(
        "mousemove",
        function(e) {
          e.stopPropagation();
          e.preventDefault();
          if (that.drag) {
            e = e || window.event;
            var dx = e.pageX - that.startX;
            var dy = e.pageY - that.startY;
            var left = that.originX + dx;
            var top = that.originY + dy;
            move.style.left = left < 0 ? 0 : left + "px";
            move.style.top = top < 0 ? 0 : top + "px";
          }
        },
        false
      );
    },
    mouseUp(e) {
      // e = e || window.event;
      // this.startX = e.pageX;
      // this.startY = e.pageY;
      this.drag = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
}
.buttons {
  flex: 1;
}
.viewport {
  position: relative;
  flex: 5;
  height: 500px;
  border: 1px solid #ccc;
}
.viewport button {
  position: absolute;
  width: 100px;
  height: 100px;
  background: tomato;
}
input {
  position: absolute;
  top: 200px;
  left: 0;
}
</style>