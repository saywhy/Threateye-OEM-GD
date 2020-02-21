<template>
  <div id="threatWarn"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'threatWarn',
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    mounted(){
      this.drawGraph();
     /* let that = this;
      window.onresize = () => {//  根据窗口大小调整曲线大小
        this.$nextTick(() => {
          that.drawLine();
        })
      }*/
    },
    methods:{
      drawGraph(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('threatWarn'));
        // 绘制图表
        myChart.setOption({
          grid: {
            top: '20%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          color:['rgba(220,95,95,0.24)','rgba(0,255,255,0.24)','rgba(135,206,250,0.24)'],
          legend: {
            orient: 'horizontal',
            top: 10,
            right: 10,
            icon:'stack'
          },
          tooltip:{
            trigger: 'axis',
            axisPointer:{
              lineStyle:{
                color:'#ccc'
              }
            }
          },
          xAxis: {
            boundaryGap:false,
            data: ["11-11","11-12","11-13","11-14","11-15","11-16"]
          },
          yAxis: {},
          series: [{
            name: '低危',
            type: 'line',
            symbol: "none",
            smooth: true,
            data: [5, 20, 36, 10, 10, 20],
            lineStyle:{
              color: 'rgba(220,95,95,0.24)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(220,95,95,0.24)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
              }
            }
          },{
            name: '中危',
            type: 'line',
            symbol: "none",
            smooth: true,
            data: [22, 24, 26, 20, 20, 10],
            lineStyle:{
              color: 'rgba(0,255,255,0.24)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,255,0.24)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
              }
            }
          },{
            name: '高危',
            type: 'line',
            symbol: "none",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20],
            lineStyle:{
              color: 'rgba(135,206,250,0.24)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(135,206,250,0.24)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }]
              }
            }
          }]
        });

        window.addEventListener("resize", () => {
          myChart.resize();
        });

      }
    }
  }
</script>

<style scoped lang="less">
  #threatWarn{
    height: 100%;
  }
</style>
