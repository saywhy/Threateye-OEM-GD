<template>
  <div class="home_overview"
       v-cloak>
    <div class="container">

      <!-- 第一排 -->
      <el-row class="container_top  container_item"
              :gutter="10">
        <el-col :span="6">
          <div class="top_item"
               @click="sys_state">
            <div class="title">
              <p>
                <span class="title_left">系统状态监控</span>
              </p>
            </div>
            <div class="legend">
              <span class="legend_icon color8"></span>
              <span class="legend_title">预警:{{top_left.warning_count}}</span>
              <span class="legend_icon color3"></span>
              <span class="legend_title">健康:{{top_left.healthy_count}}</span>
              <span class="legend_icon color4"></span>
              <span class="legend_title">离线:{{top_left.offline_count}}</span>
            </div>
            <div class="top_left_content">
              <top-left :top_left="top_left"
                        v-if="top_left_show"></top-left>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">流量文件监控</span>
                <span class="title_right">
                  <span class="title_right_icon color6"></span>
                  <span>流量(M/s)</span>
                  <span class="title_right_icon color2"></span>
                  <span>文件(个/s)</span>
                </span>
              </p>
            </div>
            <div class="top_mid_content">
              <div class="content_top">
                <top-mid-flow :top_mid="top_mid"
                              v-if="top_mid_show"></top-mid-flow>
              </div>
              <div class="content_bom">
                <top-mid-file :top_mid="top_mid"
                              v-if="top_mid_show"></top-mid-file>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">协议统计</span>
              </p>
            </div>
            <div class="legend">
              <p class="legend_title">单位(P/s)</p>
            </div>
            <div class="top_right_content">
              <top-right :top_right="top_right"
                         v-if="top_right_show"></top-right>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第二排 -->
      <el-row class="container_bom  container_item"
              :gutter="10">
        <el-col :span="9">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">告警</span>
                <span class="title_right">
                  <span class="title_right_icon color3"></span>
                  <span>低危</span>
                  <span class="title_right_icon color5"></span>
                  <span>中危</span>
                  <span class="title_right_icon color4"></span>
                  <span>高危</span>
                </span>
              </p>
            </div>
            <div class="bom_left_content">
              <div class="content_top">
                <mid-left :mid_left="mid_left"
                          v-if="mid_left_show"></mid-left>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">未处理告警</span>
                <span class="title_right">
                  <span class="title_right_icon color3"></span>
                  <span>低危</span>
                  <span class="title_right_icon color5"></span>
                  <span>中危</span>
                  <span class="title_right_icon color4"></span>
                  <span>高危</span>
                </span>
              </p>
            </div>
            <div class="bom_mid_content">
              <mid-mid :mid_mid="mid_mid"
                       v-if="mid_mid_show"></mid-mid>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">威胁类型</span>
              </p>
            </div>
            <div class="bom_right_content">
              <mid-right :mid_right="mid_right"
                         v-if="mid_right_show"></mid-right>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第三排 -->
      <el-row class="container_bom  container_item"
              :gutter="10">
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">Top5威胁</span>
              </p>
            </div>
            <div class="bom_left_content">
              <div class="content_top">
                <bom-left :bom_left="bom_left"
                          v-if="bom_left_show"></bom-left>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">Top5风险资产</span>
              </p>
            </div>
            <div class="bom_mid_content">
              <bom-mid :bom_mid="bom_mid"></bom-mid>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">最新警告</span>
              </p>
            </div>
            <div class="bom_right_content">
              <bom-right :bom_right="bom_right"
                         v-if="bom_right_show"></bom-right>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="">
      <!-- <sys-monitor></sys-monitor> -->
    </div>
    <el-dialog class="sys_box"
               width="840"
               :close-on-click-modal="false"
               :visible.sync="el_dialog">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_sys_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">拓扑图</span>
      </div>
      <div id="graph">
        <!-- <button @click="show_detail">detail</button> -->
        <!-- <div class="list list1">
            <el-tooltip class="item"
                        effect="dark"
                        :content="tips1"
                        placement="right">
              <el-button>
                <img src="@/assets/images/home/common/img1.png"
                     class="l_img"
                     alt="">
              </el-button>
            </el-tooltip>
          </div>
          <div class="list list2">
            <el-tooltip class="item"
                        effect="dark"
                        :content="tips2"
                        placement="left">
              <el-button>
                <img src="@/assets/images/home/common/img2.png"
                     class="l_img"
                     alt="">
              </el-button>
            </el-tooltip>
          </div>
          <div class="list list3">
            <el-tooltip class="item"
                        effect="dark"
                        :content="tips3"
                        placement="right">
              <el-button>
                <img src="@/assets/images/home/common/img3.png"
                     class="l_img"
                     alt="">
              </el-button>
            </el-tooltip>
          </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import topLeft from "./vm-home/top-left";
