<template>
    <div class="vm-emerge-line" id="emergeLine"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "vm-emerge-line",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("emergeLine"));
      // 绘制图表
      this.$axios.get("/static/data/aqi.json").then(function(data) {
        myChart.setOption({
          grid: {
            top: "18%",
            left: "2%",
            right: "4%",
            bottom: "18%",
            containLabel: true
          },
          xAxis: {
            data: data.map(function(item) {
              return item[0];
            })
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          dataZoom: [
            {
              startValue: "2014-06-01"
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
              return item[1];
            })
          }
        });
        window.addEventListener("resize", () => {
          myChart.resize();
        });
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
