<template>
    <div class="vm-screen-main1">
      <div id="heat"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main0",
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

          let index = 0;
          // 基于准备好的dom，初始化echarts实例
          let rank = this.$echarts.init(document.getElementById("heat"));

          rank.showLoading({ text: '正在加载数据...' });

          rank.clear();
          // 绘制图表
          rank.setOption({
            grid: {
              top: "10%",
              left: "-10%",
              right: "20%",
              bottom: "-10%",
              containLabel: true
            },
            xAxis: {
              show:false
            },
            yAxis: {
              show:false
            },
            series: [{
              symbolSize: 20,
              data: [
                [7.0,4.0,'192.168.101.08'],
                [8.0, 6.95,'192.168.101.08'],
                [9.0, 8.81,'192.168.101.08'],
                [8.0, 8.33,'192.168.101.08'],
                [6.0, 7.24,'192.168.101.08'],
                [5.0, 10.84,'192.168.101.08'],
                [4.0, 5.0,'192.168.101.09']
              ],
              type: 'scatter',
              symbol:'rect',
              symbolSize:[90, 24],
              datasetIndex:0,
              label:{
                show:true,
                color: "rgba(232,57,93,0.48)",
                /*backgroundColor:"rgba(232,57,93,0.48)",*/
                formatter: (params) => {
                  return params.data[2]
                }
              },
              itemStyle:{
                color: "rgba(232,57,93,0.20)",
                borderColor:'rgba(232,57,93,0.42)',
                borderWidth:'1'
              },
              emphasis:{
                label:{
                  color: "rgba(255,255,255,0.6)",
                }
              }
            }]
          });

          rank.hideLoading();

          rank.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });

          //设置默认选中高亮部分
          rank.on("mouseover", function(e) {
            if (e.dataIndex != index) {
              rank.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: index
              });
            }
          });
          rank.on("mouseout", function(e) {
            index = e.dataIndex;
            rank.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: e.dataIndex
            });
          });

          window.addEventListener("resize", () => {
            rank.resize();
          });
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main1{
  padding: 0 16px 16px;
  #heat{
    width: 100%;
    height: 240px;
  }
}
</style>
