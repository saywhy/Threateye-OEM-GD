<template>
    <div class="detail-journal" v-cloak>
        <back-title :title-name="title_name"></back-title>
        <!-- 基础信息 -->
        <div class="detail_base">
            <div class="detail_base_top">
                <div class="top_left">
                    <img src="@/assets/images/emerge/terminal_title.png" alt="">
                    <span class="top_left_title">crowti.exe</span>
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
                    <el-button class="edit_btn" style="margin:0">误报</el-button>
                </div>
            </div>
            <div class="detail_base_bottom">
                <div class="detail_base_bottom_top">
                    <div class="detail_base_bottom_item">
                        <ul>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                    <img src="@/assets/images/emerge/terminal_file.png" alt="">
                                </span>
                                <span class="item_li_title">文件名:</span>
                                <span class="item_li_content">
                                    crowti.exe
                                </span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                </span>
                                <span class="item_li_title">哈希值:</span>
                                <span class="item_li_content">01f65bf4f7c271548af5be91a9d14fe8</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">路径:</span>
                                <span class="item_li_content">c:\users\administrator\desktop\crowti.exe</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">大小:</span>
                                <span class="item_li_content">147.5K</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">威胁描述:</span>
                                <span class="item_li_content" title="HEUR:Trojan.Win32.Generic|HEUR:Trojan.Win32.Generic">HEUR:Trojan.Win32.Generic|HEUR:Trojan.Win32.Generic</span>
                            </li>
                        </ul>
                    </div>
                    <div class="detail_base_bottom_item">
                        <ul>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                    <img src="@/assets/images/emerge/terminal_time.png" alt="">
                                </span>
                                <span class="item_li_title">创建时间:</span>
                                <span class="item_li_content">2017-09-14 15:53:32</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">签名:</span>
                                <span class="item_li_content">无</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">签名者:</span>
                                <span class="item_li_content"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">网络连接:</span>
                                <span class="item_li_content">无</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">威胁来源:</span>
                                <span class="item_li_content">USB</span>
                            </li>
                        </ul>
                    </div>
                    <div class="detail_base_bottom_item">
                    </div>
                </div>
                <div class="detail_base_bottom_bom">
                    <div class="detail_base_bottom_item">
                        <ul>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                    <img src="@/assets/images/emerge/terminal_cp.png" alt="">
                                </span>
                                <span class="item_li_title">计算机:</span>
                                <span class="item_li_content src_active" @click="computer_detail()">JamesWin7-64Pro </span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                </span>
                                <span class="item_li_title">IP:</span>
                                <span class="item_li_content">114.242.16.83</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">域:</span>
                                <span class="item_li_content"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">组:</span>
                                <span class="item_li_content">上海</span>
                            </li>
                        </ul>
                    </div>
                    <div class="detail_base_bottom_item">
                        <ul>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                    <img src="@/assets/images/emerge/terminal_more.png" alt="">
                                </span>
                                <span class="item_li_title">失陷确定性:</span>
                                <span class="item_li_content">已失陷</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
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
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">攻击阶段:</span>
                                <span class="item_li_content">提权</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">工单名称:</span>
                                <span class="item_li_content">告警1</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">工单状态:</span>
                                <span class="item_li_content">未关联工单</span>
                            </li>
                        </ul>
                    </div>
                    <div class="detail_base_bottom_item last">
                        <ul>
                            <li class="item_li">
                                <span class="item_li_title_img">
                                    <img src="@/assets/images/emerge/terminal_time.png" alt="">
                                </span>
                                <span class="item_li_title">过去的一年中第一次发现:</span>
                                <span class="item_li_content">2017-09-14 15:53:32</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">最后一次发现:</span>
                                <span class="item_li_content">2017-10-25 09:45:03</span>
                            </li>
                            <li class="item_li">
                                <span class="item_li_title_img"></span>
                                <span class="item_li_title">告警ID:</span>
                                <span class="item_li_content">1505054439</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 感染路径-感染计算机 -->
        <div class="detail_infected">
            <el-tabs v-model="infected_activeName" class="reset_tab" @tab-click="handleClick_infected">
                <el-tab-pane label="感染路径" class="tabs-item" name="first">
                    <div>
                        21312321321321
                    </div>
                </el-tab-pane>
                <el-tab-pane label="目前感染的计算机" class="tabs-item" name="second">
                    <el-table class="emerge_table reset_table" ref="multipleTable" align="center" :data="terminal.now" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="name" label="计算机名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span :class="scope.row.status=='断开'?'status_btn_off':'status_btn_online'">
                                    {{scope.row.status}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ip" label="IP" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="os" label="操作系统" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="time" label="最近一次通讯时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="protect_time" label="受保护起始时间" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="emerge_list.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="emerge_list.count">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="历史感染的计算机" class="tabs-item" name="third">
                    <el-table class="emerge_table reset_table" ref="multipleTable" align="center" :data="terminal.old" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="name" label="计算机名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span :class="scope.row.status=='断开'?'status_btn_off':'status_btn_online'">
                                    {{scope.row.status}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ip" label="IP" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="os" label="操作系统" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="time" label="最近一次通讯时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="protect_time" label="受保护起始时间" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="emerge_list.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="emerge_list.count">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 事件排序 -->
        <div class="event">
            <div class="event_top">
                <div class="top_left">
                    <img src="@/assets/images/emerge/event_icon.png" alt="">
                    <span class="top_left_title">事件顺序</span>
                </div>
            </div>
            <div class="event_bom">
                <el-table class="emerge_table reset_table" ref="multipleTable" align="center" :data="terminal.event" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column prop="time" label="告警时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="事件" prop="event" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="type" label="事件类型" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="计算机" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style=" color: #0070FF;">
                                {{scope.row.name}}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="emerge_list.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="emerge_list.count">
                </el-pagination>
            </div>
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
      terminal: {
        now: [
          {
            name: "JamesWin7-64Pro",
            status: "断开",
            ip: "114.242.16.83",
            os: "Windows 7 (64-bit)",
            time: "2017-09-14 15:44:05",
            protect_time: "2017-11-14 15:44:05"
          },
          {
            name: "Win7-64Pro",
            status: "在线",
            ip: "114.242.16.83",
            os: "Windows 7 (64-bit)",
            time: "2017-11-14 15:44:05",
            protect_time: "2017-11-14 15:44:05"
          },
          {
            name: "James7-32Pro",
            status: "在线",
            ip: "114.242.16.83",
            os: "Windows 7 (64-bit)",
            time: "2018-09-14 15:44:05",
            protect_time: "2017-11-14 15:44:05"
          }
        ],
        old: [
          {
            name: "TomWin7-64Pro",
            status: "在线",
            ip: "114.242.16.83",
            os: "Windows 7 (64-bit)",
            time: "2016-09-14 15:44:05",
            protect_time: "2017-11-14 15:44:05"
          },
          {
            name: "mac",
            status: "断开",
            ip: "114.242.16.83",
            os: "Windows 7 (64-bit)",
            time: "2015-11-14 15:44:05",
            protect_time: "2017-11-14 15:44:05"
          },
          {
            name: "James7-32Pro",
            status: "在线",
            ip: "114.242.16.83",
            os: "Windows 7 (64-bit)",
            time: "2011-09-14 15:44:05",
            protect_time: "2017-11-14 15:44:05"
          }
        ],
        event: [
          {
            time: "2019-11-04 14:33:16",
            event: "updatechecker.exe --> mininewsxktt.exe",
            type: "创建进程",
            name: "WIN-718RQTS3R89"
          },
          {
            time: "2019-11-04 14:33:16",
            event: "updatechecker.exe --> mininewsxktt.exe",
            type: "创建进程",
            name: "WIN-718RQTS3R89"
          },
          {
            time: "2019-11-04 14:33:16",
            event: "updatechecker.exe --> mininewsxktt.exe",
            type: "创建进程",
            name: "WIN-718RQTS3R89"
          },
          {
            time: "2019-11-04 14:33:16",
            event: "updatechecker.exe --> mininewsxktt.exe",
            type: "创建进程",
            name: "WIN-718RQTS3R89"
          }
        ]
      },
      activeName: "first",
      infected_activeName: "first"
    };
  },
  methods: {
    change_state() {},
    change_task() {},
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(tab, event) {
      console.log(tab);
    },
    handleClick_infected(tab, event) {
      console.log(tab);
    },
    computer_detail() {
      this.$router.push({
        path: "/detail/computer",
        query: { detail: "2222" }
      });
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
      padding: 24px 0 24px 56px;
      .detail_base_bottom_top {
        display: flex;
        padding-bottom: 8px;
        border-bottom: 1px solid #ececec;
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
            .item_li_title_img {
              width: 20px;
            }
            .item_li_title {
              width: 100px;
              font-size: 16px;
              color: #333333;
            }
            .item_li_content {
              flex: 1;
              width: 0;
              font-size: 16px;
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
      .detail_base_bottom_bom {
        margin-top: 24px;
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
            .item_li_title_img {
              width: 20px;
            }
            .item_li_title {
              width: 100px;
              font-size: 16px;
              color: #333333;
            }
            .item_li_content {
              flex: 1;
              width: 0;
              font-size: 16px;
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
        .last {
          .item_li_title {
            width: 190px !important;
          }
        }
      }
    }
  }
  //   感染信息
  .detail_infected {
    margin: 24px 0;
    padding: 24px 0 24px 56px;
    background: #fff;
    .pagination_box {
      margin-top: 24px;
    }
    .emerge_table {
      .status_btn_off {
        width: 48px;
        height: 24px;
        background: #eef6ff;
        border-radius: 2px;
        font-size: 10px;
        color: #999999;
        display: inline-block;
        text-align: center;
        line-height: 24px;
      }
      .status_btn_online {
        width: 48px;
        height: 24px;
        background: #5389e0;
        border-radius: 2px;
        font-size: 10px;
        color: #fff;
        display: inline-block;
        text-align: center;
        line-height: 24px;
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
  //   事件排序
  .event {
    background: #fff;
    .event_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
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
    }
    .event_bom {
      padding: 24px 56px;
    }
  }
}
</style>
<style lang="less">
@import "../../../../assets/css/less/reset_css/reset_table.less";
@import "../../../../assets/css/less/reset_css/reset_tab.less";
.dropdown_ul_box_detail {
  width: 124px;
  top: 209px !important;
  .el-dropdown-menu__item:hover {
    color: #606266;
  }
}
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
.event {
  .pagination_box {
    margin-top: 24px;
  }
}
</style>
