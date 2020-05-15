<template>
    <div class="vm-screen-main0">
      <div class="main0-item">
        <div id="threat-rank"></div>
        <h3 class="name">威胁等级分布</h3>
      </div>
      <div class="main0-item">
        <div id="threat-scat"></div>
        <h3 class="name">威胁类型分布</h3>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main0",
      data() {
          return {
            degree:[],
            category:[]
          }
      },
      created() {
        this.getData();
      },
      methods:{
        //获取数据
        getData(){
          this.$axios
            .get('/yiiapi/demonstration/threat-distribution')

            .then((resp) => {

              let {status, data} = resp.data;

              if(status == 0){
                let {category,degree} = data;

                this.degree = degree;
                this.category = category;

                this.$nextTick(function() {
                  this.drawRank();
                  this.drawScat();
                });
              }
          })
            .catch((error) => {

            console.log(error);

          });
        },
        drawRank(){

          let degrees = this.degree;

          if(degrees){

            degrees.filter(item => {
             let name = '';let value = 0;
             if(item.degree == 'high'){
               name = '高危预警';
               value = item.count;
             }else if(item.degree == 'medium'){
               name = '中危预警';
               value = item.count;
             }else if(item.degree == 'low'){
               name = '低危预警';
               value = item.count;
             }

             Object.assign(item,{value,name});
            });
          }else {
            return false;
          }

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
            color: ["#D44361", "#D0A13F", "#60C160"],
            series: [
              {
                name: "预警",
                type: "pie",
                center: ['50%', '42%'],
                radius: ["45%", "70%"],
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
                        lineHeight: 40,
                        color: '#fff'
                      },
                      b: {
                        color: "#fff"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: degrees
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

          let categories = this.category;

         // console.log(categories);

          if(categories){

            categories.filter(item => {
              let name = ''; let value = 0;
              name = item.category;
              value = item.count;
              Object.assign(item,{value,name});
            });
          }else {
            return false;
          }

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
                center: ['50%', '42%'],
                radius: ["45%", "70%"],
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
                        lineHeight: 40,
                        color: '#fff'
                      },
                      b: {
                        color: "#fff"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: categories
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
  .main0-item{
    flex: 1;
    position: relative;
    .name {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #00D7E9;
      position: absolute;
      bottom: 10px;
      width: 100%;
    }
    #threat-rank{
      height: 240px;
    }
    #threat-scat{
      height: 240px;
    }
  }


}
</style>
