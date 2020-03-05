<template>
  <div id="mail_notic">
    <div class="left">
      <p class="title">邮件服务器设置</p>
      <div class="left_item">
        <p>SMTP服务器:</p>
        <el-input class="select_box"
                  placeholder="请输入SMTP服务器"
                  v-model="mail.host"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>SMTP端口:</p>
        <el-input class="select_box"
                  placeholder="请输入SMTP端口"
                  v-model="mail.port"
                  clearable>
        </el-input>
      </div>
      <p class="title">
        SMTP启用安全连接SSL启用：
        <el-switch v-model="ssl_switch">
        </el-switch>
      </p>
      <div class="left_item">
        <p>发件邮箱账号:</p>
        <el-input class="select_box"
                  placeholder="请输入发件邮箱账号"
                  v-model="mail.user"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>邮箱地址:</p>
        <el-input class="select_box"
                  placeholder="请输入邮箱地址"
                  v-model="mail.username"
                  clearable>
        </el-input>
      </div>
      <div class="left_item">
        <p>邮箱密码:</p>
        <el-input class="select_box"
                  placeholder="请输入邮箱密码"
                  v-model="mail.password"
                  show-password>
        </el-input>
      </div>
      <div class="left_item">
        <el-button type="primary"
                   class="save_btn">保存</el-button>
        <el-button type="primary"
                   class="test_btn"
                   @click='send_test'>发送测试邮件</el-button>
      </div>
    </div>
    <div class="mid">
      <p class="title">收件邮箱账号</p>
      <div class="mid_item">
        <p>邮箱地址</p>
        <div class="item_addrs"
             v-for="(item,index) in receipt_addrs">
          <el-input class="select_box"
                    placeholder="请输入邮箱地址"
                    v-model="item.name"
                    clearable>
          </el-input>
          <img src="@/assets/images/common/add.png"
               alt=""
               class="img_box"
               v-if="item.add"
               @click="add_addr">
          <img src="@/assets/images/common/del.png"
               alt=""
               class="img_box"
               @click="del_addr(item,index)"
               v-if="!item.add">
        </div>
      </div>
      <div class="mid_item">
        <p>发送内容:</p>
        <el-input class="select_box"
                  type="textarea"
                  :rows="10"
                  autosize
                  resize='none'
                  placeholder="请输入发送内容"
                  v-model="mail.info"
                  clearable>
        </el-input>
      </div>
      <p class="title">
        发生警告时给此邮箱发送通知邮件:
        <el-switch v-model="mail.send">
        </el-switch>
      </p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "mail-notic",
  data () {
    return {
      mail: {
      },
      ssl_switch: true,
      receipt_addrs: [{ name: '', add: true }]
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data();
  },

  methods: {
    get_data () {
      this.$axios.get('/api/yiiapi/email/get')
        .then(response => {
          console.log(response);
          this.mail = response.data.data
          this.mail.user = '';
          this.mail.info = '';
          if (this.mail.encryption == 'ssl') {
            this.ssl_switch = true
          } else {
            this.ssl_switch = false
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 发送测试
    send_test () {
      // yiiapi/email/test"
      // /yiiapi/email/save"
      console.log(this.mail);
    },
    add_addr () {
      this.receipt_addrs.forEach(item => {
        item.add = false;
      });
      this.receipt_addrs.push({ name: '', add: true })
    },
    del_addr (item, index) {
      this.receipt_addrs.splice(index, 1);
    }
  }
};
</script>

<style scoped lang="less">
#mail_notic {
  display: flex;
  text-align: left;
  .left {
    flex: 1;
    margin-right: 100px;
    .title {
      margin-bottom: 24px;
      font-size: 16px;
      color: #333;
    }
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
      .test_btn {
        background: #fff;
        border-color: #0070ff;
        color: #0070ff;
      }
    }
  }
  .mid {
    flex: 1;
    .title {
      margin-bottom: 24px;
      font-size: 16px;
      color: #333;
    }
    .mid_item {
      margin-bottom: 24px;
      p {
        font-size: 12px;
        color: #999999;
      }
      .item_addrs {
        display: flex;
        margin-top: 12px;
        .select_box {
          flex: 1;
          height: 38px;
          margin-top: 6px;
          input {
            background: #f8f8f8 !important;
          }
        }
        .img_box {
          width: 16px;
          height: 16px;
          margin-left: 10px;
          margin-top: 14px;
          cursor: pointer;
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
#mail_notic {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
  .el-switch__core {
    width: 40px !important;
  }
  .el-textarea__inner {
    background: #f8f8f8;
    border: 0;
  }
}
</style>
