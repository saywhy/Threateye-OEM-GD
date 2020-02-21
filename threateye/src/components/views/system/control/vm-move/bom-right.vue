<template>
    <div id="edr"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "edr",
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
    this.edr();
  },
  methods: {
    edr() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("edr"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "5%",
          left: 0,
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "#fff",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            type: "none"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["EDR告警资产数", "目前在线数", "EDR总资产数"],
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [
          {
            name: "2020年",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              // 图形的形状
              color: function(params) {
                var color_list = ["#DC5F5F", "#E0C840", "#47CAD9"];
                return color_list[params.dataIndex];
              },
              barBorderRadius: 2
            },
            data: [2, 3, 5]
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
#edr {
  height: 100%;
}
</style>
