<template>
  <div class="home_overview" v-cloak>
    <div class="container">

      <!-- 第一排 -->
      <el-row class="container_top  container_item" :gutter="10">
        <el-col :span="6">
          <div class="top_item" @click="sys_state">
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
              <top-left :top_left = "top_left" v-if="top_left_show"></top-left>
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
                <top-mid-flow :top_mid = "top_mid" v-if="top_mid_show"></top-mid-flow>
              </div>
              <div class="content_bom">
                <top-mid-file :top_mid = "top_mid" v-if="top_mid_show"></top-mid-file>
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
              <top-right :top_right="top_right" v-if="top_right_show"></top-right>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第二排 -->
      <el-row class="container_bom  container_item" :gutter="10">
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
                <mid-left :mid_left="mid_left" v-if="mid_left_show"></mid-left>
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
              <mid-mid :mid_mid="mid_mid" v-if="mid_mid_show"></mid-mid>
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
              <mid-right :mid_right="mid_right" v-if="mid_right_show"></mid-right>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 第三排 -->
      <el-row class="container_bom  container_item" :gutter="10">
        <el-col :span="6">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">Top5威胁</span>
              </p>
            </div>
            <div class="bom_left_content">
              <div class="content_top">
                 <bom-left :bom_left="bom_left" v-if="bom_left_show"></bom-left>
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
              <bom-right :bom_right="bom_right" v-if="bom_right_show"></bom-right>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="">
      <sys-monitor></sys-monitor>
    </div>
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

  import sysMonitor from "./vm-home/sys-monitor";

  export default {
    name: "system_control_move",
    data () {
      return {
        top_left: {},
        top_left_show:false,

        top_mid:{},
        top_mid_show:false,

        top_right:[],
        top_right_show:false,
        ///////////

        mid_left:[],
        mid_left_show:false,

        mid_mid:[],
        mid_mid_show:false,

        mid_right:[],
        mid_right_show:false,

        ///////////
        bom_left:[],
        bom_left_show:false,

        bom_mid:[],
        bom_mid_show:false,

        bom_right:[],
        bom_right_show:false

      };
    },
    created() {
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
      init_top_left(){
        this.$axios.get('/api/yiiapi/alert/system-state')
          .then((resp) => {
            //console.log(resp)
            let {status,data} = resp.data;
            if(status == 0){
              this.top_left = data;
              this.top_left_show = true;
            }
          })
      },
      //第一排（中）
      init_top_mid() {
        this.$axios.get('/api/yiiapi/alert/flow-file-statistics')
          .then((resp) => {
            //console.log(resp)
            let {status,data} = resp.data;

            if(status == 0){
              /*this.top_mid.statistics_time = data.statistics_time;
              this.top_mid.flow_diff = data.flow_diff;
              this.top_mid.file_count_diff = data.file_count_diff;*/
              this.top_mid = data;
              this.top_mid_show = true;
            }
          })
      },
      //第一排（右）
      init_top_right(){
        this.$axios.get('/api/yiiapi/alert/protocol-flow-statistics')
          .then((resp) => {
            //console.log(resp);

            let {status,data} = resp.data;

            if(status == 0){
              this.top_right = data;
              this.top_right_show = true;
            }
          })
      },

      //第二排（左）
      init_mid_left() {
        this.$axios.get('/api/yiiapi/alert/get-last7-days-alarm')
          .then((resp) => {
            let {status,data} = resp.data;
            if(status == 0){
              this.mid_left = data;
              this.mid_left_show = true;
            }
          })
      },
      //第二排（中）
      init_mid_mid() {
        this.$axios.get('/api/yiiapi/alert/untreated-alarm-type')
          .then((resp) => {
            let {status,data} = resp.data;
            if(status == 0){
              this.mid_mid = data;
              this.mid_mid_show = true;
            }
          })
      },
      //第二排（右）
      init_mid_right() {
        this.$axios.get('/api/yiiapi/alert/threat-type')
          .then((resp) => {
           // console.log(resp)
            let {status,data} = resp.data;
            if(status == 0){
              this.mid_right = data;
              this.mid_right_show = true;
            }
          })
      },


      //第三排（左）
      init_bom_left() {
        this.$axios.get('/api/yiiapi/alert/threat-top5')
          .then((resp) => {
            // /console.log(resp)

            let {status,data} = resp.data;
            if(status == 0){
              this.bom_left = data;
              this.bom_left_show = true;
            }
          })
      },
      //第三排（中）
      init_bom_mid() {
        this.$axios.get('/api/yiiapi/alert/risk-asset-top5')
          .then((resp) => {
            console.log(resp)
            let {status,data} = resp.data;
            if(status == 0){
              this.bom_mid = data;
              this.bom_mid_show = true;
            }
          })
      },

      //第三排（右）
      init_bom_right() {
        this.$axios.get('/api/yiiapi/alert/list-top5')
          .then((resp) => {
           // console.log(resp)
            let {status,data} = resp.data;
            if(status == 0){
              this.bom_right = data;
              this.bom_right_show = true;
            }
          })
      },

      sys_state() {
        this.$store.commit("CHANGE_SYS", true);
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

      sysMonitor
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
          background: #47CAD9;
        }
        .color8 {
          background: #E0C840;
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
            .legend_title{
              margin-right: 10px;
              color: #0070FF;
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
  .vm-move-threat{
    margin: 0;
    padding: 0!important;
    /deep/
    .common-table{
      width: 100%;
      font-family: PingFangSC-Medium;
      /deep/
      .el-table__header-wrapper{
        .el-table__header{
          thead.has-gutter{
            th{
              background: #F8F8F8;
              .cell{
                color: #333;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    /deep/
    &.vm-move-threat-middle{
      .common-table{

        .el-table__header-wrapper{
          .el-table__header{
            th:nth-child(3){
              .cell{
                padding: 0!important;
              }
            }
          }
        }
        .el-table__body-wrapper{
          .el-table__row{
            td:nth-child(3){
              .cell{
                position: relative;
                height: 16px;
                background: #F8F8F8;
                .sc_index{
                  background: #5389E0;
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 40%;
                  height: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
