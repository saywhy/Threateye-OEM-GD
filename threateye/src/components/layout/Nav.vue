<template>
  <div id="Nav"
       v-cloak>
    <el-row :gutter="0"
            class="nav_user">
      <el-col :span="3"
              style="width: 11.2%;">
        <div class="header-logo"
             align="left"
             @click="enter_home">
          <img class="e-image"
               :src="logoSrc">
        </div>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="$route.meta.rootAuth"
                 class="el-menu-demo"
                 mode="horizontal">
          <router-link class="item"
                       :to="item.children[0].path"
                       v-for="(item,index) in addRouters"
                       :key="item.meta.auth">
            <el-menu-item :index="String(item.meta.auth)">
              <i class="e-nav-icon"
                 :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col :span="9"
              style="width:38.3%;">
        <div class="header-basic"
             align="right">
          <el-badge class="item"
                    :value="news_count"
                    :max="99"
                    v-show="true">
            <img :src="messageSrc"
                 class="va-image"
                 @click.once="messageClick();">
          </el-badge>
          <el-dropdown class="avatar-container right-menu-item"
                       trigger="click">
            <div class="avatar-wrapper">
              <img class="user-avatar"
                   style="display: none;"
                   :src="avatarSrc">
              <label class="avatar-name">{{token}}</label>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown"
                              class="nav-dropdown-menu">
              <a target='_blank'
                 @click="modifyPassword()">
                <el-dropdown-item>
                  修改个人信息
                </el-dropdown-item>
              </a>
              <el-dropdown-item divided>
                <span @click="logout"
                      style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

    <!-- 修改密码弹窗 -->
    <el-dialog class="pop_box_password"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="pass_state">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">修改个人信息</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">密码</span>
          </p>
          <el-input class="select_box"
                    :placeholder="user_data.placeholder"
                    v-model="user_edit.password"
                    show-password>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">确认密码</span>
          </p>
          <el-input class="select_box"
                    placeholder="请再次输入密码"
                    v-model="user_edit.Re_password"
                    show-password></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">旧密码
              <span class="it_m">*</span>
            </span>
          </p>
          <el-input class="select_box"
                    placeholder="请再次输入密码"
                    v-model="user_edit.old_password"
                    show-password></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">
              邮箱
              <span class="it_m">*</span>
            </span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入邮箱"
                    v-model="user_edit.email_addr"
                    clearable></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">
              手机号
              <span class="it_m">*</span>
            </span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入手机号"
                    v-model="user_edit.mobile"
                    clearable></el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">部门</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入部门"
                    v-model="user_edit.department"
                    clearable></el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="edit_user">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters } from 'vuex';

