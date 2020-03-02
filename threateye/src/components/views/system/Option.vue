<template>
  <div id="system_control_option"
       class="container">
    <div class="content_box">
      <div class="top">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/common/date.png"
               alt="">
          <span>时间与日期</span>
        </p>
        <div class="item">
          <p class="item_title">配置方式</p>
          <el-select class="select_box"
                     v-model="option.method"
                     @change='change_method'
                     placeholder="请选择配置方式">
            <el-option v-for="item in option.method_list"
                       :key="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <p class="item_title">日期选择</p>
          <el-date-picker v-model="option.time"
                          type="datetime"
                          placeholder="选择日期时间">
          </el-date-picker>
          <el-button type="primary"
                     class="btn_o margin_left">获取本地时间</el-button>
          <el-button type="primary"
                     class="btn_o">获取系统时间</el-button>
        </div>
        <div class="item">
          <p class="item_title">时区选择</p>
          <el-select class="select_box"
                     v-model="option.zone"
                     @change='change_zone'
                     placeholder="请选择时区">
            <el-option v-for="item in option.zone_list"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <p style="margin-bottom:12px;">
          <el-checkbox v-model="option.checked">自动与NTP服务器同步</el-checkbox>
        </p>
        <div class="item">
          <p class="item_title">NTP服务器</p>
          <el-input class="select_box"
                    placeholder="请输入NTP服务器"
                    v-model="option.ntp"
                    clearable>
          </el-input>
          <el-button type="primary"
                     class="btn_o margin_left">立即同步</el-button>
        </div>
        <el-button type="primary"
                   class="btn_i">保存</el-button>
      </div>
      <!-- <div class="mid">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/setting/duandian.png"
               alt="">
          <span>端点安全服务器地址</span>
        </p>
        <div style="margin-bottom:24px;">
          <el-input class="select_box"
                    placeholder="请输入服务器IP地址"
                    v-model="option.endpoint_ip"
                    clearable>
          </el-input>
        </div>
        <el-button type="primary"
                   class="btn_i">保存</el-button>
      </div> -->
      <div class="bottom">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/setting/sys.png"
               alt="">
          <span>登录IP地址设置（最多5个单IP/IP网段）</span>
        </p>
        <div style="margin-bottom:24px;">
          <div class="item_addrs"
               v-for="(item,index) in option.login_ip">
            <el-input class="select_box"
                      placeholder="IP地址或网段（CIDR格式如192.168.1.0/24）"
                      v-model="item.ip"
                      clearable>
            </el-input>
            <img src="@/assets/images/common/add.png"
                 alt=""
                 class="img_box"
                 v-if="item.icon"
                 @click="add_addr">
            <img src="@/assets/images/common/del.png"
                 alt=""
                 class="img_box"
                 @click="del_addr(item,index)"
                 v-if="!item.icon">
          </div>
        </div>
        <el-button type="primary"
                   class="btn_i">保存</el-button>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "system_control_option",
  data () {
    return {
      option: {
        method: "手动配置",
        method_list: [
          {
            value: '手动配置',
            key: '1'
          },
          {
            value: '自动获取',
            key: '2'
          },
        ],
        zone: "",
        zone_list: [
          {
            value: 'Asia/Shanghai',
          },
          {
            value: 'Asia/Chongqing',
          },
        ],
        checked: true,
        time: "",
        ntp: "",
        endpoint_ip: "",
        login_ip: [{
          ip: '',
          icon: true
        }
        ],
      }
    }
  },
  methods: {
    change_method () {

    },
    change_zone () {

    },
    add_addr () {
      if (this.option.login_ip.length < 5) {
        this.option.login_ip.forEach(item => {
          item.icon = false;
        });
        this.option.login_ip.push({ ip: '', icon: true })
      } else {
        this.$message.error(
          {
            message: '最多可以设置5个单IP/IP网段',
            offset: 50
          })
      }

    },
    del_addr (item, index) {
      this.option.login_ip.splice(index, 1);
    }
  }
}
</script>

<style scoped lang='less'>
#system_control_option {
  padding: 24px 56px 24px 24px;
  text-align: left;
  .content_box {
    min-height: 830px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      margin-bottom: 16px;
      .titile_icon {
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .select_box {
      width: 480px;
      border: 0;
    }
    .btn_i {
      padding: 0;
      background: #0070ff;
      color: #fff;
      width: 136px;
      height: 42px;
    }
    .top {
      padding: 24px 0 24px 24px;
      background: #fff;
      border-radius: 4px;
      .item_title {
        font-size: 12px;
        color: #999999;
        margin-bottom: 6px;
      }
      .item {
        margin-bottom: 24px;
        .el-date-editor {
          width: 480px;
        }
        .margin_left {
          margin-left: 24px;
        }
        .btn_o {
          padding: 0;
          width: 136px;
          height: 38px;
          border-color: #0070ff;
          color: #0070ff;
          background: #fff;
        }
      }
    }
    // .mid {
    //   margin: 12px 0;
    //   padding: 24px 0 24px 24px;
    //   background: #fff;
    //   border-radius: 4px;
    // }
    .bottom {
      margin: 12px 0;
      padding: 24px 0 24px 24px;
      background: #fff;
      border-radius: 4px;
      .item_addrs {
        margin-bottom: 12px;
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
</style>
<style lang='less'>
#system_control_option {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
}
</style>
