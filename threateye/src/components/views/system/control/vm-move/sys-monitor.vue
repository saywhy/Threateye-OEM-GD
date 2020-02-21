<template>
    <div>
        <el-dialog class="sys_box" width="840" :close-on-click-modal="false" :visible.sync="$store.getters.sysMonitor">
            <img src="@/assets/images/emerge/closed.png" @click="closed_sys_box" class="closed_img" alt="">
            <div class="title">
                <div class="mask"></div>
                <span class="title_name">拓扑图</span>
            </div>
            <div id="graph">
                <button @click="show_detail">detail</button>
            </div>
        </el-dialog>
        <el-dialog class="sys_detail" width="840" :close-on-click-modal="false" :visible.sync="state_detail">
            <img src="@/assets/images/emerge/closed.png" @click="closed_detail" class="closed_img" alt="">
            <div class="title">
                <div class="mask"></div>
                <span class="title_name">系统状态监控</span>
            </div>
            <div class="sys_detail_content">
                <div class="detail_item">
                    <p>CPU</p>
                    <div id='cpu'></div>
                </div>
                <div class="detail_item">
                    <p>Memery</p>
                    <div id='memery'></div>
                </div>
                <div class="detail_item">
                    <p>Disk</p>
                    <div id='disk'></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "safe",
  data() {
    return {
      state_detail: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    closed_sys_box() {
      this.$store.commit("CHANGE_SYS", false);
    },
    show_detail() {
      this.state_detail = true;
      setTimeout(() => {
        this.cpu();
        this.memery();
        this.disk();
      }, 10);
    },
    closed_detail() {
      this.state_detail = false;
    },
    graph() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("graph"));
      // 绘制图表
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params, trigger) {
            return (
              "设备：" +
              params.data.names +
              "</br>" +
              "IP地址：" +
              params.data.dev_ip +
              "</br>" +
              "状态：" +
              params.data.status
            );
          }
        },
        animationDurationUpdate: 1000,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: false
              }
            },
            focusNodeAdjacenc: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            edgeSymbol: ["arrow", "arrow"],
            edgeSymbolSize: [7, 7],
            edgeLabel: {
              normal: {
                show: false
              },
              emphasis: {
                textStyle: {
                  fontSize: 30 //边节点显示的字体大小
                }
              }
            },
            data: [
              {
                name: "节点0",
                x: 350,
                y: 200,
                symbol: $scope.oracle_base64,
                names: "引擎",
                dev_ip: "192.168.1.1",
                status: "0",
                //节点上面的文字
                label: {
                  normal: {
                    position: "bottom",
                    show: true,
                    textStyle: {
                      fontSize: 12,
                      color: "#666",
                      align: "center"
                    },
                    formatter: "引擎"
                  }
                }
              }
            ],
            links: $scope.links_array,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      };
      myChart.clear(); //只是清理画布，而不会删除 生成的元素节点
      myChart.setOption(option);
      //添加点击事件
      myChart.off("click"); //防止累计触发
      myChart.on("click", function(params) {
        // 弹窗打印数据的名称
        $scope.iot_detail_title = params;
        if (params.dataType == "node") {
          $scope.iotcontent = true;
          setTimeout(function() {
            $scope.iot_detail_top($scope.iot_detail_title); //iot具体cpu/内存/硬盘/流量
          }, 600);
        }
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    cpu() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("cpu"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(2,136,209,0.3)",
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
        color: ["#0288D1"],
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
            name: "cpu",
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
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    memery() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("memery"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(205,220,57,0.3)",
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
        color: ["#CDDC39"],
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
            name: "memery",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20, 18, 32, 14, 16, 30, 35, 20, 18],
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
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    disk() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("disk"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "10%",
          left: 0,
          right: "5%",
          bottom: "5%",
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
        color: ["#4CAF50"],
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
            name: "disk",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [32, 14, 16, 30, 35, 20, 18, 32, 14, 16, 30, 35, 20, 18],
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

<style  lang="less">
.sys_box {
  z-index: 99990 !important;
  .el-dialog {
    width: 840px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      width: 840px;
      height: 500px;
      padding: 30px;
      .closed_img {
        position: absolute;
        top: -24px;
        right: -24px;
        cursor: pointer;
      }
      .title {
        height: 24px;
        line-height: 24px;
        text-align: left;
        .title_name {
          font-size: 20px;
          color: #333333;
          line-height: 24px;
          font-weight: 500;
        }
        .mask {
          width: 24px;
          height: 0px;
          border-top: 0px;
          border-right: 2px solid transparent;
          border-bottom: 5px solid #0070ff;
          border-left: 2px solid transparent;
          transform: rotate3d(0, 0, 1, 90deg);
          display: inline-block;
          margin-right: -5px;
          margin-bottom: 4px;
          margin-left: -10px;
        }
      }
      #graph {
        width: 100%;
        height: 300px;
        border: 1px solid red;
      }
    }
  }
}
.sys_detail {
  z-index: 99999 !important;
  .el-dialog {
    width: 840px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      width: 840px;
      padding: 30px;
      .closed_img {
        position: absolute;
        top: -24px;
        right: -24px;
        cursor: pointer;
      }
      .title {
        height: 24px;
        line-height: 24px;
        text-align: left;
        .title_name {
          font-size: 20px;
          color: #333333;
          line-height: 24px;
          font-weight: 500;
        }
        .mask {
          width: 24px;
          height: 0px;
          border-top: 0px;
          border-right: 2px solid transparent;
          border-bottom: 5px solid #0070ff;
          border-left: 2px solid transparent;
          transform: rotate3d(0, 0, 1, 90deg);
          display: inline-block;
          margin-right: -5px;
          margin-bottom: 4px;
          margin-left: -10px;
        }
      }
      .sys_detail_content {
        text-align: left;
        .detail_item {
          margin-top: 24px;
          p {
            font-size: 14px;
            color: #999999;
          }
          #cpu,
          #memery,
          #disk {
            height: 150px;
          }
        }
      }
    }
  }
}
</style>
