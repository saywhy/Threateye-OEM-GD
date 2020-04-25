<template>
    <div class="vm-screen-right3">
      <div class="vm-progress-list">
        <div class="item" v-for="(item,index) in progress_data_list">
      <span class="vam-progress-title">
        <!--<img class="progress-img" src="../../../../assets/images/screen/outer/{{item.img}}.png">-->
        <span class="progress-title">{{item.name}}&nbsp;&nbsp;{{item.num}}</span>
      </span>
          <el-progress :color="item.color" :show-text="false" :text-inside="true"
                       :stroke-width="20" :percentage="item.count">
          </el-progress>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-right3",
      data(){
          return{
            progress_data_list:[{img:'progress0',name:'英国',num:2431,count:70},
              {img:'progress0',name:'美国',num:1687,count:60},
              {img:'progress0',name:'法国',num:1496,count:50},
              {img:'progress0',name:'德国',num:1069,count:30},
              {img:'progress0',name:'意大利',num:998,count:20}]
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
.vm-screen-right3{
  padding: 0 16px 16px;
  .vm-progress-list{
    height: auto;
    .item{
      display: flex;
      line-height: 45px;
      .vam-progress-title{
        width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        cursor: default;
        .progress-title{
          display: inline-block;
          font-family: PingFang;
          font-size: 14px;
          color: #ffffff;
          margin: 0 20px 0 0;

        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 8px 0;
        .el-progress-bar{
          .el-progress-bar__outer{
            border-radius: 2px;
            background: rgba(0,215,233,0.12);
            .el-progress-bar__inner{
              border-radius: 2px 0 0 2px;
              opacity: 1;
              background: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);
             /* background-image: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);*/
            }
          }
        }
      }
    }
  }
}
</style>
