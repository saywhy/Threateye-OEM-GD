<template>
  <div id="Network"
       v-cloak>
    <div class="e_line"
         v-loading="e_line.loading">
      <p class="title">实时告警监测</p>
      <vm-emerge-line :data='echarts_data'
                      v-if="e_line.data_show"></vm-emerge-line>
    </div>

    <!--告警-->
    <div class="alert_risk">
      <el-form class="common-pattern">
        <h3 class="title">告警监测</h3>
        <el-row class="common_box"
                style="padding: 15px 0;">
          <el-col :span="24"
                  class="common_box_list">
            <!--搜索关键词-->
            <el-input class="s_key"
                      placeholder="搜索关键词"
                      v-model="params.key"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <!--时间-->
            <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

            <!--失陷确定性-->
            <el-select class="s_key s_key_types"
                       v-model="params.threat"
                       clearable
                       placeholder="失陷确定性"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_threat"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <!--处理状态-->
            <el-select class="s_key"
                       v-model="params.status"
                       clearable
                       placeholder="处理状态"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_status"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <el-button class="s_btn"
                       @click="submitClick();">搜索</el-button>
            <el-link class="s_link"
                     @click="resetClick();">重置</el-link>
          </el-col>
        </el-row>

        <vue-handle-work :multipleSelection="table.multipleSelection"
         @updateData="updateDataTable" @clearSel="clearSelection"></vue-handle-work>

        <el-button class="edit_btn_out"
                   @click="export_box">导出</el-button>
      </el-form>
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table ref="multipleTable"
                    class="common-table"
                    v-loading="table.loading"
                    :data="table.tableData"
                    :row-style="{cursor:'pointer'}"
                    tooltip-effect="dark"
                    @selection-change="handleSelChange"
                    @row-click="detail_click">
            <el-table-column label="全选"
                             prop="type"
                             width="40">
              <template slot-scope="scope">
                <div class="new_dot"
                     v-show="scope.row.new_alert=='1'"></div>
              </template>
            </el-table-column>
            <el-table-column type="selection"
                             width="40"></el-table-column>
            <el-table-column label="告警时间"
                             width="180"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
            </el-table-column>
            <el-table-column prop="category"
                             label="告警类型"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="indicator"
                             label="威胁指标"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="src_ip"
                             label="源地址"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="dest_ip"
                             label="目的地址"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="application"
                             label="应用"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="威胁等级">
              <template slot-scope="scope">
                <span :class="{'high':scope.row.degree =='高','mid':scope.row.degree =='中','low':scope.row.degree =='低'}">
                  {{ scope.row.degree | degree_sino }}</span>
              </template>
            </el-table-column>
            <el-table-column label="失陷确定性">
              <template slot-scope="scope">
                <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                  {{ scope.row.fall_certainty | certainty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态"
                             width="80">
              <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination class="handle-pagination"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10, 20, 50, 100]"
                         :page-size="table.eachPage"
                         :current-page="table.pageNow"
                         :total="table.count"
                         layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
import vmEmergeLine from "./vm-emerge/vm-emerge-line";
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import VueHandleWork from "@/components/common/vue-handle-work";
export default {
  name: "Network",
  components: {
    vmEmergeLine,
    vmEmergePicker,
    VueHandleWork
  },
  data () {
    return {
      echarts_data: {},
      e_line: {
        loading: true,
        data_show: false,
      },
      picker_data: {
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      params: {
        key: "",
        threat: "",
        status: "",
        startTime: '',
        endTime: ''
      },
      options_threat: [
        {
          value: "1",
          label: "已失陷"
        }
      ],
      options_status: [
        {
          value: "0",
          label: "新告警"
        },
        {
          value: "1",
          label: "待处置"
        },
        {
          value: "2",
          label: "处置中"
        },
        {
          value: "3",
          label: "已处置"
        },
        {
          value: "4",
          label: "已忽略"
        },
        {
          value: "5",
          label: "误报"
        }
      ],
      edit_tag: {
        tag_list: [],
        pop: false
      },
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: [],
        loading: true
      }
    };
  },
  mounted () {
    //this.get_echarts();
    this.get_list_risk();
  },
  methods: {
    // 获取折现图表
    get_echarts () {
      this.$axios.get('/yiiapi/alert/alert-trend')
        .then(response => {
          this.e_line.loading = false;
          this.e_line.data_show = true;
          this.echarts_data = response.data.data;
        })
        .catch(error => {
          console.log(error);
        })
    },

    // 获取告警列表
    get_list_risk () {
      this.table.loading = true;
      let params_alert = {
        threat: ''
      };

      if (this.params.threat == 1) {
        params_alert.threat = 1;
      }

      this.$axios.get('/yiiapi/alert/list', {
        params: {
          start_time: this.params.startTime,
          end_time: this.params.endTime,
          key_word: this.params.key,
          fall_certainty: params_alert.threat,
          status: this.params.status,
          degree: "",
          page: this.table.pageNow,
          rows: this.table.eachPage,
        }
      }).then(resp => {

        this.table.loading = false;

        let { status, data } = resp.data;
        let datas = data;

        if (status == 0) {

          let { data, count, maxPage, pageNow } = datas;

          this.table.tableData = data;
          this.table.count = count;
          this.table.maxPage = maxPage;
          this.table.pageNow = pageNow;
          //console.log(data)
        }
      })
        .catch(error => {
          console.log(error);
        })
    },

    changeTime (data) {
      this.params.startTime = data[0].valueOf() / 1000;
      this.params.endTime = data[1].valueOf() / 1000;
    },

    //搜索按鈕點擊事件
    submitClick () {
      this.get_list_risk();
    },

    //重置按鈕點擊事件
    resetClick () {
      this.params = {
        key: "",
        threat: "",
        status: "",
        startTime: '',
        endTime: ''
      };
      this.get_list_risk();
    },

    //每頁多少條切換
    handleSizeChange (val) {
      this.table.eachPage = val;
      this.table.pageNow = 1;
      this.get_list_risk();
    },

    //頁數點擊切換
    handleCurrentChange (val) {
      this.table.pageNow = val;
      this.get_list_risk();
    },

    //多选获取选中数据
    handleSelChange (val) {
      this.table.multipleSelection = val;
    },

    //进入详情页面
    detail_click (val) {
      this.$router.push({ path: "/detail/network", query: { detail: val.id, type: 'alert' } });
    },

    /***********************************以下是弹窗部分****************************************/

    //清空选中状态
    clearSelection(){
      this.$refs.multipleTable.clearSelection();
    },
    //更新table数据
    updateDataTable(){
      this.get_list_risk();
    },

    /***************************导出*****************************/
    //导出
    export_box () {
      let that = this;
      this.$confirm('是否确定导出告警列表?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        var url1 = "/yiiapi/alert/export-alerts?status=" + this.params.status + '&start_time=' + this.params.startTime;
        +'&end_time=' + this.params.endTime + '&fall_certainty=' + this.params.threat + '&key_word=' + this.params.key;
        window.location.href = url1;

      }).catch(() => {

        this.$message({ type: 'info', message: '已取消导出' });

        this.$refs.multipleTable.clearSelection();
      });
    }
  }
};
</script>

<style scoped lang="less">
@import '../../../assets/css/less/common-pattern.less';
@import '../../../assets/css/less/common-table-pattern.less';
#Network {
  text-align: left;
  padding: 24px;
  .e_line {
    height: 322px;
    background: #ffffff;
    border-radius: 4px;
    position: relative;
    .title {
      text-align: left;
      font-size: 18px;
      color: #333;
      position: absolute;
      top: 12px;
      left: 24px;
    }
  }
  .alert_risk {
    border-radius: 4px;
    margin-top: 20px;
    padding: 20px 24px;
    height: auto;
    background: #fff;
    text-align: left;
    /deep/
    .edit_btn_out{
      height: 42px;
      width: 124px;
      padding: 0;
      background: #fff;
      border: 1px solid #0070ff;
      color: #0070ff;
      display: inline-block;
      vertical-align: top;
      margin: 20px 0 20px 2px;
    }
  }
}
</style>
