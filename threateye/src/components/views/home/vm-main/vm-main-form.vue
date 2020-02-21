<template>
  <div id="threatForm"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'threatForm',
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
        let myChart = this.$echarts.init(document.getElementById('threatForm'))
        // 绘制图表
        myChart.setOption({
          grid: {
            top: '20%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          color:['#0288D1','#CDDC39','#4CAF50','#00BCD4','#F57C00'],
          legend: {
            orient: 'vertical',
            x: 'left',
            top: 60,
            left: 10,
            selectedMode:false,
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              center: ['66%', '62%'],
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
                  /*formatter:function(params, ticket, callback) {
                    let name = params.data.name;
                    let percent = params.percent;
                    let str = percent+'%\n'+name;
                    return str;
                  },*/
                  formatter: ['{d|{d}%}','{b|{b}}'].join('\n'),
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
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
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
  #threatForm{
    height: 100%;
  }
</style>