import topMidFlow from "./vm-home/top-mid-flow";
import topMidFile from "./vm-home/top-mid-file";
import topRight from "./vm-home/top-right";

import midLeft from "./vm-home/mid-left";
import midMid from "./vm-home/mid-mid";
import midRight from "./vm-home/mid-right";

import bomLeft from "./vm-home/bom-left";
import bomMid from "./vm-home/bom-mid";
import bomRight from "./vm-home/bom-right";

// import sysMonitor from "./vm-home/sys-monitor";

export default {
  name: "system_control_move",
  data () {
    return {
      top_left: {},
      top_left_show: false,

      top_mid: {},
      top_mid_show: false,

      top_right: {},
      top_right_show: false,
      ///////////

      mid_left: [],
      mid_left_show: false,

      mid_mid: [],
      mid_mid_show: false,

      mid_right: [],
      mid_right_show: false,

      ///////////
      bom_left: [],
      bom_left_show: false,

      bom_mid: [],
      bom_mid_show: false,

      bom_right: [],
      bom_right_show: false,
      //-----
      el_dialog: false,
      equipment: {
        probe: [],
        engine: [],
        sandbox: [],
        echart_array: [],
        links_array: [],
      },
      base64: 'data:image/png;base64,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',
      graph_echart_array: [],
      graph_echart_array_item: [],
      probe_array: [],
      engine_array: [],
      sandbox_array: [],
      links_array: [],
      sysState_data: {},
      only_one: false,
      only_to: false,

    };
  },
  created () {
    //第一排
    this.init_top_left();
    this.init_top_mid();
    this.init_top_right();
    //第二排
    this.init_mid_left();
    this.init_mid_mid();
    this.init_mid_right();
    //第三排
    this.init_bom_left();
    this.init_bom_mid();
    this.init_bom_right();
  },
  methods: {
    //第一排（左）
    init_top_left () {
      this.$axios.get('/yiiapi/alert/system-state')
        .then((resp) => {
          console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.top_left = data;
            this.top_left_show = true;
          }
        })
    },
    //第一排（中）
    init_top_mid () {
      this.$axios.get('/yiiapi/alert/flow-file-statistics')
        .then((resp) => {
          //console.log(resp)
          let {
            status,
            data
          } = resp.data;

          if (status == 0) {
            this.top_mid = data;
            this.top_mid_show = true;
          }
        })
    },
    //第一排（右）
    init_top_right () {
      this.$axios.get('/yiiapi/alert/protocol-flow-statistics')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          //console.log(data)
          if (status == 0) {
            this.top_right = data;
            this.top_right_show = true;
          }
        })
    },

    //第二排（左）
    init_mid_left () {
      this.$axios.get('/yiiapi/alert/get-last7-days-alarm')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.mid_left = data;
            this.mid_left_show = true;
          }
        })
    },
    //第二排（中）
    init_mid_mid () {
      this.$axios.get('/yiiapi/alert/untreated-alarm-type')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.mid_mid = data;
            this.mid_mid_show = true;
          }
        })
    },
    //第二排（右）
    init_mid_right () {
      this.$axios.get('/yiiapi/alert/threat-type')
        .then((resp) => {

          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.mid_right = data;
            this.mid_right_show = true;
          }
        })
    },


    //第三排（左）
    init_bom_left () {
      this.$axios.get('/yiiapi/alert/threat-top5')
        .then((resp) => {
          // /console.log(resp)

          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.bom_left = data;
            this.bom_left_show = true;
          }
        })
    },
    //第三排（中）
    init_bom_mid () {
      this.$axios.get('/yiiapi/alert/risk-asset-top5')
        .then((resp) => {
          // console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.bom_mid = data;
            this.bom_mid_show = true;
          }
        })
    },

    //第三排（右）
    init_bom_right () {
      this.$axios.get('/yiiapi/alert/list-top5')
        .then((resp) => {
          // console.log(resp)
          let {
            status,
            data
          } = resp.data;
          if (status == 0) {
            this.bom_right = data;
            this.bom_right_show = true;
          }
        })
    },

    sys_state () {
      // this.$store.commit("CHANGE_SYS", true);
      this.el_dialog = true;
      this.get_data()
    },
    get_data () {
      this.$axios.get('/yiiapi/alert/system-state')
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          this.sysState_data = data
          data.dev_info.forEach(element => {
            //       { name: '引擎', type: "2" },
            // { name: '沙箱', type: "4" },
            // { name: '探针', type: "1" },
            switch (element.type) {
              case '1':
                this.equipment.probe.push(element)
                break;
              case '2':
                this.equipment.engine.push(element)
                break;
              case '4':
                this.equipment.sandbox.push(element)
                break;
              default:
                break;
            }
          });
          setTimeout(() => {
            this.graph_echart()
          }, 100);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 拓扑图
    graph_echart () {
      // 多个探针 模版
      this.equipment.probe.forEach((item, index) => {
        var data_item1 = {
          name: '节点1',
          x: 300,
          y: 100,
          symbol: this.base64,
          names: '探针',
          dev_ip: item.ip,
          status: item.status,
          //节点上面的文字	
          label: {
            normal: {
              position: "bottom",
              show: true,
              textStyle: {
                fontSize: 12,
                color: '#666',
                align: 'center',
              },
              formatter: '探针'
            }
          }
        };
        // var links_item = {
        //   source: '节点0',
        //   target: '节点1',
        //   ip: item.ip,
        //   status: item.status,
        //   names: '探针'
        // };
        switch (index) {
          case 0:
            data_item1.name = '节点1';
            data_item1.x = 100;
            data_item1.y = 100;
            this.equipment.echart_array.push(data_item1);
            break;
          case 1:
            data_item1.name = '节点2';
            data_item1.x = 1000;
            data_item1.y = 100;
            this.equipment.echart_array.push(data_item1);
            break;
          case 2:
            data_item1.name = '节点3';
            data_item1.x = 500;
            data_item1.y = 100;
            this.equipment.echart_array.push(data_item1);
            break;
          case 3:
            data_item1.name = '节点4';
            data_item1.x = 300;
            data_item1.y = 100;
            this.equipment.echart_array.push(data_item1);
            break;
          case 4:
            data_item1.name = '节点5';
            data_item1.x = 100;
            data_item1.y = 700;
            this.equipment.echart_array.push(data_item1);
            break;
          case 5:
            data_item1.name = '节点6';
            data_item1.x = 100;
            data_item1.y = 200;
            this.equipment.echart_array.push(data_item1);
            break;
          case 6:
            data_item1.name = '节点7';
            data_item1.x = 100;
            data_item1.y = 800;
            this.equipment.echart_array.push(data_item1);
            break;
          case 7:
            data_item1.name = '节点8';
            data_item1.x = 100;
            data_item1.y = 400;
            this.equipment.echart_array.push(data_item1);
            break;
          default:
            break;
        };
      });
      // 多个引擎
      this.equipment.engine.forEach((item, index) => {
        var data_item1 = {
          name: "引擎0",
          x: 350,
          y: 200,
          symbol: this.base64,
          names: "引擎",
          dev_ip: item.ip,
          status: item.status,
          //节点上面的文字
          label: {
            normal: {
              position: "bottom",
              show: true,
              textStyle: {
                fontSize: 12,
                color: "#666",
                align: "center",
              },
              formatter: "引擎",
            },
          },
        };
        switch (index) {
          case 0:
            data_item1.name = '引擎0';
            data_item1.x = 400;
            data_item1.y = 200;
            this.equipment.echart_array.push(data_item1);
            break;
          case 1:
            data_item1.name = '引擎1';
            data_item1.x = 800;
            data_item1.y = 200;
            this.equipment.echart_array.push(data_item1);
            break;
          case 3:
            data_item1.name = '引擎2';
            data_item1.x = 600;
            data_item1.y = 200;
            this.equipment.echart_array.push(data_item1);
            break;
          case 4:
            data_item1.name = '引擎3';
            data_item1.x = 100;
            data_item1.y = 200;
            this.equipment.echart_array.push(data_item1);
            break;
          default:
            break;
        }
      })
      // 沙箱
      this.equipment.sandbox.forEach((item, index) => {
        var data_item1 = {
          name: "沙箱0",
          x: 350,
          y: 200,
          symbol: this.base64,
          names: "沙箱",
          dev_ip: item.ip,
          status: item.status,
          //节点上面的文字
          label: {
            normal: {
              position: "bottom",
              show: true,
              textStyle: {
                fontSize: 12,
                color: "#666",
                align: "center",
              },
              formatter: "沙箱",
            },
          },
        };
        switch (index) {
          case 0:
            data_item1.name = '沙箱0';
            data_item1.x = 500;
            data_item1.y = 300;
            this.equipment.echart_array.push(data_item1);
            break;
          case 1:
            data_item1.name = '沙箱1';
            data_item1.x = 800;
            data_item1.y = 300;
            this.equipment.echart_array.push(data_item1);
            break;
          case 3:
            data_item1.name = '沙箱2';
            data_item1.x = 200;
            data_item1.y = 300;
            this.equipment.echart_array.push(data_item1);
            break;
          default:
            break;
        }
      })
      console.log(this.equipment.echart_array);


      var myChart = this.$echarts.init(document.getElementById("graph"));
      console.log(myChart);

      var option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        color: ['#83e0ff', '#45f5ce', '#b158ff'],
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 1000,
              edgeLength: 50
            },
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            data: [
              {
                name: '校园大数据',
                symbolSize: 120,
                symbol: this.base64,
                draggable: true,
                category: 0,
                itemStyle: {
                  normal: {
                    borderColor: '#04f2a7',
                    borderWidth: 6,
                    shadowBlur: 20,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                  }
                }
              },
              {
                name: '舆情大数据',
                symbolSize: 100,
                itemStyle: {
                  normal: {
                    borderColor: '#04f2a7',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                  }
                },
                category: 1,

              },
              {
                name: '用户分析',
                symbolSize: 80,
                category: 1,
                itemStyle: {
                  normal: {
                    borderColor: '#04f2a7',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                  }
                },

              },
              {
                name: '话题分析',
                symbolSize: 80,
                category: 1,
                itemStyle: {
                  normal: {
                    borderColor: '#82dffe',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                  }
                },

              },
              {
                name: '评论分析',
                symbolSize: 80,
                category: 1,
                itemStyle: {
                  normal: {
                    borderColor: '#82dffe',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                  }
                },

              },
              {
                name: '图书馆分析',
                symbolSize: 100,
                category: 2,
                itemStyle: {
                  normal: {
                    borderColor: '#82dffe',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                  }
                },

              },
              {
                name: '借阅分析',
                symbolSize: 80,
                category: 2,
                itemStyle: {
                  normal: {
                    borderColor: '#b457ff',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#b457ff',
                    color: '#001c43'
                  }
                },

              },
              {
                name: '借阅排行',
                symbolSize: 80,
                itemStyle: {
                  normal: {
                    borderColor: '#82dffe',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43'

                  }
                },
                category: 2,

              },
              {
                name: '图书收录',
                symbolSize: 80,
                itemStyle: {
                  normal: {
                    borderColor: '#82dffe',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43'
                  }
                },
                category: 2,

              },
              {
                name: '图书分析',
                symbolSize: 80,
                category: 2,
                itemStyle: {
                  normal: {
                    borderColor: '#82dffe',
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43'
                  }
                },

              }],
            links: [
              {
                source: '校园大数据',
                target: '舆情大数据'

              },
              {
                source: '校园大数据',
                target: '图书馆分析',
              },
              {
                source: '舆情大数据',
                target: '用户分析',
              },
              {
                source: '舆情大数据',
                target: '话题分析',
              },
              {
                source: '舆情大数据',
                target: '评论分析',
              },
              {
                source: '校园大数据',
                target: '图书馆分析',
              },
              {
                source: '图书馆分析',
                target: '图书分析',
              },
              {
                source: '图书馆分析',
                target: '借阅分析',
              },
              {
                source: '图书馆分析',
                target: '借阅排行',
                value: 'DNA',
              }, {
                source: '图书馆分析',
                target: '图书收录'

              }
            ],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 5,
                curveness: 0
              }
            },
            categories: [
              { name: '0' },
              { name: '1' },
              { name: '2' }
            ]
          }
        ]
      }
      //-------
      // 调试页面回打印出点击的节点名称

      var person = "/asset/get/s/data-1561621393298-zQTG-TuDS.png";
      var car = "/asset/get/s/data-1561621386236-0IGCc48l6.png";
      var phone = "/asset/get/s/data-1561621379686-rZHoryrBV.png";
      var size = 50; //节点大小

      var listdata = [];
      var links = [];
      var legendes = ["手机IMSI", "人脸ID", "车牌号码", "人脸ID"];
      var texts = [];
      var phoneNum = {
        "手机号:13856978256": "13856978256",
        "手机号:13998745632": "13998745632",
        "手机号:18812345678": "18812345678",
        "手机号:16812345678": "16812345678",
        "手机号:13856971111": "13856978256",
        "手机号:13998742222": "13998745632",
        "手机号:18812344444": "18812345678",
        "手机号:16812343333": "16812345678",
        "手机号:13878978256": "13856978256",
        "手机号:137895632": "13998745632",
      };

      var phoneIMSI = ["次数:1，匹配度:6%", "次数:3，匹配度:30%", "次数:2，匹配度:26%",
        "次数:2，匹配度:26%", "次数:2，匹配度:26%", "次数:2，匹配度:26%",
        "匹配手机号码", "匹配手机号码", "匹配手机号码", "匹配手机号码"]


      var carNum = {
        "车牌号码:豫AJ9685": "豫AJ9685",
        "车牌号码:豫AG5123": "豫AG5123",
        "车牌号码:豫AG6822": "豫AG6822",
        "车牌号码:豫CJ9685": "豫AJ9685",
        "车牌号码:豫AD5123": "豫AG5123",
        "车牌号码:豫AT6822": "豫AG6822",
        "车牌号码:豫AG6622": "豫AG6822",
        "车牌号码:豫CJ9885": "豫AJ9685",
      }
      const relationShipCar = ["匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码"
        , "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码"]

      var mainRelationShip = {
        人脸ID: "732"
      }

      function setDataPerson (json, n) {
        var i = 0;
        for (var p in json) {
          listdata.push({
            x: 50,
            y: 100,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + "/asset/get/s/data-1561621393298-zQTG-TuDS.png",
            "symbolSize": 70,
            "category": n,
            "draggable": "false",
            formatter: function (params) {
              return params.data.showName
            },
            label: {
              position: 'bottom'
            }
          });
          i++;
        }
      }
      function setDataPhone (json, n) {
        var i = 0;
        for (var p in json) {
          listdata.push({
            x: i * 50,
            y: size + i * 10,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + "/asset/get/s/data-1561621386236-0IGCc48l6.png",
            "symbolSize": size,
            "category": n,
            "draggable": "false",
            formatter: function (params) {
              return params.data.showName
            },
            label: {
              position: 'bottom'
            }
          });
          i++;
        }
      }
      function setDataCar (json, n) {
        var i = 0;
        for (var p in json) {
          listdata.push({
            x: i * 50,
            y: size + i * 10,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + "/asset/get/s/data-1561621379686-rZHoryrBV.png",
            "symbolSize": size,
            "category": n,
            "draggable": "false",
            formatter: function (params) {
              return params.data.showName
            },
            label: {
              position: 'bottom'
            }
          });
          i++;
        }
      }

      function setLinkData (json, relarr, title) {
        if (relarr !== "") {
          var i = 0;
          for (var p in json) {
            links.push({
              "source": p,
              "target": title,
              "value": relarr[i],
              lineStyle: {
                normal: {
                  // text: relarr[i],
                  color: 'source'
                }
              }
            });
            i++;
          }
        } else {
          for (var p2 in json) {
            links.push({
              "source": p2,
              "target": title,
              "value": "",
              lineStyle: {
                normal: {
                  color: 'source'
                }
              }
            });
          }
        }
      }

      for (var i = 0; i < legendes.length; i++) {
        texts.push({
          "name": legendes[i]
        })
      }

      setDataPhone(phoneNum, 0);
      setDataCar(carNum, 2);
      setDataPerson(mainRelationShip, 3);

      setLinkData(phoneNum, phoneIMSI, legendes[3]);
      setLinkData(carNum, relationShipCar, legendes[3]);

      var option = {
        tooltip: {
          formatter: '{b}'
        },
        animationDuration: 1000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 80,
            gravity: 0,
            edgeLength: 150,
            layoutAnimation: true,
          },
          data: listdata,
          links: links,
          categories: texts,
          roam: false,
          nodeScaleRatio: 0,
          focusNodeAdjacency: false,
          lineStyle: {
            normal: {
              opacity: 0.5,
              width: 1.5,
              curveness: 0
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              textStyle: {
                color: '#000000',
                fontWeight: 'normal',
                fontSize: "12" //字体大小
              },
              formatter: function (params) {
                return params.data.showName
              },
              fontSize: 18,
              fontStyle: '600',
            }
          },
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12
              },
              formatter: "{c}"
            }
          }
        }],
        color: ['#F2F2F2']
      };

      const clickFun = param => {
        console.log(param.name)
      }

      myChart.on("click", clickFun);

      myChart.setOption(option);
      //添加点击事件
      myChart.off("click"); //防止累计触发
      myChart.on('click', function (params) {
        console.log(params);
        // 弹窗打印数据的名称
        // this.iot_detail_title = params;
        // if (params.dataType == "node") {
        //   this.iotcontent = true;
        //   setTimeout(function () {
        //     this.iot_detail_top(this.iot_detail_title); //iot具体cpu/内存/硬盘/流量
        //   }, 600);
        // }
      })
    },
    closed_sys_box () {
      this.el_dialog = false;
    }

  },
  components: {
    topLeft,
    topMidFlow,
    topMidFile,
    topRight,

    midLeft,
    midMid,
    midRight,

    bomLeft,
    bomMid,
    bomRight,

    // sysMonitor
  },
};
</script>

