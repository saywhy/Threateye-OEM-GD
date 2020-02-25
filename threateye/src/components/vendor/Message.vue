<template>
  <div class="message-container" v-cloak>
     <back-title :title-name="title_name"></back-title>
     <div class="message-content">
       <el-row class="message-top">
         <el-col :span="24">
           <div>
             <el-button class="e-btn e-btn-read">标位已读</el-button>
             <el-button class="e-btn e-btn-remove">删除</el-button>
           </div>
         </el-col>
       </el-row>
       <el-row class="message-bottom common-table-pattern">
         <el-col :span="24">
           <el-table
             class="common-table"
             ref="multipleTable"
             :data="tableData"
             @selection-change="handleSelectionChange">
             <el-table-column label="全选" width="40"></el-table-column>
             <el-table-column align='left' type="selection" width="40"></el-table-column>
             <el-table-column prop="time" width="200" label="时间"></el-table-column>
             <el-table-column prop="origin" width="240" label="消息来源"></el-table-column>
             <el-table-column prop="represent" label="描述"></el-table-column>
           </el-table>
         </el-col>
         <el-col :span="24" class="e-pagination">
           <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :page-sizes="[5, 10, 20]"
             :page-size="10"
             :total="20"
             layout="total, sizes, prev, pager, next, jumper"
           ></el-pagination>
         </el-col>
       </el-row>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import backTitle from "@/components/common/back-title";
  export default {
    name: 'message-container',
    data() {
      return {
        title_name: "通知消息",
        tableData: [{
          time: '2019.11.08 15:33:24',
          origin: '王小虎',
          represent: '上海市普陀区金沙江路 1518 弄'
        }, {
          time: '2019.11.08 15:33:24',
          origin: '王小虎',
          represent: '上海市普陀区金沙江路 1518 弄'
        }, {
          time: '2019.11.08 15:33:24',
          origin: '王小虎',
          represent: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    components:{backTitle},
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../assets/css/less/common-table-pattern.less";
  .message-container {
    .message-content{
      padding: 0 56px;
      background: #fff;
      text-align: left;
      .message-top{
        height: 90px;
        line-height: 90px;
        /deep/
        .e-btn{
          width: 148px;
          height: 42px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          cursor: pointer;
          border: 1px solid #0070FF;
          &.e-btn-read{
            background: #0070FF;
            color: #fff;
          }
          &.e-btn-remove{
            background: #fff;
            color: #0070FF;
          }
        }
      }
      .message-bottom{
        min-height: 658px;
      }
    }
  }
</style>
