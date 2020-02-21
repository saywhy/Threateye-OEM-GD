<template>
    <div class="detail-works" v-cloak>
      <back-title :title-name="title_name"></back-title>
      <div class="detail_base_top">
          <div class="top_left">
              <img class="top_left_img" src="@/assets/images/handle/others/works.png" alt="">
              <span class="top_left_title">基本信息</span>
          </div>
          <div class="top_right">
            <el-button class="download_btn">下载</el-button>
          </div>
      </div>
      <div class="detail_base_mid">
          <div class="bom_item">
              <li>
                  <span class="title"><i class="b_i b_name"></i>工单名称：</span>
                  <span class="content">威胁告警代码ze0001</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>创建人：</span>
                  <span class="content">admin</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>经办人：</span>
                  <span class="content">admin</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>状态：</span>
                  <span class="content">未处置</span>
              </li>
          </div>
          <div class="bom_item">
              <li>
                  <span class="title">优先级：</span>
                <span class="content">极高</span>
              </li>
              <li>
                  <span class="title">创建时间：</span>
                  <span class="content">2019.10.22 18:14:32</span>
              </li>
              <li>
                  <span class="title">更新时间：</span>
                  <span class="content">2019.11.04 15:33:56</span>
              </li>
              <li>
                  <span class="title">备注：</span>
                  <span class="content">备注内容备注内容备注内容备注内容备</span>
              </li>
          </div>
      </div>
      <div class="detail_base_bom">
        <!-- tabs列表 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">

          <!-- 资产维度综合告警 -->
          <el-tab-pane label="资产维度综合告警" class="tabs-item" name="first">
            <el-table class="handle_table_detail" ref="multipleTable" align="center" :data="handle_data_1.now" tooltip-effect="dark"
                      style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column prop="assets" label="资产" show-overflow-tooltip></el-table-column>
              <el-table-column prop="assets_val" label="资产值" show-overflow-tooltip></el-table-column>
              <el-table-column prop="threaten" label="关联威胁" show-overflow-tooltip></el-table-column>
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
              <el-table-column prop="is_ok" label="失联确定性" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
            </el-table>
            <el-pagination class="handle_pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="handle_data_1.pageNow"
                           :page-sizes="[10,50,100]" :page-size="10"
                           layout="total, sizes, prev, pager, next"
                           :total="handle_data_1.count">
            </el-pagination>
          </el-tab-pane>

          <!-- 网络风险视角 -->
          <el-tab-pane label="网络风险视角" class="tabs-item" name="second">
            <el-table class="handle_table_detail" ref="multipleTable" align="center" :data="handle_data_2.now" tooltip-effect="dark"
                      style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column prop="assets" label="资产" show-overflow-tooltip></el-table-column>
              <el-table-column prop="assets_val" label="资产值" show-overflow-tooltip></el-table-column>
              <el-table-column prop="threaten" label="关联威胁" show-overflow-tooltip></el-table-column>
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
              <el-table-column prop="is_ok" label="失联确定性" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
            </el-table>
            <el-pagination class="handle_pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="handle_data_2.pageNow"
                           :page-sizes="[10,50,100]" :page-size="10"
                           layout="total, sizes, prev, pager, next"
                           :total="handle_data_2.count">
            </el-pagination>
          </el-tab-pane>

        </el-tabs>
      </div>
      <div class="detail_base_cot">
        <div class="top_left">
          <img class="top_left_img" src="@/assets/images/handle/others/works.png" alt="">
          <span class="top_left_title">回复记录</span>
        </div>
      </div>
      <div class="detail_base_lst">
         <ul class="lit-list">
           <li class="item">
             <img class="lst_left_img" src="@/assets/images/handle/others/user.png" alt="">
             <span class="lst_left_title">admin</span>
             <span class="lst_left_time"><i class="lst_time"></i>2019-11-04 14:33:16</span>
             <p class="lst_left_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
           </li>
           <li class="item">
             <img class="lst_left_img" src="@/assets/images/handle/others/user.png" alt="">
             <span class="lst_left_title">admin</span>
             <span class="lst_left_time"><i class="lst_time"></i>2019-11-04 14:33:16</span>
             <p class="lst_left_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
           </li>
           <li class="item">
             <img class="lst_left_img" src="@/assets/images/handle/others/user.png" alt="">
             <span class="lst_left_title">admin</span>
             <span class="lst_left_time"><i class="lst_time"></i>2019-11-04 14:33:16</span>
             <p class="lst_left_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
           </li>
           <li class="item">
             <img class="lst_left_img" src="@/assets/images/handle/others/user.png" alt="">
             <span class="lst_left_title">admin</span>
             <span class="lst_left_time"><i class="lst_time"></i>2019-11-04 14:33:16</span>
             <p class="lst_left_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
           </li>
           <li class="item">
             <img class="lst_left_img" src="@/assets/images/handle/others/user.png" alt="">
             <span class="lst_left_title">admin</span>
             <span class="lst_left_time"><i class="lst_time"></i>2019-11-04 14:33:16</span>
             <p class="lst_left_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
           </li>
         </ul>
         <el-pagination class="detail_pagination"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="handle_data_1.pageNow"
                       :page-sizes="[10,50,100]" :page-size="10"
                       layout="total, sizes, prev, pager, next"
                       :total="handle_data_1.count">
        </el-pagination>
      </div>
      <div class="detail_base_fot">
        <textarea class="detail_works_reply"></textarea>
      </div>
      <div class="detail_base_anw">
        <el-button class="detail_works_answer">回复</el-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: "detail-works",
  components: {
    backTitle
  },
  data() {
    return {
      title_name: "工单详情",
      activeName: 'first',
      handle_data_1: {
        choose: 0,
        pageNow: 1,
        count: 4,
        now: [
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "高危",
            color: "high",
            is_ok: "— —",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "中危",
            color: "mid",
            is_ok: "— —",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "低危",
            color: "low",
            is_ok: "— —",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "中危",
            color: "mid",
            is_ok: "— —",
            status: "待处置"
          }
        ]
      },
      handle_data_2: {
        choose: 0,
        pageNow: 1,
        count: 4,
        now: [
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "高危",
            color: "high",
            is_ok: "— —",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "中危",
            color: "mid",
            is_ok: "— —",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            assets_val: "服务器",
            threaten: "恶意地址",
            degree: "低危",
            color: "low",
            is_ok: "— —",
            status: "待处置"
          }
        ]
      }
    };
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

    /*****************************/
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("1111");
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
    }
  }
};
</script>

