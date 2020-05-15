<template>
  <div class="vm-screen-main4">
    <div id="loader">
      Loading...
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "vm-screen-main4",
    data(){
      return{
        myEcharts:null
      }
    },
    mounted(){
      /*setTimeout(() => {
        this.drawGraph();
      },200);*/
      //this.drawGraph();
      /*this.$nextTick(() => {
        setTimeout(() => {
          this.drawGraph();
        },200)
      })*/
    },
    methods: {
      drawGraph(){

        this.myEcharts = this.$echarts.init(document.getElementById('branch'))
       // this.myEcharts.showLoading({ text: '正在加载数据...' });
       // this.myEcharts.clear();

        let option = {
          backgroundColor:'rgba(128, 128, 128, 0.1)',
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.9)'
            }
          }]
        };

        this.myEcharts.setOption(option);
       /* this.myEcharts.hideLoading();

        window.addEventListener("resize", () => {
          this.myEcharts.resize();
        });*/
      }
    }
  }
</script>
<style scoped lang="less">
  .vm-screen-main4{
    padding: 0 16px 16px;
    background: green;
    #loader{
      animation: load-effect 3s infinite linear;
      text-indent: -999px;
      position: relative;
      width:200px;
      height:200px;
      box-shadow: inset 0 0 0 15px rgba(255,255,255,0.2); /*设置内部阴影，为白色透明，宽度为15px*/
      border-radius: 50%;
      /*用渐变来做出尾巴的效果*/
      background: linear-gradient(to right,#ffffff 0%,rgba(255,255,255,0) 100%);
      /* 动画代码 */
     /* @keyframes example {
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:blue; left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
        100% {background-color:red; left:0px; top:0px;}
      }*/
      @keyframes load-effect {
        0%{
          transform: rotate(0deg);
        }
        /*50%{
          transform: rotate(180deg);
        }*/
        /*100%{
          transform: rotate(360deg);
        }*/
      }
      &:after{
        position: absolute;
        content: '';
        width:170px;
        height:170px;
        border-radius: 50%;
        left:15px;
        top:15px;
        background: red;
      }
    }
  }
</style>
