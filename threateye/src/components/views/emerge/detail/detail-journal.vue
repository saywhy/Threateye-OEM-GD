<template>
    <div class="detail-journal" v-cloak>
        <back-title :title-name="title_name"></back-title>
        <!-- 基础信息 -->
        <div class="detail_base">
            <div class="detail_base_top">
                <div class="top_left">
                    <img src="@/assets/images/emerge/ip.png" alt="">
                    <span class="top_left_title">182.92.12.11-182.92.12.11</span>
                </div>
                <div class="top_right">
                    <el-dropdown @command="change_state" trigger="click" placement='bottom-start' size='148'>
                        <el-button type="primary" class="change_btn">
                            <span>状态变更</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown" class="dropdown_ul_box_detail">
                            <el-dropdown-item command="处置中" class="select_item">处置中</el-dropdown-item>
                            <el-dropdown-item command="已忽略" class="select_item">已忽略</el-dropdown-item>
                            <el-dropdown-item command="误报" class="select_item">误报</el-dropdown-item>
                            <el-dropdown-item command="已处置" class="select_item">已处置</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown @command="change_task" placement='bottom-start' trigger="click">
                        <el-button type="primary" class="change_btn">
                            <span>工单任务</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown" class="dropdown_ul_box_detail">
                            <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
                            <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button class="edit_btn">编辑标签</el-button>
                </div>
            </div>
            <div class="detail_base_bottom">
                <div class="detail_base_bottom_item">
                    <ul>
                        <li class="item_li">
                            <span class="item_li_title">威胁指标:</span>
                            <span class="item_li_content src_active" @click="src_active">
                                182.92.12.11-182.92.12.11
                            </span>
                            <ul class="src_ul" v-show='src_active_ul'>
                                <li @click="src_active_item('1')">威胁追查</li>
                                <li @click="src_active_item('2')">添加到外部动态列表</li>
                            </ul>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">风险资产:</span>
                            <span class="item_li_content">192.168.1.153</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">告警设备IP:</span>
                            <span class="item_li_content">192.168.1.2</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">信心指数:</span>
                            <span class="item_li_content">80</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">威胁程度:</span>
                            <span class="item_li_content">
                                <img src="@/assets/images/emerge/start_i.png" alt="">
                                <img src="@/assets/images/emerge/start_i.png" alt="">
                                <img src="@/assets/images/emerge/start_i.png" alt="">
                                <img src="@/assets/images/emerge/start_i.png" alt="">
                                <img src="@/assets/images/emerge/start_o.png" alt="">
                            </span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">情报来源:</span>
                            <div class="item_li_content">
                                <ul>
                                    <li class="tag_btn_box">
                                        <span class="tag_btn">alienvault.reputation</span>
                                    </li>
                                    <li class="tag_btn_box">
                                        <span class="tag_btn">alienvault.reputation</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="detail_base_bottom_item">
                    <ul>
                        <li class="item_li">
                            <span class="item_li_title">告警类型:</span>
                            <span class="item_li_content">Spamming</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">指标类型:</span>
                            <span class="item_li_content">IPv4</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">告警时间:</span>
                            <span class="item_li_content"> 2018-06-01 10:13</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">首次出现:</span>
                            <span class="item_li_content">2018-05-31 00:55</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">最近出现:</span>
                            <span class="item_li_content">2018-05-31 00:55</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 日志信息 -->
        <div class="detail_loginfo">
            <div class="loginfo_title">
                <img class="b_img" src="@/assets/images/emerge/jour.png" />
                <span class="title_name">告警日志信息</span>
            </div>
            <div class="loginfo_content">
                <p class="loginfo_content_p">%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.168.1.20, source-port=41188, destination-ip=182.92.12.11, destination-port=123, time=2018/6/1 10:15:38, source-zone=trust, destination-zone=untrust, rule-name=INTENET.%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.168.1.20, source-port=41188, destination-ip=182.92.12.11, destination-port=123, time=2018/6/1 10:15:38, source-zone=trust, destination-zone=untrust, rule-name=INTENET.%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.168.1.20, source-port=41188, destination-ip=182.92.12.11, destination-port=123, time=2018/6/1 10:15:38, source-zone=trust, destination-zone=untrust, rule-name=INTENET.</p>
            </div>
        </div>
        <!-- 告警列表 -->
        <div class="emerge_box">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="reset_tab">
                <el-tab-pane label="当前受威胁资产" class="tabs-item" name="first">
                    <el-table class="emerge_table" ref="multipleTable" align="center" :data="emerge_list.now" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="date" width="150" label="告警时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="categroy" width="150" label="威胁类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="risk" width="150" label="风险资产" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="info" label="告警信息" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="degree" width="100" label="威胁等级" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="fail" width="100" label="失陷确定性" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="status" width="100" label="状态">
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="emerge_list.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="emerge_list.count">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="历史受威胁资产" class="tabs-item" name="second">
                    <el-table class="emerge_table" ref="multipleTable" align="center" :data="emerge_list.old" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="date" width="150" label="告警时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="categroy" width="150" label="威胁类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="risk" width="150" label="风险资产" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="info" label="告警信息" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="degree" width="100" label="威胁等级" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="fail" width="100" label="失陷确定性" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="status" width="100" label="状态">
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="emerge_list.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="emerge_list.count">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: "detail-journal",
  components: {
    backTitle
  },
  data() {
    return {
      title_name: "告警详情",
      src_active_ul: false,
      emerge_list: {
        title: ["当前告警资产", "历史告警资产"],
        choose: 0,
        pageNow: 1,
        count: 120,
        now: [
          {
            date: "2019-10-11 11:31:10",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-10-11 11:31:10",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-10-11 11:31:10",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-10-11 11:31:10",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-10-11 11:31:10",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          }
        ],
        old: [
          {
            date: "2019-11-01 21:11:50",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-11-01 21:11:50",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-11-01 21:11:50",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-11-01 21:11:50",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          },
          {
            date: "2019-11-01 21:11:50",
            categroy: "Malicious Host",
            degree: "高危",
            risk: "223.17.229.272",
            info:
              "%%01POLICY/6/POLICYPERMIT(l):vsys=public, protocol=17, source-ip=192.1…",
            fail: "--",
            status: "待处置"
          }
        ]
      },
      src_active_ul: false,
      activeName: "first"
    };
  },
  methods: {
    src_active() {
      this.src_active_ul = !this.src_active_ul;
    },
    src_active_item(num) {
      this.src_active_ul = false;
    },
    change_state() {},
    change_task() {},
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(tab, event) {
      console.log(tab);
    }
  }
};
</script>

