<template>
    <div class="vm-screen-main4">
      <div id="branch"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main4",
      data(){
          return{
            data:[
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'},
              {content:'所有英特尔处理器面临新的Spoiler攻击',time:'7小时前'}
            ]
          }
      },
      mounted() {
        this.drawGraph();
      },
      methods:{
        drawGraph(){

          let myChart = this.$echarts.init(document.getElementById('branch'))
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
              top:'0',
              left: '0',
              right: '0',
              bottom: '-10%',
              containLabel: true
            },
            xAxis: {
              show: false
            },
            yAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
              {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                barWidth:'50%',
                label: {
                  show: false
                },
                data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                barWidth:'50%',
                label: {
                  show: false
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                barWidth:'50%',
                label: {
                  show: false
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
              }
            ]
          };

          myChart.setOption(option);
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main4{
  padding: 0 16px 16px;
  #branch{
    height: 240px;
  }
}
</style>
