<template>
    <div id="test"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "mid-left",
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("test"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show:false,
          data: ['低危', '中危', '高危']
        },
        grid: {
          top: "5%",
          left: 0,
          right: 0,
          bottom: "2%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(71,202,217,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        color: ["#47CAD9","#E0C840","#DC5F5F"],
        xAxis: {
          type: 'category',
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#F4F4F4"],
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          },
          data: ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07']
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F4F4F4",
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '低危',
            type: 'bar',
            stack: '广告',
            barWidth:'40%',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '中危',
            type: 'bar',
            stack: '广告',
            barWidth:'40%',
            data: [220, 182, 191, 234, 290,230, 210]
          },
          {
            name: '高危',
            type: 'bar',
            stack: '广告',
            barWidth:'40%',
            data: [150, 232, 201, 154, 190, 230, 210]
          }

        ]
      });

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#test {
  height: 100%;
}
</style>
