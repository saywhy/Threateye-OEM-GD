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
            data: []
          }
      },
      mounted() {
        this.drawGraph();
      },
      methods:{
        drawGraph(){
          let myChart = this.$echarts.init(document.getElementById('trend'));
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              show: false
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
              axisLine:{
                lineStyle:{
                  color:'#00D7E9'
                }
              },
              axisTick:{
                show:false
              },
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Min','Max']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                color: '#ffffff'
              },
              axisLabel:{
                color:'#ffffff'
              },
              axisLine:{
                lineStyle:{
                  color:'#00D7E9'
                }
              },
              axisTick:{
                show:false
              },
              splitLine:{
                lineStyle:{
                  color:'rgba(0,215,233,.12)'
                }
              }
            },
            series: [{
              type: 'line',
              itemStyle:{
                opacity: 0
              },
              lineStyle:{
                color:'#007AFF',
                width: 1
              },
              areaStyle: {
                color:{
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(0,122,255,0.7)'
                  }, {
                    offset: 1, color: 'rgba(0,122,255,0.1)'
                  }],
                  global: false
                }
              },
              data: [320, 932, 901, 934, 990, 1330, 320, 1330, 320]
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
