<template>
  <div class="vm-handle-works" v-cloak>
    <div class="invest_form invest_form_network">
      <el-form class="common-pattern">
        <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
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
              <el-tag class="e_tag e-tag-1">极高：<span class="nums">{{count.highest}}</span></el-tag>
              <el-tag class="e_tag e-tag-2">高：<span class="nums">{{count.high}}</span></el-tag>
              <el-tag class="e_tag e-tag-3">中：<span class="nums">{{count.medium}}</span></el-tag>
              <el-tag class="e_tag e-tag-4">低：<span class="nums">{{count.low}}</span></el-tag>
            </p>
          </el-col>
        </el-row>
        <el-row class="common_btn" style="text-align: left;">
          <el-col :span="24" class="common_btn_list">
            <el-button type="primary" class="bw_btn bw_btn_add">
              <span>新增</span>
            </el-button>
            <el-button type="primary" class="bw_btn bw_btn_edit">
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
    <el-table ref="multipleTable" class="handle_table common-table"
              align="center"
              v-loading="table.loading"
              :data="table.tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelChange"
              @row-click="detail_click">
      <el-table-column label="全选" prop="type" width="50">
        <template slot-scope="scope">
          <div class="new_dot" v-show="scope.row.if_new == '1'"></div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="name" label="工单名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="创建时间" width="140">
        <template slot-scope="scope">{{ scope.row.created_at | time }}</template>
      </el-table-column>
      <el-table-column label="优先级" width="80">
        <template slot-scope="scope">{{ scope.row.priority | priority }}</template>
      </el-table-column>
      <el-table-column prop="perator" label="经办人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="更新时间" width="140">
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
      :page-sizes="[5, 10, 20]"
      :page-size="table.eachPage"
      :total="table.count"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

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
                <el-option v-for="item in task_new.operator_list" @click.native="selectChangced(item)" :key="item.id" :label="item.username" :value="item.username">
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
          <el-table :data="task_new.task_list" style="width: 100%">
            <el-table-column prop="username" label="经办人"></el-table-column>
            <el-table-column prop="department" label="部门"></el-table-column>
            <el-table-column prop="email_addr" label="邮箱"></el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="task_list_size_change"
                         :page-sizes="[5]"
                         :page-size="5"
                         :total="task_new.task_list.length"
                         layout="total,sizes, prev, pager, next"
          >
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
            <li v-for="(tab,index) in handle.table_title" @click="tableBtnToggle(index)" :class="{active:handle.active==index}">
              {{tab}}
            </li>
          </ul>
          <div>
            <div v-show="handle.active==0">
              <el-table ref="multipleTable"
                        align="center"
                        :data="table_assets.tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
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
                             @current-change="handleCurrentChange"
                             :page-sizes="[5]"
                             :page-size="5"
                             :total="table_assets.count"
                             layout="total, sizes, prev, pager, next">
              </el-pagination>
            </div>
            <!--<div v-show="handle.active==1">
              <el-table ref="multipleTable" align="center"
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
        options_status: [
          {
            value: "1",
            label: "待分配"
          },
          {
            value: "2",
            label: "已分配"
          },
          {
            value: "3",
            label: "处理中"
          },
          {
            value: "4",
            label: "已取消"
          },
          {
            value: "5",
            label: "已处置"
          }
        ],
        params: {
          key:"",
          priority:"",
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

        //工单任务
        task: {
          new: false,
          new_contet: true,
          handle: false
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
          //经办人数组
          task_list: [],
          task_list_page: {
            count: 0,
            maxPage: 1,
            pageNow: 1,
            eachPage: 5
          }
        },
        handle: {
          add: "",
          table_title: ["资产"],
          active: 0
        },
        table_assets: {
          tableData: [],
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
    },
    methods:{
      //工单中心列表
      get_list_works(){
        console.log('列表加载')
        this.$axios.get('/api/yiiapi/workorder/list',
          {
            params: {
              /*stime:this.params.startTime,
              etime:this.params.endTime,*/
              stime:'123',
              etime:'123123123123',
              status: this.params.status,
              priority:this.params.priority,
              key_word: this.params.key,
              owned: this.owned,
              page: this.table.pageNow,
              rows: this.table.eachPage
            }
          })
          .then((resp) => {

            let {status, data} = resp.data;

            let datas = data;

            if (status == 0) {

              let {data, count, maxPage, pageNow} = datas;

              this.count = count;
              this.table.tableData = data;
              this.table.count = Number(count.count);
              this.table.maxPage = maxPage;
              this.table.pageNow = pageNow;
              this.table.loading = false;

              this.message = data.filter(x => {
                return x.if_new == '1'
              })
            }
          });
      },

      changeTime(data) {
        this.params.startTime = data[0].valueOf();
        this.params.endTime = data[1].valueOf();
      },


      //每頁多少條切換
      handleSizeChange(val) {
        this.table.eachPage = val;
        this.get_list_works();
      },

      //頁數點擊切換
      handleCurrentChange(val) {
        this.table.pageNow = val;
        this.get_list_works();
      },

      /************************************/
      handleSelChange(val) {
        this.table.multipleSelection = val;
      },

      //搜索按鈕點擊事件
      submitClick() {
        this.get_list_works();
      },
      //重置按鈕點擊事件
      resetClick() {
        this.params = {
            key:"",
            priority:"",
            status: "",
            startTime: "",
            endTime: "",
        };

        this.get_list_works();
      },


      /*******************新增编辑**********************/
      /***************工单任务*****************/
      handleSelectionChange(val) {
        this.table_assets.multipleSelection = val;
        let selected = val.map(x => {return x.asset_ip});

        this.task_params.multiple = selected;
      },

      // 新建工单
      open_task_new() {

        /* let sel_table_data0 = this.table.multipleSelection;
         let sel_table_data = sel_table_data0.filter(x => {return x.status != '1' });
         if(sel_table_data0.length == 0){
           this.$message.error('没有选中列表');
           return false;
         } else if(sel_table_data0 != 0 && sel_table_data.length == 0){
           this.$message.error('选中列表的状态不能已确认');
           return false;
         }*/
        let sel_table_data = this.table.multipleSelection;

        if(sel_table_data.length == 0){
          this.$message.error('没有选中列表');
          return false;
        } else {
          this.table_assets.tableData = sel_table_data;
          this.table_assets.count = sel_table_data.length;

          //获取用户列表(经办人使用)
          this.$axios.get('/api/yiiapi/site/user-list')
            .then(resp => {
              //console.log(resp)
              let {status, data} = resp.data;
              if (status == 0) {
                this.task_new.operator_list = data;
                this.task.new = true;
                this.task.new_contet = true;
              }
            })
            .catch(err => {
              console.log(err);
            })
        }

      },

      closed_task_new() {
        this.task.new = false;
      },

      next_task_new() {
        if(this.task_params.name == ''){
          this.$message.error('工单名称不能为空');
        }else if(this.task_params.level == ''){
          this.$message.error('优先级未选择');
        }else if(this.task_params.operator == ''){
          this.$message.error('经办人未选择');
        }else{
          this.task.new_contet = false;
          this.handle.active = 0;
        }
      },

      prev_task_handle() {
        this.task.new_contet = true;
      },

      task_list_size_change(val) {
        console.log(`每页 ${val} 条`);
      },

      //经办人change事件
      selectChangced(item) {

        let level_list = this.task_new.task_list;
        let selected_id_attr = level_list.map(x => {return x.id});
        if(selected_id_attr.includes(item.id)){
          this.$message.error('已存在');
        }else {
          this.task_new.task_list.unshift(item);
        }

        let selected_name_attr = level_list.map(x => {return x.username});

        this.task_params.new_operator = selected_name_attr;
      },

      //新增工单按钮切换
      tableBtnToggle(index) {
        this.handle.active = index;
      },

      //新建工单分配
      prev_task_handle_assign(){

        this.$axios.post('/api/yiiapi/asset/distribution-workorder',
          {
            name: this.task_params.name,
            priority:this.task_params.level,
            perator:this.task_params.new_operator,
            remind:this.task_params.notice,
            remarks:this.task_params.textarea,
            risk_asset: this.task_params.multiple
          })
          .then((resp) => {

            let {status,msg, data} = resp.data;

            if (status == 0) {
              this.$message.success('分配成功');
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

            }else if (status == 1){
              this.$message.error(msg);
            }
          })
          .catch(err => {
            console.log(err);
          });

      },

      //新建工单保存
      prev_task_handle_save(){
        this.$axios.post('/api/yiiapi/asset/add-workorder',
          {
            name: this.task_params.name,
            priority:this.task_params.level,
            perator:this.task_params.new_operator,
            remind:this.task_params.notice,
            remarks:this.task_params.textarea,
            risk_asset: this.task_params.multiple
          })
          .then((resp) => {

            let {status,msg, data} = resp.data;

            if (status == 0) {
              this.$message.success('保存成功');
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

            }else if (status == 1){
              this.$message.error(msg);
            }
          })
          .catch(err => {
            console.log(err);
          });

      },

      /*******************新增编辑**********************/


      /*******************下载**********************/
      worksdownload(){
        this.$axios.get('/api/yiiapi/workorder/download?id=1')
          .then(resp => {
         // console.log(resp)
        })
      },
      /*******************删除**********************/
      worksDelete(){
        let that = this;

        let multiple = this.table.multipleSelection;
        let selected = multiple.map(x => {
          return x.id;
        });
        console.log(selected)
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.delete('/api/yiiapi/workorder/del', {
            data: {
              id: selected
            }
          }).then(resp => {
            let {status, data} = resp.data;
            if(status == 0){
              that.get_list_works();
              that.$message.success('删除成功。');
            }
          }).catch(err => {
            console.log(err)
          });
        }).catch(() => {

          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      detail_click(row) {
       this.$router.push({ path: "/detail/works", query: { detail: row.id} });
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../assets/css/less/invest-common-pattern.less";
  @import "../../../../assets/css/less/invest-common-table-pattern.less";

  .common-pattern{
    .common_btn{
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
          font-family: PingFangSC-Medium;
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
    .common_priority{
      height: 60px;
      line-height: 56px;
      .common_btn_priority{
        height: 60px;
        .item_list{
          .item {
            font-size: 14px;
            color: #666666;
            font-family: PingFangSC-Regular;
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
</style>