<style scoped lang="less">
.home_overview {
  padding: 24px;
  .container {
    text-align: left;
    .container_item {
      .color1 {
        background: #f57c00;
      }
      .color2 {
        background: #0288d1;
      }
      .color3 {
        background: #47cad9;
      }
      .color4 {
        background: #dc5f5f;
      }
      .color5 {
        background: #cddc39;
      }
      .color6 {
        background: #4caf50;
      }
      .color7 {
        background: #47cad9;
      }
      .color8 {
        background: #e0c840;
      }
      margin-bottom: 10px;
      .top_item {
        background: #ffffff;
        height: 380px;
        border-radius: 4px;
        padding: 0 16px 20px 16px;
        .title {
          height: 60px;
          line-height: 60px;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          .title_left {
            float: left;
            font-weight: bold;
          }
          .title_right {
            float: right;
            font-size: 14px;
            color: #333333;
            .title_right_icon {
              margin-left: 12px;
              border-radius: 2px;
              height: 14px;
              width: 28px;
              vertical-align: unset;
              display: inline-block;
            }
          }
        }
        .legend {
          clear: both;
          height: 30px;
          text-align: left;
          font-size: 14px;
          .legend_icon {
            border-radius: 2px;
            height: 14px;
            width: 28px;
            vertical-align: middle;
            display: inline-block;
          }
          .legend_title {
            margin-right: 10px;
            color: #0070ff;
            text-decoration: underline;
          }
        }
        // 第一个
        .top_left_content {
          height: 270px;
        }
        // 第二个
        .top_mid_content {
          height: 300px;
          .content_top {
            height: 150px;
          }
          .content_bom {
            height: 150px;
          }
        }
        // 第三个
        .top_right_content {
          height: 270px;
        }
        // 第四个
        .bom_left_content {
          height: 300px;
          .content_top {
            height: 300px;
          }
        }
        // 第五个
        .bom_mid_content {
          height: 270px;
        }
        // 第六个
        .bom_right_content {
          height: 300px;
        }
      }
    }
  }
}

