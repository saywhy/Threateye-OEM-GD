<template>
    <div class="vm-screen-main6">
      <div class="attention">
        <div class="item">
          <div class="name">数据泄露</div>
          <div id="attent1"></div>
          <div class="num">123</div>
        </div>
        <div class="item">
          <div class="name">勒索软件</div>
          <div id="attent2"></div>
          <div class="num">2332</div>
        </div>
        <div class="item">
          <div class="name">高危漏洞</div>
          <div id="attent3"></div>
          <div class="num">12213</div>
        </div>
      </div>
      <div class="attention-table">
        <el-table :data="tableData" class="screen-table">
          <el-table-column prop="type" label="告警类型"></el-table-column>
          <el-table-column prop="data" label="数据泄露"></el-table-column>
          <el-table-column prop="ware" label="勒索软件"></el-table-column>
          <el-table-column prop="rank" label="高危漏洞"></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main6",
      data(){
          return{
            data:[],
            tableData: [{
              type: '影响资产数',
              data: '123',
              ware: '2332',
              rank: '12312'
            }]
          }
      },
      mounted() {
        this.drawGraph();
      },
      methods:{
        drawGraph(){
          let attent1 = this.$echarts.init(document.getElementById('attent1'))
          let option1 = {
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: false,
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              show:false
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity :0
              },
              lineStyle:{
                color:'#007AFF'
              },
              areaStyle: {
                color:'#007AFF'
              }
            }]
          };
          attent1.setOption(option1);

          let attent2 = this.$echarts.init(document.getElementById('attent2'))
          let option2 = {
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: false,
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              show:false
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity :0
              },
              lineStyle:{
                color:'#FF00C9'
              },
              areaStyle: {
                color:'#FF00C9'
              }
            }]
          };
          attent2.setOption(option2);

          let attent3 = this.$echarts.init(document.getElementById('attent3'))
          let option3 = {
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: false,
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              show:false
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity :0
              },
              lineStyle:{
                color:'#F3AB15'
              },
              areaStyle: {
                color:'#F3AB15'
              }
            }]
          };
          attent3.setOption(option3);
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main6{
  padding: 0 16px 16px;
  .attention{
    .item{
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin-bottom: 9px;
      .name{
        flex: 1;
        color: #fff;
      }
      #attent1{
        width: 310px;
      }
      #attent2{
        width: 310px;
      }
      #attent3{
        width: 310px;
      }
      .num{
        flex: 1;
        color: #fff;
      }
    }
  }
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
        height: 28px;
        line-height: 28px;
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
        height: 32px;
        line-height: 32px;
        background: #00134A;
        .cell{
          color: #fff;
        }
      }
    }
  }
}
</style>
