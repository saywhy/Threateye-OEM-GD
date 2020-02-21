<template>
 <div id="Overview" v-cloak>
   <vm-main-tabs></vm-main-tabs>
   <el-row :gutter="20" type="flex" class="va-main-2" justify="space-between">
     <el-col :span="12">
       <div class="vam-2">
         <div class="vam-title">威胁告警（7天）</div>
         <vm-main-emerge></vm-main-emerge>
       </div>
     </el-col>
     <el-col :span="6">
       <div class="vam-2">
         <div class="vam-title">威胁类型 TOP5（7天）</div>
         <vm-main-form></vm-main-form>
         <vm-main-time></vm-main-time>
       </div>
     </el-col>
     <el-col :span="6">
       <div class="vam-2">
         <div class="vam-title">高风险威胁指标（7天）</div>
         <vm-main-target></vm-main-target>
       </div>
     </el-col>
   </el-row>

   <el-row :gutter="20" type="flex" class="va-main-3" justify="space-between">
     <el-col :span="12">
       <div class="vam-3">
         <div class="vam-title">风险资产</div>
         <vm-main-capital></vm-main-capital>
         <el-col :span="14" class="vam-progress">
           <vm-main-progress></vm-main-progress>
         </el-col>
       </div>
     </el-col>
     <el-col :span="12">
       <div class="vam-3">
         <div class="vam-title">风险资产 TOP5</div>
         <div class="vam-more" v-more="more" @click="dialogTableVisible = true"></div>
         <vm-main-top5></vm-main-top5>
       </div>
     </el-col>
   </el-row>

   <el-row :gutter="20" type="flex" class="va-main-4" justify="space-between">
     <el-col :span="12">
       <div class="vam-4">
         <div class="vam-title">攻击阶段分布（30天）</div>
         <vm-main-rank></vm-main-rank>
       </div>
     </el-col>
     <el-col :span="12">
       <div class="vam-4">
         <div class="vam-title">最新告警</div>
         <div class="vam-more" v-more="more" @click="dialogTableVisible = true"></div>
         <vm-main-threat></vm-main-threat>
       </div>
     </el-col>
   </el-row>

   <!--更多弹出框-->
   <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
     <el-table :data="gridData">
       <el-table-column property="date" label="日期" width="150"></el-table-column>
       <el-table-column property="name" label="姓名" width="200"></el-table-column>
       <el-table-column property="address" label="地址"></el-table-column>
     </el-table>
   </el-dialog>
 </div>
</template>

<script type="text/ecmascript-6">
    import vmMainTabs from './vm-main/vm-main-tabs'
    import vmMainEmerge from './vm-main/vm-main-emerge'
    import vmMainTarget from './vm-main/vm-main-target'
    import vmMainForm from './vm-main/vm-main-form'
    import vmMainTime from './vm-main/vm-main-time'
    import vmMainCapital from './vm-main/vm-main-capital'
    import vmMainProgress from './vm-main/vm-main-progress'
    import vmMainTop5 from './vm-main/vm-main-top5'
    import vmMainRank from './vm-main/vm-main-rank'
    import vmMainThreat from './vm-main/vm-main-threat'
    export default {
      name: "Overview",
      data(){
        return {
          more:[{name:'醉在你世界'},{name:'走过冬日雪'}],
          gridData: [{
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
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          dialogTableVisible: false,
        }
      },
      components:{
        vmMainTabs,
        vmMainEmerge,
        vmMainTarget,
        vmMainForm,
        vmMainTime,
        vmMainCapital,
        vmMainProgress,
        vmMainTop5,
        vmMainRank,
        vmMainThreat
      }
    }
</script>

<style scoped lang="less">
  #Overview{
    padding:24px;
    .vam-title{
      position: absolute;
      top: 8px;
      left: 10px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
      font-family: PingFangSC-Medium;
    }
    .vam-more{
      position: absolute;
      top:8px;
      right: 10px;
    }
    .va-main-2{
      margin-top: 20px;
      .vam-2{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
      }
    }
    .va-main-3{
      margin-top: 20px;
      .vam-3{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
        .vam-progress{
          position: absolute;
          right: 0;
          top: 56px;
          z-index: 999;
        }
      }
    }
    .va-main-4{
      margin-top: 20px;
      .vam-4{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
      }
    }
  }
</style>
