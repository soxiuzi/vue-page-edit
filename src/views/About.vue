
<template>
  <div class="wrapper">
    <div class="buttons">可添加元件：
      <br>
      <a-button v-for="button in buttons" :key="button" @click="addWidget(button)">{{button}}</a-button>
      <br>
      <a-button @click.native="save" type="primary">保存</a-button>
      <a-button @click.native="deleteWidget" type="danger">删除</a-button>
      <!-- <a-button type="primary">ant按钮</a-button>
      <a-input placeholder="测试输入框"></a-input>
      <a-textarea placeholder="测试文本域"></a-textarea>
      <a-select></a-select>-->
    </div>
    <div id="viewport" class="viewport">
      <!-- <div id="move" @mousedown="move" @mousemove="onMove" @mouseup="mouseUp" class="move"></div> -->
      <!-- <div > -->
      <component
        v-for="(widget, index) in widgets"
        :key="index"
        :is="widget.type"
        :id="widget.id"
        :placeholder="widget.notes"
        :defaultValue="widget.type == 'a-select' ? selectArray[0] : ''"
        :style="{
          position: 'absolute',
          left: widget.left / sceneWidth * 100 + '%',
          top: widget.top / sceneHeight * 100 + '%',
          width: widget.width + '%',
          height: widget.height + '%',
          fontSize: widget.fontSize + 'px',
          color: widget.fColor
        }"
        @change="handleChange"
      >
        {{ widget.value }}
        <a-select-option
          v-if="widget.type == 'a-select'"
          v-for="(item,index) in selectArray"
          :key="index"
          :value="item"
        >{{item}}</a-select-option>
      </component>
      <!-- </div> -->
    </div>
    <div class="widget_props">选择元件的属性：
      <div v-if="activeWidget.fColor" class="props">
        <div class="block">
          <span>横坐标：{{ activeWidget.left }}</span>
          <el-slider :max="2000" v-model="activeWidget.left"></el-slider>
        </div>
        <div class="block">
          <span>横坐标：{{ activeWidget.top }}</span>
          <el-slider :max="2000" v-model="activeWidget.top"></el-slider>
        </div>
        <div class="block">
          <span>元件宽度：{{ activeWidget.width }}</span>
          <el-slider :max="100" v-model="activeWidget.width"></el-slider>
        </div>
        <div class="block">
          <span>元件高度：{{ activeWidget.height }}</span>
          <el-slider :max="100" v-model="activeWidget.height"></el-slider>
        </div>
        <div class="block">
          <span>字体大小：{{ activeWidget.fontSize }}</span>
          <el-slider :max="100" v-model="activeWidget.fontSize"></el-slider>
        </div>
        <div class="block">
          <span>字体颜色：{{ activeWidget.fColor }}</span>
          <input type="color" v-model="activeWidget.fColor">
        </div>
        <div class="block">
          <span>标签名：</span>
          <el-input v-model="activeWidget.value"/>
        </div>
        <div class="block">
          <span>placeHolder：</span>
          <el-input v-model="activeWidget.notes"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const generate = require("nanoid/generate");
import Button from "../components/button.vue";
import Input from "../components/input.vue";
import { move } from "../mixins/move.js";
export default {
  name: "About",
  components: {
    Button,
    Input
  },
  data() {
    return {
      widgets: [],
      buttons: ["输入框", "按钮", "标签", "选择框"],
      template: "",
      type: "",
      currentTarget: "",
      sceneWidth: 0,
      sceneHeight: 0,
      selectValue: "",
      selectArray: ["选择一", "选择二", "选择三"]
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
    var data = localStorage.getItem("widgets");
    if (data) {
      this.$store.replaceState(JSON.parse(data));
      // console.log(this.$store.state)
    }
    this.widgets = this.$store.state.widgets;
  },
  mixins: [move],
  computed: {
    activeWidget: {
      get() {
        if (this.$store.state.selectWidget) {
          return this.$store.state.selectWidget;
        } else {
          return {};
        }
      },
      set() {}
    }
  },
  mounted() {
    this.sceneWidth = document.getElementById("viewport").offsetWidth;
    this.sceneHeight = document.getElementById("viewport").offsetHeight;
    document
      .getElementById("viewport")
      .addEventListener("mousedown", this.selectWidget, false);
  },
  methods: {
    handleChange(value, options) {
      if (options) {
        this.selectValue = value;
      }
    },
    deleteWidget() {
      this.$store.commit("deleteWidget");
    },
    selectWidget(e) {
      var target = e.target;
      this.$store.commit("selectWidget", { id: e.target.id });
      target = this.$store.state.selectWidget;
      if (target) {
        this.initMovement(e);
      }
    },
    save() {
      this.$store.commit("save", this.$store.state);
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
      if (buttonName == "按钮") {
        this.type = "a-button";
        this.$store.commit("addWidget", {
          type: this.type,
          id: generate("1234567qwe", 10),
          left: 0,
          top: 0,
          value: "按钮",
          width: 10,
          height: 10,
          notes: "",
          fontSize: 10,
          fColor: "#000000"
        });
      } else if (buttonName == "输入框") {
        this.type = "a-input";
        this.$store.commit("addWidget", {
          type: this.type,
          id: generate("1234567qwe", 10),
          left: 0,
          top: 0,
          value: "",
          width: 10,
          height: 10,
          notes: "请输入密码",
          fontSize: 10,
          fColor: "#000000"
        });
      } else if (buttonName == "标签") {
        this.type = "label";
        this.$store.commit("addWidget", {
          type: this.type,
          id: generate("1234567qwe", 10),
          left: 0,
          top: 0,
          value: "标签：",
          width: 10,
          height: 10,
          notes: "",
          fontSize: 10,
          fColor: "#000000"
        });
      } else if (buttonName == "选择框") {
        this.type = "a-select";
        this.$store.commit("addWidget", {
          type: this.type,
          id: generate("1234567qwe", 10),
          left: 0,
          top: 0,
          value: "",
          width: 10,
          height: 10,
          notes: "",
          fontSize: 10,
          fColor: "#000000"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
}
.buttons {
  text-align: left;
  flex: 1;
}
.viewport {
  position: relative;
  overflow: hidden;
  flex: 3;
  height: 100%;
  border: 1px solid #ccc;
}
.buttons button {
  margin: 5px;
}
.widget_props {
  box-sizing: border-box;
  padding: 4px;
  flex: 1;
  text-align: left;
  .props {
    margin: 17px;
    .block {
      margin-top: 10px;
      display: flex;
      span,
      .el-slider,
      .el-input {
        flex: 1;
      }
    }
  }
}
</style>