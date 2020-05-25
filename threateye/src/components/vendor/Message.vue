<template>
  <div class="message-container"
       v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="message-content">
      <el-row class="message-top">
        <el-col :span="24">
          <div>
            <el-button class="e-btn e-btn-read"
                       @click="batch_marking">标为已读</el-button>
            <el-button class="e-btn e-btn-remove"
                       @click="del">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="message-bottom common-table-pattern">
        <el-col :span="24">
          <el-table class="common-table"
                    align="center"
                    border
                    ref="multipleTable"
                    :data="news_data.data.data"
                    @row-click='detail'
                    @selection-change="handleSelectionChange">
            <el-table-column label=" "
                             align="center"
                             prop="type"
                             width="20">
              <template slot-scope="scope">
                <div class="new_dot"
                     v-show="scope.row.status=='1'"></div>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             type="selection"
                             width="50"></el-table-column>
            <el-table-column label="时间"
                             align="center"
                             width="200"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.created_at | time }}</template>
            </el-table-column>
            <el-table-column width="240"
                             align="center"
                             label="消息来源"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.type=='1'">密码</span>
                <span v-if="scope.row.type=='2'">许可证</span>
                <span v-if="scope.row.type=='3'">工单</span>
              </template>
            </el-table-column>
            <el-table-column prop="content"
                             align="center"
                             label="描述"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="news_data.data.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         :total="news_data.data.count"
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
    <div class="reli_box">
      <ul>
        <li class="reli_item"
            v-for="item in reli_list"
            :style="item.style">
          <span class="reli_item_span"
                :class="item.change?'changed':''">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 测试 -->
  </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'message-container',
  data () {
    return {
      title_name: "通知消息",
      multipleSelection: [],
      news_data: {
        page: 1,
        rows: 10,
        data: []
      },
      // 测试
      reli_list: [
        {
          name: '192.168.1.230',
          change: false
        },
        {
          name: '47.12.1.197',
          change: false
        },
        {
          name: '34.21.1.256',
          change: false
        },
        {
          name: '48.11.1.24',
          change: false
        },
        {
          name: '197.22.1.222',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
        {
          name: '123.33.1.123',
          change: false
        },
      ],
      count: 0

    }
  },
  components: { backTitle },
  created () {
    this.get_news();
  },
  mounted () {
    this.graph();
    this.reli_list.forEach(element => {
      element.style = {
        top: this.random(20, 220) + 'px',
        left: this.random(10, 350) + 'px'
      }
    });

    setInterval((count) => {
      console.log(1111);
      console.log(this.count);
      console.log(2222);
      console.log(this.reli_list.length);
      if (this.reli_list.length == this.count) {
        this.count = 0
      }
      console.log(this.count);

      this.reli_list.forEach(element => {
        element.change = false
      });
      this.reli_list[this.count].change = true
      this.count++
    }, 10000);
  },
  methods: {
    random (lower, upper) {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
    // 获取新消息
    get_news () {
      // /news/list
      this.$axios.get('/yiiapi/news/list', {
        params: {
          page: this.news_data.page,
          rows: this.news_data.rows,
          status: ''
        }
      })
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          this.news_data.data = datas
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 标记已读 
    update (id, type) {
      this.$axios.get('/yiiapi/news/update', {
        params: {
          id: id
        }
      })
        .then((resp) => {
          let { status, data, msg } = resp.data;
          let datas = data;
          switch (status) {
            case 1:
              this.$message({ message: msg, type: 'error' });
              break;
            case 0:
              this.get_news()
              switch (type) {
                case '1':
                  eventBus.$emit('reset')
                  break;
                case '2':
                  this.$router.push({ path: '/system/licence' });
                  break;
                case '3':
                  this.$router.push({ path: '/handle/works' });
                  break;
                default:
                  break;
              }
              break;
            default:
              this.$message({ message: msg, type: 'error' });
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 批量标记
    batch_marking () {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message({ message: '请选择需要变更的信息', type: 'warning' });
        return false
      }
      var id_list = []
      this.multipleSelection.forEach(element => {
        id_list.push(element.id * 1)
      });
      this.$axios.put('/yiiapi/news/change-status', {
        id: id_list,
      })
        .then((resp) => {
          let { status, data, msg } = resp.data;
          let datas = data;
          console.log(status);
          console.log(msg);
          this.$refs.multipleTable.clearSelection();
          switch (status) {
            case 1:
              this.$message({ message: msg, type: 'error' });
              break;
            case 0:
              this.get_news()
              this.$message({ message: '标记成功', type: 'success' });
              break;
            default:
              this.$message({ message: msg, type: 'error' });
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    del () {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message({ message: '请选择需要变更的信息', type: 'warning' });
        return false
      }
      var id_list = []
      this.multipleSelection.forEach(element => {
        id_list.push(element.id * 1)
      });
      this.$axios.delete('/yiiapi/news/del', {
        data: {
          id: id_list,
        }
      })
        .then((resp) => {
          let { status, data, msg } = resp.data;
          let datas = data;
          console.log(status);
          console.log(msg);
          this.$refs.multipleTable.clearSelection();
          switch (status) {
            case 1:
              this.$message({ message: msg, type: 'error' });
              break;
            case 0:
              this.get_news()
              this.$message({ message: '删除成功', type: 'success' });
              break;
            default:
              this.$message({ message: msg, type: 'error' });
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });



    },
    //  查看详情
    detail (row, column) {
      console.log(row);
      switch (row.type) {
        // 密码
        case '1':
          this.update(row.id, '1')
          break;
        // 许可证
        case '2':
          this.update(row.id, '2')
          break;
        // 工单
        case '3':
          this.update(row.id, '3')
          break;
        default:
          break;
      }
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
    // 分页
    handleSizeChange (val) {
      this.news_data.rows = val;
      this.news_data.page = 1
      this.get_news();
    },
    handleCurrentChange (val) {
      this.news_data.page = val
      this.get_news();
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
  animation: moveHover 2s ease-in-out 0.2s;
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
.reli_box {
  width: 502px;
  height: 310px;
  border: 1px solid red;
  position: relative;
}
.changed {
  animation: reli 2s ease-in-out 0.2s;
  animation-iteration-count: 1;
  z-index: 999;
  opacity: 1;
  animation-fill-mode: forwards;
}
.reli_item {
  width: 150px;
  height: 38px;
  line-height: 38px;
  overflow: hidden;
  position: absolute;
}
.reli_item_span {
  display: block;
  opacity: 0.48;
  background: rgba(232, 57, 93, 0.2);
  border: 1px solid rgba(232, 57, 93, 0.42);
  font-size: 16px;
  color: #e8395d;
  overflow: hidden;
  width: 150px;
  height: 38px;
  margin: 0 auto; /*从中间向两边扩开*/
}

@keyframes reli {
  0% {
    color: #e8395d;
    background: rgba(232, 57, 93, 0.2);
    border: 1px solid rgba(232, 57, 93, 0.42);
    width: 0;
    height: 38px;
    line-height: 38px;
    margin: 0 auto; /*从中间向两边扩开*/
    z-index: 999;
    opacity: 1;
  }
  70% {
    width: 150px;
    height: 38px;
    line-height: 38px;
    color: #ffffff;
    background: rgba(232, 57, 93, 1);
    border: 1px solid #e8395d;
    margin: 0 auto; /*从中间向两边扩开*/
    opacity: 1;
  }
  90% {
    width: 120px;
    height: 38px;
    line-height: 38px;
    color: #ffffff;
    background: rgba(232, 57, 93, 1);
    border: 1px solid #e8395d;
    margin: 0 auto; /*从中间向两边扩开*/
    opacity: 1;
  }
  100% {
    width: 150px;
    height: 38px;
    line-height: 38px;
    color: #ffffff;
    background: rgba(232, 57, 93, 1);
    border: 1px solid #e8395d;
    margin: 0 auto; /*从中间向两边扩开*/
    opacity: 1;
  }
}
</style>
