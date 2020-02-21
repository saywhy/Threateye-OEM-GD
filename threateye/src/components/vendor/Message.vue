<template>
  <div class="Message" v-cloak>
     <DetailItem></DetailItem>
     <el-container class="message-item">
       <el-row class="row-bg">
         <el-col :span="24">
           <el-button class="av-btn av-av-read">标位已读</el-button>
           <el-button class="av-btn av-av-remove">删除</el-button>
         </el-col>
         <el-col :span="24">
           <el-table
             class="vm-table"
             ref="multipleTable"
             :data="tableData"
             height="400"
             :header-cell-style="{background:'#f8f8f8',color:'#333'}"
             tooltip-effect="dark"
             style="width: 100%;"
             @selection-change="handleSelectionChange">
             <el-table-column
               label="全选"
               width="40">
             </el-table-column>
             <el-table-column
               align='left'
               type="selection"
               width="50">
             </el-table-column>
             <el-table-column
               label="时间"
               width="180">
               <template slot-scope="scope">{{ scope.row.date }}</template>
             </el-table-column>
             <el-table-column
               prop="name"
               label="消息来源"
               width="150">
             </el-table-column>
             <el-table-column
               prop="address"
               label="描述"
               show-overflow-tooltip>
             </el-table-column>
           </el-table>
         </el-col>
         <!--分页-->
         <el-col :span="24">
          <pagination-item></pagination-item>
         </el-col>
       </el-row>
     </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import DetailItem from '@/components/items/DetailItem'
  import PaginationItem from '@/components/items/PaginationItem'
  export default {
    name: 'Message',
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        multipleSelection: []
      }
    },
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
      }
    },
    components:{
      DetailItem,
      PaginationItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Message {
    .message-item{
      padding: 24px 56px;
      .row-bg{
        text-align: left;
        .av-btn{
          width: 148px;
          height: 42px;
          border-radius: 0;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          cursor: pointer;
          border: 1px solid #0070FF;
          &.av-av-read{
            background: #0070FF;
            color: #fff;
          }
          &.av-av-remove{
            background: #fff;
            color: #0070FF;
          }
        }
        .vm-table{
          padding: 24px 0;
        }
      }
    }
  }
</style>
<style lang="less">
  @import "../../assets/css/less/common-table-pattern.less";
</style>
