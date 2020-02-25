<template>
  <div id="outside_list">
    <div class="outside_content">
      <div class="content_left content_common">
        <p class="title">恶意IP列表：</p>
        <p>URL：https://threateye.hoohoolab.com/#/app/set_black_list/threateye.hoohoolab.com/#/app/set_black_list</p>
        <div class="list_box">
          <p class="list_title_box">
            <span>IP:</span>
            <el-button class="btn_i"
                       @click="add_ip">添加</el-button>
          </p>
          <div class="item_box"
               v-for="(item,index) in outside_list.ip"
               @mouseenter="enter(index)"
               :class="item.class"
               @mouseleave="leave(index)">
            <span>{{item.name}}</span>
            <img class="del_img"
                 v-if="item.icon"
                 @click="del_ip(index)"
                 src="@/assets/images/common/del.png"
                 alt="">
          </div>
        </div>
      </div>
      <div class="content_right content_common">
        <p class="title">恶意域名列表：</p>
        <p>https://threateye.hoohoolab.com/#/app/set_black_list/threateye.hoohoolab.com/#/app/set_black_list</p>
        <div class="list_box">
          <p class="list_title_box">
            <span>域名:</span>
            <el-button class="btn_i"
                       @click="add_url">添加</el-button>
          </p>
          <div class="item_box"
               v-for="(item,index) in outside_list.url"
               @mouseenter="enter_url(index)"
               :class="item.class"
               @mouseleave="leave_url(index)">
            <span>{{item.name}}</span>
            <img class="del_img"
                 v-if="item.icon"
                 @click="del_url(index)"
                 src="@/assets/images/common/del.png"
                 alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 添加IP -->
    <el-dialog class="add_box pop_box"
               :visible.sync="outside_pop.ip.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_ip_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加IP</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">IP</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入IP"
                    v-model="outside_pop.ip.ip"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_ip_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_ip_list">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加url -->
    <el-dialog class="add_box pop_box"
               :visible.sync="outside_pop.url.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_url_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加域名</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">域名</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入域名"
                    v-model="outside_pop.url.url"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_url_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_url_list">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "outside_list",
  data () {
    return {
      outside_list: {
        ip: [{
          name: '192.168.1.1',
          icon: false,
          class: ''
        }],
        url: [{
          name: 'threateye.hoohoolab.com',
          icon: false,
          class: ''
        }]
      },
      outside_pop: {
        ip: {
          show: false,
          ip: ""
        },
        url: {
          show: false,
          url: ""
        },
      }
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () { },

  methods: {
    add_ip () {
      this.outside_pop.ip.show = true;
    },
    add_url () {
      this.outside_pop.url.show = true;
    },
    del_ip (index) {
      this.outside_list.ip.splice(index, 1)
    },
    del_url (index) {
      this.outside_list.url.splice(index, 1)
    },
    closed_ip_box () {
      this.outside_pop.ip.show = false;
    },
    closed_url_box () {
      this.outside_pop.url.show = false;
    },

    add_ip_list () {
      if (this.outside_pop.ip.ip != '') {
        this.outside_list.ip.push({
          name: this.outside_pop.ip.ip,
          icon: false,
          class: ''
        })
        this.outside_pop.ip.show = false;
        this.outside_pop.ip.ip = ''
      } else {
        this.$message.error('IP地址不能为空');
      }
    },
    add_url_list () {
      if (this.outside_pop.url.url != '') {
        this.outside_list.url.push({
          name: this.outside_pop.url.url,
          icon: false,
          class: ''
        })
        this.outside_pop.url.show = false;
        this.outside_pop.url.url = ''
      } else {
        this.$message.error('域名不能为空');
      }
    },

    enter (index) {
      this.outside_list.ip[index].icon = true
      this.outside_list.ip[index].class = 'active'
    },
    leave (index) {
      this.outside_list.ip[index].icon = false
      this.outside_list.ip[index].class = ''
    },
    enter_url (index) {
      this.outside_list.url[index].icon = true
      this.outside_list.url[index].class = 'active'
    },
    leave_url (index) {
      this.outside_list.url[index].icon = false
      this.outside_list.url[index].class = ''
    }

  }
};
</script>

<style scoped lang="less">
#outside_list {
  text-align: left;
  .outside_content {
    margin-top: 12px;
    display: flex;
    .content_common {
      width: 560px;
      word-break: break-all;
      white-space: pre-wrap;
      word-wrap: break-word;
      .title {
        padding-bottom: 8px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        border-bottom: 1px solid #ececec;
      }
      .list_box {
        padding: 18px 0 14px 0;
        background: #f8f8f8;
      }
      .list_title_box {
        height: 34px;
        line-height: 34px;
        margin-bottom: 16px;
        padding: 0 26px 0 14px;
        .btn_i {
          width: 124px;
          height: 34px;
          padding: 0;
          background: #0070ff;
          color: #fff;
          float: right;
        }
      }
      .item_box {
        height: 36px;
        line-height: 36px;
        padding: 0 26px 0 14px;
        position: relative;
        .del_img {
          cursor: pointer;
          width: 14px;
          height: 14px;
          position: absolute;
          top: 50%;
          right: 26px;
          transform: translateY(-50%);
        }
      }
      .active {
        background: #eef6ff;
        cursor: pointer;
      }
    }
    .content_left {
      margin-right: 22px;
    }
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#outside_list {
  .add_box {
    .el-dialog {
      width: 440px;
      .content_item {
        margin-top: 24px;
      }
      .el-input__inner {
        background: #f8f8f8;
        border: 0;
      }
      .btn_box {
        margin-top: 24px;
      }
    }
  }
}
</style>
