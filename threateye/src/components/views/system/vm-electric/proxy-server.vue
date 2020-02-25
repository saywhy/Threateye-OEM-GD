<template>
  <div id="proxy-server">
    <div class="left">
      <div class="left_item">
        <span>代理启停:</span>
        <el-switch v-model="proxy.switch">
        </el-switch>
      </div>
      <div class="left_item">
        <p>代理类型</p>
        <el-select class="select_box"
                   v-model="proxy.type"
                   placeholder="请选择代理类型">
          <el-option v-for="item in proxy.type_list"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="left_item">
        <p>代理地址</p>
        <el-input class="select_box"
                  placeholder="请输入代理地址"
                  v-model="proxy.addr"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>端口</p>
        <el-input class="select_box"
                  placeholder="请输入端口"
                  v-model="proxy.port"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <el-button type="primary"
                   class="save_btn">保存</el-button>
      </div>
    </div>
    <div class="mid">
      <div class="mid_item">
        <span>密码验证:</span>
        <el-switch v-model="proxy.pswd_switch"></el-switch>
      </div>
      <div class="mid_item">
        <p>用户名</p>
        <el-input class="select_box"
                  placeholder="请输入用户名"
                  v-model="proxy.name"
                  clearable>
        </el-input>
      </div>
      <div class="mid_item">
        <p>用户密码</p>
        <el-input class="select_box"
                  placeholder="请输入用户密码"
                  v-model="proxy.pswd"
                  clearable>
        </el-input>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "proxy-server",
  data () {
    return {
      proxy: {
        switch: true,
        pswd_switch: true,
        pswd: "",
        type: "",
        addr: "",
        port: "",
        type_list: [
          {
            name: "http"
          },
          {
            name: "https"
          }
        ]
      }
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data()
  },
  methods: {
    get_data () {
      this.$axios.get('/api/yiiapi/seting/get-proxy-server')
        .then(response => {
          console.log(response);
          response.data.data[0]
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
};
</script>

<style scoped lang="less">
#proxy-server {
  display: flex;
  text-align: left;
  .left {
    flex: 1;
    margin-right: 100px;
    .left_item {
      margin-bottom: 24px;
      p {
        font-size: 12px;
        color: #999999;
      }
      .select_box {
        width: 100%;
        height: 38px;
        margin-top: 6px;
        input {
          background: #f8f8f8 !important;
        }
      }
      .save_btn {
        width: 136px;
        height: 42px;
      }
    }
  }
  .mid {
    flex: 1;
    .mid_item {
      margin-bottom: 24px;
      p {
        font-size: 12px;
        color: #999999;
      }
      .select_box {
        width: 100%;
        height: 38px;
        margin-top: 6px;
        input {
          background: #f8f8f8 !important;
        }
      }
    }
  }
  .right {
    width: 500px;
  }
}
</style>
<style lang='less'>
#proxy-server {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .el-switch__core {
    width: 40px !important;
  }
}
</style>
