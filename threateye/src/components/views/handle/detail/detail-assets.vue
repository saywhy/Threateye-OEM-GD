<template>
    <div class="detail-assets" v-cloak>
      <back-title :title-name="title_name"></back-title>
      <div class="detail_base_top">
          <div class="top_left">
            <img src="@/assets/images/handle/others/detail_a_1.png" alt="">
            <span class="top_left_title">tenm.saicmotor.com</span>
          </div>
          <div class="top_right">
            <el-row class="common_btn">
              <el-col :span="24" class="common_btn_list">
                <el-dropdown @command="change_state" trigger="click" placement='bottom-start' size='148'>
                  <el-button type="primary" class="change_btn">
                    <span>状态变更</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                    <el-dropdown-item command="处置中" class="select_item">处置中</el-dropdown-item>
                    <el-dropdown-item command="已处置" class="select_item">已处置</el-dropdown-item>
                    <el-dropdown-item command="已忽略" class="select_item">已忽略</el-dropdown-item>
                    <el-dropdown-item command="误报" class="select_item">误报</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="change_task" placement='bottom-start' trigger="click">
                  <el-button type="primary" class="change_btn">
                    <span>工单任务</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                    <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
                    <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
          <div style="clear:both;"></div>
      </div>
      <div class="detail_base_mid">
          <div class="bom_item">
              <li>
                  <span class="title"><i class="b_i b_name"></i>失陷确定性：</span>
                  <span class="content">{{detail.fall_certainty}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>威胁等级：</span>
                  <span class="content">{{detail.degree}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>资产类型：</span>
                  <span class="content">服务器</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>分支：</span>
                  <span class="content">总部</span>
              </li>
          </div>
          <div class="bom_item">
              <li>
                  <span class="title">业务：</span>
                <span class="content">业务1</span>
              </li>
              <li>
                  <span class="title">工单名称：</span>
                  <span class="content">告警1</span>
              </li>
              <li>
                  <span class="title">工单状态：</span>
                  <span class="content">未关联工单</span>
              </li>
          </div>
      </div>

      <!--攻击阶段分布-->
      <div class="detail_base_stg">
        <div class="top_left">
          <img class="b_img" src="@/assets/images/handle/others/detail_a_1.png" />
          <span class="title_name">告警日志信息</span>
        </div>
        <div class="stg-content">
          <vm-hanle-rank></vm-hanle-rank>
        </div>
      </div>

      <!--威胁及安全建议-->
      <div class="detail_base_mag">
        <div class="osm-top">
          <img class="osm-img" src="@/assets/images/handle/risks/edit.png">
          <span class="osm-title">威胁及安全建议</span>
        </div>
        <div class="osm-middle">
          <dl>
            <dt class="osm-dt">威胁描述</dt>
            <dd class="osm-dd">横向威胁是指攻击者为了了解所处的网络环境或者找到网络内的目标而实施的内网的扫描、暴力破解、漏洞利用、远程账号登录、远程程序以及命令执行等动作。</dd>
          </dl>
          <dl>
            <dt class="osm-dt">安全建议</dt>
            <dd class="osm-dd">
              <ul>
                <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
                <li>2、部署带有静态分析、动态分析、漏洞防御、主机防火墙、主机IPS等多重防御功能的端点安全解决方案；</li>
                <li>3、采用端点检测和响应解决方案（EDR）大力提升在端点上的威胁检测和响应的能力，包括合法账号的异常登录、系统自带或者管理员使用的工具的非法使用等；</li>
                <li>4、部署东西向流量的网络威胁检测和响应解决方案。</li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>

      <!-- tabs列表 -->
      <div class="detail_base_bom">

        <el-tabs v-model="activeName">
          <!-- 网络风险视角 -->
          <el-tab-pane label="网络风险视角" class="tabs-item" name="first">
            <el-table class="handle_table_detail"
                      ref="multipleTable"
                      align="center"
                      :data="table.tableData"
                      tooltip-effect="dark"
                      style="width: 100%">
              <el-table-column label="告警时间" width="150">
                <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
              </el-table-column>
              <el-table-column prop="category" label="告警类型" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="src_ip" label="源地址" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="application" label="应用" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="威胁等级">
                <template slot-scope="scope">
                  <el-dropdown @command="change_degree" trigger="click" class="degree_box" :class="scope.row.color">
                    <el-button type="primary" @click.stop>
                      {{ scope.row.degree }}
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="['高危',scope.$index,'high']" v-if="scope.row.degree !='高危'">
                        高危
                      </el-dropdown-item>
                      <el-dropdown-item :command="['中危',scope.$index,'mid']" v-if="scope.row.degree !='中危'">
                        中危
                      </el-dropdown-item>
                      <el-dropdown-item :command="['低危',scope.$index,'low']" v-if="scope.row.degree !='低危'">
                        低危
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
              <el-table-column prop="detect_engine" label="失陷确定性" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="状态" width="80">
                <template slot-scope="scope">{{ scope.row.status | dispose }}</template>
              </el-table-column>
            </el-table>
            <el-pagination class="handle_pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="table.count"
                           :page-sizes="[5,10,20]"
                           :page-size="table.eachPage"
                           :current-page="table.pageNow"
                           layout="total, sizes, prev, pager, next">
            </el-pagination>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
import VmHanleRank from '../vm-handle/vm-handle-rank'
export default {
  name: "detail-assets",
  components: {backTitle,VmHanleRank},
  data() {
    return {
      detail:{},
      title_name: "风险资产详情",
      activeName: 'first',
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        loading:true
      },

      //弹窗部分
      state_change: false,
      process_state: "",
    };
  },

  created(){
    let detail = this.$route.query.detail;
    this.detail = detail;
    this.get_list_assets_detail();

    console.log(this.detail)
  },
  methods: {
    //获取资产详情列表
    get_list_assets_detail() {
      this.$axios.get('/api/yiiapi/asset/alert-list',
        {
          params: {
            asset_ip:'192.168.1.186',
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        })
        .then((resp) => {

          let {status, data} = resp.data;

          let datas = data;

          if (status == 0) {

            let {data, count, maxPage, pageNow} = datas;

            this.table.tableData = data;
            this.table.count = count;
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;

          }
        });
    },

    //每頁多少條切換
    handleSizeChange(val) {
      console.log(val)
      this.table.eachPage = val;
      this.get_list_assets_detail();
    },
    //頁數點擊切換
    handleCurrentChange(val) {
      this.table.pageNow = val;
      this.get_list_assets_detail();
    },
    /*****************************/

    // 状态变更选择
    change_state(command) {
      this.process_state = command;
      this.open_state();
    },
    // 打开状态变更弹窗
    open_state() {
      this.state_change = true;
    },
    closed_state() {
      this.state_change = false;
    },
    //状态变更取消按钮点击
    cancel_state() {
      this.closed_state();
    },
    //改变告警等级
    change_degree(command) {
      console.log(command);
      this.tableData3.forEach(function(item, index) {
        if (command[1] == index) {
          item.degree = command[0];
          item.color = command[2];
        }
      });
    },

    /***************工单任务*****************/
    change_task(command) {
      if (command == "新建工单") {
        this.open_task_new();
      }
      this.job_task = command;
    }
  }
};
</script>

<style scoped lang="less">
  .detail-assets {
    text-align: left;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #ececec;
      .top_left {
        float: left;
        margin-top: 12px;
        img {
          vertical-align: middle;
        }
        .top_left_title {
          vertical-align: middle;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          font-weight: bold;
        }
      }
      .top_right {
        float: right;
        .common_btn {
          margin-top: 10px;
          .common_btn_list {
            font-size: 0;
            /deep/
            .el-dropdown {
              margin-right: 8px;
            }
            /*.b_btn_124 {
              font-size: 14px;
              height: 42px;
              width: 124px;
              outline: none;
              margin-left: 8px;
              line-height: 0;
              font-family: PingFangSC-Medium;
              &.b_btn_status {
                color: #fff;
                background: #0070FF;
                border: 1px solid #0070FF;
              }
            }*/
          }
        }

      }
    }

    .detail_base_mid {
      padding: 24px 56px;
      background: #fff;
      display: flex;
      height: 247px;
      .bom_item {
        flex: 1;
        li {
          display: flex;
          margin-bottom: 16px;
          line-height: 36px;
          .title {
            width: 125px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            .b_i{
              width: 18px;
              height: 18px;
              display: inline-block;
              &.b_name{
                vertical-align: middle;
                background-repeat: no-repeat;
                background-size: 18px;
                background-image: url("../../../../assets/images/handle/others/works-name.png");
              }
            }
          }
          .content {
            flex: 1;
            font-size: 16px;
            color: #666666;
            .status {
              background: #eef6ff;
              border-radius: 2px;
              font-size: 10px;
              color: #999999;
              padding: 5px 14px;
            }
          }
        }
      }
    }

    .detail_base_stg {
      margin: 24px 0;
      background: #fff;
      height: 171px;
      .top_left {
        height: 62px;
        line-height: 60px;
        text-align: left;
        padding: 0 56px;
        border-bottom: 1px solid #ececec;
        .b_img {
          vertical-align: middle;
        }
        .title_name {
          vertical-align: middle;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          font-weight: bold;
        }
      }
      .stg-content {
        margin: 0 56px;
        height: 110px;
        position: relative;
      }
    }

    .detail_base_mag {
      margin: 24px 0;
      height: 283px;
      background-color: #fff;
      text-align: left;
      .osm-top{
        height: 62px;
        line-height: 62px;
        border-bottom: 1px solid #ECECEC;
        padding: 0 56px;
        .osm-img{
          display: inline-block;
          width: 24px;
          height: 24px;
          margin: 19px 0;
        }
        .osm-title{
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          margin-left: 6px;
        }
      }
      .osm-middle{
        height: 220px;
        padding: 16px 56px;
        .osm-dt{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          margin: 5px 0;
        }
        .osm-dd{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
        }

      }
    }

    .detail_base_bom {
      margin-top: 24px;
      /*height: 717px;*/
      height: auto;
      background: #fff;
      padding: 24px 56px;

      /deep/
      .handle_table_detail {
        .el-table__header-wrapper{
          .el-table__header{
            thead.has-gutter{
              th{
                background: #F8F8F8;
                height: 48px;
                .cell{
                  color: #333;
                  font-size: 14px;
                  font-weight: bold;
                  font-family: PingFangSC-Medium;
                }
              }
            }
          }
        }
        .el-table__body-wrapper{
          .el-table__row {
            height: 48px;
          }
          td > .cell{
            .degree_box {
              button {
                height: 30px;
                width: 72px;
                padding: 0;
                border: 0;
              }
            }
            .high {
              button {
                background: #dc5f5f;
              }
            }
            .mid {
              button {
                background: #e0c840;
              }
            }
            .low {
              button {
                background: #47cad9;
              }
            }
          }
        }
      }
      .handle_pagination_box {
        margin: 24px 0;
        text-align: center;
      }
      /deep/
      .el-tabs{
        .el-tabs__header{
          .el-tabs__nav-wrap{
            &:after{
              background-color:#EEF6FF;
            }
            .el-tabs__nav{
              /*line*/
              .el-tabs__active-bar{
                top: 0!important;
                width: 164px!important;
                background-color: #0070FF;
                transition: transform .1s cubic-bezier(.645,.045,.355,1),
                -webkit-transform .1s cubic-bezier(.645,.045,.355,1);
              }
              /*tabs*/
              .el-tabs__item{
                padding: 0!important;
                width: 164px;
                font-size: 14px;
                color: #bbb;
                text-align: center;
                &.is-active{
                  color: #0070FF;
                  background: #EEF6FF;
                }
              }
            }
          }
        }
      }
    }
}


</style>
<style lang="less">
  .dropdown_ul_box {
    width: 136px!important;
    margin-right: 8px;
  }
</style>




