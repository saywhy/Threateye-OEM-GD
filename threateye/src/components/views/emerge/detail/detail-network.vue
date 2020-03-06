<template>
  <div class="detail-network"
       v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="detail_base">
      <div class="detail_base_top">
        <div class="top_left">
          <img src="@/assets/images/emerge/top1.png"
               alt="">
          <img src="@/assets/images/emerge/top2.png"
               alt="">
          <img src="@/assets/images/emerge/top3.png"
               alt="">
        </div>
        <div class="top_right">
          <el-dropdown @command="change_state"
                       trigger="click"
                       placement='bottom-start'
                       size='148'>
            <el-button type="primary"
                       class="change_btn">
              <span>状态变更</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown"
                              class="dropdown_ul_box_detail">
              <el-dropdown-item command='3'
                                class="select_item">已忽略</el-dropdown-item>
              <el-dropdown-item command="4"
                                class="select_item">误报</el-dropdown-item>
              <el-dropdown-item command="2"
                                class="select_item">已处置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="change_task"
                       placement='bottom-start'
                       trigger="click">
            <el-button type="primary"
                       class="change_btn">
              <span>工单任务</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown"
                              class="dropdown_ul_box_detail">
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
              <span class="item_li_content src_active"
                    @click="src_active">
                {{network_detail.src_ip}}
              </span>
              <ul class="src_ul"
                  v-show='src_active_ul'>
                <li @click="src_active_item('1')">威胁追查</li>
                <li @click="src_active_item('2')">添加到外部动态列表</li>
              </ul>
            </li>
            <li class="item_li">
              <span class="item_li_title">目的地址:</span>
              <span class="item_li_content"> {{network_detail.dest_ip}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">源标签:</span>
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
              <span class="item_li_title">目的标签:</span>
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
              <span class="item_li_title">告警时间:</span>
              <span class="item_li_content">{{network_detail.alert_time}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">威胁指标:</span>
              <span class="item_li_content">{{network_detail.indicator}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">告警类型:</span>
              <span class="item_li_content">{{network_detail.category}}</span>
            </li>

          </ul>
        </div>
        <div class="detail_base_bottom_item">
          <ul>
            <li class="item_li">
              <span class="item_li_title">应用:</span>
              <span class="item_li_content">{{network_detail.application}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">检测引擎:</span>
              <span class="item_li_content">{{network_detail.detect_engine}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">失陷确定性:</span>
              <span class="item_li_content">{{network_detail.fall_certainty == '0'?'未知':'已失陷'}}</span>
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
              <span class="item_li_content">{{network_detail.attack_stage}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">工单名称:</span>
              <span class="item_li_content">{{network_detail.job_name}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">工单状态:</span>
              <span class="item_li_content">{{network_detail.status_cn}}</span>
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
            <li class="time_item"
                v-for="(item,index) in network_times"
                @click="time_active(index)"
                :class="{active:time_choose==index}">
              <div class="triangle"
                   v-show="time_choose==index"></div>
              <div class="time_item_left">
                <img src="@/assets/images/emerge/time_false.png"
                     v-show="time_choose!=index">
                <img src="@/assets/images/emerge/time_true.png"
                     v-show="time_choose==index">
              </div>
              <div class="time_item_right">
                <p>{{item.alert_time}} </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="time_right">
          <div v-for="(item,index) in network_times"
               v-show="time_choose==index">
            <p class="title">详细信息</p>
            <div class="time_right_info">
              <div class="time_right_info_top">
                <li class="info_top_item">
                  <span class="info_top_item_title">检测引擎</span>
                  <span class="info_top_item_content">{{item.detect_engine}}</span>
                </li>
                <li class="info_top_item">
                  <span class="info_top_item_title">情报类型</span>
                  <span class="info_top_item_content">{{item.description_type}}</span>
                </li>
                <li class="info_top_item"
                    v-for="value in item.info_list">
                  <span class="info_top_item_title">{{value.name}}</span>
                  <span class="info_top_item_content"
                        :class="value.value=='点击下载'?'download_text':''"
                        @click="download(value,item)">{{value.value}}</span>
                </li>
              </div>
              <div class="time_right_info_bom"
                   v-if="item.whois_list.length !=0">
                <span class="info_bom_title">Whois信息:</span>
                <div class="info_bom_item">
                  <div class="info_bom_item_li"
                       v-for="demo in item.whois_list">
                    <div class="left_li">{{demo.name}}</div>
                    <div class="right_li">{{demo.value}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p class="title">网络事件</p>
            <div class="time_right_net">
              <div class="time_right_net_item"
                   v-for="demo in item.event_list">
                <div class="title_net">{{demo.name}}</div>
                <div class="value_net">{{demo.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 告警列表 -->
    <div class="emerge_box">
      <el-tabs v-model="emerge_list.activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="当前受威胁资产"
                     class="tabs-item"
                     name="first">
          <el-table class="emerge_table"
                    ref="multipleTable"
                    align="center"
                    :data="emerge_list.now.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column prop="alert_time"
                             label="时间"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="category"
                             label="告警类型"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="indicator"
                             label="威胁指标"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="src_ip"
                             label="源地址"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dest_ip"
                             label="目的地址"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="application"
                             label="应用"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="degree"
                             label="告警等级">
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange_now"
                         @current-change="handleCurrentChange_now"
                         :current-page="emerge_list.now.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="emerge_list.now.count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="历史受威胁资产"
                     class="tabs-item"
                     name="second">
          <el-table class="emerge_table"
                    ref="multipleTable"
                    align="center"
                    :data="emerge_list.old.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column prop="alert_time"
                             label="时间"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="category"
                             label="告警类型"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="indicator"
                             label="威胁指标"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="src_ip"
                             label="源地址"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dest_ip"
                             label="目的地址"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="application"
                             label="应用"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="degree"
                             label="告警等级">
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange_old"
                         @current-change="handleCurrentChange_old"
                         :current-page="emerge_list.old.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="emerge_list.old.count">
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
  data () {
    return {
      network_detail: {},
      title_name: "告警详情",
      network_times: [],
      network_list: {
        new_list: {
          handle: {
            page: 1,
            rows: 10
          }
        },
        old_list: {
          handle: {
            page: 1,
            rows: 10
          }
        },
      },
      time_choose: 0,
      emerge_list: {
        title: ["当前告警资产", "历史告警资产"],
        activeName: "first",
        choose: 0,
        now_data: {
          page: 1,
          rows: 10
        },
        old_data: {
          page: 1,
          rows: 10
        },
        now: {},
        old: {}
      },
      src_active_ul: false,
    };
  },
  components: {
    backTitle
  },
  mounted () {
    this.get_data();

  },
  methods: {
    // 获取数据
    get_data () {
      console.log(this.$route.query.detail);
      this.$axios.get('/api/yiiapi/alert/alert-details', {
        params: {
          id: this.$route.query.detail
        }
      })
        .then(response => {
          console.log(response.data.data);
          this.network_detail = response.data.data
          // 工单状态
          switch (this.network_detail.status) {
            case 1:
              this.network_detail.status_cn = '待分配'
              break;
            case 2:
              this.network_detail.status_cn = '已分配'
              break;
            case 3:
              this.network_detail.status_cn = '处置中'
              break;
            case 4:
              this.network_detail.status_cn = '已取消'
              break;
            case 5:
              this.network_detail.status_cn = '已处置'
              break;
            default:
              break;
          }
          this.network_times = [];
          this.network_times.push(this.network_detail)
          if (this.network_detail.alarm_merger.length != 0) {
            this.network_detail.alarm_merger.forEach(item => {
              this.network_times.push(item)
            });
          }
          console.log(this.network_times);
          // 匹配告警类型
          this.network_times.forEach(item => {
            item.info_list = []
            item.whois_list = [];
            item.event_list = [];
            if (item.alert_description.whois) {
              for (let key in item.alert_description.whois) {
                var obj = {
                  name: key,
                  value: item.alert_description.whois[key],
                }
                item.whois_list.push(obj)
              }
            } else if (item.alert_description.ip_whois) {
              for (let key in item.alert_description) {
                var obj = {
                  name: key,
                  value: item.alert_description.ip_whois[key],
                }
                item.whois_list.push(obj)

              }
            }
            // 情报类型匹配
            switch (item.description_type) {
              case 'BotnetCAndCURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: '主要受影响地区',
                    value: item.alert_description.geo
                  },
                ];
              case 'RansomwareURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: 'IP',
                    value: item.alert_description.IP
                  },
                ];
                break;
              case 'IPReputation':
                item.info_list = [
                  {
                    name: 'IP',
                    value: item.alert_description.ip
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: '主要受影响地区',
                    value: item.alert_description.geo
                  },
                  {
                    name: '相关联域名',
                    value: item.alert_description.domains
                  },
                ];
                break;
              case 'MaliciousHash':
                item.info_list = [
                  {
                    name: 'MD5',
                    value: item.alert_description.MD5
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.SHA256
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '文件类型',
                    value: item.alert_description.file_type
                  },
                  {
                    name: '常见文件名',
                    value: item.alert_description.file_name
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "样本下载IP地址",
                    value: item.alert_description.IP,
                  },
                ];
                break;
              case 'MaliciousURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "相关联恶意文件",
                    value: item.alert_description.file,
                  },
                ];
                break;
              case 'PhishingURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "被钓鱼IP",
                    value: item.alert_description.IP,
                  },
                ];
                break;
              case 'MobileMaliciousHash':
                item.info_list = [
                  {
                    name: 'MD5',
                    value: item.alert_description.MD5
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.SHA256
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                ];
                break;
              case 'sdk':
                item.info_list = [
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '文件名',
                    value: item.alert_description.file_name
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '文件哈希值',
                    value: item.alert_description.md5
                  },
                  {
                    name: 'SDK检测威胁',
                    value: item.alert_description.threat
                  },
                ];
                break;
              case 'sandbox':
                item.info_list = [
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '文件名',
                    value: item.alert_description.filename
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.size
                  },
                  {
                    name: '文件类型',
                    value: item.alert_description.type
                  },
                  {
                    name: 'MD5',
                    value: item.alert_description.md5
                  },
                  {
                    name: 'SHA1',
                    value: item.alert_description.sha1
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.sha256
                  },
                  {
                    name: 'taskID',
                    value: item.alert_description.taskID
                  },
                ];
                break;
              case 'yara':
                item.info_list = [
                  {
                    name: "文件名",
                    value: item.alert_description.file_name,
                  },
                  {
                    name: "文件大小",
                    value: item.alert_description.file_size,
                  },
                  {
                    name: "文件哈希值",
                    value: item.alert_description.md5,
                  },
                  {
                    name: "Yara规则名称",
                    value: item.alert_description.rule_name,
                  },
                ];
                break;
              case 'IDS':
                item.info_list = [
                  {
                    name: "告警类型",
                    value: item.alert_description.category,
                  },
                  {
                    name: "告警描述",
                    value: item.alert_description.threat,
                  },
                  {
                    name: "PayLoad信息",
                    value: "点击下载",
                  },
                ];
                break;
              default:
                break;
            }
            // 网络事件匹配
            switch (item.network_event.event_type) {
              case 'fileinfo':
                switch (item.network_event.app_proto) {
                  case 'smtp':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'smtp' },
                    ]
                    break;
                  case 'http':
                    item.event_list = [
                      { name: 'Method', value: item.network_event.http.http_method },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.http.url },
                      { name: 'User Agent', value: item.network_event.http.http_user_agent },
                      { name: 'Referrer', value: item.network_event.http.http_refer },
                      { name: 'Traffic', value: 'http' },
                    ]
                    break;
                  case 'ftp-data':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'User', value: '-' },
                      { name: 'Traffic', value: 'FTP' },
                    ]
                    break;
                  case 'imap':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'imap' },
                    ]
                    break;
                  case 'pop3':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'pop3' },
                    ]
                    break;
                  case 'smb':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + item.network_event.dest_port },
                      { name: 'Domain', value: '-' },
                      { name: 'User', value: '-' },
                      { name: 'Traffic', value: 'smb' },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
                break;
              case 'flow':
                switch (item.network_event.app_proto) {
                  case 'ftp':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'User', value: item.network_event.user },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
                break
              case 'smb':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Domain', value: '-' },
                  { name: 'User', value: '-' },
                  { name: 'Traffic', value: item.network_event.event_type },
                ]
                break
              case 'ssh':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Tool', value: item.network_event.ssh.client.software_version },
                  { name: 'User', value: '-' },
                  { name: 'Traffic', value: item.network_event.event_type },
                ]
                break
              case 'tls':
                if (item.network_event.tls.subject) {
                  item.network_event.tls.Authorizing = item.network_event.tls.subject.substring(
                    item.network_event.tls.subject.indexOf("CN=") + 3
                  );
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'URL', value: item.network_event.tls.sni },
                  { name: 'Issuerdn', value: item.network_event.tls.issuerdn },
                  { name: 'Authorizing', value: item.network_event.tls.Authorizing },
                  { name: 'Notafter', value: item.network_event.tls.notafter },
                  { name: 'Traffic', value: 'https' },
                ]
                break
              case 'dns':
                if (item.network_event.dns.grouped) {
                  item.network_event.dns.HostAddr = item.network_event.dns.grouped.join(
                    ","
                  );
                }
                if (item.network_event.dns.answers) {
                  item.network_event.dns.answers.forEach(element => {
                    if (item.network_event.dns.rrname == element.rrname) {
                      item.network_event.dns.ttl = element.ttl;
                      item.network_event.dns.rrtype = element.rrtype;
                    }
                  });
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + item.network_event.dest_port },
                  { name: 'SectianType', value: item.network_event.dns.rrtype },
                  { name: 'Domain', value: item.network_event.dns.rrname },
                  { name: 'TTL', value: item.network_event.dns.HostAddr },
                  { name: 'Traffic', value: 'dns' },
                ]
                break
              case 'krb5':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Msg_type', value: item.network_event.krb5.msg_type },
                  { name: 'Cname', value: item.network_event.krb5.cname },
                  { name: 'Realm', value: item.network_event.krb5.realm },
                  { name: 'Sname', value: item.network_event.krb5.sname },
                  { name: 'Traffic', value: 'krb5' },
                ]
                break
              case 'http':
                item.event_list = [
                  { name: 'Method', value: item.network_event.http.http_method },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'URL', value: item.network_event.http.url },
                  { name: 'User Agent', value: item.network_event.http.http_user_agent },
                  { name: 'Referrer', value: item.network_event.http.http_refer },
                  { name: 'Traffic', value: 'http' },
                ]
                break
              case 'alert':
                switch (item.network_event.app_proto) {
                  case 'tls':
                    if (item.network_event.tls.subject) {
                      item.network_event.tls.Authorizing = item.network_event.tls.subject.substring(
                        item.network_event.tls.subject.indexOf("CN=") + 3
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.tls.sni },
                      { name: 'Issuerdn', value: item.network_event.tls.issuerdn },
                      { name: 'Authorizing', value: item.network_event.tls.Authorizing },
                      { name: 'Notafter', value: item.network_event.tls.notafter },
                      { name: 'Traffic', value: 'https' },
                    ]
                    break;
                  case 'http':
                    item.event_list = [
                      { name: 'Method', value: item.network_event.http.http_method },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.http.url },
                      { name: 'User Agent', value: item.network_event.http.http_user_agent },
                      { name: 'Referrer', value: item.network_event.http.http_refer },
                      { name: 'Traffic', value: 'http' },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
              default:
                if (!item.network_event.app_proto) {
                  item.network_event.app_proto = item.network_event.proto
                } else if (item.network_event.app_proto == 'failed') {
                  item.network_event.app_proto = ''
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Traffic', value: item.network_event.app_proto },
                ]
                break;
                break;
            }
          });
          this.new_list();
          this.old_list();
          // this.network_times.push(item_obj)
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 下载payload
    download (value, item) {
      if (value.value == "点击下载" && value.name == "PayLoad信息") {
        var funDownload = function (content, filename) {
          // 创建隐藏的可下载链接
          var eleLink = document.createElement("a");
          eleLink.download = filename;
          eleLink.style.display = "none";
          // 字符内容转变成blob地址
          var blob = new Blob([content]);
          eleLink.href = URL.createObjectURL(blob);
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        };
        funDownload(item.network_event.payload, "payload.dat");
      }
      if (value.value == "点击下载" && value.name == '文件下载') {
        window.open('/api/yiiapi/alert/get-file?md5=' + value.md5);
      }
    },
    // 当前受威胁资产
    new_list () {
      this.$axios.get('/api/yiiapi/alert/get-same-indicator-alert', {
        params: {
          indicator: this.network_detail.indicator,
          is_deal: 0,
          page: this.emerge_list.now_data.page,
          rows: this.emerge_list.now_data.rows,
        }
      })
        .then(response => {
          let { status, data } = response.data;
          this.emerge_list.now = data
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleSizeChange_now (val) {
      this.emerge_list.now_data.rows = val;
      this.new_list();
    },
    handleCurrentChange_now (val) {
      this.emerge_list.now_data.page = val;
      this.new_list();
    },
    // 历史受威胁资产
    old_list () {
      this.$axios.get('/api/yiiapi/alert/get-same-indicator-alert', {
        params: {
          indicator: this.network_detail.indicator,
          is_deal: 2,
          page: this.emerge_list.old_data.page,
          rows: this.emerge_list.old_data.rows
        }
      })
        .then(response => {
          let { status, data } = response.data;
          this.emerge_list.old = data
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleSizeChange_old (val) {
      this.emerge_list.old_data.rows = val;
      this.old_list();
    },
    handleCurrentChange_old (val) {
      this.emerge_list.old_data.page = val;
      this.old_list();
    },

    // 状态变更
    change_state (item) {
      console.log(item);
      var id_list = []
      id_list.push(this.$route.query.detail)
      this.$axios.put('/api/yiiapi/alert/do-alarm', {
        id: id_list,
        status: item
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          if (status == 0) {
            this.$message(
              {
                message: '修改状态成功',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })


    },




    change_task () { },
    time_active (index) {
      console.log("111");
      this.time_choose = index;
    },
    emerge_list_active (index) {
      this.emerge_list.choose = index;
    },
    src_active () {
      console.log("111");
      this.src_active_ul = !this.src_active_ul;
    },
    src_active_item (num) {
      this.src_active_ul = false;
      console.log(num);
    },
    handleSelectionChange () { },
    handleClick (tab, event) {
      console.log(tab);
    }
  }
};
</script>

<style scoped lang="less">
.detail-network {
  background: #f8f8f8;
  //   基础信息
  .detail_base {
    // height: 323px;
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
      // height: 260px;
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
    // min-height: 716px;
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
          // height: 610px;
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
          content: '';
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
        // overflow: hidden;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 18px;
        // height: 610px;
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
          .download_text {
            color: #0070ff !important;
            cursor: pointer;
            text-decoration: underline;
          }
          .time_right_info_top {
            overflow-y: auto;
            border-bottom: 1px solid #ececec;
            padding-top: 16px;
            .info_top_item {
              // height: 22px;
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
            .info_bom_item {
              flex: 1;
              display: flex;
              flex-direction: column;
              .info_bom_item_li {
                margin-bottom: 12px;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                .left_li {
                  width: 200px;
                }
                .right_li {
                  flex: 1;
                  flex-wrap: wrap;
                  justify-content: flex-start;
                  align-items: flex-start;
                }
              }
            }
          }
        }
        .time_right_net {
          margin: 16px 24px;
          border-bottom: 1px solid #ececec;
          display: flex;
          .time_right_net_item {
            flex: 1;
            width: 0;
            // display: flex;
            // flex-direction: column;
            // flex-wrap: wrap;
            // justify-content: flex-start;
            .title_net {
              height: 42px;
              text-align: left;
              background: #f8f8f8;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #333333;
              line-height: 42px;
              padding: 0 10px;
            }
            .value_net {
              min-height: 42px;
              word-wrap: break-word;
              word-break: break-all;
              overflow: hidden;
              font-size: 14px;
              color: #333333;
              text-align: left;
              padding: 10px;
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
<style lang="less">
@import '../../../../assets/css/less/reset_css/reset_tab.less';
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