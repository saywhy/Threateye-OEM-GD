<template>
  <div id="security_policy">
    <div class="top">
      <span>是否启用:</span>
      <el-switch v-model="security_policy.switch">
      </el-switch>
    </div>
    <div class="mid">
      <div class="mid_item">
        <p class="title item_color">密码长度最小值：</p>
        <el-input class="input_box"
                  placeholder="请输入密码长度最小值"
                  v-model="security_policy.pswd_min"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">密码最小长度8-11之间包含大小写字母和数字</span>
      </div>
      <div class="mid_item">
        <p class="title item_color">密码长度最大值：</p>
        <el-input class="input_box"
                  placeholder="请输入密码长度最大值"
                  v-model="security_policy.pswd_max"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">密码最大长度11-30之间包含大小写字母和数字</span>
      </div>
      <div class="mid_item">
        <p class="title item_color">密码定期修改时间：</p>
        <el-input class="input_box"
                  placeholder="请输入密码定期修改时间"
                  v-model="security_policy.paswd_time"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">(1-90)天</span>
      </div>
      <div class="mid_item">
        <p class="title item_color">最大登录重试次数：</p>
        <el-input class="input_box"
                  placeholder="请输入最大登录重试次数"
                  v-model="security_policy.login_count"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">(1-5)次</span>
      </div>
      <div class="mid_item">
        <p class="title item_color">密码长度最登录失败阻断时间：</p>
        <el-input class="input_box"
                  placeholder="请输入登录失败阻断时间"
                  v-model="security_policy.fail_time"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">(1-3600)秒</span>
      </div>
      <div class="mid_item">
        <p class="title item_color">页面超时时间：</p>
        <el-input class="input_box"
                  placeholder="请输入页面超时时间"
                  v-model="security_policy.over_time"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">(1-480)分钟</span>
      </div>
      <div class="mid_item">
        <p class="title item_color">同时在线数：</p>
        <el-input class="input_box"
                  placeholder="请输入同时在线数"
                  v-model="security_policy.online_count"
                  clearable>
        </el-input>
        <span class="red">*</span>
        <span class="item_color">(1-5)个</span>
      </div>
    </div>
    <div class="bottom">
      <el-button type="primary"
                 class="btn_i">保存</el-button>
      <el-button type="primary"
                 class="btn_o">取消</el-button>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "security_policy",
  data () {
    return {
      security_policy: {
        switch: true,
        pswd_min: '',
        pswd_max: '',
        paswd_time: '',
        login_count: '',
        fail_time: '',
        over_time: '',
        online_count: '',
      }
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () { },

  methods: {}
};
</script>

<style scoped lang="less">
#security_policy {
  text-align: left;
  .mid {
    .mid_item {
      margin-top: 24px;
      margin-bottom: 48px;
      .title {
        margin-bottom: 6px;
      }
      .item_color {
        font-size: 12px;
        color: #999999;
      }
      .red {
        color: #ff5f5c;
      }
      .input_box {
        width: 480px;
        height: 38px;
      }
    }
  }
  .bottom {
    .btn_i {
      width: 136px;
      height: 42px;
      padding: 0;
      background: #0070ff;
      color: #fff;
      margin-right: 24px;
    }
    .btn_o {
      margin: 0;
      width: 136px;
      height: 42px;
      padding: 0;
      border-color: #0070ff;
      background: #fff;
      color: #0070ff;
    }
  }
}
</style>
<style lang='less'>
#security_policy {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .el-switch__core {
    width: 40px !important;
  }
}
</style>
