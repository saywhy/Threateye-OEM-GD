<template>
    <div class="vm-screen-main0">
      <div id="threat-rank"></div>
      <div id="threat-scat"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main0",
      data(){
          return{
            data:[]
          }
      },
      mounted() {
        this.drawRank();
        this.drawScat();
      },
      methods:{
        drawRank(){

          let index = 0;
          // 基于准备好的dom，初始化echarts实例
          let rank = this.$echarts.init(document.getElementById("threat-rank"));

          rank.showLoading({ text: '正在加载数据...' });

          rank.clear();
          // 绘制图表
          rank.setOption({
            grid: {
              top: "20%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              containLabel: true
            },
            color: ["#DC5F5F", "#E0C840", "#47CAD9"],
            series: [
              {
                name: "预警",
                type: "pie",
                radius: ["45%", "80%"],
                avoidLabelOverlap: false,
                hoverAnimation: "false",
                legendHoverLink: false,
                hoverOffset: 3,
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
                  { value: 30, name: "高危预警", selected: true },
                  { value: 45, name: "中危预警" },
                  { value: 25, name: "低危预警" }
                ]
              }
            ]
          });

          rank.hideLoading();

          rank.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });

          //设置默认选中高亮部分
          rank.on("mouseover", function(e) {
            if (e.dataIndex != index) {
              rank.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: index
              });
            }
          });
          rank.on("mouseout", function(e) {
            index = e.dataIndex;
            rank.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: e.dataIndex
            });
          });

          window.addEventListener("resize", () => {
            rank.resize();
          });
        },
        drawScat(){

          let index = 0;
          // 基于准备好的dom，初始化echarts实例
          let rank = this.$echarts.init(document.getElementById("threat-scat"));

          rank.showLoading({ text: '正在加载数据...' });

          rank.clear();
          // 绘制图表
          rank.setOption({
            grid: {
              top: "20%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              containLabel: true
            },
            color: ["#007AFF", "#00D7E9", "#7E25DD", "#D839B6", "#BECE2A"],
            series: [
              {
                name: "威胁类型分布",
                type: "pie",
                radius: ["45%", "80%"],
                avoidLabelOverlap: false,
                hoverAnimation: "false",
                legendHoverLink: false,
                hoverOffset: 3,
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
                  { value: 30, name: "僵尸网络", selected: true },
                  { value: 45, name: "恶意程序" },
                  { value: 25, name: "垃圾邮件" },
                  { value: 25, name: "恶意地址" },
                  { value: 10, name: "其他" }
                ]
              }
            ]
          });

          rank.hideLoading();

          rank.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });

          //设置默认选中高亮部分
          rank.on("mouseover", function(e) {
            if (e.dataIndex != index) {
              rank.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: index
              });
            }
          });
          rank.on("mouseout", function(e) {
            index = e.dataIndex;
            rank.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: e.dataIndex
            });
          });

          window.addEventListener("resize", () => {
            rank.resize();
          });
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main0{
  padding: 0 16px 16px;
  display: flex;

  #threat-rank{
    flex: 1;
    height: 240px;
  }
  #threat-scat{
    flex: 1;
    height: 240px;
  }
}
</style>
