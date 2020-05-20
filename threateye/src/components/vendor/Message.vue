<template>
  <div class="message-container"
       v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="message-content">
      <el-row class="message-top">
        <el-col :span="24">
          <div>
            <el-button class="e-btn e-btn-read">标位已读</el-button>
            <el-button class="e-btn e-btn-remove">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="message-bottom common-table-pattern">
        <el-col :span="24">
          <el-table class="common-table"
                    align="center"
                    border
                    ref="multipleTable"
                    :data="tableData"
                    @selection-change="handleSelectionChange">
            <el-table-column align="center"
                             type="selection"
                             width="50"></el-table-column>
            <el-table-column prop="time"
                             align="center"
                             width="200"
                             label="时间"></el-table-column>
            <el-table-column prop="origin"
                             width="240"
                             align="center"
                             label="消息来源"></el-table-column>
            <el-table-column prop="represent"
                             align="center"
                             label="描述"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         :total="20"
                         layout="total, sizes, prev, pager, next"></el-pagination>
        </el-col>
      </el-row>
    </div>
    <!-- 测试 -->
    <div class="box_fa">
      <div id="file"></div>
      <div class="box">
        <div class="line"></div>
      </div>
    </div>
    <!-- 测试 -->
  </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: 'message-container',
  data () {

    return {
      title_name: "通知消息",
      tableData: [{
        time: '2019.11.08 15:33:24',
        origin: '王小虎',
        represent: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2019.11.08 15:33:24',
        origin: '王小虎',
        represent: '上海市普陀区金沙江路 1518 弄'
      }, {
        time: '2019.11.08 15:33:24',
        origin: '王小虎',
        represent: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  components: { backTitle },
  created () {
    this.get_news();
  },
  mounted () {
    this.graph();
  },
  methods: {
    // 获取新消息
    get_news () {
      // /news/list
      this.$axios.get('/yiiapi/news/list')
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          console.log(resp);
          console.log(datas);
        })
        .catch(error => {
          console.log(error);
        });
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    graph () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("file"));
      myChart.showLoading({ text: '正在加载数据...' });
      myChart.clear();
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "8%",
          left: 36,
          right: "4%",
          bottom: 24
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
            interval: 'auto', //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            maxInterval: 3600 * 24 * 1000,
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
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
            name: "文件",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

      myChart.hideLoading();
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    settime () {
      setInterval(() => {

      }, 100);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/css/less/common-table-pattern.less';
.message-container {
  .message-content {
    padding: 0 56px;
    background: #fff;
    text-align: left;
    .message-top {
      height: 90px;
      line-height: 90px;
      /deep/ .e-btn {
        width: 148px;
        height: 42px;
        font-family: PingFangMedium;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #0070ff;
        &.e-btn-read {
          background: #0070ff;
          color: #fff;
        }
        &.e-btn-remove {
          background: #fff;
          color: #0070ff;
        }
      }
    }
    .message-bottom {
      min-height: 658px;
    }
  }
}
// 测试
#file {
  width: 800px;
  height: 200px;
}
.box_fa {
  position: relative;
  width: 800px;
  height: 200px;
}
.box {
  position: absolute;
  right: 22px;
  top: 0;
  width: 100px;
  height: 200px;
  border: 1px solid #0070ff;
}
.line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 4px;
  background: red;
  animation: moveHover 5s ease-in-out 0.2s;
  animation-iteration-count: infinite;
  opacity: 0.6;
}
@keyframes moveHover {
  0% {
    height: 4px;
    background: #cd4a48;
  }
  50% {
    height: 200px;
    background: #a48992;
  }
  100% {
    height: 4px;
    background: #ffb89a;
  }
}
</style>
