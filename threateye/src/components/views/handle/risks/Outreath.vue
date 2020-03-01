<template>
  <div class="handle-outreath" v-cloak>
    <div class="outside-top">
      <div class="ost ost-1">
        <div class="ost-title">外联资产 Top5</div>
        <div class="ost-progress">
          <vm-handle-progress :progress_data="progress_data_source5"
          v-if="progress_data_source5_show"></vm-handle-progress>
        </div>
      </div>
      <div class="ost ost-2">
        <div class="ost-title">外联威胁类型 Top5</div>
        <div class="ost-emerge">
          <vm-handle-form :form_data="form_data_threat5"
          v-if="form_data_threat5_show"></vm-handle-form>
        </div>
      </div>
    </div>
    <div class="outside-middle">
      <div class="osm-top">
        <img class="osm-img" src="../../../../assets/images/handle/risks/edit.png">
        <span class="osm-title">威胁及安全建议</span>
      </div>
      <div class="osm-middle">
        <dl>
          <dt class="osm-dt">威胁描述</dt>
          <dd class="osm-dd">外连威胁是指攻击者通过失陷的资产和外网通讯从而达到控制内网资产或者窃取数据的目的，这个阶段的攻击通常伪装成常规的网络通讯和流量避免被检测。</dd>
        </dl>
        <dl>
          <dt class="osm-dt">安全建议</dt>
          <dd class="osm-dd">
            <ul>
              <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
              <li>2、采用安全网关和端点安全等进行深度防御；</li>
              <li>3、采用威胁情报发现C&C服务器信息以及其它高危外连动作；</li>
              <li>4、在扎实的安全防御基础上提升网络和端点的威胁检测和响应能力。</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
    <div class="outside-bottom common-invest">
      <div class="invest">
        <div class="invest_form invest_form_network">
          <el-form class="common-pattern">
            <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
              <el-col :span="24" class="common_box_list">

                <!--搜索关键词-->
                <el-input class="s_key" placeholder="搜索关键词" v-model="params.key_word" clearable>
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>

                <!--时间-->
                <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                <!--告警类型-->
                <el-select class="s_key s_key_types" v-model="params.category" clearable placeholder="告警类型"  @change="currentSelChange">
                  <el-option v-for="item in options_types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <!--处理状态-->
                <el-select class="s_key" v-model="params.status" clearable placeholder="处理状态"  @change="currentSelChange">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <el-button class="s_btn" @click="submitClick();">搜索</el-button>
                <el-link class="s_link" @click="resetClick();">重置</el-link>
              </el-col>
            </el-row>

            <!--按钮组-->
            <el-row class="common_btn" style="text-align: left;">
              <el-col :span="24" class="common_btn_list">
                <el-dropdown trigger="click" placement='bottom-start' size='148'>
                  <el-button type="primary" class="b_btn b_btn_status">
                    <span>状态变更</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                    <el-dropdown-item command="处置中" class="select_item">处置中</el-dropdown-item>
                    <el-dropdown-item command="已忽略" class="select_item">已忽略</el-dropdown-item>
                    <el-dropdown-item command="误报" class="select_item">误报</el-dropdown-item>
                    <el-dropdown-item command="已处置" class="select_item">已处置</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown placement='bottom-start' trigger="click">
                  <el-button type="primary" class="b_btn b_btn_status">
                    <span>工单任务</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                    <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
                    <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

                <el-button type="primary" class="b_btn b_btn_edit">
                  <span>编辑标签</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table ref="multipleTable" class="handle_table"
                  align="center"
                  v-loading="table.loading"
                  :data="table.tableData"
                  tooltip-effect="dark"
                  @selection-change="handleSelChange">
          <el-table-column label="全选" prop="type" width="50">
            <template slot-scope="scope">
              <div class="new_dot" v-show="scope.row.processing_person != null">
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="30">
          </el-table-column>
          <el-table-column label="告警时间" width="150">
            <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
          </el-table-column>
          <el-table-column prop="category" label="告警类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="src_ip" label="源地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="application" label="应用" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="威胁等级">
            <template slot-scope="scope">
              <el-dropdown @command="change_degree" trigger="click" class="degree_box" :class="scope.row.color">
                <el-button type="primary" @click.stop>
                  {{ scope.row.degree }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="['高危',scope.$index,'high']" v-if="scope.row.degree !='高危'">
                    高危
                  </el-dropdown-item>
                  <el-dropdown-item :command="['中危',scope.$index,'mid']" v-if="scope.row.degree !='中危'">
                    中危
                  </el-dropdown-item>
                  <el-dropdown-item :command="['低危',scope.$index,'low']" v-if="scope.row.degree !='低危'">
                    低危
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="detect_engine" label="失陷确定性" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="状态" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.status | dispose }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="handle-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="table.eachPage"
          :total="table.count"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VmHandleProgress from '../vm-handle/vm-handle-progress';
  import VmHandleForm from '../vm-handle/vm-handle-form';

  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: 'handle-outreath',
    data() {
      return {
        progress_data_source5: [],
        progress_data_source5_show:false,
        form_data_threat5:[],
        form_data_threat5_show:false,
        options_types: [
          {
            value: "1",
            label: "恶意程序"
          },
          {
            value: "2",
            label: "漏洞利用"
          },
          {
            value: "3",
            label: "恶意文件通讯"
          },
          {
            value: "4",
            label: "僵尸网络C&C"
          },
          {
            value: "5",
            label: "恶意地址"
          }
        ],
        options_status: [
          {
            value: "1",
            label: "待处理"
          },
          {
            value: "2",
            label: "处置中"
          },
          {
            value: "3",
            label: "已忽略"
          },
          {
            value: "4",
            label: "误报"
          },
          {
            value: "5",
            label: "已处置"
          }
        ],
        params: {
          key_word:"",
          category:"",
          status: "",
          startTime: "",
          endTime: "",
        },
        table: {
          tableData: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 10,
          multipleSelection: [],
          loading:true
        }
      };
    },
    components:{
      VmHandleProgress,
      VmHandleForm,
      VmEmergePicker
    },
    created(){
      this.get_list_source_top5();
      this.get_list_threat_top5();
      this.get_list_threat();
    },
    methods: {
      //外部威脅源top5
      get_list_source_top5() {
        this.$axios.get('/api/yiiapi/outreachthreat/source-top5')
          .then((resp) => {
            let {status, data} = resp.data;
            if (status == 0) {
              this.progress_data_source5 = data;
              this.progress_data_source5_show = true;
            }
          })
      },
      //外部威脅類型top5
      get_list_threat_top5() {
        this.$axios.get('/api/yiiapi/outreachthreat/threat-top5')
          .then((resp) => {
            let {status, data} = resp.data;
            if (status == 0) {
              this.form_data_threat5 = data;
              this.form_data_threat5_show = true;
            }
          })
      },
      //横向威脅列表
      get_list_threat() {
        this.table.loading = true;
        this.$axios.get('/api/yiiapi/outreachthreat/list',{
          params:{
            start_time:this.params.startTime,
            end_time:this.params.endTime,
            degree:'',
            category:this.params.category,
            status:this.params.status,
            key_word:this.params.key_word,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        }).then((resp) => {

          let { status,data } = resp.data;

          let datas = data;

          if(status == 0){

            let {data, count, maxPage,pageNow } = datas;
            this.table.tableData = data;
            this.table.count = count;
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;

            this.table.loading = false;
          }
        })
      },
      //每頁多少條切換
      handleSizeChange(val) {
        console.log(val)
        this.table.eachPage = val;
        this.get_list_threat();
      },
      //頁數點擊切換
      handleCurrentChange(val) {
        this.table.pageNow = val;
        this.get_list_threat();
      },
      //下拉框change切換
      currentSelChange(){
        this.get_list_threat();
      },
      //時間切換
      changeTime(data) {
        this.params.startTime = data[0].valueOf();
        this.params.endTime = data[1].valueOf();
        this.get_list_threat();
      },
      //搜索按鈕點擊事件
      submitClick(){
        this.get_list_threat();
      },
      //重置按鈕點擊事件
      resetClick(){
        this.params = {
          key_word:"",
          category:"",
          status: "",
          startTime: "",
          endTime: "",
        }
        this.get_list_threat();
      },
      /*****************************/
      handleSelChange(val) {
        this.multipleSelection = val;
        console.log("1111");
      },

      //改变告警等级
      change_degree(command) {
        console.log(command);
        this.tableData3.forEach(function(item, index) {
          if (command[1] == index) {
            item.degree = command[0];
            item.color = command[2];
          }
        });
      },
    }
  };
