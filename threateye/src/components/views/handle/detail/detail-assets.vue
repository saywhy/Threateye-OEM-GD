<template>
  <div class="detail-assets"
       v-cloak>
    <back-title :title-name="title_name"></back-title>

    <div class="detail_base_top">
      <div class="top_left">
        <img src="@/assets/images/handle/others/detail_a_1.png"
             alt="">
        <span class="top_left_title">{{detail.asset_ip}}</span>
      </div>
      <div class="top_right">
        <!--按钮组-->
        <el-row class="common_btn">
          <el-col :span="24"
                  class="common_btn_list">
            <el-dropdown @command="change_state"
                         trigger="click"
                         placement='bottom-start'
                         size='148'>
              <el-button type="primary"
                         class="change_btn">
                <span>状态变更</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown"
                                class="dropdown_ul_box">
                <el-dropdown-item command="处置中"
                                  class="select_item">处置中</el-dropdown-item>
                <el-dropdown-item command="已处置"
                                  class="select_item">已处置</el-dropdown-item>
                <el-dropdown-item command="已忽略"
                                  class="select_item">已忽略</el-dropdown-item>
                <el-dropdown-item command="误报"
                                  class="select_item">误报</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="change_task"
                         placement='bottom-start'
                         trigger="click">
              <el-button type="primary"
                         class="change_btn">
                <span>工单任务</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown"
                                class="dropdown_ul_box">
                <el-dropdown-item command="编辑工单">编辑工单</el-dropdown-item>
                <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div style="clear:both;"></div>
    </div>

    <div class="detail_base_mid">
      <div class="bom_item">
        <li>
          <span class="title">
            <i class="b_i b_name"></i>失陷确定性：</span>
          <span class="content">{{assets_top.fall_certainty | certainty}}</span>
        </li>
        <li>
          <span class="title">
            <i class="b_i"></i>威胁等级：</span>
          <span class="content">{{assets_top.degree | degree}}</span>
        </li>
        <li>
          <span class="title">
            <i class="b_i"></i>资产类型：</span>
          <span class="content">{{assets_top.new_base_category}}</span>
        </li>
        <li>
          <span class="title">
            <i class="b_i"></i>分支：</span>
          <span class="content">
            <span class="c_it" v-for="(it,$idx) in assets_top.new_branch" :key="$idx">{{it}}</span>
          </span>
        </li>
      </div>
      <div class="bom_item">
        <li>
          <span class="title">部门：</span>
          <span class="content">
            <span class="c_it" v-for="(it,$idx) in assets_top.new_department" :key="$idx">{{it}}</span>
          </span>
        </li>
        <li>
          <span class="title">业务：</span>
          <span class="content">
            <span class="c_it" v-for="(it,$idx) in assets_top.new_business" :key="$idx">{{it}}</span>
          </span>
        </li>
        <li>
          <span class="title">工单名称：</span>
          <span class="content">{{assets_top.workorder_name}}</span>
        </li>
        <li>
          <span class="title">工单状态：</span>
          <span class="content">{{assets_top.workorder_status | risk_status}}</span>
        </li>
      </div>
    </div>

    <!--攻击阶段分布-->
    <div class="detail_base_stg">
      <div class="top_left">
        <img class="b_img"
             src="@/assets/images/handle/others/detail_a_1.png" />
        <span class="title_name">告警日志信息</span>
      </div>
      <div class="stg-content">
        <vm-hanle-rank></vm-hanle-rank>
      </div>
    </div>

    <!--威胁及安全建议-->
    <div class="detail_base_mag">
      <div class="osm-top">
        <img class="osm-img"
             src="@/assets/images/handle/risks/edit.png">
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

    <!-- tabs列表 -->
    <div class="detail_base_bom">

      <el-tabs v-model="activeName">
        <!-- 网络风险视角 -->
        <el-tab-pane label="网络风险视角"
                     class="tabs-item"
                     name="first">
          <el-table class="handle_table_detail"
                    ref="multipleTable"
                    align="center"
                    :data="table.tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
            <el-table-column label="告警时间"
                             width="150">
              <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
            </el-table-column>
            <el-table-column prop="category"
                             label="告警类型"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="indicator"
                             label="威胁指标"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="src_ip"
                             label="源地址"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dest_ip"
                             label="目的地址"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="application"
                             label="应用"
                             show-overflow-tooltip>
            </el-table-column>
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
            <el-table-column label="状态" width="80">
              <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
            </el-table-column>
          </el-table>
          <el-pagination class="handle_pagination_box"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="table.count"
                         :page-sizes="[10,20,50,100]"
                         :page-size="table.eachPage"
                         :current-page="table.pageNow"
                         layout="total, sizes, prev, pager, next">
          </el-pagination>
        </el-tab-pane>

      </el-tabs>
    </div>

    <!-- 弹窗 -->
    <!-- 状态变更 -->
    <el-dialog class="pop_state_box"
               width='480px'
               :modal-append-to-body="false"
               :visible.sync="state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_state"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">状态变更</span>
      </div>
      <div class="content">
        <p class="content_p"
           style="font-size:0">
          <span style="font-size:14px">是否将</span>
          <span style="font-size:14px">{{detail.asset_ip}}</span>
          <span style="font-size:14px">项状态变更为“</span>
          <span style="font-size:14px">{{process_state}}</span>
          <span style="font-size:14px">”?</span>
        </p>
      </div>
      <div class="btn_box">
        <el-button @click="cancel_state"
                   class="cancel_btn">取消</el-button>
        <el-button @click="ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <!-- 工单任务 -->
    <el-dialog class="task_new_box"
               width='840px'
               :modal-append-to-body="false"
               :visible.sync="task.new">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_task_new"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑工单</span>
      </div>
      <div class="step_box">
        <div class="step_box1">
          <span class="step1_span"
                :class="task.new_contet?'step_now':'step_past'">基本信息</span>
          <img src="@/assets/images/emerge/selected01.png"
               class="selected_img"
               alt="">
        </div>
        <div class="step_box2">
          <span class="step2_span"
                :class="!task.new_contet?'step_now':'step_past'">处置内容</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="task_new_content" v-if="task.new_contet">
        <div class="task_content_box">
          <div class="content_top">
            <div class="content_top_left">
              <li class="left_item">
                <div class="title">
                  <span>工单名称</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-input class="task_new_input"
                          placeholder="请输入工单名称"
                          v-model="task_params.name"
                          clearable>
                </el-input>
              </li>
              <li class="left_item">
                <div class="title">
                  <span>经办人</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input"
                           v-model="task_params.operator"
                           clearable
                           placeholder="请选择经办人">
                  <el-option v-for="item in task_new.operator_list"
                             @click.native="select_changced(item)"
                             :key="item.id"
                             :label="item.username"
                             :value="item.username">
                  </el-option>
                </el-select>
              </li>
            </div>
            <div class="content_top_right">
              <li class="right_item">
                <div class="title">
                  <span>优先级</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input"
                           v-model="task_params.level"
                           clearable
                           placeholder="请选择优先级">
                  <el-option v-for="item in task_new.level_list"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li class="right_item">
                <el-checkbox-group v-model="task_params.notice">
                  <el-checkbox label="email"
                               value="email">邮件通知</el-checkbox>
                  <el-checkbox label="message"
                               value="message">短信通知</el-checkbox>
                 <!-- <el-checkbox label="news"
                               value="news">消息中心通知</el-checkbox>-->
                </el-checkbox-group>
              </li>
            </div>
          </div>
          <div class="content_remarks">
            <p class="title">备注</p>
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="task_params.textarea">
            </el-input>
          </div>
          <div class="content_table">
            <el-table :data="table_operator.tableData"
                      style="width: 100%">
              <el-table-column prop="username"
                               label="经办人"></el-table-column>
              <el-table-column prop="department"
                               label="部门"></el-table-column>
              <el-table-column prop="email_addr"
                               label="邮箱"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="next_task_new"
                     class="next_btn">下一步</el-button>
        </div>
      </div>

      <!-- 处置内容 -->
      <div class="task_handle_content" v-if="!task.new_contet">
        <div class="task_content_box">
          <div class='table_box'>
            <ul class="table_box_title">
              <li v-for="(tab,index) in handle.table_title"
                  @click="table_btn_toggle(index)"
                  :class="{active:handle.active==index}">
                {{tab}}
              </li>
            </ul>
            <div>
              <div v-show="handle.active == 0">
                <el-table align="center"
                          :data="table_assets.tableData_new"
                          tooltip-effect="dark"
                          style="width: 100%"
                          @selection-change="handle_sel_table_assets">
                  <el-table-column label="全选"
                                   width="40"></el-table-column>
                  <el-table-column align='left'
                                   type="selection"
                                   width="30"></el-table-column>
                  <el-table-column prop="asset_ip"
                                   label="资产"></el-table-column>
                  <!--<el-table-column prop="label_group" label="资产组"  min-width="120" show-overflow-tooltip></el-table-column>-->
                  <el-table-column label="资产组"  min-width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <div>
                        <span v-for="(it,$idx) in scope.row.label" :key="$idx" class="a_label">{{it}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="category_group"
                                   label="关联威胁"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column label="威胁等级">
                    <template slot-scope="scope">{{ scope.row.degree | degree }}</template>
                  </el-table-column>
                  <!--<el-table-column label="失陷确定性">
                    <template slot-scope="scope">
                      <span class="fall_certainty">{{ scope.row.fall_certainty | certainty }}</span>
                    </template>
                  </el-table-column>-->
                  <el-table-column label="状态"
                                   width="80">
                    <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                  </el-table-column>
                </el-table>
                <el-pagination class="pagination_box"
                               @current-change="hcc_table_assets"
                               :page-sizes="[5]"
                               :page-size="5"
                               :current-page="table_assets.pageNow"
                               :total="table_assets.count"
                               layout="total, sizes, prev, pager, next">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="prev_task_handle"
                     class="prev_btn">上一步</el-button>
          <el-button @click="prev_task_handle_assign"
                     class="prev_btn">分配</el-button>
          <el-button @click="prev_task_handle_save"
                     class="prev_btn">保存</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <!-- 添加到工单 -->
    <el-dialog class="pop_state_add"
               width='960px'
               :modal-append-to-body="false"
               :visible.sync="add_state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="add_closed_state"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加到工单</span>
      </div>
      <div class="content">
        <el-row class="common-table-pattern">
          <el-col :span="24">
            <el-table class="common-table"
                      highlight-current-row
                      v-loading="table_add_works.loading"
                      :data="table_add_works.tableData"
                      @current-change="handle_sel_table_add_works">
              <el-table-column label="单选"
                               width="40">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="name"
                               label="工单名称"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="creator"
                               label="创建人"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="优先级"
                               width="120">
                <template slot-scope="scope">{{ scope.row.priority | priority }}</template>
              </el-table-column>
              <el-table-column prop="new_perator"
                               label="经办人"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="状态"
                               width="80"
                               show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" class="e-pagination">
            <el-pagination class="handle-pagination"
                           @current-change="hcc_table_add_works"
                           :page-sizes="[10,20,50,100]"
                           :page-size="table_add_works.eachPage"
                           :total="table_add_works.count"
                           :current-page="table_add_works.pageNow"
                           layout="total, sizes, prev, pager, next">
            </el-pagination>
          </el-col>
        </el-row>
      </div>
      <div class="btn_box">
        <el-button @click="add_closed_state"
                   class="cancel_btn">取消</el-button>
        <el-button @click="add_ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
import VmHanleRank from '../vm-handle/vm-handle-rank'
export default {
  name: "detail-assets",
  components: { backTitle, VmHanleRank },
  data () {
    return {
      detail: {},
      title_name: "风险资产详情",
      activeName: 'first',
      assets_top: {},
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: [],
        loading: true
      },

      //弹窗部分
      state_change: false,
      process_state: "",

      //工单任务
      task: {
        new: false,
        new_contet: true
      },
      task_params: {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: []
      },
      task_new: {
        level_list: [
          {
            value: "highest",
            label: "最高"
          },
          {
            value: "high",
            label: "高"
          },
          {
            value: "midium",
            label: "中"
          },
          {
            value: "low",
            label: "低"
          }
        ],
        operator_list: [],
      },
      //经办人数组
      table_operator: {
        tableData: [],
        tableData_new: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5
      },
      handle: {
        add: "",
        table_title: ["资产"],
        active: 0
      },
      table_assets: {
        tableData: [],
        tableData_new: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5,
        multipleSelection: []
      },

      //添加到工单
      add_state_change: false,
      table_add_works: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5,
        loading: true
      },
      add_params: {
        name: "",
        level: "",
        operator: [],
        notice: ['email'],
        remarks: "",
        multiple: []
      },

      suggest_list: [
        {
          name: '',
          des: '',
          handle: [],
          reinforce: [],
        },
        {
          name: '恶意文件通讯',
          des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: '广告软件	Adware',
          des: '广告软件是危险性相对较低的恶意软件，但可能会导致更大的威胁发生，所以也需要及时清除。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: '危险工具	graytool',
          des: '危险工具有可能被管理员或者是内部的安全工具所使用，但大部分情况是网络失陷的标志。这些工具有可能用于扫描、信息收集或者是控制，需要看具体工具确定攻击目的。',
          handle: [
            '1、确认是否是管理员或者是安全工具的合法使用；',
            '2、如果不是，需要根据威胁指标的提示做相应的处置。',
          ],
          reinforce: [
            '根据实际使用的危险工具做具体的加固。'
          ],
        },
        {
          name: '漏洞利用	Exploit',
          des: '攻击者利用机器上所装应用或者服务的漏洞进行漏洞利用攻击。在网络流量中检测到这种漏洞利用行为并不一定代表被攻击机器中漏洞利用的成功。',
          handle: [
            '1、在被攻击机器上确认漏洞利用是否成功；',
            '2、如果漏洞利用成功， 隔离该机器并做安全分析',
          ],
          reinforce: [
            '1、对Web应用程序采用WAF减小攻击面；',
            '2、关闭机器上不必要的服务，采用Windows EMET等技术防止漏洞利用；',
            '3、对机器上的应用和服务采用应用隔离、沙箱、以及最小权限等措施减少被攻击后的访问权限；',
            '4、做好网络划分，增加横向移动难度；',
            '5、利用威胁情报以及定期做漏洞扫描发现漏洞，及时打重要漏洞补丁。',
          ],
        },
        {
          name: '其他	Others',
          des: '无',
          handle: ['无'],
          reinforce: ['无'],
        },
        {
          name: 'EICAR	eicar',
          des: 'EICAR是一个用于测试的不具有危害的但防病毒软件会告警的程序。',
          handle: ['不需要处置。'],
          reinforce: ['无'],
        },
        {
          name: 'SQL注入	sqlinjection',
          des: 'SQL注入是攻击者利用数据库设计、开发、缺乏校验等漏洞而导致应用做非设计本意的行为。',
          handle: [
            '1、根据SQL注入脚本确认注入是否成功；',
            '2、由于SQL注入漏洞的不同，注入可以导致不同的结果。根据具体注入脚本的行为做处置。',
          ],
          reinforce: [
            '1、采用WAF等安全设备减小攻击面；',
            '2、对机器上的应用和服务采用应用隔离、沙箱、以及最小权限等措施减少被攻击后的访问权限；',
            '3、定期做漏洞扫描发现漏洞，及时打重要漏洞补丁。',
          ],
        },
        {
          name: '暴力破解	BruteForce',
          des: '攻击者采用大量的猜测的账号和密码组合或者是少量的符合网络密码策略的常用密码(password spraying)尝试登录网络，一旦登录成功，就是合法账号登录，极难再被检测到。常见的被暴力破解攻击的服务包括：SSH (22/TCP)、Telnet (23/TCP)、FTP (21/TCP)、NetBIOS / SMB / Samba (139/TCP & 445/TCP)、LDAP (389/TCP)、Kerberos (88/TCP)、RDP / Terminal Services (3389/TCP)、HTTP/HTTP Management Services (80/TCP & 443/TCP)、MSSQL (1433/TCP)、Oracle (1521/TCP)、MySQL (3306/TCP)、VNC (5900/TCP)。',
          handle: [
            '1、查看被攻击机器的系统登录日志确认是否暴力破解登录成功。如果成功，修改该账号密码；',
            '2、如果是外部威胁，在安全网关上阻止该攻击地址。',
          ],
          reinforce: [
            '1、采用合适的账号锁定策略，在一定数量的失败登录后锁定账号。但这个策略不能制定太严格，避免在攻击的时候造成被攻击的大量账号全部被锁定。对于关键应用，在一定数量的失败登录后要求格外的验证可以有效解决这个问题；',
            '2、采用多因素认证；',
            '3、参考NIST密码策略制定网络密码策略。'
          ],
        },
        {
          name: 'WebShell	WebShell',
          des: 'Web Shell是利用失窃账号或者漏洞而放置在Web服务器上用来和攻击者交互的入口。',
          handle: [
            '1、确认是否成功，如果成功，隔离机器并作清除、扫描和安全分析；',
            '2、重点关注是否有横向移动的痕迹。',
          ],
          reinforce: [
            '1、根据根因分析结果打补丁或者修改账号密码；',
            '2、管理Web服务器的账号需要和内网的账号做区分。',
          ],
        },
        {
          name: "扫描	Scan",
          des: '攻击者通过扫描发现运行在机器上的服务，包括可能存在漏洞的服务。 ',
          handle: [
            '无',
          ],
          reinforce: [
            '1、及时打重大漏洞补丁；',
            '2、禁用不需要的服务；',
            '3、对关键服务，创建访问列表防止未知机器的访问甚至限制远程访问。',
          ],
        },
        {
          name: "恶意程序	malwarefile",
          des: '下载了一个恶意程序到机器里，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
          handle: [
            '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程下载了恶意程序；',
            '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
            '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
            '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
          ],
        },
        {
          name: "恶意地址	malware",
          des: '机器访问了带有恶意程序的地址。',
          handle: [
            '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个恶意地址；',
            '2、安装防病毒软件并且更新到最新做全盘查杀。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、用户安全意识培训提升安全意识。',
          ],
        },
        {
          name: "tor出口节点	tor_exit_node",
          des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
          handle: [
            '1、确认机器的使用者是否合法使用Tor；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止Tor节点地址。',
          ],
        },
        {
          name: "tor入口节点	tor_node",
          des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
          handle: [
            '1、确认机器的使用者是否合法使用Tor；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止Tor节点地址。',
          ],
        },
        {
          name: "垃圾邮件	spam ",
          des: '垃圾邮件本身不具有安全威胁，是不想在网络里出现的信息。',
          handle: [
            '无',
          ],
          reinforce: [
            '通过网络安全设备阻止垃圾邮件地址。',
          ],
        },
        {
          name: '僵尸网络C&C	botc&c ',
          des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: '移动恶意软件	mobilemalware',
          des: '下载了一个恶意程序到机器里，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
          handle: [
            '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程下载了恶意程序；',
            '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
            '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
            '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
          ],
        },
        {
          name: '网络诈骗	fraud',
          des: '通过社交工程等手段引诱用户上当。',
          handle: [
            '1、如果存在金钱损失等情况应及时做相应的应急处理；',
            '2、对机器做扫描和安全分析。',
          ],
          reinforce: [
            '1、考虑用网络安全设备拦截网络诈骗地址；',
            '2、用户通过安全意识培训识别社交工程等手段。',
          ],
        },
        {
          name: '恶意重定向	maliciousredirect',
          des: '通过重定向把用户引入恶意地址。',
          handle: [
            '1、如果存在恶意感染、信息泄露等情况应及时做相应的应急处理；',
            '2、对机器做扫描和安全分析。',
          ],
          reinforce: [
            '1、考虑用网络安全设备拦截恶意重定向地址；',
            '2、用户通过安全意识培训提升安全意识。',
          ],
        },
        {
          name: '网络代理	proxy',
          des: '攻击者用网络代理隐藏攻击来源和加密通讯通道，但也存在部分用户用网络代理保护隐私的情况。',
          handle: [
            '1、确认机器的使用者是否合法使用网络代理；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止网络代理地址。',
          ],
        },
        {
          name: '钓鱼网站	phishing',
          des: '通过社交工程等手段引诱用户点击某个链接、下载文档甚至可执行文件或者输入账号等信息达到窃取信息、利用浏览器漏洞或者植入恶意程序的目的。',
          handle: [
            '1、如果存在账号等信息失窃行为应及时更改账号密码和相应的应急处理；',
            '2、对机器做扫描和安全分析。',
          ],
          reinforce: [
            '1、考虑用网络安全设备拦截钓鱼地址；',
            '2、用户通过安全意识培训识别社交工程等手段。',
          ],
        },
        {
          name: '勒索软件通讯	ransomwareurl',
          des: '该地址用于下载勒索软件或者是跟勒索软件通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、如果是下载了勒索软件，及时清除该软件；',
            '3、如果被勒索软件加密，先搜索安全公司的网站看是否有解密工具。',
          ],
          reinforce: [
            '1、用网络安全设备阻止该地址；',
            '2、安装防病毒软件并且及时更新病毒库。',
          ],
        },
        {
          name: '已知APT攻击',
          des: '本威胁是检测到网络与曾经被APT组织使用过的地址通讯或者是相关工具出现在网络中。',
          handle: [
            '1、确认被检测的威胁指标是否还有效；',
            '2、如果确认有效，需要根据APT组织的相关情报信息做应急响应并做最高优先级处理。',
          ],
          reinforce: [
            '根据该APT组织的战术、技术和流程（TTP）做相应的安全加固。',
          ],
        },
        {
          name: '恶意证书',
          des: '机器里的程序采用恶意的ssl证书跟外界通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
      ],
    };
  },

  created () {

    let asset_ip = this.$route.query.asset_ip;
    let status = this.$route.query.status;
    this.detail.asset_ip = asset_ip;
    this.detail.status = status;

    this.get_list_assets_detail();
    this.get_assets_detail_top();
  },
  methods: {
    //获取资产详情
    get_assets_detail_top () {
      this.$axios.get('/yiiapi/asset/asset-details',
        {
          params: {
            asset_ip: this.detail.asset_ip
          }
        })
        .then((resp) => {

          console.log(resp.data)

          let { status, data } = resp.data;

          if (status == 0) {

            let attr = [];

            attr.push(data);

            this.table_assets.tableData = attr;
            this.table_assets.count = 1;
            this.table_assets.pageNow = 1;

            let base_category = data.label.base_category;

            if (base_category.includes('终端')) {
              data.new_base_category = '终端';
            } else if (base_category.includes('服务器')) {
              data.new_base_category = '终端';
            } else if (base_category.includes('网络设备')) {
              data.new_base_category = '网络设备';
            }

            data.new_branch = data.label.branch;
            data.new_department = data.label.department;
            data.new_business = data.label.business;

            this.assets_top = data;

          }
        });
    },

    //获取资产详情列表
    get_list_assets_detail () {

      this.$axios.get('/yiiapi/asset/alert-list',
        {
          params: {
            asset_ip: this.detail.asset_ip,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        })
        .then((resp) => {

          let { status, data } = resp.data;

          let datas = data;

          if (status == 0) {

            let { data, count, maxPage, pageNow } = datas;

            this.table.tableData = data;
            this.table.count = count;
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;

          }
        });
    },

    //每頁多少條切換
    handleSizeChange (val) {
      this.table.eachPage = val;
      this.table.pageNow = 1;
      this.get_list_assets_detail();
    },

    //頁數點擊切換
    handleCurrentChange (val) {
      this.table.pageNow = val;
      this.get_list_assets_detail();
    },

    /*****************************/

    //改变告警等级
    /*change_degree (command) {
      this.table.tableData.forEach(function (item, index) {
        if (command[1] == index) {
          item.degree = command[0];
          item.color = command[2];
        }
      });
    },*/

    /***********************************以下是弹窗部分****************************************/
    /***********************************以下是弹窗部分****************************************/

    // 状态变更选择
    change_state (command) {
      this.process_state = command;
      this.open_state();
    },

    //工单任务选择
    change_task (command) {
      if (command == "编辑工单") {
        this.open_task_new();
      } else if (command == "添加到工单") {
        this.open_add_new();
      }
    },

    /***************状态变更*****************/
    //打开状态变更弹窗
    open_state () {
      this.state_change = true;
    },

    //关闭状态变更弹窗
    closed_state () {
      this.state_change = false;
    },

    //状态变更取消按钮点击
    cancel_state () {
      this.closed_state();
    },

    //状态变更确定按钮点击
    ok_state () {
      //资产处理
      let asset_ip_group = this.detail.asset_ip;

      //状态设置
      let process = this.process_state;
      let change_status = 0;

      if (process == '已处置') {
        change_status = 3;
      } else if (process == '已忽略') {
        change_status = 4;
      } else if (process == '误报') {
        change_status = 5;
      }

      this.$axios.put('/yiiapi/alert/change-asset-status', {
        asset_ip: [asset_ip_group],
        status: change_status
      })
        .then(resp => {

          let { status, data } = resp.data;

          if (status == 0) {

            this.$message.success('状态变更提交成功！');

          } else {

            this.$message.error('状态变更提交错误。');

          }

          this.closed_state();

        })
        .catch(err => {

          console.log(err);

        })
    },

    /***************工单任务*****************/

    //打开编辑工单
    open_task_new () {

      let status = this.detail.status;

      if (status == '3' || status == '4' || status == '5') {
        this.$message({ message: '资产状态为已处置,已忽略,误报的不能新建', type: 'error' });
      } else {

        let pageNow = this.table_assets.pageNow;

        let handle_data = this.table_assets.tableData.slice((pageNow - 1) * 5, pageNow * 5);

        this.table_assets.tableData_new = handle_data;

        //获取用户列表(经办人使用)
        this.$axios.get('/yiiapi/site/user-list')
          .then(resp => {
            let { status, data } = resp.data;
            if (status == 0) {
              this.task_new.operator_list = data;
            } else {
              this.task_new.operator_list = [];
            }
            this.task.new = true;
            this.task.new_contet = true;
          })
          .catch(err => {
            console.log('用户列表错误');
            console.log(err);
          })
      }

    },

    //关闭编辑工单
    closed_task_new () {
      this.task.new = false;
      this.task_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: []
      };
    },

    //下一步时候验证工单名称，优先级、经办人等参数
    next_task_new () {

      if (this.task_params.name == '') {
        this.$message.error('工单名称不能为空');
      } else if (this.task_params.level == '') {
        this.$message.error('优先级未选择');
      } else if (this.task_params.operator == '') {
        this.$message.error('经办人未选择');
      } else {
        this.task.new_contet = false;
        this.handle.active = 0;
      }
    },

    //上一步
    prev_task_handle () {
      this.task.new_contet = true;
    },

    //经办人change处理
    select_changced (item) {

      let level_list = this.table_operator.tableData;

      let selected_id_attr = level_list.map(x => { return x.id });
      if (selected_id_attr.includes(item.id)) {
        this.$message.error('已存在');
      } else {
        this.table_operator.tableData.unshift(item);
      }

      /*let pageNow = this.table_operator.pageNow;

      let handle_data_operator = this.table_operator.tableData.slice((pageNow - 1) * 5, pageNow * 5);
      this.table_operator.tableData_new = handle_data_operator;*/

      let selected_name_attr = this.table_operator.tableData.map(x => { return x.username });

      this.task_params.new_operator = selected_name_attr;
    },

    //经办人页数点击
    hcc_table_operator (val) {
      this.table_operator.pageNow = val;
    },

    //tabs下第一个table页数点击(资产)
    hcc_table_assets (val) {
      this.table_assets.pageNow = val;
      let handle_data = this.table_assets.tableData.slice((val - 1) * 5, val * 5);
      this.table_assets.tableData_new = handle_data;
    },

    //tab下第一个table多选
    handle_sel_table_assets (val) {
      this.table_assets.multipleSelection = val;
      let selected = val.map(x => { return x.asset_ip });
      this.task_params.multiple = selected;
    },

    //新增工单按钮切换
    table_btn_toggle (index) {
      this.handle.active = index;
    },

    //编辑工单分配
    prev_task_handle_assign () {

      this.$axios.put('/yiiapi/asset/distribution-workorder',
        {
          name: this.task_params.name,
          priority: this.task_params.level,
          perator: this.task_params.new_operator,
          remarks: this.task_params.textarea,
          risk_asset: this.task_params.multiple,
          remind: this.task_params.notice
        })
        .then((resp) => {

          let { status, msg, data } = resp.data;

          if (status == 0) {

            this.$message.success('分配成功');

            //不管成功与否 都需要清除状态，关闭弹窗
            this.task.new = false;
            this.task.new_contet = false;

            this.task_params = {
              name: "",
              level: "",
              operator: "",
              new_operator: [],
              notice: ['email'],
              textarea: "",
              multiple: []
            };

            this.table_operator.tableData = [];

            this.get_assets_detail_top();

          } else if (status == 1) {

            this.$message.error(msg);

          }

        })
        .catch(err => {
          console.log(err);
        });

    },

    //编辑工单保存
    prev_task_handle_save () {

      this.$axios.post('/yiiapi/asset/add-workorder',
        {
          name: this.task_params.name,
          priority: this.task_params.level,
          perator: this.task_params.new_operator,
          remarks: this.task_params.textarea,
          risk_asset: this.task_params.multiple,
          remind: this.task_params.notice
        })
        .then((resp) => {

          let { status, msg, data } = resp.data;

          if (status == 0) {
            this.$message.success('保存成功');

            //不管成功与否 都需要清除状态，关闭弹窗
            this.task.new = false;
            this.task.new_contet = false;

            this.task_params = {
              name: "",
              level: "",
              operator: "",
              new_operator: [],
              notice: ['email'],
              textarea: "",
              multiple: []
            };
            this.table_operator.tableData = [];

            this.get_assets_detail_top();

          } else if (status == 1) {
            this.$message.error(msg);
          }


        })
        .catch(err => {
          console.log(err);
        });
    },

    /***************新加到工单*****************/

    //添加到工单打开
    open_add_new () {
      this.add_open_state();
    },

    //新加到工单打开状态
    add_open_state () {
      let status = this.detail.status;

      if (status == '3' || status == '4' || status == '5') {
        this.$message({ message: '资产状态为已处置,已忽略,误报的不能添加到工单', type: 'error' });
      } else {
        this.add_state_change = true;
        this.get_table_works_list();
      }

    },

    //获取列表
    get_table_works_list () {
      this.$axios.get('/yiiapi/asset/workorder-list', {
        params: {
          page: this.table_add_works.pageNow,
          rows: this.table_add_works.eachPage
        }
      }).then((resp) => {

        let { status, data } = resp.data;

        let datas = data;

        if (status == 0) {

          let { data, count, maxPage, pageNow } = datas;

          data.map(function (v, k) {
            v.new_perator = (JSON.parse(v.perator)).join(',');
            v.checked = false;
          });

          this.table_add_works.tableData = data;
          this.table_add_works.count = count;
          this.table_add_works.maxPage = maxPage;
          this.table_add_works.pageNow = Number(pageNow);
          this.table_add_works.loading = false;

        }
      })
        .catch(err => {
          console.log(err);
        })
    },

    //新加到工单取消状态
    add_closed_state () {
      this.add_state_change = false;
      this.table_add_works.tableData = [];
    },

    //新加工单列表勾选某一条记录
    handle_sel_table_add_works (row) {

      // el-radio单选框,不需要这一步
      if (row != undefined) {

        this.table_add_works.tableData.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id != row.id) {
            item.checked = false;
          }
        });
        this.add_params.id = row.id;
        this.add_params.name = row.name;
        this.add_params.level = row.priority;
        this.add_params.perator = JSON.parse(row.perator);
        this.add_params.remarks = row.remarks;
      }
    },

    //新加到工单确定
    add_ok_state () {

      let selected_attr = this.table_assets.multipleSelection
        .map(x => { return x.asset_ip });

      this.add_params.multiple = selected_attr;

      this.$axios.post('/yiiapi/asset/add-workorder',
        {
          id: this.add_params.id,
          name: this.add_params.name,
          priority: this.add_params.level,
          perator: this.add_params.perator,
          remind: this.add_params.notice,
          remarks: this.add_params.remarks,
          risk_asset: this.add_params.multiple
        })
        .then((resp) => {

          let { status, msg, data } = resp.data;

          if (status == 0) {
            this.$message.success('添加成功');

            //不管成功与否，状态清空
            this.add_params = {
              name: "",
              level: "",
              operator: "",
              new_operator: [],
              notice: ['email'],
              textarea: "",
              multiple: []
            };
            this.add_closed_state();
            this.get_assets_detail_top();

          } else if (status == 1) {
            this.$message.error(msg);
          }


        })
        .catch(err => {
          console.log(err);
        });
    },

    //新加工单列表分页页面切换
    hcc_table_add_works (val) {

      this.table_add_works.pageNow = val;

      this.get_table_works_list();
    }
  }
};
</script>

