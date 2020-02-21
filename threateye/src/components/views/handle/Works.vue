<template>
 <div class="handle-works">
   <div class="handle-works-top common-invest">
     <div class="invest">
       <el-tabs v-model="activeName" @tab-click="handleClick">

         <!--我创建的-->
         <el-tab-pane label="我创建的" name="first">
           <div class="invest_form invest_form_network">
             <el-form class="common-pattern">
               <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
                 <el-col :span="24" class="common_box_list">

                   <!--搜索关键词-->
                   <el-input class="s_key" placeholder="搜索关键词" v-model="params_1.handle_key" clearable>
                     <i slot="prefix" class="el-input__icon el-icon-search"></i>
                   </el-input>

                   <!--时间-->
                   <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                   <!--优先级-->
                   <el-select class="s_key s_key_types" v-model="params_1.handle_priority" clearable placeholder="优先级">
                     <el-option v-for="item in options_priority" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>

                   <!--处理状态-->
                   <el-select class="s_key" v-model="params_1.handle_status" clearable placeholder="处理状态">
                     <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>

                   <el-button class="s_btn">搜索</el-button>
                   <el-link class="s_link">重置</el-link>
                 </el-col>
               </el-row>

               <!--按钮组-->
               <el-row class="common_priority" style="text-align: left;">
                 <el-col :span="24" class="common_btn_priority">
                   <p class="item_list">
                     <span class="item">共计 <span class="num">24</span> 条</span>
                     <span class="item">其中优先级</span>
                     <el-tag class="e_tag e-tag-1">极高：<span class="nums">6</span></el-tag>
                     <el-tag class="e_tag e-tag-2">高：<span class="nums">5</span></el-tag>
                     <el-tag class="e_tag e-tag-3">中：<span class="nums">3</span></el-tag>
                     <el-tag class="e_tag e-tag-4">低：<span class="nums">1</span></el-tag>
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
                   <el-button type="primary" class="bw_btn bw_btn_download">
                     <span>下载</span>
                   </el-button>
                   <el-button type="primary" class="bw_btn bw_btn_remove">
                     <span>删除</span>
                   </el-button>
                 </el-col>
               </el-row>
             </el-form>
           </div>
           <el-table ref="multipleTable" class="handle_table"
                     align="center" :data="table1Data"
                     tooltip-effect="dark"
                     style="width: 100%"
                     @selection-change="handleSelectionChange"
                     @row-click="detail_click">
             <el-table-column label="全选" prop="type" width="50">
               <template slot-scope="scope">
                 <div class="new_dot" v-show="scope.row.type=='new'">
                 </div>
               </template>
             </el-table-column>
             <el-table-column type="selection" width="30">
             </el-table-column>
             <el-table-column label="告警时间" width="150">
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
             <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
             </el-table-column>
             <el-table-column prop="status" label="状态" show-overflow-tooltip>
             </el-table-column>
           </el-table>
           <el-pagination
             class="handle-pagination"
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :page-sizes="[5, 10, 20]"
             :page-size="10"
             :total="20"
             layout="total, sizes, prev, pager, next, jumper"
           ></el-pagination>
         </el-tab-pane>

         <!--分配给我的-->
         <el-tab-pane label="分配给我的" name="second">
           <div class="invest_form invest_form_network">
             <el-form class="common-pattern">
               <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
                 <el-col :span="24" class="common_box_list">

                   <!--搜索关键词-->
                   <el-input class="s_key" placeholder="搜索关键词" v-model="params_2.handle_key" clearable>
                     <i slot="prefix" class="el-input__icon el-icon-search"></i>
                   </el-input>

                   <!--时间-->
                   <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                   <!--优先级-->
                   <el-select class="s_key s_key_types" v-model="params_2.handle_priority" clearable placeholder="优先级">
                     <el-option v-for="item in options_priority" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>

                   <!--处理状态-->
                   <el-select class="s_key" v-model="params_2.handle_status" clearable placeholder="处理状态">
                     <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>

                   <el-button class="s_btn">搜索</el-button>
                   <el-link class="s_link">重置</el-link>
                 </el-col>
               </el-row>

               <!--按钮组-->
               <el-row class="common_priority" style="text-align: left;">
                 <el-col :span="24" class="common_btn_priority">
                   <p class="item_list">
                     <span class="item">共计 <span class="num">24</span> 条</span>
                     <span class="item">其中优先级</span>
                     <el-tag class="e_tag e-tag-1">极高：<span class="nums">6</span></el-tag>
                     <el-tag class="e_tag e-tag-2">高：<span class="nums">5</span></el-tag>
                     <el-tag class="e_tag e-tag-3">中：<span class="nums">3</span></el-tag>
                     <el-tag class="e_tag e-tag-4">低：<span class="nums">1</span></el-tag>
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
                   <el-button type="primary" class="bw_btn bw_btn_download">
                     <span>下载</span>
                   </el-button>
                   <el-button type="primary" class="bw_btn bw_btn_remove">
                     <span>删除</span>
                   </el-button>
                 </el-col>
               </el-row>
             </el-form>
           </div>
           <el-table ref="multipleTable" class="handle_table"
                     align="center" :data="table2Data"
                     tooltip-effect="dark"
                     style="width: 100%"
                     @selection-change="handleSelectionChange"
                     @row-click="detail_click">
             <el-table-column label="全选" prop="type" width="50">
               <template slot-scope="scope">
                 <div class="new_dot" v-show="scope.row.type=='new'">
                 </div>
               </template>
             </el-table-column>
             <el-table-column type="selection" width="30">
             </el-table-column>
             <el-table-column label="告警时间" width="150">
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
             <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
             </el-table-column>
             <el-table-column prop="status" label="状态" show-overflow-tooltip>
             </el-table-column>
           </el-table>
           <el-pagination
             class="handle-pagination"
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :page-sizes="[5, 10, 20]"
             :page-size="10"
             :total="20"
             layout="total, sizes, prev, pager, next, jumper"
           ></el-pagination>

         </el-tab-pane>

         <!--所有工单-->
         <el-tab-pane label="所有工单" name="third">
           <div class="invest_form invest_form_network">
             <el-form class="common-pattern">
               <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
                 <el-col :span="24" class="common_box_list">

                   <!--搜索关键词-->
                   <el-input class="s_key" placeholder="搜索关键词" v-model="params_3.handle_key" clearable>
                     <i slot="prefix" class="el-input__icon el-icon-search"></i>
                   </el-input>

                   <!--时间-->
                   <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                   <!--优先级-->
                   <el-select class="s_key s_key_types" v-model="params_3.handle_priority" clearable placeholder="优先级">
                     <el-option v-for="item in options_priority" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>

                   <!--处理状态-->
                   <el-select class="s_key" v-model="params_3.handle_status" clearable placeholder="处理状态">
                     <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>

                   <el-button class="s_btn">搜索</el-button>
                   <el-link class="s_link">重置</el-link>
                 </el-col>
               </el-row>

               <!--按钮组-->
               <el-row class="common_priority" style="text-align: left;">
                 <el-col :span="24" class="common_btn_priority">
                   <p class="item_list">
                     <span class="item">共计 <span class="num">24</span> 条</span>
                     <span class="item">其中优先级</span>
                     <el-tag class="e_tag e-tag-1">极高：<span class="nums">6</span></el-tag>
                     <el-tag class="e_tag e-tag-2">高：<span class="nums">5</span></el-tag>
                     <el-tag class="e_tag e-tag-3">中：<span class="nums">3</span></el-tag>
                     <el-tag class="e_tag e-tag-4">低：<span class="nums">1</span></el-tag>
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
                   <el-button type="primary" class="bw_btn bw_btn_download">
                     <span>下载</span>
                   </el-button>
                   <el-button type="primary" class="bw_btn bw_btn_remove">
                     <span>删除</span>
                   </el-button>
                 </el-col>
               </el-row>
             </el-form>
           </div>
           <el-table ref="multipleTable" class="handle_table"
                     align="center" :data="table3Data"
                     tooltip-effect="dark"
                     style="width: 100%"
                     @selection-change="handleSelectionChange"
                     @row-click="detail_click">
             <el-table-column label="全选" prop="type" width="50">
               <template slot-scope="scope">
                 <div class="new_dot" v-show="scope.row.type=='new'">
                 </div>
               </template>
             </el-table-column>
             <el-table-column type="selection" width="30">
             </el-table-column>
             <el-table-column label="告警时间" width="150">
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
             <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
             </el-table-column>
             <el-table-column prop="status" label="状态" show-overflow-tooltip>
             </el-table-column>
           </el-table>
           <el-pagination
             class="handle-pagination"
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :page-sizes="[5, 10, 20]"
             :page-size="10"
             :total="20"
             layout="total, sizes, prev, pager, next, jumper"
           ></el-pagination>
         </el-tab-pane>

       </el-tabs>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: "handle-works",
    data() {
      return {
        activeName: 'first',
        loading_1:true,
        loading_2:true,
        loading_3:true,
        options_priority: [
          {
            value: "1",
            label: "优先级1"
          },
          {
            value: "2",
            label: "优先级2"
          },
          {
            value: "3",
            label: "优先级3"
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
        params_1: {
          handle_key:"",
          handle_priority:"",
          handle_status: "",
          startTime: "",
          endTime: "",
        },
        params_2: {
          handle_key:"",
          handle_priority:"",
          handle_status: "",
          startTime: "",
          endTime: "",
        },
        params_3: {
          handle_key:"",
          handle_priority:"",
          handle_status: "",
          startTime: "",
          endTime: "",
        },
        table1_data: {
          count: 102,
          maxPage: 11,
          pageNow: 1
        },
        table1Data: [
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "低危",
            color: "low",
            fall: "— —",
            status: "待处置"
          },
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "中危",
            color: "mid",
            fall: "— —",
            status: "待处置"
          },
          {
            type: "old",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "低危",
            color: "low",
            fall: "— —",
            status: "待处置"
          }
        ],
        table2Data: [
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "低危",
            color: "low",
            fall: "— —",
            status: "待处置"
          },
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "中危",
            color: "mid",
            fall: "— —",
            status: "待处置"
          }
        ],
        table3Data: [
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "低危",
            color: "low",
            fall: "— —",
            status: "待处置"
          }
        ]
      };
    },
    components:{
      VmEmergePicker
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      changeTime(data) {
        this.params_net.startTime = data[0].valueOf();
        this.params_net.endTime = data[1].valueOf();
      },
      /*****************************/
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("1111");
      },

      detail_click(val) {
        this.$router.push({ path: "/detail/works", query: { detail: "2222" } });
        console.log(val);
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/invest-common-pattern.less";
  @import "../../../assets/css/less/invest-common-table-pattern.less";
  .handle-works{
    padding: 24px;
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
  }
</style>
<style lang="less">

</style>
