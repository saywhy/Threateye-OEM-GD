<template>
  <div class="handle-outreath" v-cloak>
    <div class="outside-top">
      <div class="ost ost-1">
        <div class="ost-title">外联资产 Top5</div>
        <div class="ost-progress">
          <vm-handle-progress :progress_data="progress_data_source5"
          v-if="progress_data_source5_show"></vm-handle-progress>
        </div>
      </div>
      <div class="ost ost-2">
        <div class="ost-title">外联威胁类型 Top5</div>
        <div class="ost-emerge">
          <vm-handle-form :form_data="form_data_threat5"
          v-if="form_data_threat5_show"></vm-handle-form>
        </div>
      </div>
    </div>
    <div class="outside-middle">
      <div class="osm-top">
        <img class="osm-img" src="../../../../assets/images/handle/risks/edit.png">
        <span class="osm-title">威胁及安全建议</span>
      </div>
      <div class="osm-middle">
        <dl>
          <dt class="osm-dt">威胁描述</dt>
          <dd class="osm-dd">外连威胁是指攻击者通过失陷的资产和外网通讯从而达到控制内网资产或者窃取数据的目的，这个阶段的攻击通常伪装成常规的网络通讯和流量避免被检测。</dd>
        </dl>
        <dl>
          <dt class="osm-dt">安全建议</dt>
          <dd class="osm-dd">
            <ul>
              <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
              <li>2、采用安全网关和端点安全等进行深度防御；</li>
              <li>3、采用威胁情报发现C&C服务器信息以及其它高危外连动作；</li>
              <li>4、在扎实的安全防御基础上提升网络和端点的威胁检测和响应能力。</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
    <div class="outside-bottom common-invest">
      <div class="invest">
        <div class="invest_form invest_form_network">
          <el-form class="common-pattern">
            <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
              <el-col :span="24" class="common_box_list">

                <!--搜索关键词-->
                <el-input class="s_key" placeholder="搜索关键词" v-model="params.key_word" clearable>
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>

                <!--时间-->
                <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                <!--告警类型-->
                <el-select class="s_key s_key_types" v-model="params.category" clearable placeholder="告警类型"  @change="currentSelChange">
                  <el-option v-for="item in options_types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <!--处理状态-->
                <el-select class="s_key" v-model="params.status" clearable placeholder="处理状态"  @change="currentSelChange">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <el-button class="s_btn" @click="submitClick();">搜索</el-button>
                <el-link class="s_link" @click="resetClick();">重置</el-link>
              </el-col>
            </el-row>

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

              <!--<el-button type="primary" class="b_btn b_btn_edit">
                <span>编辑标签</span>
              </el-button>-->
            </el-row>
          </el-form>
        </div>
        <el-table ref="multipleTable" class="handle_table common-table"
                  align="center"
                  v-loading="table.loading"
                  :data="table.tableData"
                  tooltip-effect="dark"
                  @selection-change="handleSelChange">
          <el-table-column label="全选" prop="type" width="50">
            <template slot-scope="scope">
              <div class="new_dot" v-show="scope.row.new_alert != null">
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="40">
          </el-table-column>
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
          <el-table-column prop="degree" label="威胁等级" show-overflow-tooltip>
          </el-table-column>
          <!--<el-table-column label="威胁等级">
            <template slot-scope="scope">
              <el-dropdown @command="change_degree" trigger="click" class="degree_box" :class="scope.row.color">
                <el-button type="primary" @click.stop>
                  {{ scope.row.degree }}
                  <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
          </el-table-column>-->
          <el-table-column prop="detect_engine" label="失陷确定性" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">{{ scope.row.status | dispose }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="handle-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="table.eachPage"
          :total="table.count"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
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
          <span style="font-size:14px">是否将已勾选的</span>
          <span style="font-size:14px">{{table.multipleSelection.length}}</span>
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
            <!--<div v-show="handle.active == 0">
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
            </div>-->
            <div v-show="handle.active==0">
              <el-table align="center"
                        :data="table_alerts.tableData_new"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handle_sel_table_alerts">
                <el-table-column label="全选" prop="type" width="50">
                  <template slot-scope="scope">
                    <div class="new_dot" v-show="scope.row.new_alert != null">
                    </div>
                  </template>
                </el-table-column>
                <el-table-column type="selection" width="40">
                </el-table-column>
                <!--<el-table-column label="告警时间" width="120" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
                </el-table-column>-->
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
                <el-table-column prop="degree" label="威胁等级" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="detect_engine" label="失陷确定性" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态"  width="80">
                  <template slot-scope="scope">{{ scope.row.status | dispose }}</template>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @current-change="hcc_table_alerts"
                             :page-sizes="[5]"
                             :page-size="5"
                             :current-page="table_alerts.pageNow"
                             :total="table_alerts.count"
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
  import VmHandleProgress from '../vm-handle/vm-handle-progress';
  import VmHandleForm from '../vm-handle/vm-handle-form';

  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: 'handle-outreath',
    data() {
      return {
        progress_data_source5: [],
        progress_data_source5_show:false,
        form_data_threat5:[],
        form_data_threat5_show:false,
        options_types: [
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
        options_status: [
          {
            value: "1",
            label: "待处理"
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
        params: {
          key_word:"",
          category:"",
          status: "",
          startTime: "",
          endTime: "",
        },
        table: {
          tableData: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 10,
          multipleSelection: [],
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
          table_title: ["告警"],
          active: 0
        },
        table_alerts: {
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
    components:{
      VmHandleProgress,
      VmHandleForm,
      VmEmergePicker
    },
    created(){
      this.get_list_source_top5();
      this.get_list_threat_top5();
      this.get_list_threat();
    },
    methods: {
      //外部威脅源top5
      get_list_source_top5() {
        this.$axios.get('/api/yiiapi/outreachthreat/source-top5')
          .then((resp) => {
            let {status, data} = resp.data;
            if (status == 0) {
              this.progress_data_source5 = data;
              this.progress_data_source5_show = true;
            }
          })
      },
      //外部威脅類型top5
      get_list_threat_top5() {
        this.$axios.get('/api/yiiapi/outreachthreat/threat-top5')
          .then((resp) => {
            let {status, data} = resp.data;
            if (status == 0) {
              this.form_data_threat5 = data;
              this.form_data_threat5_show = true;
            }
          })
      },
      //横向威脅列表
      get_list_threat() {
        this.table.loading = true;
        this.$axios.get('/api/yiiapi/outreachthreat/list',{
          params:{
            start_time:this.params.startTime,
            end_time:this.params.endTime,
            degree:'',
            category:this.params.category,
            status:this.params.status,
            key_word:this.params.key_word,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        }).then((resp) => {

          let { status,data } = resp.data;

          let datas = data;

          if(status == 0){

            let {data, count, maxPage,pageNow } = datas;

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

            this.table.loading = false;
          }
        })
      },
      //每頁多少條切換
      handleSizeChange(val) {
        this.table.eachPage = val;
        this.get_list_threat();
      },
      //頁數點擊切換
      handleCurrentChange(val) {
        this.table.pageNow = val;
        this.get_list_threat();
      },
      //下拉框change切換
      currentSelChange() {
        this.get_list_threat();
      },
      //時間切換
      changeTime(data) {
        this.params.startTime = data[0].valueOf();
        this.params.endTime = data[1].valueOf();
       // this.get_list_threat();
      },
      //搜索按鈕點擊事件
      submitClick(){
        this.get_list_threat();
      },
      //重置按鈕點擊事件
      resetClick(){
        this.params = {
          key_word:"",
          category:"",
          status: "",
          startTime: "",
          endTime: "",
        }
        this.get_list_threat();
      },
      /*****************************/
      handleSelChange(val) {
        this.table.multipleSelection = val;
      },
      //改变告警等级
      change_degree(command) {
        //console.log(command);
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
        let sel_table_data = this.table.multipleSelection;
        if(sel_table_data.length == 0){
          this.$message({message:'您未选中列表，请勾选。',type: 'warning'});
          return false;
        } else {
          this.state_change = true;
        }
      },

      //关闭状态变更弹窗
      closed_state() {
        this.state_change = false;
        this.$refs.multipleTable.clearSelection();
      },

      //状态变更取消按钮点击
      cancel_state() {
        this.closed_state();
      },

      //状态变更确定按钮点击
      ok_state() {

        let selected = this.table.multipleSelection;
        //资产ID处理
        let id_group = selected.map(x => {return x.id;});

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

        this.$axios.put('/api/yiiapi/outreachthreat/do-alarm', {
          id: id_group,
          status: change_status
        })
          .then(resp => {

            let {status, data} = resp.data;

            if (status == 0) {

              this.$message.success('状态变更提交成功！');

              this.$refs.multipleTable.clearSelection();

              this.get_list_threat();

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

        let sel_table_data = this.table.multipleSelection;

       /* if(sel_table_data.length == 0){

          this.$message({message:'您未选中列表，请勾选。',type: 'warning'});

          return false;

        } else {}*/

        this.table_alerts.tableData = sel_table_data;
        this.table_alerts.count = sel_table_data.length;


        let pageNow = this.table_alerts.pageNow;

        let handle_data = this.table_alerts.tableData.slice((pageNow-1) * 5,pageNow * 5)

        this.table_alerts.tableData_new = handle_data;

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
        this.$refs.multipleTable.clearSelection();
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

      //tabs下第一个table页数点击(告警)
      hcc_table_alerts(val) {
        this.table_alerts.pageNow = val;
        let handle_data = this.table_alerts.tableData.slice((val-1) * 5,val * 5);
        this.table_alerts.tableData_new = handle_data;
      },

      //tab下第一个table多选
      handle_sel_table_alerts(val) {
        this.table_alerts.multipleSelection = val;
        let selected = val.map(x => {return x.alert_id});
        this.task_params.multiple = selected;
      },

      //新增工单按钮切换
      table_btn_toggle(index) {
        this.handle.active = index;
      },

      //新建工单分配
      prev_task_handle_assign() {

        this.$axios.put('/api/yiiapi/outreachthreat/distribution-workorder',
          {
            name: this.task_params.name,
            priority:this.task_params.level,
            perator:this.task_params.new_operator,
            remarks:this.task_params.textarea,
            te_alert: this.task_params.multiple,
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
            this.$refs.multipleTable.clearSelection();
          })
          .catch(err => {
            console.log(err);
          });

      },

      //新建工单保存
      prev_task_handle_save() {

        this.$axios.post('/api/yiiapi/outreachthreat/add-workorder',
          {
            name: this.task_params.name,
            priority:this.task_params.level,
            perator:this.task_params.new_operator,
            remarks:this.task_params.textarea,
            te_alert: this.task_params.multiple,
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
            this.$refs.multipleTable.clearSelection();
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

        let sel_table_data = this.table.multipleSelection;

        if(sel_table_data.length == 0){
          this.$message({message:'您未选中列表，请勾选。',type: 'warning'});
          return false;
        }else {
          this.add_state_change = true;
          this.get_table_works_list();
        }
      },

      //获取列表
      get_table_works_list() {
        this.$axios.get('/api/yiiapi/outreachthreat/workorder-list',{
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
      },

      //新加到工单取消状态
      add_closed_state() {
        this.$refs.multipleTable.clearSelection();
        this.add_state_change = false;
      },

      //新加工单列表勾选某一条记录
      handle_sel_table_add_works (row) {

        // el-radio单选框,不需要这一步
        if(row != undefined){

          this.table_add_works.tableData.forEach(item => {
            // 排他,每次选择时把其他选项都清除
            if (item.id != row.id) {
              item.checked = false
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

        let selected_attr = this.table_alerts.multipleSelection
          .map(x => {return x.alert_id});

        this.add_params.multiple = selected_attr;

        this.$axios.post('/api/yiiapi/outreachthreat/add-workorder',
          {
            id:this.add_params.id,
            name: this.add_params.name,
            priority: this.add_params.level,
            perator: this.add_params.perator,
            remind:this.add_params.notice,
            remarks:this.add_params.remarks,
            te_alert: this.add_params.multiple
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
      hcc_table_add_works(val) {

        this.table_add_works.pageNow = val;

        this.get_table_works_list();
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../../../assets/css/less/invest-common-pattern.less";
  @import "../../../../assets/css/less/invest-common-table-pattern.less";
  .handle-outreath{
    padding: 24px;
    .outside-top{
      display: flex;
      .ost{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        padding: 24px;
        .ost-title{
          font-size: 16px;
          color: #333;
          font-weight: bold;
          text-align: left;
          font-family: PingFangSC-Medium;
        }
        &.ost-1{
          width: 1221px;
          margin-right: 24px;
          .ost-progress{
            margin-top: 16px;
          }
        }
        &.ost-2{
          flex: 1;
          .ost-emerge{
            height: 100%;
          }
        }
      }
    }
    .outside-middle{
      margin: 24px 0;
      height: 283px;
      background-color: #fff;
      text-align: left;
      .osm-top{
        height: 62px;
        line-height: 62px;
        border-bottom: 1px solid #ECECEC;
        margin: 0 24px;
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
        padding: 16px 24px;
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
    .outside-bottom{
      background-color: #fff;
      height: 885px;
      padding: 12px 0;
      margin-bottom: 24px;
      /deep/
      .handle_table {
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
      /deep/
      .handle-pagination{
        margin: 20px 0;
      }
    }
  }
</style>

