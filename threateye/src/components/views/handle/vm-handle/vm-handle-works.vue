<template>
  <div class="vm-handle-works" v-cloak>
    <div class="invest_form invest_form_network">
      <el-form class="common-pattern">
        <el-row class="common_box">
          <el-col :span="24" class="common_box_list">

            <!--搜索关键词-->
            <el-input class="s_key" placeholder="搜索关键词" v-model="params.key" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <!--时间-->
            <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

            <!--优先级-->
            <el-select class="s_key s_key_types" v-model="params.priority" clearable placeholder="优先级">
              <el-option v-for="item in options_priority" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <!--处理状态-->
            <el-select class="s_key" v-model="params.status" clearable placeholder="处理状态">
              <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-button class="s_btn" @click="submitClick();">搜索</el-button>
            <el-link class="s_link" @click="resetClick();">重置</el-link>
          </el-col>
        </el-row>

        <!--按钮组-->
        <el-row class="common_priority" style="text-align: left;">
          <el-col :span="24" class="common_btn_priority">
            <p class="item_list">
              <span class="item">共计 <span class="num">{{count.count}}</span> 条</span>
              <span class="item">其中优先级</span>
              <el-tag class="e_tag e-tag-1">最高：<span class="nums">{{count.highest}}</span></el-tag>
              <el-tag class="e_tag e-tag-2">高：<span class="nums">{{count.high}}</span></el-tag>
              <el-tag class="e_tag e-tag-3">中：<span class="nums">{{count.medium}}</span></el-tag>
              <el-tag class="e_tag e-tag-4">低：<span class="nums">{{count.low}}</span></el-tag>
            </p>
          </el-col>
        </el-row>

        <!--按钮组-->
        <el-row class="common_btn">
          <el-col :span="24" class="common_btn_list">
            <el-dropdown @command="change_state" trigger="click" placement='bottom-start'>
              <el-button type="primary" class="change_btn">
                <span>状态变更</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                <el-dropdown-item command="处置中" class="select_item">处置中</el-dropdown-item>
                <el-dropdown-item command="已处置" class="select_item">已处置</el-dropdown-item>
                <el-dropdown-item command="已取消" class="select_item">已取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" class="bw_btn bw_btn_add" @click="open_task_new();">
              <span>新增</span>
            </el-button>
            <el-button type="primary" class="bw_btn bw_btn_edit" @click="open_task_new('edit');">
              <span>编辑</span>
            </el-button>
            <el-button type="primary" class="bw_btn bw_btn_download" @click="worksdownload();">
              <span>下载</span>
            </el-button>
            <el-button type="primary" class="bw_btn bw_btn_remove" @click="worksDelete();">
              <span>删除</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="multipleTable" class="common-table"
              v-loading="table.loading"
              :data="table.tableData"
              :row-style="{cursor:'pointer'}"
              tooltip-effect="dark"
              @selection-change="handleSelChange"
              @row-click="detail_click">
      <el-table-column label="全选" prop="type" width="40">
        <template slot-scope="scope">
          <div class="new_dot" v-show="scope.row.if_new == '1'"></div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="name" label="工单名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="创建时间" width="180" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.created_at | time }}</template>
      </el-table-column>
      <el-table-column label="优先级">
        <template slot-scope="scope">{{ scope.row.priority | priority }}</template>
      </el-table-column>
      <el-table-column prop="perator" label="经办人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="更新时间" width="180" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.updated_at | time }}</template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态" width="80" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
          class="handle-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50,100]"
          :page-size="table.eachPage"
          :current-page="table.pageNow"
          :total="table.count"
          layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 弹窗 -->
    <!-- 工单任务 -->
    <el-dialog class="task_new_box" width='840px' :modal-append-to-body="false" :visible.sync="task.new">
      <img src="@/assets/images/emerge/closed.png" @click="closed_task_new" class="closed_img" alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">{{task.title}}</span>
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
        <div class="task_content_box">
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
                  <!--<el-checkbox label="news" value="news">消息中心通知</el-checkbox>-->
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
            <el-table :data="table_operator.tableData" style="width: 100%">
              <el-table-column prop="username" label="经办人"></el-table-column>
              <el-table-column prop="department" label="部门"></el-table-column>
              <el-table-column prop="email_addr" label="邮箱"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new" class="cancel_btn">取消</el-button>
          <el-button @click="next_task_new" class="next_btn">下一步</el-button>
        </div>
      </div>

      <!-- 处置内容 -->
      <div class="task_handle_content" v-if="!task.new_contet">
         <div class="task_content_box">
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
                   <el-table-column align='left' type="selection" width="40"></el-table-column>
                   <el-table-column prop="asset_ip" label="资产"></el-table-column>
                   <el-table-column prop="label_group" label="资产组" show-overflow-tooltip></el-table-column>
                   <el-table-column label="威胁等级">
                     <template slot-scope="scope">{{ scope.row.degree | degree }}</template>
                   </el-table-column>
                   <el-table-column label="失陷确定性">
                     <template slot-scope="scope">
                       <span class="fall_certainty">{{ scope.row.fall_certainty | certainty }}</span>
                     </template>
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
               <div v-show="handle.active==1">
                 <el-table align="center"
                           :data="table_alerts.tableData_new"
                           tooltip-effect="dark"
                           style="width: 100%"
                           @selection-change="handle_sel_table_alerts">
                   <el-table-column label="全选" prop="type" width="40">
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
         </div>
         <div class="btn_box">
            <el-button @click="closed_task_new" class="cancel_btn">取消</el-button>
            <el-button @click="prev_task_handle" class="prev_btn">上一步</el-button>
            <el-button @click="prev_task_handle_assign" class="prev_btn">分配</el-button>
            <el-button @click="prev_task_handle_save" class="prev_btn">保存</el-button>
         </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: 'vm-handle-tabs',
    props:{
      owned: {
        type:String,
        default:'created'
      },
    },
    data(){
      return {
        options_priority: [
          {
            value: "highest",
            label: "最高"
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
        options_status: [
          {
            value: "0",
            label: "待分配"
          },
          {
            value: "1",
            label: "已分配"
          },
          {
            value: "2",
            label: "处理中"
          },
          {
            value: "3",
            label: "已处置"
          },
          {
            value: "4",
            label: "已取消"
          }
        ],
        params: {
          key: "",
          priority: "",
          status: "",
          startTime: "",
          endTime: "",
        },

        count: {
          count: 0,
          highest: 0,
          high: 0,
          medium: 0,
          low: 0
        },
        table: {
          tableData: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 10,
          multipleSelection: [],
          loading: true,
        },

        //弹窗部分
        state_change: false,
        process_state: "",
        //工单任务
        task: {
          new: false,
          new_contet: true,
          status:'',
          id: 0,
          title:'新增工单'
        },
        task_params:{
          name: "",
          level: "",
          operator: "",
          new_operator:[],
          notice: ['email'],
          textarea: "",
          multiple_assets:[],
          multiple_alerts:[],
          type:'asset'
        },
        task_new: {
          level_list: [
            {
              value: "highest",
              label: "最高"
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
          table_title: ["资产","告警"],
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
        table_alerts: {
          tableData: [],
          tableData_new: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 5,
          multipleSelection: []
        }
      }
    },
    components:{
      VmEmergePicker
    },
    created(){
      this.get_list_works();
      this.get_list_assets_info();
      this.get_list_alerts_info();
    },
    methods:{
      //获取全部资产列表
      get_list_assets_info(){
        this.$axios.get('/yiiapi/workorder/asset-list')

          .then((resp) => {

            let {status, data} = resp.data;

            if (status == 0) {

              data.map(function (v,k) {
                v.label = JSON.parse(v.label);
                if(v.label && v.label.length){
                  v.label_group = v.label.join(',');
                }else {
                  v.label_group = '';
                }
              });

              this.table_assets.tableData = data;
              this.table_assets.count = data.length;

              this.table_assets.pageNow = 1;
            }
          });
      },
      //获取全部告警列表
      get_list_alerts_info(){
        this.$axios.get('/yiiapi/workorder/alert-list')
          .then((resp) => {
            let {status, data} = resp.data;
            if (status == 0) {
              this.table_alerts.tableData = data;
              this.table_alerts.count = data.length;
              this.table_alerts.pageNow = 1;
            }
          });
      },


      //工单中心列表
      get_list_works(){

        this.table.loading = true;
        this.$axios.get('/yiiapi/workorder/list',
          {
            params: {
              stime:this.params.startTime,
              etime:this.params.endTime,
              status: this.params.status,
              priority:this.params.priority,
              key_word: this.params.key,
              owned: this.owned,
              page: this.table.pageNow,
              rows: this.table.eachPage
            }
          })
          .then((resp) => {

            this.table.loading = false;

            let {status, data} = resp.data;

            let datas = data;

            if (status == 0) {

              let {data, count, maxPage, pageNow} = datas;

              this.count = count;
              this.table.tableData = data;
              this.table.count = Number(count.count);
              this.table.maxPage = maxPage;
              this.table.pageNow = pageNow;
            }

          });
      },

      changeTime(data) {
        this.params.startTime = data[0].valueOf();
        this.params.endTime = data[1].valueOf();
      },

      //搜索按鈕點擊事件
      submitClick() {
        this.get_list_works();
      },

      //重置按鈕點擊事件
      resetClick() {
        this.params = {
          key: "",
          priority: "",
          status: "",
          startTime: "",
          endTime: ""
        };
        this.get_list_works();
      },

      //每頁多少條切換
      handleSizeChange(val) {
        this.table.eachPage = val;
        this.table.pageNow = 1;
        this.get_list_works();
      },

      //頁數點擊切換
      handleCurrentChange(val) {
        this.table.pageNow = val;
        this.get_list_works();
      },

      //多选获取选中数据
      handleSelChange(val) {
        this.table.multipleSelection = val;
        if(val.length == 1){
           this.task_params.name = val[0].name;
           this.task_params.level = val[0].priority;
           this.task_params.type = val[0].type;
           this.task_params.textarea = val[0].remarks;
           this.task_params.new_operator = val[0].perator;
           this.task.id = val[0].id;
         }
      },

      //工单列表跳转
      detail_click(row) {
        this.$router.push({ path: "/detail/works", query: { id: row.id} });
      },

      /***********************************以下是弹窗部分****************************************/
      /***********************************以下是弹窗部分****************************************/


      // 状态变更选择
      change_state(command) {
        this.process_state = command;
        this.open_state();
      },

      /***************状态变更*****************/
      //打开状态变更弹窗
      open_state() {
        let sel_table_data = this.table.multipleSelection;
        if(sel_table_data.length == 0){
          this.$message({message:'请选择需要变更的工单',type: 'warning'});
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
        let worker_id_group = selected.map(x => {return x.id;});

        //状态设置
        let process = this.process_state;
        let change_status = 0;

        if (process == '处置中') {
          change_status = 2;
        } else if (process == '已处置') {
          change_status = 3;
        } else if (process == '已取消') {
          change_status = 4;
        }

        this.$axios.put('/yiiapi/workorder/change-status', {
          asset_ip: worker_id_group,
          status: change_status
        })
          .then(resp => {

            let {status, data} = resp.data;

            if (status == 0) {

              this.$message.success('工单状态变更提交成功！');

              this.$refs.multipleTable.clearSelection();

              this.get_list_works();

            } else {

              this.$message.error('工单状态变更提交错误。');

            }

            this.closed_state();

          })
          .catch(err => {

            console.log(err);

          })
      },

      /*******************下载**********************/
      worksdownload() {
        this.$axios.get('/yiiapi/workorder/export',{
          params: {
            stime:this.params.startTime,
            etime:this.params.endTime,
            status: this.params.status,
            priority:this.params.priority,
            key_word: this.params.key,
            owned: this.owned
          }
        })
          .then(resp => {
            let { status,data} = resp;

             if(status == 200){
               this.$message.success('下载成功');
             }
          })
      },

      /*******************删除**********************/

      worksDelete(){
        let that = this;

        let multiple = this.table.multipleSelection;
        let selected = multiple.map(x => {return x.id;});

        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.delete('/yiiapi/workorder/del', {
            data: {
              id: selected
            }
          })
            .then(resp => {
            let {status,msg, data} = resp.data;
            if(status == 0){
              that.$message.success(msg);
            }else {
              that.$message.error(msg);
            }
            that.get_list_works();
          })
            .catch(err => {
            console.log(err);
          });
        }).catch(() => {

          this.$message({type: 'info', message: '已取消删除'});

          this.$refs.multipleTable.clearSelection();
        });
      },

      /*******************新增编辑**********************/

      //打开新建工单
      open_task_new(args) {

        if(args != undefined){
          this.task.status = args;
          let melsetion = this.table.multipleSelection;

          if(melsetion.length == 0){
            this.$message({message:'请选择工单。',type: 'warning'});
          }else if(melsetion.length > 1){
            this.$message({message:'编辑工单只能选择一条。',type: 'warning'});
          }else {

            this.task.title = '编辑工单';
            this.open_task();
          }
        }else {
          this.open_task();
        }
      },

      //打开工单新增编辑弹窗
      open_task() {
        let assets = this.table_assets.tableData;
        let now_assets = this.table_assets.pageNow;
        let assets_data = assets.slice((now_assets-1) * 5,now_assets * 5)
        this.table_assets.tableData_new = assets_data;

        let alerts = this.table_alerts.tableData;
        let now_alerts = this.table_alerts.pageNow;
        let alerts_data = alerts.slice((now_alerts-1) * 5,now_alerts * 5)
        this.table_alerts.tableData_new = alerts_data;

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
      },

      //关闭新建工单
      closed_task_new (){
        this.task.new = false;
        this.task.status = '';
        this.task.title = '新增工单';
        this.$refs.multipleTable.clearSelection();
        this.task_params = {
          name: "",
          level: "",
          operator: "",
          new_operator:[],
          notice: ['email'],
          textarea: "",
          multiple_assets:[],
          multiple_alerts:[],
          type:'asset'
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

        /*let pageNow = this.table_operator.pageNow;
        let handle_data_operator = this.table_operator.tableData.slice((pageNow-1) * 5,pageNow * 5);
        this.table_operator.tableData_new = handle_data_operator;*/

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

      //tabs下第二个table页数点击(告警)
      hcc_table_alerts(val) {
        this.table_alerts.pageNow = val;
        let handle_data = this.table_alerts.tableData.slice((val-1) * 5,val * 5);
        this.table_alerts.tableData_new = handle_data;
      },

      //tab下第一个table多选
      handle_sel_table_assets(val) {
        this.table_assets.multipleSelection = val;
        let selected = val.map(x => {return x.asset_ip});
        this.task_params.multiple_assets = selected;
      },

      //tab下第一个table多选
      handle_sel_table_alerts(val) {
        this.table_alerts.multipleSelection = val;
        let selected = val.map(x => {return x.alert_id});
        this.task_params.multiple_alerts = selected;
      },

      //新增工单按钮切换
      table_btn_toggle(index) {
        this.handle.active = index;
        if(index == 0){
          this.task_params.type = 'asset';
          this.task_params.multiple_alerts = [];
        }else if(index == 1){
          this.task_params.type = 'alert';
          this.task_params.multiple_assets = [];
        }
      },

      //新建工单分配
      prev_task_handle_assign() {
        let all_params = {
          name: this.task_params.name,
          priority:this.task_params.level,
          perator:this.task_params.new_operator,
          remarks:this.task_params.textarea,
          type:this.task_params.type,
          te_alert: this.task_params.multiple_alerts,
          risk_asset: this.task_params.multiple_assets,
          remind:this.task_params.notice
        };

        if(this.task.status == 'edit'){
          Object.assign(all_params, {id:this.task.id});
        }

        this.$axios.put('/yiiapi/workorder/distribution',all_params)
          .then((resp) => {
            let {status,msg, data} = resp.data;

            if (status == 0) {

              this.$message.success('分配成功');

              //不管成功与否 都需要清除状态，关闭弹窗
              this.task.new = false;
              this.task.new_contet = false;
              this.task.status = '';
              this.task.title = '编辑工单';

              this.task_params = {
                name: "",
                level: "",
                operator: "",
                new_operator:[],
                notice: ['email'],
                textarea: "",
                multiple_assets:[],
                multiple_alerts:[],
                type:'asset'
              };
              this.table_operator.tableData = [];
              this.get_list_works();

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

        let all_params = {
          name: this.task_params.name,
          priority:this.task_params.level,
          perator:this.task_params.new_operator,
          remarks:this.task_params.textarea,
          type:this.task_params.type,
          te_alert: this.task_params.multiple_alerts,
          risk_asset: this.task_params.multiple_assets,
          remind:this.task_params.notice
        };
        if(this.task.status == 'edit'){
          Object.assign(all_params, {id:this.task.id});
        }

        this.$axios.post('/yiiapi/workorder/add',all_params)

          .then((resp) => {

            let {status,msg, data} = resp.data;

            if (status == 0) {
              this.$message.success('保存成功');

              //不管成功与否 都需要清除状态，关闭弹窗
              this.task.new = false;
              this.task.new_contet = false;
              this.task.status = '';
              this.task.title = '新增工单';

              this.task_params = {
                name: "",
                level: "",
                operator: "",
                new_operator:[],
                notice: ['email'],
                textarea: "",
                multiple_assets:[],
                multiple_alerts:[],
                type:'asset'
              };
              this.table_operator.tableData = [];
              this.get_list_works();

            }else if (status == 1){
              this.$message.error(msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

    }
  }
</script>

<style scoped lang="less">
  @import "../../../../assets/css/less/common-tabs-pattern.less";
  @import "../../../../assets/css/less/common-table-pattern.less";
  .common-pattern{
    .common_btn{
      .common_box{
        padding-bottom:16px;
        border-bottom: 1px solid #ECECEC;
        .common_btn_list {
          font-size: 0;
          /deep/
          .bw_btn {
            font-size: 14px;
            height: 42px;
            width: 116px;
            outline: none;
            margin-right: 8px;
            line-height: 0;
            margin-left: 0;
            font-family: PingFangMedium;
            &.b_btn_add {
              color: #fff;
              background: #0070FF;
              border: 1px solid #0070FF;
            }
            &.b_btn_edit {
              color: #0070FF;
              border: 1px solid #0070FF;
              background-color: #fff;
            }
            &.bw_btn_download {
              color: #0070FF;
              border: 1px solid #0070FF;
              background-color: #fff;
            }
            &.bw_btn_remove {
              color: #0070FF;
              border: 1px solid #0070FF;
              background-color: #fff;
            }
          }
        }
      }
    }
    .common_priority{
      height: 60px;
      line-height: 56px;
      .common_btn_priority{
        height: 60px;
        .item_list{
          .item {
            font-size: 14px;
            color: #666666;
            font-family: PingFang;
            margin-right: 20px;
            .num {
              color: #0070FF;
            }
          }
          /deep/
          .el-tag{
            height: 24px;
            width: 72px;
            line-height: 22px;
            border-radius: 0;
            border-width: 0;
            position: relative;
            color: #fff;
            .nums{
              position: absolute;
              right: 10px;
              top: 0px;
            }
            &.e-tag-1{
              background: #DC5F5F;
            }
            &.e-tag-2{
              background: #E0C840;
            }
            &.e-tag-3{
              background: #5389E0;
            }
            &.e-tag-4{
              background: #47CAD9;
            }
          }
        }
      }
    }
  }
  //新建工单
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

          .task_content_box {
            height: 400px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
              border-radius: 6px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 6px;
              background: #a8a8a8;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 6px;
              background: #f4f4f4;
            }

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
</style>
