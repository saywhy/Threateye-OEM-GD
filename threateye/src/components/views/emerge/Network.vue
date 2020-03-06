<template>
  <div id="Network"
       v-cloak>
    <div class="e_line"
         v-loading="e_line.loading">
      <p class="title"
         @mouseover.native="mouseOver()">实时告警监测</p>
      <vm-emerge-line :data='echarts_data'
                      v-if="e_line.data_show"></vm-emerge-line>
    </div>
    <div class="alert_box">
      <p class="title">告警监测</p>
      <div class="search_box">
        <div class="search">
          <el-input class="search_key"
                    placeholder="搜索关键词"
                    v-model="key"
                    clearable>
            <i slot="prefix"
               class="el-input__icon el-icon-search"></i>
          </el-input>
          <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>
          <el-select class="search_key"
                     v-model="alert"
                     clearable
                     placeholder="请选择告警类型">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-select class="search_key"
                     v-model="status"
                     clearable
                     placeholder="请选择处理状态">
            <el-option v-for="item in select_state"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-button class="search_btn"
                     @click="get_search">搜索</el-button>
          <span class="search_reset"
                @click="reset_search">重置</span>
        </div>
      </div>
      <div class="change_box">
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
                            class="dropdown_ul_box">
            <el-dropdown-item command="处置中"
                              class="select_item">处置中</el-dropdown-item>
            <el-dropdown-item command="已忽略"
                              class="select_item">已忽略</el-dropdown-item>
            <el-dropdown-item command="误报"
                              class="select_item">误报</el-dropdown-item>
            <el-dropdown-item command="已处置"
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
                            class="dropdown_ul_box">
            <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
            <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button class="edit_btn">编辑标签</el-button>
      </div>
      <div v-loading="network.loading">
        <el-table ref="multipleTable"
                  class="network_table"
                  align="center"
                  :data="network_list.data"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  @row-click="alert_detail">
          <el-table-column label="全选"
                           prop="type"
                           width="50">
            <template slot-scope="scope">
              <div class="new_dot"
                   v-show="scope.row.status=='1'">
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection"
                           width="30">
          </el-table-column>
          <el-table-column label="告警时间"
                           width="150">
            <template slot-scope="scope">{{ scope.row.alert_time*1000 |formatDate }}</template>
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
          <el-table-column label="威胁等级">
            <template slot-scope="scope">
              <el-dropdown @command="change_degree"
                           trigger="click"
                           class="degree_box"
                           :class="scope.row.color">
                <el-button type="primary"
                           @click.stop>
                  {{ scope.row.degree }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="['高',scope.$index,'high']"
                                    v-if="scope.row.degree !='高'">
                    高
                  </el-dropdown-item>
                  <el-dropdown-item :command="['中',scope.$index,'mid']"
                                    v-if="scope.row.degree !='中'">
                    中
                  </el-dropdown-item>
                  <el-dropdown-item :command="['低',scope.$index,'low']"
                                    v-if="scope.row.degree !='低'">
                    低
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="fall"
                           label="失陷确定性"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status"
                           label="状态"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination_box"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="network_list.pageNow"
                       :page-sizes="[10,50,100]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="network_list.count">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- 状态变更 -->
    <el-dialog class="pop_state_box"
               width='480px'
               :visible.sync="state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_state"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">状态变更</span>
      </div>
      <div class="content">
        <p class="content_p"
           style="font-size:0">
          <span style="font-size:14px">是否将已勾选的</span>
          <span style="font-size:14px">两</span>
          <span style="font-size:14px">项状态变更为“</span>
          <span style="font-size:14px">{{process_state}}</span>
          <span style="font-size:14px">”?</span>
        </p>
      </div>
      <div class="btn_box">
        <el-button @click="cancel_state"
                   class="cancel_btn">取消</el-button>
        <el-button @click="ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 任务工单 -->
    <!-- 新建工单 -->
    <el-dialog class="task_new_box"
               width='840px'
               :visible.sync="task.new">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_task_new"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">新建工单</span>
      </div>
      <div class="step_box">
        <div class="step_box1">
          <span class="step1_span"
                :class="task.new_contet?'step_now':'step_past'">基本信息</span>
          <img src="@/assets/images/emerge/selected01.png"
               class="selected_img"
               alt="">
        </div>
        <div class="step_box2">
          <span class="step2_span"
                :class="!task.new_contet?'step_now':'step_past'">处置内容</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="task_new_content"
           v-if="task.new_contet">
        <div class="content_top">
          <div class="content_top_left">
            <li class="left_item">
              <div class="title">
                <span>工单名称</span>
                <span class="improtant_ico">*</span>
              </div>
              <el-input class="task_new_input"
                        placeholder="请输入工单名称"
                        v-model="task_new.name"
                        clearable>
              </el-input>
            </li>
            <li class="left_item">
              <div class="title">
                <span>经办人</span>
                <span class="improtant_ico">*</span>
              </div>
              <el-select class="task_new_input"
                         v-model="task_new.operator"
                         clearable
                         placeholder="请选择经办人">
                <el-option v-for="item in task_new.operator_list"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </li>
          </div>
          <div class="content_top_right">
            <li class="right_item">
              <div class="title">
                <span>优先级</span>
                <span class="improtant_ico">*</span>
              </div>
              <el-select class="task_new_input"
                         v-model="task_new.level"
                         clearable
                         placeholder="请选择优先级">
                <el-option v-for="item in task_new.level_list"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li class="right_item">
              <el-checkbox-group v-model="task_new.notice">
                <el-checkbox label="邮件通知">邮件通知</el-checkbox>
                <el-checkbox label="短信通知">短信通知</el-checkbox>
                <el-checkbox label="消息中心通知">消息中心通知</el-checkbox>
              </el-checkbox-group>
            </li>
          </div>
        </div>
        <div class="content_remarks">
          <p class="title">备注</p>
          <el-input type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="task_new.textarea">
          </el-input>
        </div>
        <div class="content_table">
          <el-table :data="task_new.task_list"
                    style="width: 100%">
            <el-table-column prop="name"
                             label="经办人">
            </el-table-column>
            <el-table-column prop="class"
                             label="部门">
            </el-table-column>
            <el-table-column prop="email"
                             label="邮箱">
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="task_list_size_change"
                         :current-page="task_new.task_list_page.pageNow"
                         :page-sizes="[5,10,20]"
                         :page-size="5"
                         layout="total,sizes, prev, pager, next"
                         :total="task_new.task_list.length">
          </el-pagination>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="next_task_new"
                     class="next_btn">下一步</el-button>
        </div>
      </div>
      <!-- 处置内容 -->
      <div class="task_handle_content"
           v-if="!task.new_contet">
        <div class="handle_content_top">
          <el-dropdown placement='bottom-start'
                       @command="handle.add"
                       trigger="click">
            <el-button type="primary"
                       class="change_btn">
              <span>新增</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown"
                              class="dropdown_ul_box">
              <el-dropdown-item command="资产综合">资产综合</el-dropdown-item>
              <el-dropdown-item command="网络">网络</el-dropdown-item>
              <el-dropdown-item command="端点">端点</el-dropdown-item>
              <el-dropdown-item command="日志">日志</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button class="ref">刷新</el-button>
          <el-button class="cel">删除</el-button>
        </div>
        <div class='table_box'>
          <ul class="table_box_title">
            <li v-for="(tab,index) in handle.table_title"
                @click="table(index)"
                :class="{active:handle.active==index}">
              {{tab}}
            </li>
          </ul>
          <div>
            <div v-show="handle.active==0">
              <el-table ref="multipleTable"
                        align="center"
                        :data="handle.assets_list"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                 width="50">
                </el-table-column>
                <el-table-column label="资产"
                                 prop="assets"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="group"
                                 label="资产组"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="relation"
                                 label="关联威胁"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="degree"
                                 label="威胁等级">
                </el-table-column>
                <el-table-column prop="fall"
                                 label="失陷确定性"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status"
                                 label="状态"
                                 show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="table_data.pageNow"
                             :page-sizes="[10,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="table_data.count">
              </el-pagination>
            </div>
            <div v-show="handle.active==1">
              <el-table ref="multipleTable"
                        align="center"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column label="告警时间"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.date |formatDate }}</template>
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
                                 label="威胁等级">
                </el-table-column>
                <el-table-column prop="fall"
                                 label="失陷确定性"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status"
                                 label="状态"
                                 show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="table_data.pageNow"
                             :page-sizes="[10,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="table_data.count">
              </el-pagination>
            </div>
            <div v-show="handle.active==2">
              <el-table ref="multipleTable"
                        align="center"
                        :data="handle.endpoint_list"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                 width="50">
                </el-table-column>
                <el-table-column label="计算机名"
                                 prop="name"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="category"
                                 label="告警类型"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="date"
                                 label="时间"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="indicator"
                                 label="威胁指标"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="degree"
                                 label="威胁等级">
                </el-table-column>
                <el-table-column prop="fall"
                                 label="失陷确定性"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status"
                                 label="状态"
                                 show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="table_data.pageNow"
                             :page-sizes="[10,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="table_data.count">
              </el-pagination>
            </div>
            <div v-show="handle.active==3">
              <el-table ref="multipleTable"
                        align="center"
                        :data="handle.log_list"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                 width="50">
                </el-table-column>
                <el-table-column label="告警时间"
                                 prop="date"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="category"
                                 label="威胁类型"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="assets"
                                 label="风险资产"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="info"
                                 label="告警信息"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="degree"
                                 label="威胁等级">
                </el-table-column>
                <el-table-column prop="fall"
                                 label="失陷确定性"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status"
                                 label="状态"
                                 show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="table_data.pageNow"
                             :page-sizes="[10,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="table_data.count">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="prev_task_handle"
                     class="prev_btn">上一步</el-button>
          <el-button class="prev_btn">分配</el-button>
          <el-button class="prev_btn">保存</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import vmEmergeLine from "./vm-emerge/vm-emerge-line";
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import moment from 'moment'
export default {
  name: "Network",
  components: {
    vmEmergeLine,
    vmEmergePicker
  },
  data () {
    return {
      echarts_data: {},
      e_line: {
        loading: true,
        data_show: false,
      },
      network_list: {},
      network: {
        loading: false,
        handle: {
          page: 1,
          rows: 10
        },
        start_time: '',
        end_time: '',
      },
      picker_data: {
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      key: "",
      time: "",
      alert: "",
      status: "",
      options: [
        {
          value: "1",
          label: "恶意程序"
        },
        {
          value: "2",
          label: "漏洞利用"
        },
        {
          value: "3",
          label: "恶意文件通讯"
        },
        {
          value: "4",
          label: "僵尸网络C&C"
        },
        {
          value: "5",
          label: "恶意地址"
        }
      ],
      select_state: [
        {
          value: "1",
          label: "待处置"
        },
        {
          value: "2",
          label: "处置中"
        },
        {
          value: "3",
          label: "已忽略"
        },
        {
          value: "4",
          label: "误报"
        },
        {
          value: "5",
          label: "已处置"
        }
      ],

      multipleSelection: [],
      table_data: {
        count: 102,
        maxPage: 11,
        pageNow: 1
      },
      currentPage4: 1,
      process_state: "",
      job_task: "工单任务",
      state_change: false,
      task: {
        new: false,
        new_contet: true,
        handle: false
      },
      task_new: {
        name: "",
        level: "",
        level_list: [
          {
            value: "1",
            label: "极高"
          },
          {
            value: "2",
            label: "高"
          },
          {
            value: "3",
            label: "中"
          },
          {
            value: "4",
            label: "低"
          }
        ],
        operator: "",
        operator_list: [
          {
            value: "1",
            label: "admin"
          },
          {
            value: "2",
            label: "user"
          }
        ],
        notice_list: ["邮件通知", "短信通知", "消息中心通知"],
        notice: ["邮件通知"],
        textarea: "",
        task_list: [
          {
            name: "admin",
            class: "CBU",
            email: "admin@163.com"
          },
          {
            name: "admin",
            class: "CBU",
            email: "admin@163.com"
          },
          {
            name: "admin",
            class: "CBU",
            email: "admin@163.com"
          },
          {
            name: "admin",
            class: "CBU",
            email: "admin@163.com"
          },
          {
            name: "admin",
            class: "CBU",
            email: "admin@163.com"
          }
        ],
        task_list_page: {
          count: 102,
          maxPage: 11,
          pageNow: 1
        }
      },
      handle: {
        add: "",
        table_title: ["综合资产", "网络", "端点", "日志"],
        active: 0,
        assets_list: [
          {
            assets: "tenm.saicmotor.com",
            group: "网络设备",
            relation: "恶意地址",
            degree: "高危",
            fall: "--",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            group: "网络设备",
            relation: "恶意地址",
            degree: "高危",
            fall: "--",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            group: "网络设备",
            relation: "恶意地址",
            degree: "高危",
            fall: "--",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            group: "网络设备",
            relation: "恶意地址",
            degree: "高危",
            fall: "--",
            status: "待处置"
          },
          {
            assets: "tenm.saicmotor.com",
            group: "网络设备",
            relation: "恶意地址",
            degree: "高危",
            fall: "--",
            status: "待处置"
          }
        ],
        net_list: [
          {
            time: "2019-11-04 14:33:16",
            group: "网络设备",
            relation: "恶意地址",
            degree: "高危",
            fall: "--",
            status: "待处置"
          }
        ],
        endpoint_list: [
          {
            name: "JamesWin7-64Pro",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            degree: "高危",
            fall: "— —",
            status: "待处置"
          }
        ],
        log_list: [
          {
            date: "2019.11.08 15:33:24",
            category: "Malicious Host",
            assets: "192.168.1.191",
            info: "093840oiPJDJDFAD%kjsafdssdls…",
            degree: "高危",
            fall: "— —",
            status: "待处置"
          }
        ]
      }
    };
  },
  mounted () {
    // this.get_echarts();
    this.get_data();
  },
  methods: {
    // 获取折现图表
    get_echarts () {
      this.$axios.get('/api/yiiapi/alert/alert-trend')
        .then(response => {
          this.echarts_data = response.data.data
          console.log(this.echarts_data);
          this.e_line.loading = false
          this.e_line.data_show = true
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 获取告警列表
    get_data () {
      this.network.loading = true;
      this.$axios.get('/api/yiiapi/alert/list', {
        params: {
          start_time: this.network.start_time,
          end_time: this.network.end_time,
          key_word: "",
          category: "",
          status: '',
          degree: "",
          page: this.network.handle.page,
          rows: this.network.handle.rows,
        }
      })
        .then(response => {
          this.network_list = response.data.data;
          console.log(this.network_list);

          this.network_list.data.forEach(item => {
            switch (item.degree) {
              case '高':
                item.color = 'high'
                break;
              case '中':
                item.color = 'mid'
                break;
              case '低':
                item.color = 'low'
                break;
              default:
                break;
            }
          });
          this.network.loading = false
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 搜索
    get_search () {
      this.get_data();
    },
    table (index) {
      this.handle.active = index;
    },
    changeTime (data) {
      this.network.start_time = data[0].valueOf() / 1000;
      this.network.end_time = data[1].valueOf() / 1000;
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log("1111");
    },
    alert_detail (val) {
      console.log(val);
      this.$router.push({ path: "/detail/network", query: { detail: val.id } });
    },
    // 分页
    handleSizeChange (val) {
      this.network.handle.rows = val;
      this.get_data();
    },
    handleCurrentChange (val) {
      this.network.handle.page = val
      this.get_data();
    },
    // 重置
    reset_search () {
      this.key = "";
      this.time = "";
      this.alert = "";
      this.status = "";
    },
    // 状态变更选择
    change_state (command) {
      this.process_state = command;
      this.open_state();
    },
    change_task (command) {
      if (command == "新建工单") {
        this.open_task_new();
      }
      this.job_task = command;
    },
    //改变告警等级
    change_degree (command) {
      console.log(command);
      this.network_list.data.forEach(function (item, index) {
        if (command[1] == index) {
          item.degree = command[0];
          item.color = command[2];
        }
      });
    },
    // 打开状态变更弹窗
    open_state () {
      this.state_change = true;
    },
    closed_state () {
      this.state_change = false;
    },
    cancel_state () {
      this.closed_state();
    },
    ok_state () {
      this.closed_state();
    },

    // 新建工单
    open_task_new () {
      this.task.new = true;
      this.task.new_contet = true;
      this.task_new.name = "";
      this.task_new.level = "";
      this.task_new.operator = "";
      this.task_new.textarea = "";
      this.task_new.notice = ["邮件通知"];
    },
    closed_task_new () {
      this.task.new = false;
    },
    next_task_new () {
      this.task.new_contet = false;
      this.handle.active = 0;
    },
    prev_task_handle () {
      this.task.new_contet = true;
    },
    task_list_size_change (val) {
      console.log(`每页 ${val} 条`);
    }
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
};
</script>
<style lang="less">
.dropdown_ul_box {
  width: 148px;
  .el-dropdown-menu__item:hover {
    color: #606266;
  }
}
.el-pagination {
  text-align: center;
}
.network_table {
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
  thead {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #333333;
    th {
      background: #f8f8f8;
      border: 0 !important;
    }
  }
  th:nth-child(1) {
    .cell {
      padding: 0;
      text-align: right;
      font-size: 14px;
      color: #999999;
    }
  }
  tbody {
    td {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
  }
  .el-table-column--selection {
    .cell {
      padding: 0 !important;
      text-align: center;
    }
    .select_all {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;
    }
  }
  .new_dot {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #ff5f5c;
    float: right;
  }
}

/* 弹窗 */
/* 状态变更 */
.pop_state_box {
  .el-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      height: 260px;
      padding: 30px;
      .closed_img {
        position: absolute;
        top: -24px;
        right: -24px;
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
          font-weight: 500;
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
      .content {
        height: 128px;
        padding-top: 48px;
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
    }
  }
}

// 新建工单
.task_new_box {
  .el-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 30px;
      .closed_img {
        position: absolute;
        top: -24px;
        right: -24px;
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
          font-weight: 500;
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
      .step_box {
        height: 36px;
        margin: 20px 0 24px 0;
        .step_box1 {
          background-image: url('../../../assets/images/emerge/step1.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 120px;
          height: 36px;
          float: left;
          position: relative;
          line-height: 36px;
          text-align: center;
          .step1_span {
            font-size: 14px;
          }
          .selected_img {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .step_box2 {
          width: 120px;
          height: 36px;
          background-image: url('../../../assets/images/emerge/step2.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          float: left;
          position: relative;
          line-height: 36px;
          text-align: center;
          margin-left: -10px;
          .step2_span {
            font-size: 14px;
          }
        }
        .step_now {
          color: #0070ff;
        }
        .step_past {
          color: #999999;
        }
      }
      .task_new_content {
        .content_top {
          overflow: hidden;
          .content_top_left {
            float: left;
            width: 45%;
            .left_item {
              margin-bottom: 16px;
              display: flex;
              .title {
                width: 100px;
                line-height: 38px;
                .improtant_ico {
                  color: #ff3a36;
                }
              }
              .task_new_input {
                flex: 1;
                .el-input__inner {
                  height: 38px;
                }
              }
            }
          }
          .content_top_right {
            float: right;
            width: 45%;
            .right_item {
              margin-bottom: 16px;
              display: flex;
              .title {
                width: 100px;
                line-height: 38px;
                .improtant_ico {
                  color: #ff3a36;
                }
              }
              .task_new_input {
                flex: 1;
                .el-input__inner {
                  height: 38px;
                }
              }
            }
          }
        }
        .content_remarks {
          .title {
            font-size: 12px;
            color: #999999;
          }
          textarea {
            resize: none;
          }
          .el-textarea__inner:hover {
            border: none;
          }
          .el-textarea__inner {
            border: none;
            background: #f8f8f8;
          }
        }
        .content_table {
          margin-top: 16px;
          .el-table td {
            padding: 0;
            height: 32px;
          }
          .el-table th {
            padding: 0;
            height: 36px;
            background: #f8f8f8;
          }
          .el-pagination {
            text-align: center;
          }
        }
        .btn_box {
          margin-top: 36px;
          height: 42px;
          text-align: center;
          .cancel_btn {
            border: 1px solid #0070ff;
            background: #fff;
            color: #0070ff;
            width: 136px;
            height: 42px;
            font-size: 16px;
          }
          .next_btn {
            background-color: #0070ff;
            color: #fff;
            width: 136px;
            height: 42px;
            font-size: 16px;
          }
        }
      }
      .task_handle_content {
        .handle_content_top {
          height: 42px;
          .change_btn,
          .ref {
            background-color: #0070ff;
            border-color: #0070ff;
            width: 148px;
            height: 42px;
            color: #fff;
          }
          .cel {
            border: 1px solid #0070ff;
            background: #fff;
            color: #0070ff;
            width: 136px;
            height: 42px;
          }
        }
        .table_box {
          margin-top: 24px;
          .table_box_title {
            height: 38px;
            li {
              height: 38px;
              width: 92px;
              float: left;
              font-size: 14px;
              line-height: 38px;
              color: #bbbbbb;
              text-align: center;
              border-top: 2px solid #fff;
            }
            li.active {
              cursor: pointer;
              background: #eef6ff;
              color: #0070ff;
              border-top: 2px solid #0070ff;
            }
          }
          .el-table {
            font-size: 12px;
            thead {
              color: #333333;
              background: #f8f8f8;
              .cell {
                font-weight: 500;
              }
            }
            .cell {
              color: #333333;
            }
          }
        }

        .btn_box {
          margin-top: 36px;
          height: 42px;
          text-align: center;
          .cancel_btn {
            border: 1px solid #0070ff;
            background: #fff;
            color: #0070ff;
            width: 136px;
            height: 42px;
            font-size: 16px;
          }
          .prev_btn {
            background-color: #0070ff;
            color: #fff;
            width: 136px;
            height: 42px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="less">
#Network {
  text-align: left;
  padding: 36px 56px 24px 24px;
  .el-button {
    padding: 0;
  }
  .e_line {
    height: 322px;
    background: #ffffff;
    border-radius: 4px;
    position: relative;
    .title {
      text-align: left;
      font-size: 18px;
      color: #333;
      font-weight: 600;
      position: absolute;
      top: 12px;
      left: 24px;
    }
  }
  .el-input__inner {
    height: 38px;
  }
  .alert_box {
    margin-top: 24px;
    padding: 24px;
    background: #ffffff;
    border-radius: 4px;
    .title {
      text-align: left;
      font-size: 18px;
      font-weight: 600;
    }
    .search_box {
      padding: 16px 0;
      border-bottom: 1px solid #ececec;
      .search {
        .search_key {
          height: 38px;
          width: 164px;
          display: inline-block;
          margin-bottom: 10px;
        }
        .search_btn {
          background: #0070ff;
          color: #fff;
          width: 102px;
          font-size: 16px;
          height: 38px;
          padding: 0;
          margin-left: 10px;
        }
        .search_reset {
          font-size: 16px;
          color: #0070ff;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
    .change_box {
      margin: 24px 0;
      .change_btn {
        width: 148px;
        height: 42px;
      }
      .edit_btn {
        border: 1px solid #0070ff;
        background: #fff;
        color: #0070ff;
        width: 148px;
        height: 42px;
      }
      .edit_btn:hover {
        background: #fff;
      }
      .edit_btn:active {
        background: #fff;
      }
    }
    .pagination_box {
      margin: 24px 0;
      text-align: center;
    }
  }
}
</style>