<style scoped lang="less">
.detail-assets {
  text-align: left;
  .detail_base_top {
    padding: 0 56px;
    height: 62px;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #ececec;
    .top_left {
      float: left;
      margin-top: 12px;
      img {
        vertical-align: middle;
      }
      .top_left_title {
        vertical-align: middle;
        font-family: PingFangMedium;
        font-size: 16px;
        color: #333333;
      }
    }
    .top_right {
      float: right;
      .common_btn {
        margin-top: 10px;
        .common_btn_list {
          font-size: 0;
          /deep/
          .el-dropdown {
            margin-right: 8px;
          }
        }
      }
    }
  }

  .detail_base_mid {
    padding: 24px 56px;
    background: #fff;
    display: flex;
    height: 247px;
    .bom_item {
      flex: 1;
      li {
        display: flex;
        margin-bottom: 16px;
        line-height: 36px;
        .title {
          width: 125px;
          font-family: PingFang;
          font-size: 16px;
          color: #333333;
          .b_i {
            width: 18px;
            height: 18px;
            display: inline-block;
            &.b_name {
              vertical-align: middle;
              background-repeat: no-repeat;
              background-size: 18px;
              background-image: url('../../../../assets/images/handle/others/works-name.png');
            }
          }
        }
        .content {
          flex: 1;
          font-size: 16px;
          color: #666666;
          .c_it{
            padding: 0 2px;
            margin: 0 2px;
            color: #fff;
            background: #5389e0;
            border-radius: 2px;
            font-size: 14px;
          }
          .status {
            background: #eef6ff;
            border-radius: 2px;
            font-size: 10px;
            color: #999999;
            padding: 5px 14px;
          }
        }
      }
    }
  }

  .detail_base_stg {
    margin: 24px 0;
    background: #fff;
    height: 171px;
    .top_left {
      height: 62px;
      line-height: 60px;
      text-align: left;
      padding: 0 56px;
      border-bottom: 1px solid #ececec;
      .b_img {
        vertical-align: middle;
      }
      .title_name {
        vertical-align: middle;
        font-family: PingFangMedium;
        font-size: 16px;
        color: #333333;
      }
    }
    .stg-content {
      margin: 0 56px;
      height: 110px;
      position: relative;
    }
  }

  .detail_base_mag {
    margin: 24px 0;
    height: 283px;
    background-color: #fff;
    text-align: left;
    .osm-top {
      height: 62px;
      line-height: 62px;
      border-bottom: 1px solid #ececec;
      padding: 0 56px;
      .osm-img {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin: 19px 0;
      }
      .osm-title {
        display: inline-block;
        font-family: PingFang;
        font-size: 16px;
        color: #333333;
        margin-left: 6px;
      }
    }
    .osm-middle {
      height: 220px;
      padding: 16px 56px;
      .osm-dt {
        font-family: PingFangMedium;
        font-size: 14px;
        color: #333333;
        margin: 5px 0;
      }
      .osm-dd {
        font-family: PingFang;
        font-size: 14px;
        color: #666666;
      }
    }
  }

  .detail_base_bom {
    margin-top: 24px;
    /*height: 717px;*/
    height: auto;
    background: #fff;
    padding: 24px 56px;

    /deep/
    .handle_table_detail {
      .el-table__header-wrapper {
        .el-table__header {
          thead.has-gutter {
            th {
              background: #f8f8f8;
              height: 48px;
              .cell {
                color: #333;
                font-size: 14px;

              }
            }
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          height: 48px;
        }
        td >
        .cell {
          font-family: PingFangMedium;
          .fall_certainty{
            color: #ff5f5c;
          }
          /*.degree_box {
            button {
              height: 30px;
              width: 72px;
              padding: 0;
              border: 0;
            }
          }*/
          .high {
            color: #dc5f5f;
           /* button {
              background: #dc5f5f;
            }*/
          }
          .mid {
            color: #e0c840;
            /*button {
              background: #e0c840;
            }*/
          }
          .low {
            color: #47cad9;
           /* button {
              background: #47cad9;
            }*/
          }
        }
      }
    }
    .handle_pagination_box {
      margin: 24px 0;
      text-align: center;
    }
    /deep/
    .el-tabs {
      .el-tabs__header {
        .el-tabs__nav-wrap {
          &:after {
            background-color: #eef6ff;
          }
          .el-tabs__nav {
            /*line*/
            .el-tabs__active-bar {
              top: 0 !important;
              width: 164px !important;
              background-color: #0070ff;
              transition: transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
                -webkit-transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
            /*tabs*/
            .el-tabs__item {
              padding: 0 !important;
              width: 164px;
              font-size: 14px;
              color: #bbb;
              text-align: center;
              &.is-active {
                color: #0070ff;
                background: #eef6ff;
              }
            }
          }
        }
      }
    }
  }

  /* 弹窗 */
  /* 状态变更 */
  /deep/ .pop_state_box {
    .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        height: 260px;
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

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
            font-weight: 500;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .content {
          height: 128px;
          padding-top: 48px;
          .content_p {
            text-align: center;
          }
        }

        .btn_box {
          height: 42px;
          text-align: center;
          margin-bottom: 24px;

          .ok_btn {
            width: 136px;
            height: 42px;
            background: #0070ff;
            color: #fff;
          }

          .cancel_btn {
            width: 136px;
            height: 42px;
            border-color: #0070ff;
            background: #fff;
            color: #0070ff;
          }
        }
      }
    }
  }

  // 编辑工单
  /deep/ .task_new_box {
    .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
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

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
            font-weight: 500;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .step_box {
          height: 36px;
          margin: 20px 0 24px 0;
          .step_box1 {
            background-image: url('../../../../assets/images/emerge/step1.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 120px;
            height: 36px;
            float: left;
            position: relative;
            line-height: 36px;
            text-align: center;

            .step1_span {
              font-size: 14px;
            }

            .selected_img {
              position: absolute;
              left: 0;
              top: 0;
            }
          }

          .step_box2 {
            width: 120px;
            height: 36px;
            background-image: url('../../../../assets/images/emerge/step2.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            float: left;
            position: relative;
            line-height: 36px;
            text-align: center;
            margin-left: -10px;

            .step2_span {
              font-size: 14px;
            }
          }

          .step_now {
            color: #0070ff;
          }

          .step_past {
            color: #999999;
          }
        }

        .task_new_content {
          /*height: 480px;*/
          .task_content_box {
            height: 400px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
              border-radius: 6px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 6px;
              background: #a8a8a8;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 6px;
              background: #f4f4f4;
            }

            .content_top {
              overflow: hidden;
              .content_top_left {
                float: left;
                width: 45%;

                .left_item {
                  margin-bottom: 16px;
                  display: flex;

                  .title {
                    width: 100px;
                    line-height: 38px;

                    .improtant_ico {
                      color: #ff3a36;
                    }
                  }

                  .task_new_input {
                    flex: 1;

                    .el-input__inner {
                      height: 38px;
                    }
                  }
                }
              }

              .content_top_right {
                float: right;
                width: 45%;

                .right_item {
                  margin-bottom: 16px;
                  display: flex;

                  .title {
                    width: 100px;
                    line-height: 38px;

                    .improtant_ico {
                      color: #ff3a36;
                    }
                  }

                  .task_new_input {
                    flex: 1;

                    .el-input__inner {
                      height: 38px;
                    }
                  }
                }
              }
            }

            .content_remarks {
              .title {
                font-size: 12px;
                color: #999999;
              }

              /deep/
              .el-textarea{
                height: 92px;
                textarea {
                  resize: none;
                  height: 92px;
                  font-size: 14px;
                  color: #333;
                  font-family: PingFang;
                }
              }
              .el-textarea__inner:hover {
                border: none;
              }

              .el-textarea__inner {
                border: none;
                background: #f8f8f8;
              }
            }

            .content_table {
              margin-top: 16px;

              /deep/
              .el-table td {
                padding: 0;
                height: 32px;
              }
              /deep/
              .el-table th {
                padding: 0;
                height: 36px;
                background: #f8f8f8;
                .cell{
                }
              }

              /deep/
              .el-pagination {
                margin-top: 20px;
                text-align: center;
              }
            }
          }

          .btn_box {
            margin-top: 36px;
            margin-bottom: 24px;
            height: 42px;
            text-align: center;

            .cancel_btn {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }

            .next_btn {
              background-color: #0070ff;
              color: #fff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }
          }
        }

        .task_handle_content {
          .handle_content_top {
            height: 42px;
            text-align: left;
            .change_btn,
            .ref {
              background-color: #0070ff;
              border-color: #0070ff;
              width: 136px;
              height: 42px;
              color: #fff;
            }

            .cel {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              margin-left: 0;
            }
          }

          .table_box {
            margin-top: 24px;

            .table_box_title {
              height: 38px;
              li {
                height: 38px;
                width: 92px;
                float: left;
                font-size: 14px;
                line-height: 38px;
                color: #bbbbbb;
                text-align: center;
                border-top: 2px solid #fff;
              }

              li.active {
                cursor: pointer;
                background: #eef6ff;
                color: #0070ff;
                border-top: 2px solid #0070ff;
              }
            }
            /deep/ .el-table {
              font-size: 12px;
              thead.has-gutter {
                th {
                  color: #333333;
                  background: #f8f8f8;
                  .cell {
                  }
                }
              }
              .cell {
                color: #333333;
              }
            }

            /deep/ .el-pagination {
              margin-top: 20px;
              text-align: center;
            }
          }

          .btn_box {
            margin-top: 36px;
            margin-bottom: 24px;
            height: 42px;
            text-align: center;

            .cancel_btn {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }

            .prev_btn {
              background-color: #0070ff;
              color: #fff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }

  //添加到工单
  /deep/ .pop_state_add {
    .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        max-height: 640px;
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

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
            font-weight: 500;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .content {
          padding-top: 48px;
        }

        .btn_box {
          height: 42px;
          text-align: center;
          margin-bottom: 24px;
          margin-top: 36px;

          .ok_btn {
            width: 136px;
            height: 42px;
            background: #0070ff;
            color: #fff;
          }

          .cancel_btn {
            width: 136px;
            height: 42px;
            border-color: #0070ff;
            background: #fff;
            color: #0070ff;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.dropdown_ul_box {
  width: 136px !important;
  margin-right: 8px;
}
</style>




