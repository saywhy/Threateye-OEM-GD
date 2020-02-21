<template>
    <div class="detail-network" v-cloak>
        <back-title :title-name="title_name"></back-title>
        <div class="detail_base">
            <div class="detail_base_top">
                <div class="top_left">
                    <img src="@/assets/images/emerge/top1.png" alt="">
                    <img src="@/assets/images/emerge/top2.png" alt="">
                    <img src="@/assets/images/emerge/top3.png" alt="">
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
                            <span class="item_li_title">源地址:</span>
                            <span class="item_li_content src_active" @click="src_active">
                                192.166.1.156
                            </span>
                            <ul class="src_ul" v-show='src_active_ul'>
                                <li @click="src_active_item('1')">威胁追查</li>
                                <li @click="src_active_item('2')">添加到外部动态列表</li>
                            </ul>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">目的地址:</span>
                            <span class="item_li_content">223.17.229.272</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">告警时间:</span>
                            <span class="item_li_content">2019.11.08 15:33:24</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">威胁指标:</span>
                            <span class="item_li_content">223.17.229.272</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">告警类型:</span>
                            <span class="item_li_content">恶意地址</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">应用:</span>
                            <span class="item_li_content">http</span>
                        </li>
                    </ul>
                </div>
                <div class="detail_base_bottom_item">
                    <ul>
                        <li class="item_li">
                            <span class="item_li_title">检测引擎:</span>
                            <span class="item_li_content">DF</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">失陷确定性:</span>
                            <span class="item_li_content">已失陷</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">标签:</span>
                            <div class="item_li_content">
                                <ul>
                                    <li class="tag_btn_box">
                                        <span class="tag_btn">恶意地址</span>
                                    </li>
                                    <li class="tag_btn_box">
                                        <span class="tag_btn">恶意地址</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">攻击阶段:</span>
                            <span class="item_li_content">提权</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">工单名称:</span>
                            <span class="item_li_content">告警1</span>
                        </li>
                        <li class="item_li">
                            <span class="item_li_title">工单状态:</span>
                            <span class="item_li_content">未关联工单</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 检测时间轴 -->
        <div class="detail_time_box">
            <p class="time_title">检测时间轴</p>
            <div class="time_content">
                <div class="time_left">
                    <ul class="time_left_list">
                        <li class="time_item" v-for="(item,index) in time_list" @click="time_active(index)" :class="{active:time_choose==index}">
                            <div class="triangle" v-show="time_choose==index"></div>
                            <div class="time_item_left">
                                <img src="@/assets/images/emerge/time_false.png" v-show="time_choose!=index">
                                <img src="@/assets/images/emerge/time_true.png" v-show="time_choose==index">
                            </div>
                            <div class="time_item_right">
                                <p>{{item.date}} </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="time_right">
                    <div v-for="(item,index) in time_list" v-show="time_choose==index">
                        <p class="title">详细信息</p>
                        <div class="time_right_info">
                            <div class="time_right_info_top">
                                <li class="info_top_item">
                                    <span class="info_top_item_title">IP:</span>
                                    <span class="info_top_item_content">{{item.ip}}</span>
                                </li>
                                <li class="info_top_item">
                                    <span class="info_top_item_title">流行度:</span>
                                    <span class="info_top_item_content">{{item.popularity}}</span>
                                </li>
                                <li class="info_top_item">
                                    <span class="info_top_item_title">威胁类型:</span>
                                    <span class="info_top_item_content">{{item.categroy}}</span>
                                </li>
                                <li class="info_top_item">
                                    <span class="info_top_item_title">主要受影响地区:</span>
                                    <span class="info_top_item_content">{{item.geo}}</span>
                                </li>
                                <li class="info_top_item">
                                    <span class="info_top_item_title">全球首次发现时间:</span>
                                    <span class="info_top_item_content">{{item.frist_seen}}</span>
                                </li>
                                <li class="info_top_item">
                                    <span class="info_top_item_title">相关联域名:</span>
                                    <span class="info_top_item_content">{{item.domain}}</span>
                                </li>
                            </div>
                            <div class="time_right_info_bom">
                                <span class="info_bom_title">Whois信息:</span>
                                <div class="info_bom_mid">
                                    <li>descr</li>
                                    <li>created</li>
                                    <li>country</li>
                                    <li>net_range</li>
                                    <li>net_name</li>
                                    <li>contact_owner_email</li>
                                    <li>asn</li>
                                </div>
                                <div class="info_bom_right">
                                    <li>{{item.whois.descr}}</li>
                                    <li>{{item.whois.created}}</li>
                                    <li>{{item.whois.country}}</li>
                                    <li>{{item.whois.net_range}}</li>
                                    <li>{{item.whois.net_name}}</li>
                                    <li>{{item.whois.contact_owner_email}}</li>
                                    <li>{{item.whois.asn}}</li>
                                </div>
                            </div>
                        </div>
                        <p class="title">网络事件</p>
                        <div class="time_right_net">
                            <div class="net_title">
                                <li>Method</li>
                                <li>Source IP</li>
                                <li>Destination IP</li>
                                <li>URL</li>
                                <li>User Agent</li>
                                <li>Referrer</li>
                                <li>Traffic</li>
                            </div>
                            <div class="net_content">
                                <li>{{item.net.Method}}</li>
                                <li>{{item.net.SourceIP}}</li>
                                <li>{{item.net.DestinationIP}}</li>
                                <li>{{item.net.URL}}</li>
                                <li>{{item.net.UserAgent}}</li>
                                <li>{{item.net.Referrer}}</li>
                                <li>{{item.net.Traffic}}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 告警列表 -->
        <div class="emerge_box">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="reset_tab">
                <el-tab-pane label="当前受威胁资产" class="tabs-item" name="first">
                    <el-table class="emerge_table" ref="multipleTable" align="center" :data="emerge_list.now" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="date" label="时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="categroy" label="告警类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="src_ip" label="源地址" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="application" label="应用" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="degree" label="告警等级">
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="emerge_list.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="emerge_list.count">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="历史受威胁资产" class="tabs-item" name="second">
                    <el-table class="emerge_table" ref="multipleTable" align="center" :data="emerge_list.old" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="date" label="时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="categroy" label="告警类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="src_ip" label="源地址" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="application" label="应用" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="degree" label="告警等级">
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
  name: "detail-network",
  data() {
    return {
      title_name: "告警详情",
      time_list: [
        {
          date: "2019-11-04 14:33:16",
          ip: "119.188.108.13",
          popularity: "5",
          categroy: "恶意地址",
          geo: "中国,台湾,香港,马来西亚,俄罗斯,越南,印度,美国,澳大利亚,日本",
          frist_seen: "2018-06-08 04:25:24",
          domain: "http://www.baidu.com",
          whois: {
            descr: "China Unicom Shandong Province Network, China Unicom",
            created: "2016-05-04",
            country: "CN",
            net_range: "119.176.0.0 - 119.191.255.255",
            net_name: "UNICOM-SD",
            contact_owner_email: "ip@pub.sd.cninfo.net",
            asn: "4837"
          },
          net: {
            Method: "POST",
            SourceIP: "192.168.1.191: 54553",
            DestinationIP: "119.188.108.13: 80",
            URL: "/",
            UserAgent: "",
            Referrer: "",
            Traffic: "http"
          }
        }
      ],
      time_choose: 0,
      emerge_list: {
        title: ["当前告警资产", "历史告警资产"],
        choose: 0,
        pageNow: 1,
        count: 120,
        now: [
          {
            date: "2019-10-11 11:31:10",
            categroy: "恶意地址",
            indicator: "119.188.108.13",
            src_ip: "192.168.1.191",
            dest_ip: "119.188.108.13",
            application: "http",
            degree: "高危"
          },
          {
            date: "2019-10-11 11:31:10",
            categroy: "恶意地址",
            indicator: "119.188.108.13",
            src_ip: "192.168.1.191",
            dest_ip: "119.188.108.13",
            application: "http",
            degree: "高危"
          },
          {
            date: "2019-10-11 11:31:10",
            categroy: "恶意地址",
            indicator: "119.188.108.13",
            src_ip: "192.168.1.191",
            dest_ip: "119.188.108.13",
            application: "http",
            degree: "高危"
          }
        ],
        old: [
          {
            date: "2019-11-04 14:33:16",
            categroy: "恶意地址",
            indicator: "119.188.108.13",
            src_ip: "192.168.1.191",
            dest_ip: "119.188.108.13",
            application: "http",
            degree: "高危"
          },
          {
            date: "2019-11-04 14:33:16",
            categroy: "恶意地址",
            indicator: "119.188.108.13",
            src_ip: "192.168.1.191",
            dest_ip: "119.188.108.13",
            application: "http",
            degree: "高危"
          },
          {
            date: "2019-11-04 14:33:16",
            categroy: "恶意地址",
            indicator: "119.188.108.13",
            src_ip: "192.168.1.191",
            dest_ip: "119.188.108.13",
            application: "http",
            degree: "高危"
          }
        ]
      },
      src_active_ul: false,
      activeName: "first"
    };
  },
  components: {
    backTitle
  },
  mounted() {
    // this.get();
  },
  methods: {
    change_state() {},
    change_task() {},
    time_active(index) {
      console.log("111");
      this.time_choose = index;
    },
    emerge_list_active(index) {
      this.emerge_list.choose = index;
    },
    src_active() {
      console.log("111");
      this.src_active_ul = !this.src_active_ul;
    },
    src_active_item(num) {
      this.src_active_ul = false;
      console.log(num);
    },
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(tab, event) {
      console.log(tab);
    }
    // get() {
    //   this.$axios
    //     .post("http://192.168.1.77:8081/apis/yiiapi/ipsegment/add", {
    //       name: "23122223123123",
    //       ip_segment: "45.23.23.23/2",
    //       network_type: "网络类型",
    //       person: "责任人",
    //       label: "责任人"
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  }
};
</script>
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
<style scoped lang="less">
.detail-network {
  background: #f8f8f8;
  //   基础信息
  .detail_base {
    height: 323px;
    background: #fff;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .top_left {
        float: left;
        line-height: 62px;
        img {
          vertical-align: middle;
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
  //   检测时间轴
  .detail_time_box {
    height: 716px;
    padding: 36px 56px;
    .time_title {
      height: 22px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      margin-bottom: 12px;
      text-align: left;
    }
    .time_content {
      display: flex;
      .time_left {
        width: 180px;
        float: left;
        background: #fff;
        margin: 0;
        ul.time_left_list {
          width: 180px;
          height: 610px;
          background: #fff;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 0;
          &.time_left_list::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
            z-index: 0;
          }
          &.time_left_list::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background: #fff;
          }
          &.time_left_list::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 10px;
            background: #ededed;
          }
        }
        .time_item {
          z-index: 999;
          height: 60px;
          width: 95%;
          display: flex;
          position: relative;
          cursor: pointer;
          .time_item_left {
            width: 52px;
            padding: 20px 0;
          }
          .time_item_right {
            flex: 1;
            padding: 10px 0;
            text-align: left;
          }
        }
        .time_item.active {
          background: #0070ff;
          color: #fff;
        }
        .time_item.active:after {
          content: "";
          display: block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid #0070ff;
          position: absolute;
          top: 20px;
          right: -8px;
          z-index: 999;
        }
      }
      .time_right {
        flex: 1;
        margin-left: 18px;
        height: 610px;
        background: #fff;
        .title {
          height: 42px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          border-bottom: 1px solid #ececec;
          line-height: 42px;
          text-align: left;
          padding: 0 24px;
        }
        .time_right_info {
          padding-left: 24px;
          .time_right_info_top {
            height: 130px;
            border-bottom: 1px solid #ececec;
            padding-top: 16px;
            .info_top_item {
              height: 22px;
              margin-bottom: 16px;
              width: 50%;
              float: left;
              text-align: left;
              display: flex;
              .info_top_item_title {
                width: 150px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
              }
              .info_top_item_content {
                flex: 1;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #666666;
              }
            }
          }
          .time_right_info_bom {
            padding: 16px 0;
            text-align: left;
            display: flex;
            .info_bom_title {
              width: 150px;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #333333;
            }
            .info_bom_mid {
              width: 205px;
              li {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #666666;
                height: 22px;
                margin-bottom: 12px;
              }
            }
            .info_bom_right {
              flex: 1;
              li {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #666666;
                height: 22px;
                margin-bottom: 12px;
              }
            }
          }
        }
        .time_right_net {
          margin: 16px 24px;
          border-bottom: 1px solid #ececec;
          .net_title {
            height: 42px;
            display: flex;
            li {
              flex: 1;
              background: #f8f8f8;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #333333;
              line-height: 42px;
            }
          }
          .net_content {
            height: 42px;
            display: flex;
            li {
              flex: 1;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              line-height: 42px;
            }
          }
        }
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
}
</style>
