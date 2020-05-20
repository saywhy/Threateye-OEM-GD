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
            trendData: {
              xAxisData:[],
              yAxisData:[]
            }
          }
      },
      created() {
        this.getData();
      },
      methods:{
        //获取数据
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/risk-trend')
            .then((resp) => {

              let {status, data} = resp.data; 

              if(status == 0){

                this.trendData.xAxisData = Object.keys(data);
                this.trendData.yAxisData = Object.values(data);

                this.$nextTick(() => {
                  this.drawGraph();
                })
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },

        drawGraph(){
          let myChart = this.$echarts.init(document.getElementById('trend'));
          myChart.showLoading({ text: '正在加载数据...' });
          myChart.clear();

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
              data: this.trendData.xAxisData
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
              data: this.trendData.yAxisData
            }]
          };

          myChart.setOption(option);

          myChart.hideLoading();

          window.addEventListener("resize", () => {
            myChart.resize();
          });
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
