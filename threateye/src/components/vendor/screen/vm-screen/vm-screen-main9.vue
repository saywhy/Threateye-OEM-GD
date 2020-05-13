<template>
  <div class="vm-screen-main9">
    <el-table :data="tableData"
              align="center"
              border
              class="screen-table">
      <el-table-column prop="type"
                       label="告警时间"
                       align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="data"
                       label="告警类型"
                       align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="ware"
                       label="威胁指标"
                       align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="rank"
                       label="风险资产"
                       align="center"
                       show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="stage" label="攻击阶段" show-overflow-tooltip></el-table-column>-->
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "vm-screen-main9",
  data () {
    return {
      tableData: [{
        type: '2020.02.18 17:24:36',
        data: '垃圾邮件',
        ware: '218.61.46.585',
        rank: 'amazazonb.com',
        stage: '初始访问'
      },
      {
        type: '2020.02.18 17:24:36',
        data: '垃圾邮件',
        ware: '218.61.46.585',
        rank: 'amazazonb.com',
        stage: '初始访问'
      },
      {
        type: '2020.02.18 17:24:36',
        data: '垃圾邮件',
        ware: '218.61.46.585',
        rank: 'amazazonb.com',
        stage: '初始访问'
      },
      {
        type: '2020.02.18 17:24:36',
        data: '垃圾邮件',
        ware: '218.61.46.585',
        rank: 'amazazonb.com',
        stage: '初始访问'
      },
      {
        type: '2020.02.18 17:24:36',
        data: '垃圾邮件',
        ware: '218.61.46.585',
        rank: 'amazazonb.com',
        stage: '初始访问'
      }]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.vm-screen-main9 {
  padding: 0 16px 16px;
  /deep/ .screen-table {
    &:before {
      height: 0;
    }
    .el-table__header {
      th {
        /*background: rgba(0,215,233,0.24);*/
        border-width: 0;
        padding: 0;
        height: 36px;
        line-height: 36px;
        background: #034061;
        .cell {
          color: #fff;
        }
      }
    }
    .el-table__body {
      td {
        border-width: 0;
        padding: 0;
        height: 40px;
        line-height: 40px;
        background: #00134a;
        .cell {
          color: #fff;
        }
      }
    }
  }
}
</style>
