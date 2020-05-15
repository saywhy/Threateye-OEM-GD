<template>
  <div id="ddos">
    <div id="map"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  // 引入每个地址的坐标
  import geoCoordData from "../../../../../static/data/geoCoordData.json";
  // 引入北上广和其他城市相关联的数据
  import BJData from "../../../../../static/data/BJData.json";
  export default {
    name: "Ddos",
    data() {
      return {};
    },
    mounted() {
      this.options();
    },
    methods: {
      options() {
        let geoCoorddata = geoCoordData;

        let citys = [];

        for (let prop in geoCoorddata) {
          citys.push({ name: prop, coord: geoCoorddata[prop] });
        }


        var datas = [];
        // 注意：foreach只能遍历数组，三个参数位置不能颠倒
        // city：citys里面的单条数据
        // index：下标
        // citys：整个数组
        citys.forEach((city, idnex, citys) => {
          // Math.floor() 向下取整
          // Math.random() 函数返回一个浮点,  伪随机数在范围[0，1)
          let temp = Math.floor(Math.random() * citys.length);
          datas.push({
            name: city.name,
            toname: citys[temp].name,
            coords: [city.coord, citys[temp].coord]
          });
        });
        let series = []; //在地图上显示的数据
        [["北京", BJData]].forEach((item, index) => {
            series.push(
              {
                type: "lines",
                coordinateSystem: "geo",
                zlevel: 1,
                // 线数据集。  从哪个城市to哪个城市
                data: datas,
                //线上面的动态特效
                effect: {
                  show: true,
                  period: 4, //特效动画的时间，单位为 s。
                  trailLength: 0.7,
                  color: "#fff", //射线颜色
                  symbolSize: 3
                },
                lineStyle: {
                  normal: {
                    width: "",
                    color: "#fff",
                    curveness: 0.3
                  }
                }
              },
              {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                  brushType: "stroke" //波纹的绘制方式，还有一种就是“fill(默认)”
                },
                showEffectOn: "render",
                //图形样式。
                itemStyle: {
                  normal: {
                    color: "#a6c84c",
                    opacity: '0.05',
                  }
                },
                // symbolSize:标记的大小，可以设置成诸如 10 这样单一的数字，
                // 也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                // 散点的尺寸，当数据加载完成之后执行回调，通过返回值来设置大小
                symbolSize: function(val) {
                  if (val[2] >= 10000) {
                    return val[2] / 200 + 30;
                  } else if (val[2] >= 5000) {
                    return val[2] / 250 + 30;
                  } else if (val[2] >= 1000) {
                    return val[2] / 100 + 10;
                  } else if (val[2] >= 10) {
                    return 20;
                  } else {
                    return 10;
                  }
                },
                data: item[1].map(function(dataItem) {
                  return {
                    name: dataItem[1].name.concat(":" + [dataItem[1].value]),
                    value: geoCoorddata[dataItem[1].name].concat([
                      dataItem[1].value
                    ])
                  };
                })
              },

            );
          }
        );

        series.push({
          type: "effectScatter",
          mapType: "china",
          name: "拉萨",
          coordinateSystem: "geo",
          zlevel: 3,
          data: [
            {
              name: "",
              value: geoCoorddata["拉萨"]
            }
          ],
          //rippleEffect:涟漪特效相关配置
          rippleEffect: {
            period: 1, //动画的周期，秒数。
            scale: 2.5, //动画中波纹的最大缩放比例
            brushType: "fill" //波纹的绘制方式，可选 'stroke' 和 'fill'。
          }
        })



        console.log(series)

        let options = {
          //设置标题文本
          title: {
            text: "",
            subtext: "", //副标题
            left: "center", //组件离左侧的距离
            top: "4%", //标题距离顶部的距离
            textStyle: {
              //文本样式
              color: "#fff"
            }
          },
          geo: {
            map: 'world',
            roam: false,
            zoom: 1.2,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            selectedMode : 'single',
            itemStyle: {
              normal: {
                show: false,
                areaColor: 'rgba(9,102,232,0.12)',
                borderColor: '#0966e8'
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0, color: 'red' // 0% 处的颜色
                }, {
                  offset: 1, color: 'blue' // 100% 处的颜色
                }], false),
                areaColor: '#2a333d'
              }
            },
            silent: false
          },
          tooltip: {
            show: false, //是否显示提示框组件，包括提示框浮层和 axisPointer。
            trigger: "item", //触发类型。
            formatter: "{b}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
            padding: [5, 10],
            transitionDuration: 0.2
          },
          series: series
        };
       // options.series[0].data = datas;
        let myChart = this.$echarts.init(document.getElementById("map"));
        myChart.setOption(options);

      }
    }
  };
</script>

<style lang="less" scoped>
  #ddos{
    width: 100%;
    #map {
      width: 100%;
      height: 460px;
    }
  }

</style>
