<template>
    <div class="vm-screen-middle2">
      <div class="block">
        <div id="flow"></div>
        <div class="box">
          <div class="line"></div>
        </div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-middle2",
      data(){
          return{
            flow: {
              legendData:[],
              xAxisData:[],
              yAxisData:[],
              series:[]
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
            .get('/yiiapi/demonstration/flow-statistics')
            .then((resp) => {

              let {status, data} = resp.data;

              if(status == 0){

                this.flow.legendData = Object.keys(data);

                Object.values(data).forEach((val,key) => {

                  if(key == 0){
                    this.flow.xAxisData = val.map(item => {
                      return item.statistics_time;
                    });
                  }

                  //console.log(this.flow.xAxisData)
                  let colors = '#000';
                  let legendName = this.flow.legendData[key];
                  legendName = legendName.toLowerCase();
                  if(legendName == 'http'){
                    colors = '#007AFF';
                  }else if(legendName == 'https'){
                    colors = '#7C00FF';
                  }else if(legendName == 'ssh'){
                    colors = '#CC9D3B';
                  }else if(legendName == 'dns'){
                    colors = '#00C800';
                  }else if(legendName == 'ftp'){
                    colors = '#FF00C9';
                  }else {
                    colors = '#000';
                  }
                  let flow = val.map(item => {
                    return item.flow;
                  });

                  this.flow.series.push({
                    data: flow,
                    type: 'line',
                    smooth:true,
                    name: this.flow.legendData[key],
                    itemStyle: {
                      opacity: 0
                    },
                    lineStyle: {
                      width: 1,
                      opacity: .5,
                      color:colors
                    },
                    areaStyle: {
                      opacity: .12,
                      color:colors
                    }
                  });

                });

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
          let myChart = this.$echarts.init(document.getElementById('flow'));
          myChart.showLoading({ text: '正在加载数据...' });
          myChart.clear();
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              bottom: -5,
              left: 5,
              orient: "horizontal",
              itemWidth:12,
              itemHeight: 8,
              textStyle: {
                color: '#fff',
                fontSize: 10
              },
              emphasis:{
                selectorLabel:{
                  color:'#999'
                }
              },
              data: this.flow.legendData
            },
            color: ['#D44361','#D0A13F', '#60C160'],
            grid: {
              top:'5%',
              left: '0',
              right: '3%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
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
                  color:'rgba(255,255,255,.12)'
                }
              },
              data: this.flow.xAxisData
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                color: '#ffffff'
              },
              axisLine:{
                lineStyle:{
                  color:'#00D7E9'
                }
              },
              axisTick:{
                show: false
              },
              splitLine:{
                lineStyle:{
                  color:'rgba(255,255,255,.12)'
                }
              }
            },
            series: this.flow.series
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
.vm-screen-middle2{
  padding: 0 16px 16px;
  .block{
    position: relative;
    height: 245px;
    width: 520px;
    #flow{
      height: 245px;
      width: 520px;
    }
    .box{
      position: absolute;
      right: 22px;
      top: 5%;
      bottom: 20%;
      width: 100px;
      height: 76%;
      right: 3%;
      background-image: url("../../../../assets/images/screen/content-flow.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 4px;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        box-shadow: 0 -1px 5px 0 rgba(0,215,233,0.72),
        0 1px 5px 0 rgba(0,215,233,0.72);
        animation: moveHover 5s ease-in-out 0.2s;
        animation-iteration-count: infinite;
        opacity: 0.6;
      }
    }
  }

}

@keyframes moveHover {
  0% {
    height: 4px;
    /*background: #cd4a48;*/
  }
  50% {
    height: 100%;
    /*background: #a48992;*/
  }
  100% {
    height: 4px;
    /*background: #ffb89a;*/
  }
}
</style>
