<template>
    <div id="safe"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "safe",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.safe();
  },
  methods: {
    safe() {
      let index = 0;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("safe"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        color: ["#47CAD9", "#DC5F5F", "#E0C840"],
        series: [
          {
            name: "来源",
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            hoverAnimation: "false",
            legendHoverLink: false,
            hoverOffset: 0,
            selectedOffset: 0,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            emphasis: {
              label: {
                show: true,
                formatter: ["{d|{d}%}", "{b|{b}}"].join("\n"),
                rich: {
                  d: {
                    fontSize: 20,
                    lineHeight: 40
                  },
                  b: {
                    color: "#999"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 3, name: "设备总数", selected: true },
              { value: 2, name: "告警总数" },
              { value: 1, name: "离线总数" }
            ]
          }
        ]
      });
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0
      }); //设置默认选中高亮部分
      myChart.on("mouseover", function(e) {
        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index
          });
        }
      });
      myChart.on("mouseout", function(e) {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        });
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#safe {
  height: 100%;
}
</style>
