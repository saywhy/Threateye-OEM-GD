
<template>
  <el-date-picker class="vm_emerge_picker"
                  v-model="pickerOptions.time"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  @change="chooseTime"
                  clearable
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="center">
  </el-date-picker>
</template>
<script type="text/ecmascript-6">
export default {
  name: "vm-emerge-picker",
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        time: []
      }
    };
  },
  props: {
    option: {
      type: Array,
      default: () => { }
    }
  },
  created () { },
  mounted () {
    //console.log(this.option);
  },
  computed: {

  },
  methods: {
    chooseTime () {
      // console.log(this.option);
      // console.log(this.pickerOptions.time);
      this.$emit("changeTime", this.pickerOptions.time);
    }
  }
};
</script>

<style lang="less">
.el-input__inner {
  background: rgba(0, 0, 0, 0.3);
  border-width: 0;
  outline: none;
}
.vm_emerge_picker {
  width: 400px !important;
  /deep/ .el-range-input {
    /*width: auto;*/
    // background: rgba(0, 0, 0, 0.3);
    background: transparent;
  }
  /deep/ .el-range-separator {
    padding: 0 3px;
    line-height: 32px;
    width: auto;
    color: #fff;
  }
  /deep/ .el-date-table td.end-date span {
    background-color: #00ff00;
  }
  /deep/ .el-button.is-active,
  /deep/ .el-button.is-plain:active {
    color: #00ff00;
    border-color: #00ff00;
  }
  /deep/ .el-date-table td.start-date span {
    background-color: #00ff00;
  }
}
</style>
