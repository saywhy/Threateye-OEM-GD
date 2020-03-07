<template>
  <div class="handle-assets" v-cloak>
    <vm-handle-tabs :data_top="data_top" v-if="data_top_show"></vm-handle-tabs>
    <!--全部资产-->
    <div class="assets_all">
      <el-row class="assets_all_list">
        <h3 class="title">全部资产</h3>
        <div class="all_list">
          <el-tag
            v-for="tag in assets_all.tags"
            :key="tag.name"
            closable
            size="small"
            type=""
            effect="plain"
            @close="deleteAllAssets(tag)">
            {{tag.name}}
          </el-tag>
        </div>

        <el-button class="assets-toggle" @click="toggle_top_show = !toggle_top_show">
          <span class="name">收起更多</span>
          <i class="icons" :class="{'top_down':!toggle_top_show}"></i>
        </el-button>
      </el-row>
      <el-row class="assets_all_detail" v-show="toggle_top_show">
        <ul class="all_detail">
          <li class="all_detail_item" v-for="(item,$index) in assets_all.base" :key="$index">
            <h4 class="title">{{item.name}}：</h4>

            <div class="detail_list">
              <el-button class="d_btn" :class="{'d_btn_active':it.flag}" size="small" :key="$idx"
                         v-for="(it,$idx) in item.value"
                         @click="clickAllAssets(it.name,it.flag,$index, $idx);">{{it.name}}
              </el-button>
            </div>

            <div class="detail-toggle">
              <label class="tog-types" v-if="$index == 0"
                     v-show="assets_all.base[0].value.length > 15">
                <span class="name">更多</span>
                <i class="icons"></i>
              </label>
              <label class="tog-types" v-if="$index == 1"
                     v-show="assets_all.base[1].value.length > 15">
                <span class="name">更多</span>
                <i class="icons"></i>
              </label>
              <label class="tog-types" v-if="$index == 2"
                     v-show="assets_all.base[2].value.length > 15">
                <span class="name">更多</span>
                <i class="icons"></i>
              </label>
              <label class="tog-types" v-if="$index == 3"
                     v-show="assets_all.base[3].value.length > 15">
                <span class="name">更多</span>
                <i class="icons"></i>
              </label>
            </div>
          </li>
        </ul>
      </el-row>
    </div>

    <!--风险资产-->
    <div class="assets_risk">
      <el-form class="common-pattern">
        <h3 class="title">风险资产</h3>
        <el-row class="common_box" style="padding: 15px 0;">
          <el-col :span="24" class="common_box_list">
            <el-input class="s_key" placeholder="搜索关键词" v-model="params.key" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-select class="s_key" v-model="params.threat" clearable placeholder="失陷确定性">
              <el-option v-for="item in options_threat" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select class="s_key" v-model="params.degree" clearable placeholder="风险等级">
              <el-option v-for="item in options_degree" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select class="s_key" v-model="params.status" clearable placeholder="处理状态">
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
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table class="common-table"
                    ref="multipleTable"
                    v-loading="table.loading"
                    :data="table.tableData"
                    @row-click="detailClick"
                    @selection-change="handleSelChange">
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
        </el-col>
        <el-col :span="24" class="e-pagination">
          <el-pagination
            class="handle-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :page-size="table.eachPage"
            :total="table.count"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
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
            <!--<div v-show="handle.active==1">
              <el-table align="center"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="30">
                </el-table-column>
                <el-table-column label="告警时间" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.date }}</template>
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
                <el-table-column prop="degree" label="威胁等级">
                </el-table-column>
                <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status" label="状态" show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table_data.pageNow" :page-sizes="[10,50,100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="table_data.count">
              </el-pagination>
            </div>-->
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
  import VmHandleTabs from "./vm-handle/vm-handle-tabs";

  export default {
    name: 'assets',
    components: {
      VmHandleTabs
    },
    data() {
      return {
        //頂部數據
        data_top: {},
        data_top_show: false,
        assets_all: {
          tags: [],
          base: [
            {name: '基础分类', value: []},
            {name: '业务', value: []},
            {name: '分支', value: []},
            {name: '部门', value: []}
          ]
        },

        toggle_top_show: true,
        toggle_1_show: false,
        toggle_2_show: false,
        toggle_3_show: false,
        toggle_4_show: false,
        params: {
          key: "",
          threat: "",
          degree: "",
          status: "",
        },
        options_threat: [
          {
            value: "1",
            label: "已失陷"
          }
        ],
        options_degree: [
          {
            value: "high",
            label: "高"
          },
          {
            value: "medium",
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
            label: "待处置"
          },
          {
            value: "1",
            label: "处置中"
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
        table: {
          tableData: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 10,
          multipleSelection: [],
          loading: true
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
    created() {
      //頂部
      this.get_list_top();

      //全部資產
      this.get_list_all();

      //風險資產
      this.get_list_risk();

    },
    methods: {
      //资产頂部
      get_list_top() {
        this.$axios.get('/api/yiiapi/alert/risk-asset-top')
          .then((resp) => {
            let data = resp.data.data;
            this.data_top = data;
            this.$set(this.data_top, data);
            this.data_top_show = true;
          })
      },

      //全部資產列表
      get_list_all() {
        this.$axios.get('/api/yiiapi/alert/all-asset-labels')
          .then((resp) => {

            let {status, data} = resp.data;

            if (status == 0) {
              data.base_category = data.base_category.map(function (v,k) {
                return {name:v,flag:false};
              });
              data.business = data.business.map(function (v,k) {
                return {name:v,flag:false};
              });
              data.branch = data.branch.map(function (v,k) {
                return {name:v,flag:false};
              });
              data.department = data.department.map(function (v,k) {
                return {name:v,flag:false};
              });

              this.assets_all.base[0].value = data.base_category;
              this.assets_all.base[1].value = data.business;
              this.assets_all.base[2].value = data.branch;
              this.assets_all.base[3].value = data.department;
            }
          });
      },

      //風險資產列表
      get_list_risk() {

        this.table.loading = true;

        let params = {threat: 0, label: []};

        //失陷确定性处置
        if (this.params.threat != '') {
          params.threat = 1;
        }

        //标签处置
        let labels = this.assets_all.tags;
        labels.forEach(function (v, k) {
          params.label.push(v.name);
        })

        params.label = JSON.stringify(params.label);

        this.$axios.get('/api/yiiapi/alert/risk-asset',
          {
            params: {
              label: params.label,
              key_word: this.params.key,
              fall_certainty: params.threat,
              degree: this.params.degree,
              status: this.params.status,
              page: this.table.pageNow,
              rows: this.table.eachPage
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
              this.table.tableData = data;
              this.table.count = count;
              this.table.maxPage = maxPage;
              this.table.pageNow = pageNow;
              this.table.loading = false;

              //console.log(data)
            }
          });
      },

      //*******************************需要修改
      //全部资产按钮点击事件
      clickAllAssets(name, flag, $index, $idx) {
        if (!flag) {
          this.assets_all.tags.push({name: name, index: $index, idx: $idx});
          this.assets_all.base[$index].value[$idx].flag = true;
        } else {
          let tags = this.assets_all.tags;
          const index = tags.findIndex(item => item.name === name);
          this.assets_all.tags.splice(index, 1);
          this.assets_all.base[$index].value[$idx].flag = false;
        }
      },

      //全部资产删除标签事件
      deleteAllAssets (item){

        this.assets_all.base[item.index].value[item.idx].flag = false;

        let tags = this.assets_all.tags;
        const index = tags.findIndex(item => item.name === item.name);
        this.assets_all.tags.splice(index, 1);
      },
      //*******************************需要修改

      //搜索按鈕點擊事件
      submitClick() {
        this.get_list_risk();
      },

      //重置按鈕點擊事件
      resetClick() {

        //清空选中全部资产
        this.assets_all.tags = [];

        //取消全部资产选中状态
        this.assets_all.base[0].value.map(item => item.flag = false);
        this.assets_all.base[1].value.map(item => item.flag = false);
        this.assets_all.base[2].value.map(item => item.flag = false);
        this.assets_all.base[3].value.map(item => item.flag = false);

        this.params = {
          key: "",
          threat: "",
          degree: "",
          status: "",
        };
        this.get_list_risk();
      },

      //每頁多少條切換
      handleSizeChange(val) {
        this.table.eachPage = val;
        this.get_list_risk();
      },

      //頁數點擊切換
      handleCurrentChange(val) {
        this.table.pageNow = val;
        this.get_list_risk();
      },

      //多选获取选中数据
      handleSelChange(val) {
        this.table.multipleSelection = val;
      },

      /************************************/
      //进入详情页
      detailClick(row, column, event) {
        this.$router.push({path: '/detail/assets', query: {detail: row}});
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
        let asset_ip_group = selected.map(x => {return x.asset_ip;});

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
          asset_ip: asset_ip_group,
          status: change_status
        })
          .then(resp => {

            let {status, data} = resp.data;

            if (status == 0) {

              this.$message.success('状态变更提交成功！');

              this.$refs.multipleTable.clearSelection();

              this.get_list_risk();

              data.base_category = data.base_category.map(function (v,k) {
                return {name:v,flag:false};
              });
              data.business = data.business.map(function (v,k) {
                return {name:v,flag:false};
              });
              data.branch = data.branch.map(function (v,k) {
                return {name:v,flag:false};
              });
              data.department = data.department.map(function (v,k) {
                return {name:v,flag:false};
              });

              this.assets_all.base[0].value = data.base_category;
              this.assets_all.base[1].value = data.business;
              this.assets_all.base[2].value = data.branch;
              this.assets_all.base[3].value = data.department;

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

        if(sel_table_data.length == 0){

          this.$message({message:'您未选中列表，请勾选。',type: 'warning'});

          return false;

        } else {

          this.table_assets.tableData = sel_table_data;
          this.table_assets.count = sel_table_data.length;


          let pageNow = this.table_assets.pageNow;

          let handle_data = this.table_assets.tableData.slice((pageNow-1) * 5,pageNow * 5)

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
            this.$refs.multipleTable.clearSelection();
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

        let selected_attr = this.table.multipleSelection.map(x => {return x.asset_ip});

        this.add_params.multiple = selected_attr;

        this.$axios.post('/api/yiiapi/asset/add-workorder',
          {
            id:this.add_params.id,
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
  @import "../../../assets/css/less/common-pattern.less";
  @import "../../../assets/css/less/common-table-pattern.less";

  .handle-assets {
    padding: 24px;

    .assets_all {
      height: auto;
      background: #fff;
      border-radius: 4px;
      margin-top: 30px;

      .assets_all_list {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ececec;
        display: flex;
        position: relative;

        .title {
          width: 120px;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          font-family: PingFangSC-Medium;
        }

        .all_list {
          flex: 1;
          text-align: left;

          /deep/
          .el-tag {
            border-radius: 2px;
            margin-right: 5px;
            border-style: dashed;
          }
        }

        /deep/
        .assets-toggle {
          position: absolute;
          bottom: 0;
          right: 0;
          height: 34px;
          width: 124px;
          line-height: 0;
          border-width: 0;
          background: #F8F8F8;
          text-align: center;

          .name {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
          }

          .icons {
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 0px -2px;
            background-image: url("../../../assets/images/handle/others/tog-top-down.png");

            &.top_down {
              background-position: 0px -4px;
              background-image: url("../../../assets/images/handle/others/tog-top.png");
            }
          }
        }
      }

      .assets_all_detail {
        background: #ccc;
        font-family: PingFangSC-Regular;

        .all_detail {
          .all_detail_item {
            display: flex;
            height: 100%;

            .title {
              width: 120px;
              display: inline-block;
              background: #F8F8F8;
              font-size: 14px;
              color: #333;
              text-align: left;
              padding-top: 12px;
              padding-left: 20px;
            }

            .detail_list {
              flex: 1;
              text-align: left;
              padding: 0 3px;
              /*line-height: 32px;*/
              /*padding: 8px 10px;*/
              background: #fff;
              border-bottom: 1px solid #ececec;
              height: 40px;
              overflow-y: hidden;
              display: inline-block;
              font-size: 0;

              /deep/
              .d_btn {
                width: 88px;
                height: 28px;
                line-height: 10px;
                border: 1px solid #ECECEC;
                margin: 6px 3px 6px 3px;
                background-color: #fff;
                padding: 0 !important;
                color: #333;

                &.d_btn_active {
                  border: 1px solid #0070FF;
                  color: #0070FF;
                }

                &:hover {
                  background-color: #fff;
                }
              }
            }

            .detail-toggle {
              width: 80px;
              background: #fff;
              position: relative;
              border-bottom: 1px solid #ececec;

              .tog-types {
                position: absolute;
                top: 9px;
                left: 9px;

                .name {
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #0070FF;
                  display: inline-block;
                }

                .icons {
                  width: 16px;
                  height: 16px;
                  display: inline-block;
                  vertical-align: middle;
                  background-repeat: no-repeat;
                  background-size: 16px;
                  background-position: 0px -2px;
                  background-image: url("../../../assets/images/handle/others/tog-types-down.png");
                }
              }
            }

            &:last-child {
              .detail_list {
                border-width: 0;
              }

              .detail-toggle {
                border-width: 0;
              }
            }
          }
        }
      }
    }

    .assets_risk {
      border-radius: 4px;
      margin-top: 20px;
      padding: 20px 24px;
      height: auto;
      background: #fff;
      text-align: left;
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
              background-image: url("../../../assets/images/emerge/step1.png");
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
              background-image: url("../../../assets/images/emerge/step2.png");
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
