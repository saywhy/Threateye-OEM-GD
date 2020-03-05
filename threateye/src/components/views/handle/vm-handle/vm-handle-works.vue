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

            console.log(resp)

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
        this.params_net.startTime = data[0].valueOf();
        this.params_net.endTime = data[1].valueOf();
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


      /*******************新增**********************/
      /*******************编辑**********************/
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
