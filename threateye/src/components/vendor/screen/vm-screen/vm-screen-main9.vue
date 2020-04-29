<template>
    <div class="vm-screen-main9">
      <el-table :data="tableData" class="screen-table">
        <el-table-column prop="type" label="告警时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="data" label="告警类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ware" label="威胁指标" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rank" label="风险资产" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="stage" label="攻击阶段" show-overflow-tooltip></el-table-column>-->
      </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main9",
      data(){
          return{
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
      mounted() {
        this.drawGraph();
      },
      methods:{
        drawGraph(){
          let myChart = this.$echarts.init(document.getElementById('trend'))
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              show:false
            },
            grid: {
              top:'5%',
              left: '0',
              right: '3%',
              bottom: '0',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel:{
                color:'#ffffff'
              },
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value',
              axisLabel:{
                color:'#ffffff'
              },
              splitLine:{
                show:false
              }
            },
            series: [{
              data: [820, 932, 901, 934, 990, 330, 320],
              type: 'line',
              itemStyle:{
                /*opacity : 0*/
              },
              lineStyle:{
                opacity : 0
              },
              areaStyle: {
                color:{
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#007AFF' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#ffffff' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          myChart.setOption(option);
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main9{
  padding: 0 16px 16px;
  /deep/
  .screen-table{
    &:before{
      height: 0;
    }
    .el-table__header{
      th{
        /*background: rgba(0,215,233,0.24);*/
        border-width: 0;
        padding: 0;
        height: 36px;
        line-height: 36px;
        background: #034061;
        .cell{
          color: #fff;
        }
      }
    }
    .el-table__body{
      td{
        border-width: 0;
        padding: 0;
        height: 40px;
        line-height: 40px;
        background: #00134A;
        .cell{
          color: #fff;
        }
      }
    }
  }
}
</style>
