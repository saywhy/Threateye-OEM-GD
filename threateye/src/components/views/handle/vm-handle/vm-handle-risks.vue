<template>
  <div class="handle-lateral" v-cloak>
    <div class="outside-top">
      <div class="ost ost-1">
        <div class="ost-title"><slot name="name"></slot>威胁资产 Top5</div>
        <div class="ost-progress">
          <vm-handle-progress :progress_data="progress_data_source5"
                              v-if="progress_data_source5_show"></vm-handle-progress>
        </div>
      </div>
      <div class="ost ost-2">
        <div class="ost-title"><slot name="name"></slot>威胁类型 Top5</div>
        <div class="ost-emerge">
          <vm-handle-form :form_data="form_data_threat5"
                          v-if="form_data_threat5_show"></vm-handle-form>
        </div>
      </div>
    </div>
    <slot></slot>
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
            </el-row>
          </el-form>
          <el-table ref="multipleTable" class="handle_table common-table"
                    align="center"
                    v-loading="table.loading"
                    :data="table.tableData"
                    tooltip-effect="dark"
                    @selection-change="handleSelChange">
            <el-table-column label="全选" prop="type" width="40">
              <template slot-scope="scope">
                <div class="new_dot" v-show="scope.row.new_alert=='1'"></div>
              </template>
            </el-table-column>
            <el-table-column type="selection" align="left" width="40">
            </el-table-column>
            <el-table-column label="告警时间" width="180">
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
            <el-table-column prop="fall_certainty" label="失陷确定性" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.fall_certainty | certainty }}</template>
            </el-table-column>
            <el-table-column label="状态"  width="80">
              <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
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
    </div>


    <!-- 弹窗 -->
    <!-- 状态变更 -->
    <el-dialog class="pop_state_box" width='480px' :modal-append-to-body="false" :visible.sync="state_change">
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
    <el-dialog class="task_new_box" width='840px' :modal-append-to-body="false" :visible.sync="task.new">
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
        <div class='table_box'>
          <ul class="table_box_title">
            <li v-for="(tab,index) in handle.table_title"
                @click="table_btn_toggle(index)" :class="{active:handle.active==index}">
              {{tab}}
            </li>
          </ul>
          <div>
            <div v-show="handle.active==0">
              <el-table align="center"
                        :data="table_alerts.tableData_new"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handle_sel_table_alerts">
                <el-table-column label="全选" prop="type" width="40"></el-table-column>
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
                <el-table-column prop="fall_certainty" label="失陷确定性" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.fall_certainty | certainty }}</template>
                </el-table-column>
                <el-table-column label="状态"  width="80">
                  <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
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
    <el-dialog class="pop_state_add" width='960px' :modal-append-to-body="false" :visible.sync="add_state_change">
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
  import VmHandleProgress from './vm-handle-progress';
  import VmHandleForm from './vm-handle-form';
  import VmEmergePicker from "@/components/common/vm-emerge-picker";

  export default {
    name: 'handle_threat_indicator',
    props:{
      threats: {
        type:String,
        default:'horizontalthreat'
      },
    },
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
            value: "0",
            label: "未确认"
          },
          {
            value: "1",
            label: "已确认"
          },
          {
            value: "2",
            label: "已处置"
          },
          {
            value: "3",
            label: "已忽略"
          },
          {
            value: "4",
            label: "误报"
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
        this.$axios.get('/yiiapi/'+this.threats+'/source-top5')
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
        this.$axios.get('/yiiapi/'+this.threats+'/threat-top5')
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
        this.$axios.get('/yiiapi/'+this.threats+'/list',{
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
            this.table.tableData = data;
            this.table.count = count;
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;
            this.table.loading = false;

            console.log(data)
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
      currentSelChange(){
        this.get_list_threat();
      },
      //時間切換
      changeTime(data) {
        this.params.startTime = data[0].valueOf();
        this.params.endTime = data[1].valueOf();
        //this.get_list_threat();
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

        this.$axios.put('/yiiapi/'+this.threats+'/do-alarm', {
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

        let sel_table_attr = sel_table_data.map(x => {return x.status});

        if(sel_table_data.length == 0){
          this.$message({message:'您未选中列表或列表为空',type: 'warning'});
          return false;

        }  else {

          if(sel_table_attr.includes('2')
            || sel_table_attr.includes('3')
            || sel_table_attr.includes('4'))
          {

            this.$message({message: '告警状态为已处置,已忽略,误报的不能新建', type: 'error'});

          } else{

            this.table_alerts.tableData = sel_table_data;
            this.table_alerts.count = sel_table_data.length;

            let pageNow = this.table_alerts.pageNow;

            let handle_data = this.table_alerts.tableData.slice((pageNow-1) * 5,pageNow * 5);

            this.table_alerts.tableData_new = handle_data;

            //获取用户列表(经办人使用)
            this.$axios.get('/yiiapi/site/user-list')
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
          }

        }

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

        this.$axios.put('/yiiapi/'+this.threats+'/distribution-workorder',
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
              this.table_operator.tableData_new = [];

              this.get_list_threat();

            }else if (status == 1){

              this.$message.error(msg);

            }

          })
          .catch(err => {
            console.log(err);
          });

      },

      //新建工单保存
      prev_task_handle_save() {

        this.$axios.post('/yiiapi/'+this.threats+'/add-workorder',
          {
            name: this.task_params.name,
            priority:this.task_params.level,
            perator:[],
            remarks:this.task_params.textarea,
            te_alert: this.task_params.multiple,
            remind:this.task_params.notice
          })
          .then((resp) => {

            let {status,msg, data} = resp.data;

            if (status == 0) {
              this.$message.success('保存成功');

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
              this.table_operator.tableData_new = [];
              this.get_list_threat();

            }else if (status == 1){
              this.$message.error(msg);
            }


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

        let sel_table_attr = sel_table_data.map(x => {
          return x.status
        });

        if (sel_table_data.length == 0) {
          this.$message({message: '您未选中列表或列表为空', type: 'warning'});
          return false;

        } else {

          if (sel_table_attr.includes('2')
            || sel_table_attr.includes('3')
            || sel_table_attr.includes('4')) {
            this.$message({message: '告警状态为已处置,已忽略,误报的不能添加到工单', type: 'error'});
          } else {
            this.add_state_change = true;
            this.get_table_works_list();
          }
        }
      },

      //获取列表
      get_table_works_list(){
        this.$axios.get('/yiiapi/'+this.threats+'/workorder-list',{
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

        let selected_attr = this.table.multipleSelection.map(x => {return x.alert_id});

        this.add_params.multiple = selected_attr;

        this.$axios.post('/yiiapi/'+this.threats+'/add-workorder',
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

              this.get_list_threat();

            } else if (status == 1){
              this.$message.error(msg);
            }

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
  @import "../../../../assets/css/less/invest-common-pattern.less";
  @import "../../../../assets/css/less/invest-common-table-pattern.less";
  .handle-lateral{
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
          text-align: left;
          font-family: PingFangMedium;
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
          font-family: PingFang;
          font-size: 16px;
          color: #333333;
          margin-left: 6px;
        }
      }
      .osm-middle{
        height: 220px;
        padding: 16px 24px;
        .osm-dt{
          font-family: PingFangMedium;
          font-size: 14px;
          color: #333333;
          margin: 5px 0;
        }
        .osm-dd{
          font-family: PingFang;
          font-size: 14px;
          color: #666666;
        }

      }
    }
    .outside-bottom{
      background-color: #fff;
      /*min-height: 500px;*/
      padding: 0;
      margin-bottom: 24px;
      /deep/
      .handle_table {
        .el-table__header-wrapper{
          thead.has-gutter{
            th:nth-child(1) {
              .cell {
                padding: 0;
                text-align: right;
                font-size: 14px;
                color: #999999;
                vertical-align: unset;
              }
            }
          }
        }
        .el-table__body-wrapper{
          tbody {
            td {
              font-family: PingFang;
              font-size: 14px;
              color: #333333;
            }
          }
        }
        .el-table-column--selection {
          .cell {
            padding: 0 !important;
            text-align: center;
            .new_dot {
              width: 8px;
              height: 8px;
              border-radius: 20px;
              background: #ff5f5c;
              float: right;
            }
          }
        }
      }
      /deep/
      .handle-pagination{
        margin: 20px 0;
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
                  font-family: PingFang;
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

