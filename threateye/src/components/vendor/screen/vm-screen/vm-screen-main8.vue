<template>
    <div class="vm-screen-main8">
      <div id="trend"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main8",
      data(){
          return{
            data:[]
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
.vm-screen-main8{
  padding: 0 16px 16px;
  #trend{
    height: 240px;
  }
}
</style>