import { getToken, setToken, removeToken } from "@/store/layout/cookie";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'Nav',
  data () {
    return {
      logoSrc: require('@/assets/images/layout/nav/logo.png'),
      messageSrc: require('@/assets/images/layout/nav/message.png'),
      avatarSrc: require('@/assets/images/layout/nav/avatar.png'),
      pass_state: false,
      user_data: {
        page: 1,
        rows: 10,
        placeholder: '',
        password: {}
      },
      user_edit: {
        password: "",
        Re_password: "",
        old_password: "",
        department: "",
        mobile: "",
        email_addr: "",
        role: "",
        id: "",
        allow_ip: ''
      },
      news_count: 0
    };
  },
  computed: {
    ...mapState({
      token: state => state.layout.token
    }),
    ...mapGetters([
      'addRouters'
    ])
  },
  mounted () {
    this.get_news();

    this.timer = setInterval(() => {
      this.get_news();
    }, 5000);

    eventBus.$on('reset', () => {
      this.modifyPassword()
    })
  },
  methods: {
    /*login(){
      this.$router.push('/', () => {});
    },*/
    enter_home () {
      this.$router.push({ path: '/home/overview' });
    },
    // 正则验证密码
    regex (password) {
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])');
      return reg.test(password)
    },
    // 获取密码长度
    getPwdLength () {
      this.$axios.get('/yiiapi/site/get-passwd-length')
        .then(response => {
          this.user_data.password = response.data.data
          this.user_data.placeholder = '请输入包含大写、小写、数字和特殊字符其中三项,' + response.data.data.min_passwd_len + '-' + response.data.data.max_passwd_len + '位密码'
          //!@#QWEasd123 Lele#easy123 Lele@19930901
          this.$axios.get('/yiiapi/site/get-self-password-reset-token')
            .then(response => {
              let { status, msg, data } = response.data;
              if (status == 0) {
                // console.log(data.data)
                localStorage.setItem("token", data.data.token);
                let datas = data.data;
                this.user_edit.department = datas.department;
                this.user_edit.mobile = datas.mobile;
                this.user_edit.email_addr = datas.email_addr;
              } else {
                this.$message(
                  {
                    message: msg,
                    type: 'error',
                  }
                );

              }
            })
            .catch(error => {
              console.log(error);
            })
        })
        .catch(error => {
          console.log(error);
        })
    },

    //修改个人信息
    modifyPassword () {
      this.getPwdLength();
      this.pass_state = true;
    },

    closed_edit_box () {
      this.pass_state = false;
      this.user_edit = {
        password: "",
        Re_password: "",
        old_password: "",
        department: "",
        mobile: "",
        email_addr: "",
        role: "",
        id: "",
        allow_ip: ''
      };
    },
    edit_user () {
      if (this.user_edit.password != this.user_edit.Re_password) {
        this.$message(
          {
            message: '两次输入密码不一致',
            type: 'error',
          }
        );
        return false
      }
      if (!this.regex(this.user_edit.password) && this.user_edit.password != '') {
        this.$message(
          {
            message: '密码必须同时包含大写、小写、数字和特殊字符其中三项',
            type: 'error',
          }
        );
        return false
      }
      if (this.user_edit.old_password == '') {
        this.$message(
          {
            message: '旧密码不能为空',
            type: 'error',
          }
        );
        return false
      }
      if (this.user_edit.mobile == '') {
        this.$message(
          {
            message: '手机号不能为空',
            type: 'error',
          }
        );
        return false
      }
      if (this.user_edit.email_addr == '') {
        this.$message(
          {
            message: '邮箱不能为空',
            type: 'error',
          }
        );
        return false
      }
      this.$axios.put('/yiiapi/site/reset-self-password?token=' + localStorage.getItem("token"), {
        ResetPasswordForm: {
          password: this.user_edit.password,
          email_addr: this.user_edit.email_addr,
          mobile: this.user_edit.mobile,
          department: this.user_edit.department,
        },
        old_password: this.user_edit.old_password
      })
        .then(response => {
          this.pass_state = false;
          localStorage.removeItem("token");
          if (response.data.status == 0) {
            this.$message({
              message: '修改用户成功',
              type: 'success'
            });
            if (this.user_edit.password != '') {
              setTimeout(() => {
                removeToken();
                this.$axios.get('/yiiapi/site/logout')
                  .then(response => {
                    if (response.data.status == 0) {
                      console.log('退出');
                      location.reload();
                      //In order to re-instantiate the vue-router object to avoid bugs
                      this.$router.push('/login');
                    }
                  }).catch(error => {
                    console.log(error);
                  })
                // location.reload();
              }, 500);
            }

          } else {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          }

          this.user_edit = {
            password: "",
            Re_password: "",
            old_password: "",
            department: "",
            mobile: "",
            email_addr: "",
            role: "",
            id: "",
            allow_ip: ''
          };
        })
        .catch(error => {
          console.log(error);
        })

    },
    //退出
    logout () {
      this.$store.dispatch('LogOut')
        .then((resp) => {
          //In order to re-instantiate the vue-router object to avoid bugs
          this.$message.success('退出登录成功');
          location.reload();
        }).catch(error => {
          this.$message.error('退出登录操作失败' + error);
        })
    },
    //通知点击事件
    messageClick () {
      let route = this.$route.path;
      if (route == '/message') {
        return false;
      } else {
        this.$router.push('/message')
      }
    },
    // 获取新消息
    get_news () {
      this.$axios.get('/yiiapi/news/count')
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          this.news_count = datas.count
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  beforeDestroy () {
    clearInterval(this.timer); //关闭
  },
  destroyed () {
    console.log('33333');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#Nav {
  .nav_user {
    .header-logo {
      .e-image {
        margin: 9px 0;
        width: 152px;
        height: 42px;
        cursor: pointer;
      }
    }
    .el-col {
      .el-menu-demo {
        background-color: #2e3f60;
        display: flex;
        border-width: 0 !important;
        > a.item {
          flex: 1;
          text-decoration: none;
          max-width: 104px;
          .el-menu-item {
            color: #fff;
            height: 60px;
            line-height: 56px;
            font-size: 16px;
            text-align: center;
            font-family: PingFang;
            -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
            transition: 0s height, 0s padding-top, 0s padding-bottom;
            i.e-nav-icon {
              margin-right: 4px;
              width: 18px;
              height: 18px;
              display: inline-block;
              background-repeat: no-repeat;
              vertical-align: middle;
              background-size: 16px;
              margin-top: 3px;
              &.e-nav-home {
                background-image: url('../../assets/images/layout/nav/main.png');
              }
              &.e-nav-handle {
                background-image: url('../../assets/images/layout/nav/handle.png');
              }
              &.e-nav-emerge {
                background-image: url('../../assets/images/layout/nav/emerge.png');
              }
              &.e-nav-invest {
                background-image: url('../../assets/images/layout/nav/invest.png');
              }
              &.e-nav-report {
                background-image: url('../../assets/images/layout/nav/report.png');
              }
              &.e-nav-system {
                background-image: url('../../assets/images/layout/nav/system.png');
              }
            }
          }
          .el-menu-item:hover,
          .el-menu-item:focus {
            background-color: #2e3f60;
          }
          .el-menu-item.is-active {
            border-width: 0;
            color: #fff;
            background-color: #5389e0;
          }
        }
      }
    }
    .header-basic {
      height: 60px;
      /*display: flex;*/
      text-align: right;
      .el-badge {
        display: inline-block;
        flex: 1;
        margin: 22px 0;
        .va-image {
          cursor: pointer;
          width: 20px;
          height: 20px;
        }
      }
      .avatar-container {
        padding: 0 15px;
        // min-width: 120px;
        // margin: 14px 0 14px 14px;
        .avatar-wrapper {
          line-height: 32px;
          color: #fff;
          cursor: pointer;
          outline: none;
          .user-avatar {
            padding: 0 5px;
            height: 32px;
          }
          .avatar-name {
            font-size: 14px;
            cursor: pointer;
            padding: 0 3px;
            font-family: 'PingFang';
          }
        }
      }
    }
  }
  /deep/ .el-dialog {
    width: 550px;
    .el-dialog__body {
      width: 550px;
      .content {
        padding: 24px 0;
        .content_item {
          margin-bottom: 24px;
          p {
            text-align: left;
          }
          .title {
            font-size: 12px;
            color: #999999;
            .it_m {
              color: red;
            }
          }
          .select_box {
            width: 100%;
            height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.nav-dropdown-menu {
  top: 60px !important;
  font-family: 'PingFang';
  a {
    text-decoration: none;
  }
  .popper__arrow {
    left: 80px !important;
  }
}
#Nav {
  .pop_box_password {
    .el-dialog {
      background: #ffffff;
      border-radius: 4px;
      position: fixed;
      // top: 200px;
      left: 50%;
      transform: translateX(-50%);
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        padding: 30px;

        .closed_img {
          width: 46px;
          height: 46px;
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
        }

        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .btn_box {
          height: 42px;
          text-align: center;

          .ok_btn {
            width: 136px;
            height: 42px;
            background: #0070ff;
            color: #fff;
          }

          .cancel_btn {
            width: 136px;
            height: 42px;
            border-color: #0070ff;
            background: #fff;
            color: #0070ff;
          }
        }

        .content_item {
          .title {
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
