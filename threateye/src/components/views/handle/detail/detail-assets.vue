<template>
    <div class="detail-assets" v-cloak>
      <back-title :title-name="title_name"></back-title>

      <div class="detail_base_top">
          <div class="top_left">
            <img src="@/assets/images/handle/others/detail_a_1.png" alt="">
            <span class="top_left_title">{{detail.asset_ip}}</span>
          </div>
          <div class="top_right">
            <!--按钮组-->
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
                  <span class="content">{{assets_top.fall_certainty | certainty}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>威胁等级：</span>
                  <span class="content">{{assets_top.degree | degree}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>资产类型：</span>
                  <span class="content">{{assets_top.new_base_category}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>分支：</span>
                  <span class="content">{{assets_top.new_branch}}</span>
              </li>
          </div>
          <div class="bom_item">
              <li>
                  <span class="title">业务：</span>
                <span class="content">{{assets_top.new_department}}</span>
              </li>
              <li>
                  <span class="title">工单名称：</span>
                  <span class="content">{{assets_top.workorder_name}}</span>
              </li>
              <li>
                  <span class="title">工单状态：</span>
                  <span class="content">{{assets_top.workorder_status | risk_status}}</span>
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
                      <el-dropdown-item :command="['高危',scope.$index,'high']" v-if="scope.row.degree !='高'">
                        高危
                      </el-dropdown-item>
                      <el-dropdown-item :command="['中危',scope.$index,'mid']" v-if="scope.row.degree !='中'">
                        中危
                      </el-dropdown-item>
                      <el-dropdown-item :command="['低危',scope.$index,'low']" v-if="scope.row.degree !='低'">
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

      <!-- 弹窗 -->
      <!-- 状态变更 -->
      <el-dialog class="pop_state_box" width='480px' :visible.sync="state_change">
        <img src="@/assets/images/emerge/closed.png" @click="closed_state" class="closed_img" alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">状态变更</span>
        </div>
        <div class="content">
          <p class="content_p" style="font-size:0">
            <span style="font-size:14px">是否将</span>
            <span style="font-size:14px">{{detail.asset_ip}}</span>
            <span style="font-size:14px">项状态变更为“</span>
            <span style="font-size:14px">{{process_state}}</span>
            <span style="font-size:14px">”?</span>
          </p>
        </div>
        <div class="btn_box">
          <el-button @click="cancel_state" class="cancel_btn">取消</el-button>
          <el-button @click="ok_state" class="ok_btn">确定</el-button>
        </div>
      </el-dialog>

      <!-- 弹窗 -->
      <!-- 工单任务 -->
      <el-dialog class="task_new_box" width='840px' :visible.sync="task.new">
        <img src="@/assets/images/emerge/closed.png" @click="closed_task_new" class="closed_img" alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">新建工单</span>
        </div>
        <div class="step_box">
          <div class="step_box1">
            <span class="step1_span" :class="task.new_contet?'step_now':'step_past'">基本信息</span>
            <img src="@/assets/images/emerge/selected01.png" class="selected_img" alt="">
          </div>
          <div class="step_box2">
            <span class="step2_span" :class="!task.new_contet?'step_now':'step_past'">处置内容</span>
          </div>
        </div>
        <!-- 基本信息 -->
        <div class="task_new_content" v-if="task.new_contet">
          <div class="content_top">
            <div class="content_top_left">
              <li class="left_item">
                <div class="title">
                  <span>工单名称</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-input class="task_new_input" placeholder="请输入工单名称" v-model="task_params.name" clearable>
                </el-input>
              </li>
              <li class="left_item">
                <div class="title">
                  <span>经办人</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input" v-model="task_params.operator" clearable placeholder="请选择经办人"  >
                  <el-option v-for="item in task_new.operator_list" @click.native="select_changced(item)" :key="item.id" :label="item.username" :value="item.username">
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
                <el-select class="task_new_input" v-model="task_params.level" clearable placeholder="请选择优先级">
                  <el-option v-for="item in task_new.level_list" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li class="right_item">
                <el-checkbox-group v-model="task_params.notice">
                  <el-checkbox label="email" value="email">邮件通知</el-checkbox>
                  <el-checkbox label="message" value="message">短信通知</el-checkbox>
                  <el-checkbox label="news" value="news">消息中心通知</el-checkbox>
                </el-checkbox-group>
              </li>
            </div>
          </div>
          <div class="content_remarks">
            <p class="title">备注</p>
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="task_params.textarea">
            </el-input>
          </div>
          <div class="content_table">
            <el-table :data="table_operator.tableData_new" style="width: 100%">
              <el-table-column prop="username" label="经办人"></el-table-column>
              <el-table-column prop="department" label="部门"></el-table-column>
              <el-table-column prop="email_addr" label="邮箱"></el-table-column>
            </el-table>
            <el-pagination class="pagination_box"
                           @current-change="hcc_table_operator"
                           :page-sizes="[5]" :page-size="5"
                           :current-page="table_operator.pageNow"
                           :total="table_operator.tableData.length"
                           layout="total,sizes, prev, pager, next">
            </el-pagination>
          </div>
          <div class="btn_box">
            <el-button @click="closed_task_new" class="cancel_btn">取消</el-button>
            <el-button @click="next_task_new" class="next_btn">下一步</el-button>
          </div>
        </div>

        <!-- 处置内容 -->
        <div class="task_handle_content" v-if="!task.new_contet">
          <!--<div class="handle_content_top">
            &lt;!&ndash;<el-dropdown placement='bottom-start' @command="handle.add" trigger="click">
              <el-button type="primary" class="change_btn">
                <span>新增</span>
                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                <el-dropdown-item command="资产">资产</el-dropdown-item>
                <el-dropdown-item command="告警">告警</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>&ndash;&gt;
            <el-button class="ref">刷新</el-button>
            <el-button class="cel">删除</el-button>
          </div>-->
          <div class='table_box'>
            <ul class="table_box_title">
              <li v-for="(tab,index) in handle.table_title"
                  @click="table_btn_toggle(index)" :class="{active:handle.active==index}">
                {{tab}}
              </li>
            </ul>
            <div>
              <div v-show="handle.active == 0">
                <el-table align="center"
                          :data="table_assets.tableData_new"
                          tooltip-effect="dark"
                          style="width: 100%"
                          @selection-change="handle_sel_table_assets">
                  <el-table-column label="全选" width="40"></el-table-column>
                  <el-table-column align='left' type="selection" width="30"></el-table-column>
                  <el-table-column prop="asset_ip" label="资产"></el-table-column>
                  <el-table-column prop="assets_group" label="资产组" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="category_group" label="关联威胁" show-overflow-tooltip></el-table-column>
                  <el-table-column label="威胁等级">
                    <template slot-scope="scope">{{ scope.row.degree | degree }}</template>
                  </el-table-column>
                  <el-table-column label="失陷确定性">
                    <template slot-scope="scope">{{ scope.row.fall_certainty | certainty }}</template>
                  </el-table-column>
                  <el-table-column label="状态" width="80">
                    <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                  </el-table-column>
                </el-table>
                <el-pagination class="pagination_box"
                               @current-change="hcc_table_assets"
                               :page-sizes="[5]"
                               :page-size="5"
                               :current-page="table_assets.pageNow"
                               :total="table_assets.count"
                               layout="total, sizes, prev, pager, next">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="btn_box">
            <el-button @click="closed_task_new" class="cancel_btn">取消</el-button>
            <el-button @click="prev_task_handle" class="prev_btn">上一步</el-button>
            <el-button @click="prev_task_handle_assign" class="prev_btn">分配</el-button>
            <el-button @click="prev_task_handle_save" class="prev_btn">保存</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 弹窗 -->
      <!-- 添加到工单 -->
      <el-dialog class="pop_state_add" width='960px' :visible.sync="add_state_change">
        <img src="@/assets/images/emerge/closed.png" @click="add_closed_state" class="closed_img" alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">添加到工单</span>
        </div>
        <div class="content">
          <el-row class="common-table-pattern">
            <el-col :span="24">
              <el-table class="common-table"
                        highlight-current-row
                        v-loading="table_add_works.loading"
                        :data="table_add_works.tableData"
                        @current-change="handle_sel_table_add_works">
                <el-table-column label="单选" width="40">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="工单名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="creator" label="创建人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="优先级" width="120">
                  <template slot-scope="scope">{{ scope.row.priority | priority }}</template>
                </el-table-column>
                <el-table-column prop="new_perator" label="经办人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态" width="80" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24" class="e-pagination">
              <el-pagination
                class="handle-pagination"
                @current-change="hcc_table_add_works"
                :page-sizes="[5]"
                :page-size="table_add_works.eachPage"
                :total="table_add_works.count"
                :current-page="table_add_works.pageNow"
                layout="total, sizes, prev, pager, next">
              </el-pagination>
            </el-col>
          </el-row>
        </div>
        <div class="btn_box">
          <el-button @click="add_closed_state" class="cancel_btn">取消</el-button>
          <el-button @click="add_ok_state" class="ok_btn">确定</el-button>
        </div>
      </el-dialog>

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
      assets_top:{},
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection:[],
        loading:true
      },

      //弹窗部分
      state_change: false,
      process_state: "",

      //工单任务
      task: {
        new: false,
        new_contet: true
      },
      task_params:{
        name: "",
        level: "",
        operator: "",
        new_operator:[],
        notice: ['email'],
        textarea: "",
        multiple:[]
      },
      task_new: {
        level_list: [
          {
            value: "highest",
            label: "极高"
          },
          {
            value: "high",
            label: "高"
          },
          {
            value: "midium",
            label: "中"
          },
          {
            value: "low",
            label: "低"
          }
        ],
        operator_list: [],
      },
      //经办人数组
      table_operator:{
        tableData: [],
        tableData_new:[],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5
      },
      handle: {
        add: "",
        table_title: ["资产"],
        active: 0
      },
      table_assets: {
        tableData: [],
        tableData_new: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5,
        multipleSelection: []
      },

      //添加到工单
      add_state_change:false,
      table_add_works: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5,
        loading: true
      },
      add_params:{
        name: "",
        level: "",
        operator: [],
        notice: ['email'],
        remarks: "",
        multiple:[]
      },
    };
  },

  created(){

    let asset_ip = this.$route.query.asset_ip;
    this.detail.asset_ip = asset_ip;

    this.get_list_assets_detail();
    this.get_assets_detail_top();
    this.get_list_assets_info();

  },
  methods: {

    //获取资产列表
    get_list_assets_info(){
      this.$axios.get('/api/yiiapi/alert/risk-asset',{
        params: {
          label:'[]',
          key_word: '',
          fall_certainty: '',
          degree: '',
          status: '',
          page: 1,
          rows: 1000
        }
      })
        .then((resp) => {
          let {status, data} = resp.data;
          let datas = data;
          if (status == 0) {
            let {data, count, maxPage, pageNow} = datas;
            data.map(function (v, k) {
              let assets_group = v.label.join(',');
              let category_group = v.category.join(',');
              v.assets_group = assets_group;
              v.category_group = category_group;
            })
            this.table_assets.tableData = data;
            this.table_assets.count = count;
            this.table_assets.maxPage = maxPage;
            this.table_assets.pageNow = pageNow;
          }
        });
    },

    //获取资产详情顶部
    get_assets_detail_top() {
      this.$axios.get('/api/yiiapi/asset/asset-details',
        {
          params: {
           asset_ip: this.detail.asset_ip
          }
        })
        .then((resp) => {

          let {status, data} = resp.data;

          if (status == 0) {

            let base_category = data.label.base_category;

            if(base_category.includes('终端')){
              data.new_base_category = '终端';
            }else if(base_category.includes('服务器')){
              data.new_base_category = '终端';
            }else if(base_category.includes('网络设备')){
              data.new_base_category = '网络设备';
            }
            data.new_branch = data.label.branch.join(',');
            data.new_department = data.label.department.join(',');

            this.assets_top = data;
          }
        });
    },

    //获取资产详情列表
    get_list_assets_detail() {

      this.$axios.get('/api/yiiapi/asset/alert-list',
        {
          params: {
            asset_ip: this.detail.asset_ip,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        })
        .then((resp) => {

          let {status, data} = resp.data;

          let datas = data;

          if (status == 0) {

            let {data, count, maxPage, pageNow} = datas;

            data.map(function (v,k) {
              switch (v.degree) {
                case '高':
                  v.color = 'high';
                  break;
                case '中':
                  v.color = 'mid';
                  break;
                case '低':
                  v.color = 'low';
                  break;
                default:
                  break;
              }
            });

            this.table.tableData = data;
            this.table.count = count;
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;

          }
        });
    },

    //每頁多少條切換
    handleSizeChange(val) {
      this.table.eachPage = val;
      this.get_list_assets_detail();
    },

    //頁數點擊切換
    handleCurrentChange(val) {
      this.table.pageNow = val;
      this.get_list_assets_detail();
    },

    /*****************************/

    //改变告警等级
    change_degree(command) {
      this.table.tableData.forEach(function(item, index) {
        if (command[1] == index) {
          item.degree = command[0];
          item.color = command[2];
        }
      });
    },

    /***********************************以下是弹窗部分****************************************/
    /***********************************以下是弹窗部分****************************************/

    // 状态变更选择
    change_state(command) {
      this.process_state = command;
      this.open_state();
    },

    //工单任务选择
    change_task(command) {
      if (command == "新建工单") {
        this.open_task_new();
      }else if(command == "添加到工单"){
        this.open_add_new();
      }
    },

    /***************状态变更*****************/
    //打开状态变更弹窗
    open_state() {
      this.state_change = true;
    },

    //关闭状态变更弹窗
    closed_state() {
      this.state_change = false;
    },

    //状态变更取消按钮点击
    cancel_state() {
      this.closed_state();
    },

    //状态变更确定按钮点击
    ok_state() {
      //资产处理
      let asset_ip_group = this.detail.asset_ip;

      //状态设置
      let process = this.process_state;
      let change_status = 0;

      if (process == '处置中') {
        change_status = 1;
      } else if (process == '已处置') {
        change_status = 2;
      } else if (process == '已忽略') {
        change_status = 3;
      } else if (process == '误报') {
        change_status = 4;
      }

      this.$axios.put('/api/yiiapi/alert/change-asset-status', {
        asset_ip: [asset_ip_group],
        status: change_status
      })
        .then(resp => {

          let {status, data} = resp.data;

          if (status == 0) {

            this.$message.success('状态变更提交成功！');

          } else {

            this.$message.error('状态变更提交错误。');

          }

          this.closed_state();

        })
        .catch(err => {

          console.log(err);

        })
    },

    /***************工单任务*****************/

    //打开新建工单
    open_task_new() {

      let pageNow = this.table_assets.pageNow;

      let handle_data = this.table_assets.tableData.slice((pageNow-1) * 5,pageNow * 5);

      this.table_assets.tableData_new = handle_data;

      //获取用户列表(经办人使用)
      this.$axios.get('/api/yiiapi/site/user-list')
        .then(resp => {
          let {status, data} = resp.data;
          if (status == 0) {
            this.task_new.operator_list = data;
          }else {
            this.task_new.operator_list = [];
          }
          this.task.new = true;
          this.task.new_contet = true;
        })
        .catch(err => {
          console.log('用户列表错误');
          console.log(err);
        })
    },

    //关闭新建工单
    closed_task_new () {
      this.task.new = false;
      this.task_params = {
        name: "",
        level: "",
        operator: "",
        new_operator:[],
        notice: ['email'],
        textarea: "",
        multiple:[]
      };
    },

    //下一步时候验证工单名称，优先级、经办人等参数
    next_task_new() {

      if(this.task_params.name == ''){
        this.$message.error('工单名称不能为空');
      }else if(this.task_params.level == ''){
        this.$message.error('优先级未选择');
      }else if(this.task_params.operator == ''){
        this.$message.error('经办人未选择');
      }else {
        this.task.new_contet = false;
        this.handle.active = 0;
      }
    },

    //上一步
    prev_task_handle() {
      this.task.new_contet = true;
    },

    //经办人change处理
    select_changced(item) {

      let level_list = this.table_operator.tableData;

      let selected_id_attr = level_list.map(x => {return x.id});
      if(selected_id_attr.includes(item.id)){
        this.$message.error('已存在');
      }else {
        this.table_operator.tableData.unshift(item);
      }

      let pageNow = this.table_operator.pageNow;

      let handle_data_operator = this.table_operator.tableData.slice((pageNow-1) * 5,pageNow * 5);
      this.table_operator.tableData_new = handle_data_operator;

      let selected_name_attr = this.table_operator.tableData.map(x => {return x.username});

      this.task_params.new_operator = selected_name_attr;
    },

    //经办人页数点击
    hcc_table_operator(val) {
      this.table_operator.pageNow = val;
    },

    //tabs下第一个table页数点击(资产)
    hcc_table_assets(val) {
      this.table_assets.pageNow = val;
      let handle_data = this.table_assets.tableData.slice((val-1) * 5,val * 5);
      this.table_assets.tableData_new = handle_data;
    },

    //tab下第一个table多选
    handle_sel_table_assets(val) {
      this.table_assets.multipleSelection = val;
      let selected = val.map(x => {return x.asset_ip});
      this.task_params.multiple = selected;
    },

    //新增工单按钮切换
    table_btn_toggle(index) {
      this.handle.active = index;
    },

    //新建工单分配
    prev_task_handle_assign() {

      this.$axios.put('/api/yiiapi/asset/distribution-workorder',
        {
          name: this.task_params.name,
          priority:this.task_params.level,
          perator:this.task_params.new_operator,
          remarks:this.task_params.textarea,
          risk_asset: this.task_params.multiple,
          remind:this.task_params.notice
        })
        .then((resp) => {

          let {status,msg, data} = resp.data;

          if (status == 0) {

            this.$message.success('分配成功');

          }else if (status == 1){

            this.$message.error(msg);

          }
          //不管成功与否 都需要清除状态，关闭弹窗
          this.task.new = false;
          this.task.new_contet = false;

          this.task_params = {
            name: "",
            level: "",
            operator: "",
            new_operator:[],
            notice: ['email'],
            textarea: "",
            multiple:[]
          };
          this.table_operator.tableData = [];
        })
        .catch(err => {
          console.log(err);
        });

    },

    //新建工单保存
    prev_task_handle_save() {

      this.$axios.post('/api/yiiapi/asset/add-workorder',
        {
          name: this.task_params.name,
          priority:this.task_params.level,
          perator:this.task_params.new_operator,
          remarks:this.task_params.textarea,
          risk_asset: this.task_params.multiple,
          remind:this.task_params.notice
        })
        .then((resp) => {

          let {status,msg, data} = resp.data;

          if (status == 0) {
            this.$message.success('保存成功');
          }else if (status == 1){
            this.$message.error(msg);
          }

          //不管成功与否 都需要清除状态，关闭弹窗
          this.task.new = false;
          this.task.new_contet = false;

          this.task_params = {
            name: "",
            level: "",
            operator: "",
            new_operator:[],
            notice: ['email'],
            textarea: "",
            multiple:[]
          };
          this.table_operator.tableData = [];
        })
        .catch(err => {
          console.log(err);
        });
    },

    /***************新加到工单*****************/

    //添加到工单打开
    open_add_new(){
      this.add_open_state();
    },

    //新加到工单打开状态
    add_open_state() {
      this.add_state_change = true;
      this.get_table_works_list();
    },

    //获取列表
    get_table_works_list() {
      this.$axios.get('/api/yiiapi/asset/workorder-list',{
        params:{
          page: this.table_add_works.pageNow,
          rows: this.table_add_works.eachPage
        }
      }).then((resp) => {

        let {status, data} = resp.data;

        let datas = data;

        if (status == 0) {

          let {data, count, maxPage, pageNow} = datas;

          data.map(function (v,k) {
            v.new_perator = (JSON.parse(v.perator)).join(',');
            v.checked = false;
          });

          this.table_add_works.tableData = data;
          this.table_add_works.count = count;
          this.table_add_works.maxPage = maxPage;
          this.table_add_works.pageNow = Number(pageNow);
          this.table_add_works.loading = false;

        }
      })
        .catch(err => {
        console.log(err);
      })
    },

    //新加到工单取消状态
    add_closed_state() {
      this.add_state_change = false;
      this.table_add_works.tableData = [];
    },

    //新加工单列表勾选某一条记录
    handle_sel_table_add_works (row) {

      // el-radio单选框,不需要这一步
      if(row != undefined){

        this.table_add_works.tableData.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id != row.id) {
            item.checked = false;
          }
        });
        this.add_params.id = row.id;
        this.add_params.name = row.name;
        this.add_params.level  = row.priority;
        this.add_params.perator = JSON.parse(row.perator);
        this.add_params.remarks = row.remarks;
      }
    },

    //新加到工单确定
    add_ok_state() {

      let selected_attr = this.table_assets.multipleSelection
        .map(x => {return x.asset_ip});

      this.add_params.multiple = selected_attr;

      this.$axios.post('/api/yiiapi/asset/add-workorder',
        {
          id: this.add_params.id,
          name: this.add_params.name,
          priority: this.add_params.level,
          perator: this.add_params.perator,
          remind:this.add_params.notice,
          remarks:this.add_params.remarks,
          risk_asset: this.add_params.multiple
        })
        .then((resp) => {

          let {status, msg, data} = resp.data;

          if (status == 0) {
            this.$message.success('添加成功');
          } else if (status == 1){
            this.$message.error(msg);
          }

          //不管成功与否，状态清空
          this.add_params = {
            name: "",
            level: "",
            operator: "",
            new_operator:[],
            notice: ['email'],
            textarea: "",
            multiple:[]
          };
          this.add_closed_state();
        })
        .catch(err => {
          console.log(err);
        });
    },

    //新加工单列表分页页面切换
    hcc_table_add_works(val){

      this.table_add_works.pageNow = val;

      this.get_table_works_list();
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

    /* 弹窗 */
    /* 状态变更 */
    /deep/
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
            top: -18px;
            right: -18px;
            cursor: pointer;
            width: 46px;
            height: 46px;
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
            .content_p{
              text-align: center;
            }
          }

          .btn_box {
            height: 42px;
            text-align: center;
            margin-bottom: 24px;

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
    /deep/
    .task_new_box {
      .el-dialog {
        .el-dialog__header {
          display: none;
        }

        .el-dialog__body {
          padding: 30px;

          .closed_img {
            position: absolute;
            top: -18px;
            right: -18px;
            cursor: pointer;
            width: 46px;
            height: 46px;
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
              background-image: url("../../../../assets/images/emerge/step1.png");
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
              background-image: url("../../../../assets/images/emerge/step2.png");
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
            /*height: 480px;*/
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

              /deep/
              .el-textarea{
                height: 92px;
                textarea {
                  resize: none;
                  height: 92px;
                  font-size: 14px;
                  color: #333;
                  font-family: PingFangSC-Regular;
                }
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

              /deep/
              .el-table td {
                padding: 0;
                height: 32px;
              }
              /deep/
              .el-table th {
                padding: 0;
                height: 36px;
                background: #f8f8f8;
                .cell{
                  font-weight: bold;
                }
              }

              /deep/
              .el-pagination {
                margin-top: 20px;
                text-align: center;
              }
            }

            .btn_box {
              margin-top: 36px;
              margin-bottom: 24px;
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
              text-align: left;
              .change_btn,
              .ref {
                background-color: #0070ff;
                border-color: #0070ff;
                width: 136px;
                height: 42px;
                color: #fff;
              }

              .cel {
                border: 1px solid #0070ff;
                background: #fff;
                color: #0070ff;
                width: 136px;
                height: 42px;
                margin-left: 0;
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
              /deep/
              .el-table {
                font-size: 12px;
                thead.has-gutter{
                  th{
                    color: #333333;
                    background: #f8f8f8;
                    .cell {
                      font-weight: bold;
                    }
                  }
                }
                .cell {
                  color: #333333;
                }
              }

              /deep/
              .el-pagination {
                margin-top: 20px;
                text-align: center;
              }
            }

            .btn_box {
              margin-top: 36px;
              margin-bottom: 24px;
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

    //添加到工单
    /deep/
    .pop_state_add {
      .el-dialog {
        .el-dialog__header {
          display: none;
        }

        .el-dialog__body {
          max-height: 640px;
          padding: 30px;

          .closed_img {
            position: absolute;
            top: -18px;
            right: -18px;
            cursor: pointer;
            width: 46px;
            height: 46px;
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
            padding-top: 48px;
          }

          .btn_box {
            height: 42px;
            text-align: center;
            margin-bottom: 24px;
            margin-top: 36px;

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
}


</style>
<style lang="less">
  .dropdown_ul_box {
    width: 136px!important;
    margin-right: 8px;
  }
</style>




