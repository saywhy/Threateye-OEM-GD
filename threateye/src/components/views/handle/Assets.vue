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
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
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
  </div>
</template>

<script type="text/ecmascript-6">
  const qs = require('qs');
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
            {name: '基础分类', value: [{name: '服务器', flag: false}, {name: '网络设备', flag: false}]},
            {name: '业务', value: [{name: '业务1', flag: false}]},
            {name: '分支', value: [{name: '分支1', flag: false}]},
            {name: '部门', value: [{name: '部门1', flag: false}]}
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
            label: "未确认"
          },
          {
            value: "1",
            label: "已确认"
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
      //頂部
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
              this.assets_all.base[0].value = data[0];
              this.assets_all.base[1].value = data[1];
              this.assets_all.base[2].value = data[2];
              this.assets_all.base[3].value = data[3];
            }
          });
      },

      //風險資產列表
      get_list_risk() {

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
              status: this.params.degree,
              page: this.table.pageNow,
              rows: this.table.eachPage
            },
            paramsSerializer: function (params) {
              return qs.stringify(params, {arrayFormat: 'repeat'})
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

             /// console.log(data);

              this.table.loading = false;
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
      deleteAllAssets(item) {

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

      /************************************/
      handleSelChange(val) {
        this.table.multipleSelection = val;
      },

      /************************************/
      detailClick(row, column, event) {
        this.$router.push({path: '/detail/assets', query: {detail: row}});
      },

      /*******************弹窗部分********************/

      // 状态变更选择
      change_state(command) {
        this.process_state = command;
        this.open_state();
      },
      // 打开状态变更弹窗
      open_state() {
        this.state_change = true;
      },
      closed_state() {
        this.state_change = false;
      },

      //状态变更取消按钮点击
      cancel_state() {
        this.closed_state();
      },

      //状态变更确定按钮点击
      ok_state() {

        let selected = this.table.multipleSelection;

        if(selected.length == 0){

          this.$message({message:'您未选中，请勾选。',type: 'warning'});

          this.closed_state();
        }else{

          //资产ID处理
          let asset_ip_group = selected.map(x => {
            return x.asset_ip;
          });

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

                this.assets_all.base[0].value = data[0];
                this.assets_all.base[1].value = data[1];
                this.assets_all.base[2].value = data[2];
                this.assets_all.base[3].value = data[3];

                this.get_list_risk();

              } else {

                this.$message.error('状态变更提交错误。');

              }

              this.closed_state();

            })
            .catch(err => {
              console.log(err);
            })
        }

      },

      /***************工单任务*****************/
      change_task(command) {
        if (command == "新建工单") {
          this.open_task_new();
        }
        this.job_task = command;
      },
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
  }
</style>
