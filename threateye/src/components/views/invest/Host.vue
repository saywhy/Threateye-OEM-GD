<template>
  <div id="invest_host" class="common-invest">
    <div class="invest">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--网络视角-->
        <el-tab-pane label="网络视角" name="first">
          <div class="invest_form invest_form_network">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">

                  <!--主机地址-->
                  <el-input class="s_key" placeholder="主机地址" v-model="params_net.host_ip" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--时间-->
                  <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                  <el-button class="s_btn">搜索</el-button>
                  <el-link class="s_link">重置</el-link>
                </el-col>
              </el-row>
            </el-form>
            <el-link class="s_download">下载</el-link>
            <el-row class="invest_btn_group">
              <el-button-group>
                <el-button :class="{'active':activeButGroup =='1'}" @click="activeButGroup = '1'">网络通讯</el-button>
                <el-button :class="{'active':activeButGroup =='2'}" @click="activeButGroup = '2'">文件</el-button>
                <el-button :class="{'active':activeButGroup =='3'}" @click="activeButGroup = '3'">用户</el-button>
              </el-button-group>
            </el-row>
          </div>
          <div class="invest_table">
            <el-row class="invest-common-table-pattern">
              <el-col :span="24" v-show="activeButGroup=='1'">
                <el-table class="common-table" ref="multipleTable" :data="tableNetData1">
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="time" label="时间" min-width="180" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="ori_address" label="源地址" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="ori_port" label="源端口"  show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="des_address" label="目的地址" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="des_port" label="目的端口" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="email" label="Email地址" min-width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="apply" label="应用" width="60"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" v-show="activeButGroup=='2'">
                <el-table class="common-table" ref="multipleTable" :data="tableNetData2">
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="file" label="文件名"  min-width="100" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="hash" label="哈希值"  min-width="200" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="ori" label="来源"  show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="host_ip" label="主机IP" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="apply" label="应用" width="120"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" v-show="activeButGroup=='3'">
                <el-table class="common-table" ref="multipleTable" :data="tableNetData3">
                  <el-table-column prop="pid" label="序号" width="100" align="center"></el-table-column>
                  <el-table-column prop="user" label="用户名" min-width="120" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="host_ip" label="主机IP" min-width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="apply" label="应用"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" class="e-pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5, 10, 20]"
                  :page-size="10"
                  :total="20"
                  layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!--端点视角-->
        <el-tab-pane label="端点视角" name="second">
          <div class="invest_form invest_form_point">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">

                  <!--主机地址-->
                  <el-input class="s_key" placeholder="主机地址" v-model="params_net.host_ip" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--时间-->
                  <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                  <el-button class="s_btn">搜索</el-button>
                  <el-link class="s_link">重置</el-link>
                </el-col>
              </el-row>
            </el-form>
            <!--<el-link class="s_download">下载</el-link>-->
          </div>
          <div class="invest-point-detail">
            <div class="invest-point-detail-title detail-computer">
               <i class="e-icon-detail e-icon-computer"></i>
               <h4 class="title">JamesWin7-64Pro</h4>
               <i class="e-icon el-icon-caret-bottom"></i>
            </div>
            <div class="invest-point-detail-content">
               <div class="detail_base_bottom">
                 <ul>
                   <li class="item_li">
                     <span class="item_li_title">操作系统：</span>
                     <span class="item_li_content">Windows 7 , Enterprise Edition , 6.1.7601 SP1 , x64 architecture , 64 bits OS</span>
                   </li>
                   <li class="item_li">
                     <span class="item_li_title">所在域：</span>
                     <span class="item_li_content"></span>
                   </li>
                   <li class="item_li">
                     <span class="item_li_title">IP地址：</span>
                     <span class="item_li_content">114.242.16.83</span>
                   </li>
                 </ul>
               </div>
              <div class="detail_base_bottom">
                <ul>
                  <li class="item_li">
                    <span class="item_li_title">状态：</span>
                    <span class="item_li_content">Windows 7</span>
                  </li>
                  <li class="item_li">
                    <span class="item_li_title">Sensor版本：</span>
                    <span class="item_li_content">2.2.0.23</span>
                  </li>
                  <li class="item_li">
                    <span class="item_li_title">最近一次通讯：</span>
                    <span class="item_li_content">2019-08-22 16:43:24</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="invest-point-detail">
            <div class="invest-point-detail-title">
              <i class="e-icon-detail e-icon-login"></i>
              <h4 class="title">用户登录信息</h4>
            </div>
            <div class="invest_table invest_table_point">
              <el-row class="invest-common-table-pattern">
                <el-col :span="24">
                  <el-table class="common-table" ref="multipleTable" :data="tablePointData1">
                    <el-table-column prop="computer_name" label="计算机名称" min-width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="login_type" label="登录类型" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="time" label="登录时间" min-width="100" show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="24" class="e-pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    :total="20"
                    layout="total, sizes, prev, pager, next, jumper"
                  ></el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="invest-point-detail">
            <div class="invest-point-detail-title">
              <i class="e-icon-detail e-icon-process"></i>
              <h4 class="title">带有网络连接的进程</h4>
            </div>
            <div class="invest_table invest_table_point">
              <el-row class="invest-common-table-pattern">
                <el-col :span="24">
                  <el-table class="common-table" ref="multipleTable" :data="tablePointData1">
                    <el-table-column prop="computer_name" label="计算机名称" min-width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="login_type" label="登录类型" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="time" label="登录时间" min-width="100" show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="24" class="e-pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    :total="20"
                    layout="total, sizes, prev, pager, next, jumper"
                  ></el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="invest-point-detail">
            <div class="invest-point-detail-title">
              <i class="e-icon-detail e-icon-device"></i>
              <h4 class="title">外接移动设备</h4>
            </div>
            <div class="invest_table invest_table_point">
              <el-row class="invest-common-table-pattern">
                <el-col :span="24">
                  <el-table class="common-table" ref="multipleTable" :data="tablePointData1">
                    <el-table-column prop="computer_name" label="计算机名称" min-width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="login_type" label="登录类型" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="time" label="登录时间" min-width="100" show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="24" class="e-pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    :total="20"
                    layout="total, sizes, prev, pager, next, jumper"
                  ></el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="invest-point-detail">
            <div class="invest-point-detail-title">
              <i class="e-icon-detail e-icon-time"></i>
              <h4 class="title">创建定时任务</h4>
            </div>
            <div class="invest_table invest_table_point">
              <el-row class="invest-common-table-pattern">
                <el-col :span="24">
                  <el-table class="common-table" ref="multipleTable" :data="tablePointData1">
                    <el-table-column prop="computer_name" label="计算机名称" min-width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="login_type" label="登录类型" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="time" label="登录时间" min-width="100" show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="24" class="e-pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    :total="20"
                    layout="total, sizes, prev, pager, next, jumper"
                  ></el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: "invest_host",
    data() {
      return {
        activeButGroup:'1',
        activeName: 'first',
        loading_net:true,
        loading_point:true,
        params_net: {
          host_ip: "",
          startTime: "",
          endTime: "",
        },
        params_point: {
          domain_ip: "",
          port:"",
          process: "",
          startTime: "",
          endTime: "",
        },
        tableNetData1: [
          {
            pid: '01',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            ori_address: "192.168.1.187",
            ori_port: "29284",
            des_address: "119.255.133.57",
            des_port: "443",
            email:'teredo@ipv6microsoft.com',
            apply:'— —'
          },
          {
            pid: '02',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            ori_address: "192.168.1.187",
            ori_port: "29284",
            des_address: "119.255.133.57",
            des_port: "443",
            email:'teredo@ipv6microsoft.com',
            apply:'— —'
          },
          {
            pid: '03',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            ori_address: "192.168.1.187",
            ori_port: "29284",
            des_address: "119.255.133.57",
            des_port: "443",
            email:'teredo@ipv6microsoft.com',
            apply:'— —'
          }
        ],
        tableNetData2: [
          {
            pid: '01',
            file: "/cgi-bin/httpcom",
            hash: "eoiquoiquw1038129dhjlkasda3102843jksdhfl7",
            ori: "220.194.93.12",
            host_ip: "119.255.133.57",
            apply:'— —'
          },
          {
            pid: '02',
            file: "/cgi-bin/httpcom",
            hash: "eoiquoiquw1038129dhjlkasda3102843jksdhfl7",
            ori: "220.194.93.12",
            host_ip: "119.255.133.57",
            apply:'— —'
          },
          {
            pid: '03',
            file: "/cgi-bin/httpcom",
            hash: "eoiquoiquw1038129dhjlkasda3102843jksdhfl7",
            ori: "220.194.93.12",
            host_ip: "119.255.133.57",
            apply:'— —'
          }
        ],
        tableNetData3: [
          {
            pid: '01',
            user: "Centerhttpcomdm",
            host_ip: "192.168.1.187",
            apply:'— —'
          },
          {
            pid: '02',
            user: "Centerhttpcomdm",
            host_ip: "192.168.1.187",
            apply:'— —'
          },
          {
            pid: '03',
            user: "Centerhttpcomdm",
            host_ip: "192.168.1.187",
            apply:'— —'
          }
        ],
        tablePointData1: [
          {
            computer_name: "JamesWin7-64Pro",
            login_type: "系统管理员登录",
            time: "2019-08-22 16:43:24"
          }
        ],
        tablePointData2: [
          {
            computer_name: "JamesWin7-64Pro",
            login_type: "系统管理员登录",
            time: "2019-08-22 16:43:24"
          }
        ],
        tablePointData3: [
          {
            computer_name: "JamesWin7-64Pro",
            login_type: "系统管理员登录",
            time: "2019-08-22 16:43:24"
          }
        ],
        tablePointData4: [
          {
            computer_name: "JamesWin7-64Pro",
            login_type: "系统管理员登录",
            time: "2019-08-22 16:43:24"
          }
        ]
      };
    },
    components:{
      VmEmergePicker
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      changeTime(data) {
        this.params_net.startTime = data[0].valueOf();
        this.params_net.endTime = data[1].valueOf();
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/invest-common-pattern.less";
  @import "../../../assets/css/less/invest-common-table-pattern.less";
  #invest_host{
    .invest_form_network{
      .invest_btn_group{
        height: 58px;
        text-align: left;
        /deep/
        .el-button-group{
          padding: 15px 0 9px 0;
          .el-button{
            border: 1px solid #0070FF;
            background: #fff;
            font-size: 14px;
            color: #0070FF;
            width: 112px;
            height: 34px;
            padding: 0;
            font-family: PingFangSC-Regular;
            &.active{
              color: #fff;
              background: #0070FF;
            }
            &:first-child{
              border-right-width:0;
            }
          }
        }
      }
    }
    .invest-point-detail{
      margin: 26px 0;
      text-align: left;
      .invest-point-detail-title{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ececec;
        .e-icon-detail{
          display: inline-block;
          width: 18px;
          height: 18px;
          background-size: 16px;
          vertical-align: middle;
          background-repeat: no-repeat;
          &.e-icon-computer{
            background-image: url("../../../assets/images/invest/computer.png");
          }
          &.e-icon-login{
            background-image: url("../../../assets/images/invest/user.png");
          }
          &.e-icon-process{
            background-image: url("../../../assets/images/invest/process.png");
          }
          &.e-icon-device{
            background-image: url("../../../assets/images/invest/device.png");
          }
          &.e-icon-time{
            background-image: url("../../../assets/images/invest/time.png");
          }
        }
        .title{
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          color: #333;
          font-family: PingFangSC-Medium;
        }
        &.detail-computer{
          .title{
            color: #0070FF;
          }
          .e-icon{
            color: #0070FF;
          }
        }
      }
      .invest-point-detail-content{
        display: flex;
        .detail_base_bottom{
          flex: 1;
          .item_li{
            height: 48px;
            line-height: 48px;
            display: flex;
            font-size: 16px;
            font-family: PingFangSC-Regular;
            .item_li_title{
              width: 140px;
              color: #333333;
            }
            .item_li_content{
              flex: 1;
              color: #666666;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
