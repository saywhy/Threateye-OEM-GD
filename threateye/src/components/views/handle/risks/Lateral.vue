<template>
  <div class="handle-lateral" v-cloak>
    <div class="outside-top">
      <div class="ost ost-1">
        <div class="ost-title">发起横向威胁资产 Top5</div>
        <div class="ost-progress">
          <vm-handle-progress></vm-handle-progress>
        </div>
      </div>
      <div class="ost ost-2">
        <div class="ost-title">横向威胁类型 Top5</div>
        <div class="ost-emerge">
          <vm-handle-form></vm-handle-form>
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
          <dd class="osm-dd">横向威胁是指攻击者为了了解所处的网络环境或者找到网络内的目标而实施的内网的扫描、暴力破解、漏洞利用、远程账号登录、远程程序以及命令执行等动作。</dd>
        </dl>
        <dl>
          <dt class="osm-dt">安全建议</dt>
          <dd class="osm-dd">
            <ul>
              <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
              <li>2、部署带有静态分析、动态分析、漏洞防御、主机防火墙、主机IPS等多重防御功能的端点安全解决方案；</li>
              <li>3、采用端点检测和响应解决方案（EDR）大力提升在端点上的威胁检测和响应的能力，包括合法账号的异常登录、系统自带或者管理员使用的工具的非法使用等；</li>
              <li>4、部署东西向流量的网络威胁检测和响应解决方案。</li>
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
                <el-input class="s_key" placeholder="搜索关键词" v-model="params_1.handle_key" clearable>
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>

                <!--时间-->
                <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                <!--告警类型-->
                <el-select class="s_key s_key_types" v-model="params_1.handle_types" clearable placeholder="告警类型">
                  <el-option v-for="item in options_types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <!--处理状态-->
                <el-select class="s_key" v-model="params_1.handle_status" clearable placeholder="处理状态">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <el-button class="s_btn">搜索</el-button>
                <el-link class="s_link">重置</el-link>
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
                  align="center" :data="table1Data"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column label="全选" prop="type" width="50">
            <template slot-scope="scope">
              <div class="new_dot" v-show="scope.row.type=='new'">
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="30">
          </el-table-column>
          <el-table-column label="告警时间" width="150">
            <template slot-scope="scope">{{ scope.row.date }}</template>
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
          <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          class="handle-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="10"
          :total="20"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
        <!--<el-tabs v-model="activeName" @tab-click="handleClick">
          &lt;!&ndash;网络风险视角&ndash;&gt;
          <el-tab-pane label="网络风险视角" name="first">

          </el-tab-pane>

          &lt;!&ndash;端点风险视角&ndash;&gt;
          <el-tab-pane label="端点风险视角" name="second">
            <div class="invest_form invest_form_network">
              <el-form class="common-pattern">
                <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
                  <el-col :span="24" class="common_box_list">

                    &lt;!&ndash;搜索关键词&ndash;&gt;
                    <el-input class="s_key" placeholder="搜索关键词" v-model="params_2.handle_key" clearable>
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>

                    &lt;!&ndash;时间&ndash;&gt;
                    <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                    &lt;!&ndash;告警类型&ndash;&gt;
                    <el-select class="s_key s_key_types" v-model="params_2.handle_types" clearable placeholder="告警类型">
                      <el-option v-for="item in options_types" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>

                    &lt;!&ndash;处理状态&ndash;&gt;
                    <el-select class="s_key" v-model="params_2.handle_status" clearable placeholder="处理状态">
                      <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>

                    <el-button class="s_btn">搜索</el-button>
                    <el-link class="s_link">重置</el-link>
                  </el-col>
                </el-row>

                &lt;!&ndash;按钮组&ndash;&gt;
                <el-row class="common_btn" style="text-align: left;">
                  <el-col :span="24" class="common_btn_list">
                    <el-dropdown trigger="click" placement='bottom-start' size='148'>
                      <el-button type="primary" class="b_btn b_btn_status">
                        <span>状态变更</span>
                        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
                        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
                      align="center" :data="table2Data"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column label="全选" prop="type" width="50">
                <template slot-scope="scope">
                  <div class="new_dot" v-show="scope.row.type=='new'">
                  </div>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="30">
              </el-table-column>
              <el-table-column label="告警时间" width="150">
                <template slot-scope="scope">{{ scope.row.date }}</template>
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
                      <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
              <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination
              class="handle-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              :total="20"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>

          </el-tab-pane>

          &lt;!&ndash;日志风险视角&ndash;&gt;
          <el-tab-pane label="日志风险视角" name="third">
            <div class="invest_form invest_form_network">
              <el-form class="common-pattern">
                <el-row class="common_box" style="padding-bottom:16px;border-bottom: 1px solid #ECECEC;">
                  <el-col :span="24" class="common_box_list">

                    &lt;!&ndash;搜索关键词&ndash;&gt;
                    <el-input class="s_key" placeholder="搜索关键词" v-model="params_3.handle_key" clearable>
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>

                    &lt;!&ndash;时间&ndash;&gt;
                    <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                    &lt;!&ndash;告警类型&ndash;&gt;
                    <el-select class="s_key s_key_types" v-model="params_3.handle_types" clearable placeholder="告警类型">
                      <el-option v-for="item in options_types" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>

                    &lt;!&ndash;处理状态&ndash;&gt;
                    <el-select class="s_key" v-model="params_3.handle_status" clearable placeholder="处理状态">
                      <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>

                    <el-button class="s_btn">搜索</el-button>
                    <el-link class="s_link">重置</el-link>
                  </el-col>
                </el-row>

                &lt;!&ndash;按钮组&ndash;&gt;
                <el-row class="common_btn" style="text-align: left;">
                  <el-col :span="24" class="common_btn_list">
                    <el-dropdown trigger="click" placement='bottom-start' size='148'>
                      <el-button type="primary" class="b_btn b_btn_status">
                        <span>状态变更</span>
                        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
                        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
                      align="center" :data="table3Data"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column label="全选" prop="type" width="50">
                <template slot-scope="scope">
                  <div class="new_dot" v-show="scope.row.type=='new'">
                  </div>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="30">
              </el-table-column>
              <el-table-column label="告警时间" width="150">
                <template slot-scope="scope">{{ scope.row.date }}</template>
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
                      <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
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
              <el-table-column prop="fall" label="失陷确定性" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination
              class="handle-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              :total="20"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VmHandleProgress from '../vm-handle/vm-handle-progress';
  import VmHandleForm from '../vm-handle/vm-handle-form';

  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: 'handle-lateral',
    data() {
      return {
        activeName: 'first',
        loading_net:true,
        loading_point:true,
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
        params_1: {
          handle_key:"",
          handle_types:"",
          handle_status: "",
          startTime: "",
          endTime: "",
        },
        table1_data: {
          count: 102,
          maxPage: 11,
          pageNow: 1
        },
        table1Data: [
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "低危",
            color: "low",
            fall: "— —",
            status: "待处置"
          },
          {
            type: "new",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "中危",
            color: "mid",
            fall: "— —",
            status: "待处置"
          },
          {
            type: "old",
            date: "2019.11.08 15:33:24",
            category: "恶意地址",
            indicator: "223.17.229.272",
            src_ip: "192.166.1.156",
            dest_ip: "223.17.229.272",
            application: "http",
            degree: "低危",
            color: "low",
            fall: "— —",
            status: "待处置"
          }
        ]
      };
    },
    components:{
      VmHandleProgress,
      VmHandleForm,
      VmEmergePicker
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      changeTime(data) {
        this.params_net.startTime = data[0].valueOf();
        this.params_net.endTime = data[1].valueOf();
      },
      /*****************************/
      handleSelectionChange(val) {
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
  .handle-lateral{
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

