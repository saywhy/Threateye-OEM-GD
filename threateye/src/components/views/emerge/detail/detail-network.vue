<template>
  <div class="detail-network"
       v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="detail_base">
      <div class="detail_base_top">
        <div class="top_left">
          <img src="@/assets/images/emerge/top1.png"
               alt="">
          <img src="@/assets/images/emerge/top2.png"
               alt="">
          <img src="@/assets/images/emerge/top3.png"
               alt="">
        </div>
        <div class="top_right">
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
                              class="dropdown_ul_box_detail">
              <el-dropdown-item command='3'
                                class="select_item">已忽略</el-dropdown-item>
              <el-dropdown-item command="4"
                                class="select_item">误报</el-dropdown-item>
              <el-dropdown-item command="2"
                                class="select_item">已处置</el-dropdown-item>
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
                              class="dropdown_ul_box_detail">
              <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
              <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button class="edit_btn"
                     @click="edit_tag_box">编辑标签</el-button>
        </div>
      </div>
      <div class="detail_base_bottom">
        <div class="detail_base_bottom_item">
          <ul>
            <li class="item_li">
              <span class="item_li_title">源地址:</span>
              <el-dropdown @command="change_state_src"
                           trigger="click"
                           placement='bottom-start'
                           size='148'>
                <el-button class="change_src_btn">
                  <span>{{network_detail.src_ip}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  class="dropdown_ul_box_detail">
                  <el-dropdown-item command='1'
                                    class="select_item">威胁追查</el-dropdown-item>
                  <el-dropdown-item command="2"
                                    class="select_item">添加到外部动态列表</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="item_li">
              <span class="item_li_title">目的地址:</span>
              <span class="item_li_content"> {{network_detail.dest_ip}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">源标签:</span>
              <div class="item_li_content">
                <ul v-if="network_detail.src_label_obj.length !=0">
                  <li class="tag_btn_box"
                      v-for="item in network_detail.src_label_obj">
                    <span class="tag_btn">{{item}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item_li">
              <span class="item_li_title">目的标签:</span>
              <div class="item_li_content">
                <ul v-if="network_detail.dest_label_obj.length !=0">
                  <li class="tag_btn_box"
                      v-for="item in network_detail.dest_label_obj">
                    <span class="tag_btn">{{item}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item_li">
              <span class="item_li_title">告警时间:</span>
              <span class="item_li_content">{{network_detail.alert_time}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">威胁指标:</span>
              <span class="item_li_content">{{network_detail.indicator}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">告警类型:</span>
              <span class="item_li_content">{{network_detail.category}}</span>
            </li>
          </ul>
        </div>
        <div class="detail_base_bottom_item">
          <ul>
            <li class="item_li">
              <span class="item_li_title">应用:</span>
              <span class="item_li_content">{{network_detail.application}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">检测引擎:</span>
              <span class="item_li_content">{{network_detail.detect_engine}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">失陷确定性:</span>
              <span class="item_li_content">{{network_detail.fall_certainty == '0'?'未知':'已失陷'}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">标签:</span>
              <div class="item_li_content">
                <ul v-if="network_detail.label_obj.length !=0">
                  <li class="tag_btn_box"
                      v-for="item in network_detail.label_obj">
                    <span class="tag_btn">{{item}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item_li">
              <span class="item_li_title">攻击阶段:</span>
              <span class="item_li_content">{{network_times[0].attack_stage_cn}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">工单名称:</span>
              <span class="item_li_content">{{network_detail.job_name}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">工单状态:</span>
              <span class="item_li_content">{{network_detail.status_cn}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 检测时间轴 -->
    <div class="detail_time_box">
      <p class="time_title">检测时间轴</p>
      <div class="time_content">
        <div class="time_left">
          <ul class="time_left_list">
            <li class="time_item"
                v-for="(item,index) in network_times"
                @click="time_active(index)"
                :class="{active:time_choose==index}">
              <div class="triangle"
                   v-show="time_choose==index"></div>
              <div class="time_item_left">
                <img src="@/assets/images/emerge/time_false.png"
                     v-show="time_choose!=index">
                <img src="@/assets/images/emerge/time_true.png"
                     v-show="time_choose==index">
              </div>
              <div class="time_item_right">
                <p>{{item.alert_time}} </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="time_right">
          <div v-for="(item,index) in network_times"
               v-show="time_choose==index">
            <p class="title">详细信息</p>
            <div class="time_right_info">
              <div class="time_right_info_top">
                <li class="info_top_item">
                  <span class="info_top_item_title">检测引擎</span>
                  <span class="info_top_item_content">{{item.detect_engine}}</span>
                </li>
                <li class="info_top_item">
                  <span class="info_top_item_title">情报类型</span>
                  <span class="info_top_item_content">{{item.description_type}}</span>
                </li>
                <li class="info_top_item"
                    v-for="value in item.info_list">
                  <span class="info_top_item_title">{{value.name}}</span>
                  <span class="info_top_item_content"
                        :class="value.value=='点击下载'?'download_text':''"
                        @click="download(value,item)">{{value.value}}</span>
                </li>
              </div>
              <div class="time_right_info_bom"
                   v-if="item.whois_list.length !=0">
                <span class="info_bom_title">Whois信息:</span>
                <div class="info_bom_item">
                  <div class="info_bom_item_li"
                       v-for="demo in item.whois_list">
                    <div class="left_li">{{demo.name}}</div>
                    <div class="right_li">{{demo.value}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p class="title">网络事件</p>
            <div class="time_right_net">
              <div class="time_right_net_item"
                   v-for="demo in item.event_list">
                <div class="title_net">{{demo.name}}</div>
                <div class="value_net">{{demo.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 攻击阶段 -->
    <div class="attack_stage_box">
      <div class="detail_base_top">
        <img src="@/assets/images/emerge/detai_attack.png"
             alt=""
             class="icon_img">
        <span class="attack_stage_title">攻击阶段分布</span>
      </div>
      <div class="attack_stage_bom">
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[0].count>1">
            {{attack_stage_list[0].count}}
          </span>
          <span :class="attack_stage_list[0].count>0?'count_color':''">初始访问</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[1].count>1">
            {{attack_stage_list[1].count}}
          </span>
          <span :class="attack_stage_list[1].count>0?'count_color':''">执行</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[2].count>1">
            {{attack_stage_list[2].count}}
          </span>
          <span :class="attack_stage_list[2].count>0?'count_color':''">持久化</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[3].count>1">
            {{attack_stage_list[3].count}}
          </span>
          <span :class="attack_stage_list[3].count>0?'count_color':''">提权</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[4].count>1">
            {{attack_stage_list[4].count}}
          </span>
          <span :class="attack_stage_list[4].count>0?'count_color':''">防御逃逸</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[5].count>1">
            {{attack_stage_list[5].count}}
          </span>
          <span :class="attack_stage_list[5].count>0?'count_color':''">凭证访问</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[6].count>1">
            {{attack_stage_list[6].count}}
          </span>
          <span :class="attack_stage_list[6].count>0?'count_color':''">信息发现</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[7].count>1">
            {{attack_stage_list[7].count}}
          </span>
          <span :class="attack_stage_list[7].count>0?'count_color':''">横向移动</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[8].count>1">
            {{attack_stage_list[8].count}}
          </span>
          <span :class="attack_stage_list[8].count>0?'count_color':''">信息收集</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[9].count>1">
            {{attack_stage_list[9].count}}
          </span>
          <span :class="attack_stage_list[9].count>0?'count_color':''">命令控制</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[10].count>1">
            {{attack_stage_list[10].count}}
          </span>
          <span :class="attack_stage_list[10].count>0?'count_color':''">信息泄露</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span class="circle_box"
                v-if="attack_stage_list[11].count>1">
            {{attack_stage_list[11].count}}
          </span>
          <span :class="attack_stage_list[11].count>0?'count_color':''">毁坏</span>
        </div>
      </div>
    </div>
    <!-- 威胁及安全建议 -->
    <div class="suggest_box">
      <div class="suggest_top">
        <img src="@/assets/images/emerge/detal_jianyi.png"
             alt=""
             class="icon_img">
        <span class="suggest_title">威胁及安全建议</span>
      </div>
      <div class="suggest_bom">
        <p class="suggest_bom_title">威胁描述</p>
        <p class="suggest_bom_des">{{suggest_list[network_detail.safety_suggestion].des}}</p>
        <p class="suggest_bom_title">安全建议</p>
        <p class="suggest_bom_list">
          <img src="@/assets/images/emerge/detail_suggest.png"
               class="suggest_icon"
               alt="">
          <span>处置建议</span>
        </p>
        <div>
          <p v-for="item in suggest_list[network_detail.safety_suggestion].handle">
            {{item}}
          </p>
        </div>
        <p class="suggest_bom_list">
          <img src="@/assets/images/emerge/detail_suggest.png"
               class="suggest_icon"
               alt="">
          <span>加固建议</span>
        </p>
        <div>
          <p v-for="item in suggest_list[network_detail.safety_suggestion].reinforce">
            {{item}}
          </p>
        </div>
      </div>
    </div>
    <!-- 告警列表 -->
    <div class="emerge_box">
      <el-tabs v-model="emerge_list.activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="当前受威胁资产"
                     class="tabs-item"
                     name="first">
          <el-table class="emerge_table"
                    ref="multipleTable"
                    align="center"
                    :data="emerge_list.now.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column prop="alert_time"
                             label="时间"
                             show-overflow-tooltip>
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
            <el-table-column prop="degree"
                             label="告警等级">
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange_now"
                         @current-change="handleCurrentChange_now"
                         :current-page="emerge_list.now.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="emerge_list.now.count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="历史受威胁资产"
                     class="tabs-item"
                     name="second">
          <el-table class="emerge_table"
                    ref="multipleTable"
                    align="center"
                    :data="emerge_list.old.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column prop="alert_time"
                             label="时间"
                             show-overflow-tooltip>
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
            <el-table-column prop="degree"
                             label="告警等级">
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange_old"
                         @current-change="handleCurrentChange_old"
                         :current-page="emerge_list.old.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="emerge_list.old.count">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑标签 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="edit_tag.pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_tag_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑标签</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_addrs"
               v-for="(item,index) in edit_tag.tag_list">
            <el-input class="select_box"
                      placeholder="请输入标签"
                      v-model="item.name"
                      clearable>
            </el-input>
            <img src="@/assets/images/common/add.png"
                 alt=""
                 class="img_box"
                 v-if="item.icon"
                 @click="add_tag">
            <img src="@/assets/images/common/del.png"
                 alt=""
                 class="img_box"
                 @click="del_tag(item,index)"
                 v-if="!item.icon">
          </div>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_tag_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="edit_tag_true">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: "detail-network",
  data () {
    return {
      attack_stage_list: [
        {
          name: "Initial Access",
          value: "初始访问",
          count: 0
        },
        {
          name: "Execution",
          value: "执行",
          count: 0
        },
        {
          name: "Persistence",
          value: "持久化",
          count: 0
        },
        {
          name: "Privilege Escalation",
          value: "提权",
          count: 0
        },
        {
          name: "Defense Evasion",
          value: "防御逃逸",
          count: 0
        },
        {
          name: "Credential Access",
          value: "凭证访问",
          count: 0
        },
        {
          name: "Discovery",
          value: "信息发现",
          count: 0
        },
        {
          name: "Lateral Movement",
          value: "横向移动",
          count: 0
        },
        {
          name: "Collection",
          value: "信息收集",
          count: 0
        },
        {
          name: "Command and Control",
          value: "命令控制",
          count: 0
        },
        {
          name: "Exfiltration",
          value: "信息泄露",
          count: 0
        },
        {
          name: "Impact",
          value: "毁坏",
          count: 0
        },
      ],
      suggest_list: [
        {
          des: '',
          handle: [],
          reinforce: [],
        },
        {
          name: '恶意文件通讯	',
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
      // attack_stage
      network_detail: {
        attack_stage_cn: '',
        label_obj: [],
        src_label_obj: [],
        dest_label_obj: [],
      },
      title_name: "告警详情",
      network_times: [],
      network_list: {
        new_list: {
          handle: {
            page: 1,
            rows: 10
          }
        },
        old_list: {
          handle: {
            page: 1,
            rows: 10
          }
        },
      },
      time_choose: 0,
      emerge_list: {
        title: ["当前告警资产", "历史告警资产"],
        activeName: "first",
        choose: 0,
        now_data: {
          page: 1,
          rows: 10
        },
        old_data: {
          page: 1,
          rows: 10
        },
        now: {},
        old: {}
      },
      src_active_ul: false,
      edit_tag: {
        tag_list: [
        ],
        pop: false
      }
    };
  },
  components: {
    backTitle
  },
  mounted () {
    this.get_data();

  },
  methods: {
    // 获取数据
    get_data () {
      console.log(this.$route.query.detail);
      this.$axios.get('/api/yiiapi/alert/alert-details', {
        params: {
          id: this.$route.query.detail
        }
      })
        .then(response => {
          console.log(response.data.data);
          this.network_detail = response.data.data
          this.network_detail.attack_stage_cn = ''
          // this.network_detail.label_obj = []
          // this.network_detail.src_label_obj = []
          // this.network_detail.dest_label_obj = []
          this.network_detail.src_label_obj = JSON.parse(this.network_detail.src_label)
          this.network_detail.dest_label_obj = JSON.parse(this.network_detail.dest_label)

          if (!this.network_detail.label) {
            this.network_detail.label_obj = []
          } else {
            this.network_detail.label_obj = JSON.parse(this.network_detail.label)
          }


          // 工单状态
          switch (this.network_detail.status) {
            case 1:
              this.network_detail.status_cn = '待分配'
              break;
            case 2:
              this.network_detail.status_cn = '已分配'
              break;
            case 3:
              this.network_detail.status_cn = '处置中'
              break;
            case 4:
              this.network_detail.status_cn = '已取消'
              break;
            case 5:
              this.network_detail.status_cn = '已处置'
              break;
            default:
              break;
          }
          this.network_times = [];
          this.network_times.push(this.network_detail)
          if (this.network_detail.alarm_merger.length != 0) {
            this.network_detail.alarm_merger.forEach(item => {
              item.attack_stage_cn = ''
              this.network_times.push(item)
            });
          }
          console.log(this.network_times);
          // 匹配告警类型
          this.network_times.forEach(item => {
            item.info_list = []
            item.whois_list = [];
            item.event_list = [];
            if (item.alert_description.whois) {
              for (let key in item.alert_description.whois) {
                var obj = {
                  name: key,
                  value: item.alert_description.whois[key],
                }
                item.whois_list.push(obj)
              }
            } else if (item.alert_description.ip_whois) {
              for (let key in item.alert_description.ip_whois) {
                var obj = {
                  name: key,
                  value: item.alert_description.ip_whois[key],
                }
                item.whois_list.push(obj)

              }
            }
            // 情报类型匹配
            switch (item.description_type) {
              case 'BotnetCAndCURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: '主要受影响地区',
                    value: item.alert_description.geo
                  },
                ];
              case 'RansomwareURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: 'IP',
                    value: item.alert_description.IP
                  },
                ];
                break;
              case 'IPReputation':
                item.info_list = [
                  {
                    name: 'IP',
                    value: item.alert_description.ip
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: '主要受影响地区',
                    value: item.alert_description.geo
                  },
                  {
                    name: '相关联域名',
                    value: item.alert_description.domains
                  },
                ];
                break;
              case 'MaliciousHash':
                item.info_list = [
                  {
                    name: 'MD5',
                    value: item.alert_description.MD5
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.SHA256
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '文件类型',
                    value: item.alert_description.file_type
                  },
                  {
                    name: '常见文件名',
                    value: item.alert_description.file_name
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "样本下载IP地址",
                    value: item.alert_description.IP,
                  },
                ];
                break;
              case 'MaliciousURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "相关联恶意文件",
                    value: item.alert_description.file,
                  },
                ];
                break;
              case 'PhishingURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "被钓鱼IP",
                    value: item.alert_description.IP,
                  },
                ];
                break;
              case 'MobileMaliciousHash':
                item.info_list = [
                  {
                    name: 'MD5',
                    value: item.alert_description.MD5
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.SHA256
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                ];
                break;
              case 'sdk':
                item.info_list = [
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '文件名',
                    value: item.alert_description.file_name
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '文件哈希值',
                    value: item.alert_description.md5
                  },
                  {
                    name: 'SDK检测威胁',
                    value: item.alert_description.threat
                  },
                ];
                break;
              case 'sandbox':
                item.info_list = [
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '文件名',
                    value: item.alert_description.filename
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.size
                  },
                  {
                    name: '文件类型',
                    value: item.alert_description.type
                  },
                  {
                    name: 'MD5',
                    value: item.alert_description.md5
                  },
                  {
                    name: 'SHA1',
                    value: item.alert_description.sha1
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.sha256
                  },
                  {
                    name: 'taskID',
                    value: item.alert_description.taskID
                  },
                ];
                break;
              case 'yara':
                item.info_list = [
                  {
                    name: "文件名",
                    value: item.alert_description.file_name,
                  },
                  {
                    name: "文件大小",
                    value: item.alert_description.file_size,
                  },
                  {
                    name: "文件哈希值",
                    value: item.alert_description.md5,
                  },
                  {
                    name: "Yara规则名称",
                    value: item.alert_description.rule_name,
                  },
                ];
                break;
              case 'IDS':
                item.info_list = [
                  {
                    name: "告警类型",
                    value: item.alert_description.category,
                  },
                  {
                    name: "告警描述",
                    value: item.alert_description.threat,
                  },
                  {
                    name: "PayLoad信息",
                    value: "点击下载",
                  },
                ];
                break;
              default:
                break;
            }
            // 网络事件匹配
            switch (item.network_event.event_type) {
              case 'fileinfo':
                switch (item.network_event.app_proto) {
                  case 'smtp':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'smtp' },
                    ]
                    break;
                  case 'http':
                    item.event_list = [
                      { name: 'Method', value: item.network_event.http.http_method },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.http.url },
                      { name: 'User Agent', value: item.network_event.http.http_user_agent },
                      { name: 'Referrer', value: item.network_event.http.http_refer },
                      { name: 'Traffic', value: 'http' },
                    ]
                    break;
                  case 'ftp-data':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'User', value: '-' },
                      { name: 'Traffic', value: 'FTP' },
                    ]
                    break;
                  case 'imap':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'imap' },
                    ]
                    break;
                  case 'pop3':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'pop3' },
                    ]
                    break;
                  case 'smb':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + item.network_event.dest_port },
                      { name: 'Domain', value: '-' },
                      { name: 'User', value: '-' },
                      { name: 'Traffic', value: 'smb' },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
                break;
              case 'flow':
                switch (item.network_event.app_proto) {
                  case 'ftp':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'User', value: item.network_event.user },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
                break
              case 'smb':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Domain', value: '-' },
                  { name: 'User', value: '-' },
                  { name: 'Traffic', value: item.network_event.event_type },
                ]
                break
              case 'ssh':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Tool', value: item.network_event.ssh.client.software_version },
                  { name: 'User', value: '-' },
                  { name: 'Traffic', value: item.network_event.event_type },
                ]
                break
              case 'tls':
                if (item.network_event.tls.subject) {
                  item.network_event.tls.Authorizing = item.network_event.tls.subject.substring(
                    item.network_event.tls.subject.indexOf("CN=") + 3
                  );
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'URL', value: item.network_event.tls.sni },
                  { name: 'Issuerdn', value: item.network_event.tls.issuerdn },
                  { name: 'Authorizing', value: item.network_event.tls.Authorizing },
                  { name: 'Notafter', value: item.network_event.tls.notafter },
                  { name: 'Traffic', value: 'https' },
                ]
                break
              case 'dns':
                if (item.network_event.dns.grouped) {
                  item.network_event.dns.HostAddr = item.network_event.dns.grouped.join(
                    ","
                  );
                }
                if (item.network_event.dns.answers) {
                  item.network_event.dns.answers.forEach(element => {
                    if (item.network_event.dns.rrname == element.rrname) {
                      item.network_event.dns.ttl = element.ttl;
                      item.network_event.dns.rrtype = element.rrtype;
                    }
                  });
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + item.network_event.dest_port },
                  { name: 'SectianType', value: item.network_event.dns.rrtype },
                  { name: 'Domain', value: item.network_event.dns.rrname },
                  { name: 'TTL', value: item.network_event.dns.HostAddr },
                  { name: 'Traffic', value: 'dns' },
                ]
                break
              case 'krb5':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Msg_type', value: item.network_event.krb5.msg_type },
                  { name: 'Cname', value: item.network_event.krb5.cname },
                  { name: 'Realm', value: item.network_event.krb5.realm },
                  { name: 'Sname', value: item.network_event.krb5.sname },
                  { name: 'Traffic', value: 'krb5' },
                ]
                break
              case 'http':
                item.event_list = [
                  { name: 'Method', value: item.network_event.http.http_method },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'URL', value: item.network_event.http.url },
                  { name: 'User Agent', value: item.network_event.http.http_user_agent },
                  { name: 'Referrer', value: item.network_event.http.http_refer },
                  { name: 'Traffic', value: 'http' },
                ]
                break
              case 'alert':
                switch (item.network_event.app_proto) {
                  case 'tls':
                    if (item.network_event.tls.subject) {
                      item.network_event.tls.Authorizing = item.network_event.tls.subject.substring(
                        item.network_event.tls.subject.indexOf("CN=") + 3
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.tls.sni },
                      { name: 'Issuerdn', value: item.network_event.tls.issuerdn },
                      { name: 'Authorizing', value: item.network_event.tls.Authorizing },
                      { name: 'Notafter', value: item.network_event.tls.notafter },
                      { name: 'Traffic', value: 'https' },
                    ]
                    break;
                  case 'http':
                    item.event_list = [
                      { name: 'Method', value: item.network_event.http.http_method },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.http.url },
                      { name: 'User Agent', value: item.network_event.http.http_user_agent },
                      { name: 'Referrer', value: item.network_event.http.http_refer },
                      { name: 'Traffic', value: 'http' },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
              default:
                if (!item.network_event.app_proto) {
                  item.network_event.app_proto = item.network_event.proto
                } else if (item.network_event.app_proto == 'failed') {
                  item.network_event.app_proto = ''
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Traffic', value: item.network_event.app_proto },
                ]
                break;
                break;
            }
          });
          // 攻击阶段
          this.attack_stage_list.forEach(element => {
            element.count = 0;
          });
          this.network_times.forEach(item => {
            console.log(item);
            this.attack_stage_list.forEach(element => {
              if (item.attack_stage == element.name) {
                item.attack_stage_cn = element.value
                element.count = element.count + 1;
              }
            });
          });

          this.new_list();
          this.old_list();
          // this.network_times.push(item_obj)
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 下载payload
    download (value, item) {
      if (value.value == "点击下载" && value.name == "PayLoad信息") {
        var funDownload = function (content, filename) {
          // 创建隐藏的可下载链接
          var eleLink = document.createElement("a");
          eleLink.download = filename;
          eleLink.style.display = "none";
          // 字符内容转变成blob地址
          var blob = new Blob([content]);
          eleLink.href = URL.createObjectURL(blob);
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        };
        funDownload(item.network_event.payload, "payload.dat");
      }
      if (value.value == "点击下载" && value.name == '文件下载') {
        window.open('/api/yiiapi/alert/get-file?md5=' + value.md5);
      }
    },
    // 当前受威胁资产
    new_list () {
      this.$axios.get('/api/yiiapi/alert/get-same-indicator-alert', {
        params: {
          indicator: this.network_detail.indicator,
          is_deal: 0,
          page: this.emerge_list.now_data.page,
          rows: this.emerge_list.now_data.rows,
        }
      })
        .then(response => {
          let { status, data } = response.data;
          this.emerge_list.now = data
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleSizeChange_now (val) {
      this.emerge_list.now_data.rows = val;
      this.new_list();
    },
    handleCurrentChange_now (val) {
      this.emerge_list.now_data.page = val;
      this.new_list();
    },
    // 历史受威胁资产
    old_list () {
      this.$axios.get('/api/yiiapi/alert/get-same-indicator-alert', {
        params: {
          indicator: this.network_detail.indicator,
          is_deal: 2,
          page: this.emerge_list.old_data.page,
          rows: this.emerge_list.old_data.rows
        }
      })
        .then(response => {
          let { status, data } = response.data;
          this.emerge_list.old = data
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleSizeChange_old (val) {
      this.emerge_list.old_data.rows = val;
      this.old_list();
    },
    handleCurrentChange_old (val) {
      this.emerge_list.old_data.page = val;
      this.old_list();
    },

    // 状态变更
    change_state (item) {
      console.log(item);
      var id_list = []
      id_list.push(this.$route.query.detail)
      this.$axios.put('/api/yiiapi/alert/do-alarm', {
        id: id_list,
        status: item
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          if (status == 0) {
            this.$message(
              {
                message: '修改状态成功',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 编辑标签
    edit_tag_box () {
      this.edit_tag.tag_list = [];
      console.log(this.network_detail.label_obj);
      if (this.network_detail.label_obj.length == 0) {
        this.edit_tag.tag_list.push({ name: '', icon: true })
      } else {
        this.network_detail.label_obj.forEach(element => {
          var obj = {
            name: element,
            icon: false
          }
          this.edit_tag.tag_list.push(obj)
        });
        this.edit_tag.tag_list[this.edit_tag.tag_list.length - 1].icon = true
      }
      this.edit_tag.pop = true
    },
    edit_tag_true () {
      console.log(this.edit_tag.tag_list);
      // /alert/label-edit
      var label_list = [];
      this.edit_tag.tag_list.forEach(element => {
        if (element.name != '') {
          label_list.push(element.name)
        }
      });
      this.$axios.put('/api/yiiapi/alert/label-edit', {
        id: this.$route.query.detail,
        label: label_list
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          if (status == 0) {
            this.$message(
              {
                message: '修改标签成功',
                type: 'success',
              }
            );
            this.edit_tag.pop = false;
            this.get_data()
          } else {
            this.$message(
              {
                message: data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })



    },
    closed_edit_tag_box () {
      this.edit_tag.pop = false
    },
    //  添加标签
    add_tag () {
      this.edit_tag.tag_list.forEach(item => {
        item.icon = false;
      });
      this.edit_tag.tag_list.push({ name: '', icon: true })
    },
    del_tag (item, index) {
      this.edit_tag.tag_list.splice(index, 1);
    },

    // 加入外部链接
    change_state_src (item) {
      console.log(item);
    },




    change_task () { },
    time_active (index) {
      console.log("111");
      this.time_choose = index;
    },
    emerge_list_active (index) {
      this.emerge_list.choose = index;
    },
    src_active () {
      console.log("111");
      this.src_active_ul = !this.src_active_ul;
    },
    src_active_item (num) {
      this.src_active_ul = false;
      console.log(num);
    },
    handleSelectionChange () { },
    handleClick (tab, event) {
      console.log(tab);
    }
  }
};
</script>

<style scoped lang="less">
.detail-network {
  background: #f8f8f8;
  //   基础信息
  .detail_base {
    // height: 323px;
    background: #fff;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .top_left {
        float: left;
        line-height: 62px;
        img {
          vertical-align: middle;
        }
      }
      .top_right {
        float: right;
        line-height: 62px;
        .change_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #0070ff;
        }
        .edit_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #fff;
          border: 1px solid #0070ff;
          color: #0070ff;
        }
      }
    }
    .detail_base_bottom {
      // height: 260px;
      padding: 24px 56px;
      display: flex;
      .detail_base_bottom_item {
        text-align: left;
        flex: 1;
        .change_src_btn {
          background: none;
          border: none;
          padding: 0;
        }
        .item_li {
          display: flex;
          height: 22px;
          margin-bottom: 16px;
          position: relative;
          .src_ul {
            width: 180px;
            padding: 10px 0;
            background: #fff;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);
            position: absolute;
            left: 96px;
            top: 22px;
            z-index: 99;
            li {
              height: 32px;
              line-height: 32px;
              padding: 0 12px;
              cursor: pointer;
            }
            li:hover {
              background: #eef6ff;
            }
          }
          .item_li_title {
            width: 96px;
            font-size: 16px;
            color: #333333;
          }
          .item_li_content {
            flex: 1;
            font-size: 16px;
            color: #666;
            .tag_btn_box {
              margin: 0 2px;
              display: inline-block;
              height: 20px;
              padding: 0 3px;
              border-radius: 2px;
              color: #ffffff;
              background: #5389e0;
              text-align: center;
            }
            .tag_btn {
              height: 20px;
              font-size: 10px;
              line-height: 20px;
              font-family: PingFangSC-Regular;
              transform: scale(0.8);
              display: block;
            }
          }
          .src_active {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #0070ff;
            cursor: pointer;
          }
        }
      }
    }
  }
  //   检测时间轴
  .detail_time_box {
    // min-height: 716px;
    padding: 36px 56px;
    .time_title {
      height: 22px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      margin-bottom: 12px;
      text-align: left;
    }
    .time_content {
      display: flex;
      .time_left {
        width: 180px;
        float: left;
        background: #fff;
        margin: 0;
        ul.time_left_list {
          width: 180px;
          // height: 610px;
          background: #fff;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 0;
          &.time_left_list::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
            z-index: 0;
          }
          &.time_left_list::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background: #fff;
          }
          &.time_left_list::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 10px;
            background: #ededed;
          }
        }
        .time_item {
          z-index: 999;
          height: 60px;
          width: 95%;
          display: flex;
          position: relative;
          cursor: pointer;
          .time_item_left {
            width: 52px;
            padding: 20px 0;
          }
          .time_item_right {
            flex: 1;
            padding: 10px 0;
            text-align: left;
          }
        }
        .time_item.active {
          background: #0070ff;
          color: #fff;
        }
        .time_item.active:after {
          content: '';
          display: block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid #0070ff;
          position: absolute;
          top: 20px;
          right: -8px;
          z-index: 999;
        }
      }
      .time_right {
        flex: 1;
        // overflow: hidden;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 18px;
        // height: 610px;
        background: #fff;
        .title {
          height: 42px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          border-bottom: 1px solid #ececec;
          line-height: 42px;
          text-align: left;
          padding: 0 24px;
        }
        .time_right_info {
          padding-left: 24px;
          .download_text {
            color: #0070ff !important;
            cursor: pointer;
            text-decoration: underline;
          }
          .time_right_info_top {
            overflow-y: auto;
            border-bottom: 1px solid #ececec;
            padding-top: 16px;
            .info_top_item {
              // height: 22px;
              margin-bottom: 16px;
              width: 50%;
              float: left;
              text-align: left;
              display: flex;
              .info_top_item_title {
                width: 150px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
              }
              .info_top_item_content {
                flex: 1;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #666666;
              }
            }
          }
          .time_right_info_bom {
            padding: 16px 0;
            text-align: left;
            display: flex;
            .info_bom_title {
              width: 150px;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #333333;
            }
            .info_bom_item {
              flex: 1;
              display: flex;
              flex-direction: column;
              .info_bom_item_li {
                margin-bottom: 12px;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                .left_li {
                  width: 200px;
                }
                .right_li {
                  flex: 1;
                  flex-wrap: wrap;
                  justify-content: flex-start;
                  align-items: flex-start;
                }
              }
            }
          }
        }
        .time_right_net {
          margin: 16px 24px;
          border-bottom: 1px solid #ececec;
          display: flex;
          .time_right_net_item {
            flex: 1;
            width: 0;
            // display: flex;
            // flex-direction: column;
            // flex-wrap: wrap;
            // justify-content: flex-start;
            .title_net {
              height: 42px;
              text-align: left;
              background: #f8f8f8;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #333333;
              line-height: 42px;
              padding: 0 10px;
            }
            .value_net {
              min-height: 42px;
              word-wrap: break-word;
              word-break: break-all;
              overflow: hidden;
              font-size: 14px;
              color: #333333;
              text-align: left;
              padding: 10px;
            }
          }
        }
      }
    }
  }
  // 攻击阶段
  .attack_stage_box {
    text-align: left;
    // height: 171px;
    background: #fff;
    margin-bottom: 24px;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .attack_stage_title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        line-height: 62px;
      }
      .icon_img {
        width: 24px;
        vertical-align: middle;
      }
    }
    .attack_stage_bom {
      height: 108px;
      padding: 30px 56px;
      display: flex;
      justify-content: space-between;
      .stage_item_box {
        width: 104px;
        height: 48px;
        line-height: 48px;
        background: #eef6ff;
        border-radius: 2px;
        font-size: 16px;
        color: #aaaaaa;
        text-align: center;
        position: relative;
        .circle_box {
          display: block;
          font-size: 12px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.24);
          width: 18px;
          height: 18px;
          line-height: 18px;
          color: #fff;
          border-radius: 18px;
          background: #ff5f5c;
          position: absolute;
          top: -9px;
          right: -9px;
        }
      }
      .count_color {
        color: #0070ff;
      }
      .stage_img_box {
        flex: 1;
        margin: 0 5px;
        height: 48px;
        line-height: 48px;
        img {
          margin-top: 12px;
          width: 100%;
          height: 24px;
        }
      }
    }
  }
  // 威胁安全建议
  .suggest_box {
    text-align: left;
    background: #fff;
    margin-bottom: 24px;
    .suggest_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .suggest_title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        line-height: 62px;
      }
      .icon_img {
        width: 24px;
        vertical-align: middle;
      }
    }
    .suggest_bom {
      padding: 16px 56px;
      .suggest_icon {
        width: 13px;
        height: 6px;
        vertical-align: middle;
      }
      .suggest_bom_title {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
      }
      .suggest_bom_des {
        margin: 8px 0 24px 0;
      }
      .suggest_bom_list {
        margin: 12px 0 8px 0;
      }
    }
  }

  //   告警列表
  .emerge_box {
    padding: 24px 56px;
    background: #fff;
    .pagination_box {
      margin-top: 24px;
    }
    .emerge_table {
      .el-table th.is-leaf {
        border-bottom: 1px solid #fff;
      }
      .el-table {
        th {
          .cell {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
          }
        }
      }

      th > .cell {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
      }
      .el-table__row {
        height: 42px;
      }
    }
  }
}
</style>
<style lang="less">
@import '../../../../assets/css/less/reset_css/reset_tab.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
.dropdown_ul_box_detail {
  width: 124px;
  top: 209px !important;
  .el-dropdown-menu__item:hover {
    color: #606266;
  }
}
// tab栏
.emerge_table {
  th {
    .cell {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }
  td {
    .cell {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
  }
}
.detail-network {
  // 弹窗编辑标签
  .el-dialog {
    width: 440px;
    .el-dialog__body {
      width: 440px;
      .content {
        padding: 24px 0;
        .content_item {
          margin-bottom: 24px;
          .item_addrs {
            margin-bottom: 12px;
            display: flex;
          }
          .img_box {
            width: 16px;
            height: 16px;
            margin-left: 10px;
            margin-top: 14px;
            cursor: pointer;
          }
          .title {
            font-size: 12px;
            color: #999999;
          }
          .title_color {
            color: #ff5f5c;
          }
          .select_box {
            width: 100%;
            height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
          }
        }
      }
    }
  }
}
</style>