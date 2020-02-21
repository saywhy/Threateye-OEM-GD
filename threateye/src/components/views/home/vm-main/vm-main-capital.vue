<template>
  <div id="dangerCapital"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'dangerCapital',
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    mounted(){
      this.drawGraph();
    },
    methods:{
      drawGraph(){
        let index = 0;

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('dangerCapital'));
        // 绘制图表
        myChart.setOption({
          grid: {
            top: '20%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          color:['#0288D1','#CDDC39','#4CAF50'],
          legend: {
            orient: 'horizontal',
            top: 10,
            right: 10,
            icon:'stack',
            selectedMode:false
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              center: ['18%', '56%'],
              radius: ['36%', '60%'],
              avoidLabelOverlap: false,
              hoverOffset: 5,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
              },
              emphasis: {
                label:{
                  show: true,
                  formatter: ['{d|{d}%}','{b|{b}警告}'].join('\n'),
                  rich: {
                    d: {
                      fontSize: 20,
                      lineHeight: 40
                    },
                    b: {
                      color: '#999'
                    },
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'低危'},
                {value:310, name:'中危'},
                {value:234, name:'高危'}
              ]
            }
          ]
        });

        myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});//设置默认选中高亮部分

        myChart.on('mouseover',function(e){
          if(e.dataIndex != index){
            myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
          }
        });

        myChart.on('mouseout',function(e){
          index = e.dataIndex;
          myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });

        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped lang="less">
  #dangerCapital{
    height: 100%;
  }
</style>