</script>

<style scoped lang="less">
  @import "../../../../assets/css/less/invest-common-pattern.less";
  @import "../../../../assets/css/less/invest-common-table-pattern.less";
  .handle-outreath{
    padding: 24px;
    .outside-top{
      display: flex;
      .ost{
        height: 302px;
        border-radius: 4px;
        background-color: #fff;
        padding: 24px;
        .ost-title{
          font-size: 16px;
          color: #333;
          font-weight: bold;
          text-align: left;
          font-family: PingFangSC-Medium;
        }
        &.ost-1{
          width: 1221px;
          margin-right: 24px;
          .ost-progress{
            margin-top: 16px;
          }
        }
        &.ost-2{
          flex: 1;
          .ost-emerge{
            height: 100%;
          }
        }
      }
    }
    .outside-middle{
      margin: 24px 0;
      height: 283px;
      background-color: #fff;
      text-align: left;
      .osm-top{
        height: 62px;
        line-height: 62px;
        border-bottom: 1px solid #ECECEC;
        margin: 0 24px;
        .osm-img{
          display: inline-block;
          width: 24px;
          height: 24px;
          margin: 19px 0;
        }
        .osm-title{
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          margin-left: 6px;
        }
      }
      .osm-middle{
        height: 220px;
        padding: 16px 24px;
        .osm-dt{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          margin: 5px 0;
        }
        .osm-dd{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
        }

      }
    }
    .outside-bottom{
      background-color: #fff;
      height: 885px;
      padding: 12px 0;
      margin-bottom: 24px;
      /deep/
      .handle_table {
        .degree_box {
          button {
            height: 30px;
            width: 72px;
            padding: 0;
            border: 0;
          }
        }
        .high {
          button {
            background: #dc5f5f;
          }
        }
        .mid {
          button {
            background: #e0c840;
          }
        }
        .low {
          button {
            background: #47cad9;
          }
        }
        thead {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          th {
            background: #f8f8f8;
            border: 0 !important;
          }
        }
        th:nth-child(1) {
          .cell {
            padding: 0;
            text-align: right;
            font-size: 14px;
            color: #999999;
          }
        }
        tbody {
          td {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
          }
        }
        .el-table-column--selection {
          .cell {
            padding: 0 !important;
            text-align: center;
          }
          .select_all {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
          }
        }
        .new_dot {
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: #ff5f5c;
          float: right;
        }
      }
      /deep/
      .handle-pagination{
        margin: 20px 0;
      }
    }
  }
</style>

