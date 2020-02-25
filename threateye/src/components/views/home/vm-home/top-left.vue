<template>
    <div id="status"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "status",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.status();
  },
  methods: {
    status() {
      let index = 0;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("status"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            legendHoverLink: false,
            radius: ["0%", "65%"],
            hoverAnimation: "false",
            hoverOffset: 0,
            selectedOffset: 0,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{b}: {c}"
              }
            },
            labelLine: {
              show: true,
              length: 30,
              length2: 10
            },
            itemStyle: {
              // color: ["#0288D1", "#CDDC39", "#4CAF50"]
              color: function(params) {
                return params.data.color;
              }
            },
            data: [
              { value: 2, name: "预警", color: "rgba(2,136,209,1)" },
              { value: 5, name: "健康", color: "rgba(205,220,57,1)" },
              { value: 3, name: "离线", color: "rgba(76,175,80,1)" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "80%"],
            legendHoverLink: false,
            hoverAnimation: "false",
            hoverOffset: 0,
            selectedOffset: 0,
            label: {
              normal: {
                show: false,
                position: "outside",
                formatter: "{b}: {c}"
              }
            },
            itemStyle: {
              color: function(params) {
                return params.data.color;
              }
            },
            data: [
              { value: 2, name: "预警", color: "rgba(2,136,209,.5)" },
              { value: 5, name: "健康", color: "rgba(205,220,57,.5)" },
              { value: 3, name: "离线", color: "rgba(76,175,80,.5)" }
            ]
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
#status {
  height: 100%;
}
</style>