<style scoped lang="less">
.detail-journal {
  background: #f8f8f8;
  border-bottom: 1px solid #f8f8f8;
  img {
    vertical-align: middle;
  }
  //   基础信息
  .detail_base {
    height: 323px;
    background: #fff;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      overflow: hidden;
      .top_left {
        float: left;
        line-height: 62px;
        img {
          vertical-align: middle;
        }
        .top_left_title {
          vertical-align: middle;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
        }
      }
      .top_right {
        float: right;
        line-height: 62px;
        .change_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #0070ff;
        }
        .edit_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #fff;
          border: 1px solid #0070ff;
          color: #0070ff;
        }
      }
    }
    .detail_base_bottom {
      height: 260px;
      padding: 24px 56px;
      display: flex;
      .detail_base_bottom_item {
        text-align: left;
        flex: 1;
        .item_li {
          display: flex;
          height: 22px;
          margin-bottom: 16px;
          position: relative;
          .src_ul {
            width: 180px;
            padding: 10px 0;
            background: #fff;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);
            position: absolute;
            left: 96px;
            top: 22px;
            z-index: 99;
            li {
              height: 32px;
              line-height: 32px;
              padding: 0 12px;
              cursor: pointer;
            }
            li:hover {
              background: #eef6ff;
            }
          }
          .item_li_title {
            width: 96px;
            font-size: 16px;
            color: #333333;
          }
          .item_li_content {
            flex: 1;
            font-size: 16px;
            color: #666;
            .tag_btn_box {
              display: inline-block;
              height: 20px;
              padding: 0 3px;
              border-radius: 2px;
              color: #ffffff;
              background: #5389e0;
              text-align: center;
            }
            .tag_btn {
              height: 20px;
              font-size: 10px;
              line-height: 20px;
              font-family: PingFangSC-Regular;
              transform: scale(0.8);
              display: block;
            }
            img {
              vertical-align: middle;
            }
          }
          .src_active {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #0070ff;
            cursor: pointer;
          }
        }
      }
    }
  }
  //   日志信息
  .detail_loginfo {
    margin: 24px 0;
    background: #fff;
    .loginfo_title {
      height: 62px;
      line-height: 62px;
      text-align: left;
      padding: 0 56px;
      border-bottom: 1px solid #ececec;
      .title_name {
        vertical-align: middle;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
      }
    }
    .loginfo_content {
      padding: 24px 56px;
      .loginfo_content_p {
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
      }
    }
  }
  //   告警列表
  .emerge_box {
    padding: 24px 56px;
    background: #fff;
    .pagination_box {
      margin-top: 24px;
    }
    .emerge_table {
      .el-table th.is-leaf {
        border-bottom: 1px solid #fff;
      }
      .el-table {
        th {
          .cell {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
          }
        }
      }
      th > .cell {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
      }
      .el-table__row {
        height: 42px;
      }
    }
  }
  .detail {
    margin-bottom: 30px;
    background-color: #fff;
    &.detail1 {
      height: 292px;
      .content-header {
        height: 60px;
        line-height: 60px;
        padding: 0 56px;
        border-bottom: 1px solid #ececec;
        .btn-group-left {
          text-align: left;
          .b_img {
            vertical-align: middle;
            margin-top: -5px;
          }
          .b_title {
            font-size: 14px;
            color: #333333;
            font-weight: bold;
          }
        }
        .btn-group-right {
          text-align: right;
          font-size: 0;
          .b_btn {
            height: 34px;
            width: 124px;
            border-radius: 0;
            font-size: 14px;
            outline: none;
            padding: 9px 20px;
            margin-left: 8px;
            font-family: PingFangSC-Medium;
            &.b_btn_status {
              color: #fff;
              background: #0070ff;
              border: 1px solid #0070ff;
            }
            &.b_btn_label {
              color: #0070ff;
              border: 1px solid #0070ff;
              background-color: #fff;
            }
          }
        }
      }
      .content-info {
        padding: 20px 56px;
        .g_values {
          flex: 1;
          color: #666;
          text-align: left;
        }
        .grids {
          height: 32px;
          line-height: 32px;
          display: flex;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          text-align: left;
          .g_keys {
            min-width: 82px;
            color: #333;
            display: inline-block;
          }
          .g_values {
            flex: 1;
            color: #666;
          }
        }
      }
    }
    &.detail2 {
      min-height: 196px;
      .content-header {
        height: 60px;
        line-height: 60px;
        padding: 0 56px;
        border-bottom: 1px solid #ececec;
        .btn-group-left {
          text-align: left;
          .b_img {
            vertical-align: middle;
            margin-top: -5px;
          }
          .b_title {
            font-size: 14px;
            color: #333333;
            font-weight: bold;
          }
        }
        .btn-group-right {
          text-align: right;
          .b_btn {
            height: 34px;
            width: 124px;
            border-radius: 0;
            font-size: 14px;
            outline: none;
            padding: 9px 20px;
            font-family: PingFangSC-Medium;
            &.b_btn_status {
              color: #fff;
              background: #0070ff;
              border: 1px solid #0070ff;
            }
            &.b_btn_label {
              color: #0070ff;
              border: 1px solid #0070ff;
              background-color: #fff;
            }
          }
        }
      }
      .content-info {
        padding: 20px 56px;
        text-align: left;
        .g_contents {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          line-height: 24px;
          text-align: justify;
        }
      }
    }
    &.detail3 {
      .content-header {
        line-height: 40px;
        padding: 20px 56px;
      }
      .content-info {
        padding: 20px 56px;
        text-align: left;
        .g_contents {
          font-size: 14px;
          color: #333333;
          line-height: 24px;
          text-align: justify;
        }
      }
    }
  }
}
</style>
<style lang="less">
@import "../../../../assets/css/less/reset_css/reset_tab.less";
.dropdown_ul_box_detail {
  width: 124px;
  top: 209px !important;
  .el-dropdown-menu__item:hover {
    color: #606266;
  }
}
// tab栏
.emerge_table {
  th {
    .cell {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }
  td {
    .cell {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
  }
}
</style>