<style scoped lang="less">
  .detail-works {
    text-align: left;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #ececec;
      .top_left {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 46px;
        .top_left_img {
          vertical-align: middle;
          transform: scale(.5);
        }
        .top_left_title {
          font-family: PingFangSC-Medium;
          vertical-align: middle;
          font-size: 16px;
          color: #333333;
        }
      }
      .top_right {
        float: right;
        line-height: 62px;
        .download_btn {
          height: 34px;
          width: 116px;
          padding: 0;
          color: #fff;
          font-size: 14px;
          background: #0070ff;
          border: 1px solid #0070ff;
          font-family: PingFangSC-Medium;
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
            width: 120px;
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
    .detail_base_bom {
      margin-top: 24px;
      height: 717px;
      background: #fff;
      padding: 24px 56px;
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
        .el-tabs__content{
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
        }

      }
    }
    .detail_base_cot {
        margin-top: 24px;
        padding: 0 56px;
        height: 62px;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #ececec;
        .top_left {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 46px;
          .top_left_img {
            vertical-align: middle;
            transform: scale(.5);
          }
          .top_left_title {
            font-family: PingFangSC-Medium;
            vertical-align: middle;
            font-size: 16px;
            color: #333333;
          }
        }
      }
    .detail_base_lst {
      height: 532px;
      background: #fff;
      .lit-list{
        margin: 0 56px;
        .item{
          height: 88px;
          position: relative;
          border-bottom: 1px solid #ececec;
          .lst_left_img{
            position: absolute;
            width: 34px;
            height: 34px;
            top: 16px;
            left: 16px;
          }
          .lst_left_title{
            position: absolute;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            text-align: center;
            width: 64px;
            height: 32px;
            bottom: 0;
            display: block;
          }
          .lst_left_time{
            position: absolute;
            left: 80px;
            top: 6px;
            font-size: 12px;
            color: #999999;
            font-family: PingFangSC-Regular;
            .lst_time{
              margin-right: 5px;
              height: 16px;
              width: 16px;
              background-repeat: no-repeat;
              display: inline-block;
              background-size: 16px;
              vertical-align: middle;
              margin-top: -2px;
              background-image: url("../../../../assets/images/handle/others/time.png");
            }
          }
          .lst_left_content{
            position: absolute;
            left: 80px;
            top: 34px;
            font-size: 14px;
            color: #333333;
            font-family: PingFangSC-Regular;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;  /*要显示的行数*/
            -webkit-box-orient: vertical;
          }
        }

      }
      .detail_pagination{
        text-align: center;
        margin-top: 24px;
      }
    }
    .detail_base_fot {
      margin: 24px 56px;
      height: 156px;
      background: #fff;
      .detail_works_reply{
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        resize:none;
      }
    }

    .detail_base_anw{
      height: 42px;
      margin: 0 56px 36px 56px;
      text-align: right;
      /deep/
      .detail_works_answer{
        width: 148px;
        height: 42px;
        color: #fff;
        outline: none;
        font-size: 14px;
        background: #0070FF;
        font-family: PingFangSC-Medium;
      }
    }

}
</style>
