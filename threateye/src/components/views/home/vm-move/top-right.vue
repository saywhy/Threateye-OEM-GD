<template>
    <div id="agree"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "agree",
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
    this.agree();
  },
  methods: {
    agree() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("agree"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "20%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "#fff",
          borderWidth: 2,
          backgroundColor: "#fff",
          //   formatter: function(params, ticket, callback) {
          //     console.log(params);
          //     var string = "";
          //     params.forEach(item => {
          //       console.log(item.color);
          //       string +=
          //         "<span>" +
          //         item.seriesName +
          //         "</span>" +
          //         "<span>:" +
          //         item.value +
          //         "</span><br/>";
          //     });
          //     console.log(string);
          //     return string;
          //   },
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        legend: {
          bottom: 5,
          left: 5,
          orient: "horizontal",
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            HTTP: true,
            HTTPS: true,
            SSH: false,
            // 不选中'系列2'
            DNS: false,
            FTP: false,
            IMAP: false,
            SMB: false,
            POP3: false,
            SMTP: false
            // 'DHCP': false,
          },
          data: [
            "HTTP",
            "HTTPS",
            "SSH",
            "DNS",
            "FTP",
            "IMAP",
            "SMB",
            "POP3",
            "SMTP"
          ]
        },
        color: ["#0288D1", "#CDDC39", "#4CAF50"],
        xAxis: {
          boundaryGap: false,
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
          data: [
            "08:00",
            "08:10",
            "08:20",
            "08:30",
            "08:40",
            "08:50",
            "09:00",
            "09:10",
            "09:20",
            "09:30",
            "09:40",
            "09:50",
            "10:00"
          ]
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
            name: "HTTP",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20, 18, 32, 14, 16, 30, 35, 20, 18],
            lineStyle: {
              color: "#0288D1"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(2,136,209,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(2,136,209,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: "HTTPS",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [12, 24, 14, 10, 65, 30, 58, 12, 24, 36, 10, 35, 20, 8],
            lineStyle: {
              color: "#CDDC39"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(205,220,57,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(205,220,57,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: "SSH",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [12, 24, 36, 10, 25, 30, 48, 12, 34, 43, 21, 15, 40, 38],
            lineStyle: {
              color: "#4CAF50"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(76,175,80,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(76,175,80,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
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
#agree {
  height: 100%;
}
</style>