.vm-move-threat {
  margin: 0;
  padding: 0 !important;
  /deep/ .common-table {
    width: 100%;
    font-family: PingFangSC-Medium;
    /deep/ .el-table__header-wrapper {
      .el-table__header {
        thead.has-gutter {
          th {
            background: #f8f8f8;
            .cell {
              color: #333;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  /deep/ &.vm-move-threat-middle {
    .common-table {
      .el-table__header-wrapper {
        .el-table__header {
          th:nth-child(3) {
            /*.cell{
                  padding: 0!important;
  
                }*/
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          td:nth-child(3) {
            .cell {
              position: relative;
              height: 12px;
              .el-progress {
                .el-progress-bar {
                  vertical-align: super;
                  .el-progress-bar__outer {
                    height: 12px !important;
                    border-radius: 1px;
                    .el-progress-bar__inner {
                      border-radius: 1px;
                      background-color: #5389e0;
                    }
                  }
                }
              }
              /*.sc_index{
                    background: #5389E0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40%;
                    height: 16px;
                  }*/
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.sys_box {
  z-index: 3000 !important;
  .el-dialog {
    width: 842px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      width: 842px;
      height: 462px;
      padding: 30px;
      .closed_img {
        position: absolute;
        top: -18px;
        right: -18px;
        cursor: pointer;
        width: 46px;
        height: 46px;
      }
      .title {
        height: 24px;
        line-height: 24px;
        text-align: left;
        font-size: 0;
        .mask {
          width: 4px;
          height: 16px;
          display: inline-block;
          background: #0070ff;
          vertical-align: baseline;
        }
        .title_name {
          font-size: 16px;
          color: #333333;
          font-weight: 500;
          margin-left: 6px;
          display: inline-block;
          vertical-align: super;
          font-family: PingFangSC-Medium;
        }
      }
      #graph {
        width: 100%;
        height: calc(100% - 24px);
        border: 1px solid red;
        position: relative;
        .list {
          width: 72px;
          height: 72px;
          position: absolute;
          /deep/ .el-button {
            padding: 0;
            border-width: 0;
            &:hover {
              background-color: #fff;
            }
            .l_img {
              width: 72px;
              height: 72px;
            }
          }
          &.list1 {
            top: 70px;
            left: 354px;
          }
          &.list2 {
            bottom: 90px;
            left: 260px;
          }
          &.list3 {
            bottom: 90px;
            right: 260px;
          }
        }
      }
    }
  }
}
</style>
