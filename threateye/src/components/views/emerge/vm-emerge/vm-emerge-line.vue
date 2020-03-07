<template>
    <div class="vm-emerge-line" id="emergeLine"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "vm-emerge-line",
  props: {
    data: {
      type: Array,
      default: () => [{statistics_time:'2000-01-01 12:00',alert_count:0}]
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {

      let data = this.data;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("emergeLine"));

      myChart.showLoading({ text: '正在加载数据...' });

      myChart.clear();
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: "2%",
          right: "4%",
          bottom: "18%",
          containLabel: true
        },
        xAxis: {
          //网格样式
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666",
            },
            formatter: function (val) {

              var strs = val.split(' '); //字符串数组

              let str = strs[0] + '\n' + strs[1];

              return str;

            }
          },
          axisTick: {
            show: false
          },
          data: data.map(function(item) {
            return item.statistics_time;
          })
        },
        yAxis: {
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
        },
        dataZoom: [
          {
            startValue: data[0].statistics_time
          },
          {
            type: "inside"
          }
        ],
        series: {
          name: "Beijing AQI",
          type: "line",
          lineStyle: {
            color: "#DC5F5F",
            opacity: 0.5
          },
          areaStyle: {
            color: "#DC5F5F",
            opacity: 0.12
          },
          data: data.map(function(item) {
            return item.alert_count;
          })
        }
      });

      myChart.hideLoading();

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#emergeLine {
  height: 100%;
}
</style>
