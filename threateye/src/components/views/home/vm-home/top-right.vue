<template>
    <div id="agree"></div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
export default {
  name: "agree",
  props: {
    top_right: {
      type: Array,
      default:() => []
    }
  },
  data(){
    return {
      flow_statistics: {
        time: [],
        http: [],
        https: [],
        ssh: [],
        ftp: [],
        dns: [],
        imap: [],
        smb: [],
        pop3: [],
        smtp: [],
        item: {},
        items: [],
        title: []
      }
    }
  },
  created(){
    let chartData = this.top_right;
    let that = this;

    for (var k in chartData) {
      this.flow_statistics.title.push(k);
    }

    if(chartData.http && chartData.http.length){
      chartData.http.forEach(function (item,key) {
        that.flow_statistics.time.unshift(item.statistics_time);
        that.flow_statistics.http.unshift(item.flow);
      })
    }
    if(chartData.https && chartData.https.length){
      chartData.https.forEach(function (item,key) {
        that.flow_statistics.https.unshift(item.flow);
      })
    }
    if(chartData.ssh && chartData.ssh.length){
      chartData.ssh.forEach(function (item,key) {
        that.flow_statistics.ssh.unshift(item.flow);
      })
    }

    if(chartData.ftp && chartData.ftp.length){
      chartData.ftp.forEach(function (item,key) {
        that.flow_statistics.ftp.unshift(item.flow);
      })
    }

    if(chartData.dns && chartData.dns.length){
      chartData.dns.forEach(function (item,key) {
        that.flow_statistics.dns.unshift(item.flow);
      })
    }

    if(chartData.imap && chartData.imap.length){
      chartData.imap.forEach(function (item,key) {
        that.flow_statistics.imap.unshift(item.flow);
      })
    }

    if(chartData.smb && chartData.smb.length){
      chartData.smb.forEach(function (item,key) {
        that.flow_statistics.smb.unshift(item.flow);
      })
    }

    if(chartData.pop3 && chartData.pop3.length){
      chartData.pop3.forEach(function (item,key) {
        that.flow_statistics.pop3.unshift(item.flow);
      })
    }

    if(chartData.smtp && chartData.smtp.length){
      chartData.smtp.forEach(function (item,key) {
        that.flow_statistics.smtp.unshift(item.flow);
      })
    }

    if(this.flow_statistics.title) {
      that.flow_statistics.title.forEach(function (item,key) {
        if (item == 'http') {
          that.flow_statistics.item = {
            name: 'HTTP',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.http,
            /*areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(199, 237, 250,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(199, 237, 250,0.2)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: '#f7b851'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'https') {
          that.flow_statistics.item = {
            name: 'HTTPS',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.https,
            /*areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(216, 244, 247,1)'
                }, {
                  offset: 1,
                  color: 'rgba(216, 244, 247,1)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: '#58c8da'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'ssh') {
          that.flow_statistics.item = {
            name: 'SSH',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.ssh,
        /*    areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                }, {
                  offset: 1,
                }], false)
              }
            },*/
            itemStyle: {
              normal: {

              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'ftp') {
          that.flow_statistics.item = {
            name: 'FTP',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.ftp,
            /*areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,128,0,0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(255,128,0,0.2)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: 'rgba(255,128,0,0.9)'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'dns') {
          that.flow_statistics.item = {
            name: 'DNS',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.dns,
            /*areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  /!*color: $scope.colorType.rgbaLow8*!/
                }, {
                  offset: 1,
                  /!*color: $scope.colorType.rgbaLow2*!/
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                /*color: $scope.colorType.rgbaLow10*/
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'imap') {
          that.flow_statistics.item = {
            name: 'IMAP',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.imap,
           /* areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,0,255,0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(0,0,255,0.2)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: 'rgba(0,0,255,0.9)'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'smb') {
          that.flow_statistics.item = {
            name: 'SMB',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.imap,
           /* areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(204,204,153,0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(204,204,153,0.2)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: 'rgba(204,204,153,0.9)'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'pop3') {
          that.flow_statistics.item = {
            name: 'POP3',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.imap,
           /* areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(51,153,153,0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(51,153,153,0.2)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: 'rgba(51,153,153,0.9)'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
        if (item == 'smtp') {
          that.flow_statistics.item = {
            name: 'SMTP',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: that.flow_statistics.imap,
           /* areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(102,102,153,0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(102,102,153,0.2)'
                }], false)
              }
            },*/
            itemStyle: {
              normal: {
                color: 'rgba(102,102,153,0.9)'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
          that.flow_statistics.items.push(that.flow_statistics.item);
        }
      })
    }
  },
  mounted() {
    this.graph();
  },
  methods: {
    graph() {

      let time = this.flow_statistics.time;
      let items = this.flow_statistics.items;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("agree"));

      myChart.showLoading({ text: '正在加载数据...' });
      myChart.clear();

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
          bottom: -5,
          left: 5,
          orient: "horizontal",
          textStyle: {
            fontSize: 10
          },
          selected: {
            // 选中'系列1'
            'HTTP': true,
            'HTTPS': true,
            'SSH': true,
            //不选中'系列2'
            'DNS': false,
            'FTP': false,
            'IMAP': false,
            'SMB': false,
            'POP3': false,
            'SMTP': false,
            //'DHCP': false,
          },
          data: ['HTTP', 'HTTPS', 'SSH', 'DNS', 'FTP', 'IMAP', 'SMB', 'POP3', 'SMTP']
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
          data: time.map(function (str) {
            return str.replace(' ', '\n')
          }),
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
        series:items,
        /*series: [
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
        ]*/
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
#agree {
  height: 100%;
}
</style>
