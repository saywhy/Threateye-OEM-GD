<template>
  <div class="vm-handle-works"
       v-cloak
       v-loading.fullscreen.lock="handle.save">
    <div class="invest_form invest_form_network">
      <el-form class="common-pattern">
        <el-row class="common_box">
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

            <!--优先级-->
            <el-select class="s_key s_key_types"
                       v-model="params.priority"
                       clearable
                       placeholder="优先级">
              <el-option v-for="item in options_priority"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <!--处理状态-->
            <el-select class="s_key"
                       v-model="params.status"
                       clearable
                       placeholder="处理状态">
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

        <!--按钮组-->
        <el-row class="common_priority"
                style="text-align: left;">
          <el-col :span="24"
                  class="common_btn_priority">
            <p class="item_list">
              <span class="item">共计
                <span class="num">{{count.count}}</span> 条</span>
              <span class="item">其中优先级</span>
              <el-tag class="e_tag e-tag-1">最高：
                <span class="nums">{{count.highest}}</span>
              </el-tag>
              <el-tag class="e_tag e-tag-2">高：
                <span class="nums">{{count.high}}</span>
              </el-tag>
              <el-tag class="e_tag e-tag-3">中：
                <span class="nums">{{count.medium}}</span>
              </el-tag>
              <el-tag class="e_tag e-tag-4">低：
                <span class="nums">{{count.low}}</span>
              </el-tag>
            </p>
          </el-col>
        </el-row>

        <!--按钮组-->
        <el-row class="common_btn">
          <el-col :span="24"
                  class="common_btn_list">
            <el-dropdown @command="change_state"
                         trigger="click"
                         placement='bottom-start'>
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
                <el-dropdown-item command="已取消"
                                  class="select_item">已取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary"
                       class="bw_btn bw_btn_add"
                       @click="open_task_new();">
              <span>新增</span>
            </el-button>
            <el-button type="primary"
                       class="bw_btn bw_btn_edit"
                       @click="edit_task_pop();">
              <span>编辑</span>
            </el-button>
            <el-button type="primary"
                       class="bw_btn bw_btn_download"
                       @click="worksdownload();">
              <span>下载</span>
            </el-button>
            <el-button type="primary"
                       class="bw_btn bw_btn_remove"
                       @click="worksDelete();">
              <span>删除</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
               v-show="scope.row.if_new == '1'"></div>
        </template>
      </el-table-column>
      <el-table-column type="selection"
                       width="50">
      </el-table-column>
      <el-table-column prop="name"
                       label="工单名称"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creator"
                       label="创建人"
                       width="100"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="180"
                       show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.created_at | time }}</template>
      </el-table-column>
      <el-table-column label="优先级">
        <template slot-scope="scope">{{ scope.row.priority | priority }}</template>
      </el-table-column>
      <el-table-column prop="new_perator"
                       label="经办人"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="更新时间"
                       width="180"
                       show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.updated_at | time }}</template>
      </el-table-column>
      <el-table-column prop="remarks"
                       label="备注"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态"
                       width="80"
                       show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
      </el-table-column>
    </el-table>
    <el-pagination class="handle-pagination"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[10, 20, 50,100]"
                   :page-size="table.eachPage"
                   :current-page="table.pageNow"
                   :total="table.count"
                   layout="total, sizes, prev, pager, next">
    </el-pagination>

    <!-- 弹窗 -->
    <!-- 状态变更 -->
    <el-dialog class="pop_state_box"
               :close-on-click-modal="false"
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
          <span style="font-size:14px">是否将已勾选的</span>
          <span style="font-size:14px">{{table.multipleSelection.length}}</span>
          <span style="font-size:14px">项工单状态变更为“</span>
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
    <el-dialog class="task_new_box pop_box"
               :close-on-click-modal="false"
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
      <div class="task_new_content"
           v-if="task.new_contet">
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
                          show-word-limit
                          maxlength="32"
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
                  <!--<el-checkbox label="news" value="news">消息中心通知</el-checkbox>-->
                </el-checkbox-group>
              </li>
            </div>
          </div>
          <div class="content_remarks">
            <p class="title">备注</p>
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      maxlength="500"
                      show-word-limit
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
      <div class="task_handle_content"
           v-if="!task.new_contet">
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
                <div class="tb_tolling">
                  <el-table align="center"
                            class="common-table"
                            :data="table_assets.tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            ref="assetTableName"
                            :row-key="getRowKeys_assets"
                            @selection-change="handle_sel_table_assets">
                    <el-table-column label="全选"
                                     width="40"></el-table-column>
                    <el-table-column align='left'
                                     type="selection"
                                     width="50"
                                     :reserve-selection="true"></el-table-column>
                    <el-table-column prop="asset_ip"
                                     label="资产"
                                     width="180"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="label_group"
                                     label="资产组"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="威胁等级"
                                     width="140">
                      <template slot-scope="scope">
                        <span class="btn_alert_background"
                              :class="{'high_background':scope.row.degree =='high','mid_background':scope.row.degree =='medium','low_background':scope.row.degree =='low'}">
                          {{ scope.row.degree | degree }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态"
                                     width="80">
                      <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination class="pagination_box"
                               @current-change="hcc_table_assets"
                               :page-sizes="[10]"
                               :page-size="table_assets.eachPage"
                               :current-page="table_assets.pageNow"
                               :total="table_assets.count"
                               layout="total, prev, pager, next">
                </el-pagination>
              </div>
              <div v-show="handle.active == 1">
                <div class="tb_tolling">
                  <el-table align="center"
                            class="common-table"
                            :data="table_alerts.tableData"
                            tooltip-effect="dark"
                            ref="alertTableName"
                            style="width: 100%"
                            :row-key="getRowKeys_alerts"
                            @selection-change="handle_sel_table_alerts">
                    <el-table-column label="全选"
                                     prop="type"
                                     width="40">
                    </el-table-column>
                    <el-table-column type="selection"
                                     width="50"
                                     :reserve-selection="true">
                    </el-table-column>
                    <el-table-column prop="category"
                                     label="告警类型"
                                     show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="indicator"
                                     label="威胁指标"
                                     show-overflow-tooltip>
                    </el-table-column>
                    <!--<el-table-column prop="src_ip" label="源地址" show-overflow-tooltip>
                     </el-table-column>
                     <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip>
                     </el-table-column>-->
                    <el-table-column prop="application"
                                     label="应用"
                                     show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="威胁等级"
                                     width="120"
                                     show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span class="btn_alert_background"
                              :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                          {{ scope.row.degree | degree_sino }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态"
                                     width="80">
                      <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination class="pagination_box"
                               @current-change="hcc_table_alerts"
                               :page-sizes="[10]"
                               :page-size="table_alerts.eachPage"
                               :current-page="table_alerts.pageNow"
                               :total="table_alerts.count"
                               layout="total, prev, pager, next">
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
    <!-- 编辑工单-szs !***********************************************-->
    <!-- 工单任务 -->
    <el-dialog class="task_new_box"
               width='840px'
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="edit.pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_pop"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑工单</span>
      </div>
      <div class="step_box">
        <div class="step_box1">
          <span class="step1_span"
                :class="edit.task.frist?'step_now':'step_past'">基本信息</span>
          <img src="@/assets/images/emerge/selected01.png"
               class="selected_img"
               alt="">
        </div>
        <div class="step_box2">
          <span class="step2_span"
                :class="!edit.task.frist?'step_now':'step_past'">处置内容</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="task_new_content"
           v-if="edit.task.frist">
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
                          v-model="edit.data.name"
                          show-word-limit
                          maxlength="32"
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
                  <el-option v-for="item in edit.operator_list"
                             @click.native="select_changced_edit(item)"
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
                           v-model="edit.data.priority"
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
                <el-checkbox-group v-model="edit.notice">
                  <el-checkbox label="email"
                               value="email">邮件通知</el-checkbox>
                  <el-checkbox label="message"
                               value="message">短信通知</el-checkbox>
                  <!--<el-checkbox label="news" value="news">消息中心通知</el-checkbox>-->
                </el-checkbox-group>
              </li>
            </div>
          </div>
          <div class="content_remarks">
            <p class="title">备注</p>
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      maxlength="500"
                      show-word-limit
                      v-model="edit.data.remarks">
            </el-input>
          </div>
          <div class="content_table">
            <el-table :data="edit.table_operator"
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
          <el-button @click="closed_edit_pop"
                     class="cancel_btn">取消</el-button>
          <el-button @click="next_task_edit"
                     class="next_btn">下一步</el-button>
        </div>
      </div>
      <!-- 处置内容 -->
      <div class="task_handle_content"
           v-if="!edit.task.frist">
        <div class="task_content_box">
          <div class='table_box'>
            <ul class="table_box_title">
              <li class="active">
                <span v-if="edit.data.type == 'asset'">资产</span>
                <span v-if="edit.data.type == 'alert'">告警</span>
              </li>
            </ul>
            <div>
              <!-- 资产列表 -->
              <div v-if="edit.data.type == 'asset'">
                <div class="tb_tolling">
                  <el-table align="center"
                            class="common-table"
                            :data="edit.asset_list.data"
                            tooltip-effect="dark"
                            :row-key="getRowKeys"
                            ref="assetTable"
                            style="width: 100%"
                            @selection-change="handle_sel_assets">
                    <el-table-column label="全选"
                                     width="40"></el-table-column>
                    <el-table-column align='left'
                                     :reserve-selection="true"
                                     type="selection"
                                     width="50"></el-table-column>
                    <el-table-column prop="asset_ip"
                                     label="资产"></el-table-column>
                    <el-table-column prop="label_group"
                                     label="资产组"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="威胁等级"
                                     width="100">
                      <template slot-scope="scope">
                        <span class="btn_alert_background"
                              :class="{'high_background':scope.row.degree =='high','mid_background':scope.row.degree =='medium','low_background':scope.row.degree =='low'}">
                          {{ scope.row.degree | degree }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态"
                                     width="80">
                      <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination class="pagination_box"
                               @current-change="current_change_assets"
                               :page-sizes="[10]"
                               :page-size="10"
                               :current-page="edit.asset_list.pageNow"
                               :total="edit.asset_list.count"
                               layout="total, prev, pager, next">
                </el-pagination>
              </div>
              <!-- 告警列表 -->
              <div v-if="edit.data.type == 'alert'">
                <div class="tb_tolling">
                  <el-table align="center"
                            class="common-table"
                            :data="edit.alert_list.data"
                            tooltip-effect="dark"
                            ref="alertTable"
                            style="width: 100%"
                            @selection-change="handle_sel_alert">
                    <el-table-column label="全选"
                                     prop="type"
                                     width="40">
                    </el-table-column>
                    <el-table-column type="selection"
                                     width="50">
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
                    <el-table-column label="威胁等级"
                                     width="100"
                                     show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span class="btn_alert_background"
                              :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                          {{ scope.row.degree | degree_sino }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态"
                                     width="80">
                      <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination class="pagination_box"
                               @current-change="current_change_alert"
                               :page-sizes="[10]"
                               :page-size="10"
                               :current-page="edit.alert_list.pageNow"
                               :total="edit.alert_list.count"
                               layout="total, prev, pager, next">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_edit_pop"
                     class="cancel_btn">取消</el-button>
          <el-button @click="prev_task_handle_edit"
                     class="prev_btn">上一步</el-button>
          <el-button @click="prev_task_handle_assign_edit"
                     class="prev_btn">分配</el-button>
          <el-button @click="prev_task_handle_save_edit"
                     class="prev_btn">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑工单-szs !***********************************************-->

  </div>
</template>

<script type="text/ecmascript-6">
import VmEmergePicker from "@/components/common/vm-emerge-picker";
export default {
  name: 'vm-handle-tabs',
  props: {
    owned: {
      type: String,
      default: 'created'
    },
  },
  data () {
    return {
      options_priority: [
        {
          value: "highest",
          label: "最高"
        },
        {
          value: "high",
          label: "高"
        },
        {
          value: "medium",
          label: "中"
        },
        {
          value: "low",
          label: "低"
        }
      ],
      options_status: [
        {
          value: "all",
          label: "所有"
        },
        {
          value: "0",
          label: "待分配"
        },
        {
          value: "1",
          label: "已分配"
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
          label: "已取消"
        }
      ],
      params: {
        key: "",
        priority: "",
        status: "",
        startTime: "",
        endTime: "",
      },
      count: {
        count: 0,
        highest: 0,
        high: 0,
        medium: 0,
        low: 0
      },
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: [],
        loading: true,
      },
      my_risk_asset: [],
      //弹窗部分
      state_change: false,
      process_state: "",
      //工单任务
      task: {
        new: false,
        new_contet: true,
        status: '',
        id: 0,
        title: '新增工单'
      },
      task_params: {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        type: 'asset'
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
            value: "medium",
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
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 5
      },
      handle: {
        add: "",
        table_title: ["资产", "告警"],
        active: 0,
        dist: false,
        save: false
      },
      table_assets: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: []
      },
      table_alerts: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: [],
        multipleData: []
      },
      // 编辑工单数据
      edit: {
        pop: false,
        task: {
          frist: true,
          new_contet: true,
        },
        data: {

        },
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
            value: "medium",
            label: "中"
          },
          {
            value: "low",
            label: "低"
          }
        ],
        perator: [],
        operator_list: [],
        notice: [],
        table_operator: [],
        // 经办人传输数组
        // 告警和资产数组
        handle_sel: [],
        asset_list: {},
        alert_list: {},
        page: 1,
        rows: 10
      }
    }
  },
  components: {
    VmEmergePicker
  },
  created () {
    /********************************************************替换**************************************************/
    console.log(this.owned)
    if (this.owned == 'distributed') {
      this.options_status = [
        {
          value: "all",
          label: "所有"
        },
        {
          value: "1",
          label: "已分配"
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
          label: "已取消"
        }
      ]
    } else {
      this.options_status = [
        {
          value: "all",
          label: "所有"
        },
        {
          value: "0",
          label: "待分配"
        },
        {
          value: "1",
          label: "已分配"
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
          label: "已取消"
        }
      ]
    }
    if (this.owned != 'created') {
      this.params.status = '';
    }
    /********************************************************替换**************************************************/
    this.get_list_works();

  },
  methods: {
    //获取全部资产列表
    get_list_assets_info () {
      this.$axios.get('/yiiapi/workorder/asset-list', {
        params: {
          page: this.table_assets.pageNow,
          rows: this.table_assets.eachPage
        }
      })
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          if (status == 0) {
            let { data, count, maxPage, pageNow } = datas;
            data.map(function (v, k) {
              v.label = JSON.parse(v.label);
              if (v.label && v.label.length) {
                v.label_group = v.label.join(',');
              } else {
                v.label_group = '';
              }
            });
            let that = this;
            console.log('^^^^')
            console.log(this.table_assets.multipleSelection)
            data.forEach(element => {
              this.table_assets.multipleSelection.forEach(function (item) {
                if (element.asset_ip == item.asset_ip) {
                  that.$nextTick(() => {
                    // this.edit.data.risk_asset_cn.splice(element, 1);
                    that.$refs.assetTableName.toggleRowSelection(item, true);
                  })
                }
              })
            });

            this.table_assets.tableData = data;
            this.table_assets.count = count;
            this.table_alerts.maxPage = maxPage;
            this.table_alerts.pageNow = pageNow;
          }
        });
    },

    //获取全部告警列表
    get_list_alerts_info () {
      this.$axios.get('/yiiapi/workorder/alert-list', {
        params: {
          page: this.table_alerts.pageNow,
          rows: this.table_alerts.eachPage
        }
      })
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          if (status == 0) {
            let { data, count, maxPage, pageNow } = datas;

            console.log(data)
            let that = this;

            console.log(this.task_params.multiple_alerts)
            data.forEach(element => {
              this.table_alerts.multipleSelection.forEach(function (item) {
                if (element.id == item.id) {
                  that.$nextTick(() => {
                    // this.edit.data.risk_asset_cn.splice(element, 1);
                    that.$refs.alertTableName.toggleRowSelection(item, true);
                  })
                }
              })
            });

            this.table_alerts.tableData = data;
            this.table_alerts.count = count;
            this.table_alerts.maxPage = maxPage;
            this.table_alerts.pageNow = pageNow;
          }
        });
    },
    /**************************************************替换***********************************************************/
    //工单中心列表
    get_list_works () {
      this.table.loading = true;
      console.log('************');
      let params_status = '';

      if (this.owned == 'created') {
        if (this.params.status == '') {
          params_status = 'default';
        } else if (this.params.status == 'all') {
          params_status = '';
        } else {
          params_status = this.params.status;
        }
      } else {
        if (this.params.status == '') {
          params_status = '';
        } else if (this.params.status == 'all') {
          params_status = '';
        } else {
          params_status = this.params.status;
        }
      }

      console.log(params_status)
      this.$axios.get('/yiiapi/workorder/list',
        {
          params: {
            stime: this.params.startTime,
            etime: this.params.endTime,
            status: params_status,
            priority: this.params.priority,
            key_word: this.params.key,
            owned: this.owned,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        })
        .then((resp) => {
          this.table.loading = false;
          let { status, data } = resp.data;
          let datas = data;
          if (status == 0) {
            let { data, count, maxPage, pageNow } = datas;
            this.count = count;

            data.map(function (v, k) {
              if (v.perator) {
                v.new_perator = v.perator.join(',')
              }
            });
            this.table.tableData = data;
            this.table.count = Number(count.count);
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;
          }
        });
    },

    changeTime (data) {
      if(data){
        this.params.startTime = (data[0].valueOf() / 1000).toFixed(0);
        this.params.endTime = (data[1].valueOf() / 1000).toFixed(0);
      }
    },

    /**************************************************替换***********************************************************/
    //搜索按鈕點擊事件
    submitClick () {
      this.get_list_works();
    },

    //重置按鈕點擊事件
    resetClick () {
      this.params = {
        key: "",
        priority: "",
        status: "",
        startTime: "",
        endTime: ""
      };
      $(document.querySelector('.el-button--text')).trigger('click');
      this.get_list_works();
    },

    //每頁多少條切換
    handleSizeChange (val) {
      this.table.eachPage = val;
      this.table.pageNow = 1;
      this.get_list_works();
    },

    //頁數點擊切換
    handleCurrentChange (val) {
      this.table.pageNow = val;
      this.get_list_works();
    },

    //多选获取选中数据
    handleSelChange (val) {
      this.table.multipleSelection = val;
    },

    //工单列表跳转
    detail_click (row) {
      this.$router.push({ path: "/detail/works", query: { id: row.id } });
    },

    /***********************************以下是弹窗部分***********/
    /***********************************以下是弹窗部分***********/
    // 状态变更选择
    change_state (command) {
      this.process_state = command;
      this.open_state();
    },

    /***************状态变更*****************/
    //打开状态变更弹窗
    open_state () {
      let sel_table_data = this.table.multipleSelection;
      if (sel_table_data.length == 0) {
        this.$message({ message: '请选择需要变更的工单', type: 'warning' });
        return false;
      } else {
        this.state_change = true;
        //this.ok_state();
      }
    },

    //关闭状态变更弹窗
    closed_state () {
      this.state_change = false;
      this.$refs.multipleTable.clearSelection();
    },

    //状态变更取消按钮点击
    cancel_state () {
      this.closed_state();
    },

    //状态变更确定按钮点击
    ok_state () {
      let selected = this.table.multipleSelection;
      //资产ID处理
      let worker_id_group = selected.map(x => { return x.id; });
      //状态设置
      let process = this.process_state;
      let change_status = 0;

      if (process == '处置中') {
        change_status = 2;
      } else if (process == '已处置') {
        change_status = 3;
      } else if (process == '已取消') {
        change_status = 4;
      }
      this.$axios.put('/yiiapi/workorder/change-status', {
        id: worker_id_group,
        status: change_status
      })
        .then(resp => {
          let { status, data } = resp.data;
          if (status == 0) {
            this.$message.success('工单状态变更成功！');
            this.get_list_works();
            this.closed_state();
            /******************************************************替换***********************************************/
            this.$emit('updateNum');
          } else {
            this.$message.error('工单状态变更失败！');
            this.closed_state();
            /******************************************************替换***********************************************/
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    /*******************下载**********************************替换******************************************************/
    worksdownload () {
      let selected = this.table.multipleSelection;

      if (selected.length == 0) {
        this.$message({ type: 'warning', message: '请选择需要下载的工单！' });
      } else if (selected.length > 1) {
        this.$message({ type: 'warning', message: '每次只能选择一个工单下载！' });
      } else {

        let stu = selected[0].status;
        if (stu == 1 || stu == 2) {
          var url1 = "/yiiapi/workorder/download-test?id=" + (selected[0].id * 1);
          this.$axios.get(url1)
            .then(resp => {
              let { status, msg, data } = resp.data;

              console.log(resp)
              if (status == 0) {
                var url2 = "/yiiapi/workorder/download?id=" + (selected[0].id * 1);
                window.location.href = url2;
              } else {
                this.$message({ type: 'warning', message: msg });
              }
              /*this.$axios.get('/workorder/download?id='+(selected[0].id * 1))
                .then(resp => {
                console.log(resp)
              })*/
            })
        } else {
          this.$message({ message: '当前状态下不允许下载工单！', type: 'warning' });
        }

      }
    },

    /*******************删除***************************************替换*********************************************************************************/
    worksDelete () {
      let that = this;
      let multiple = this.table.multipleSelection;
      let selected = multiple.map(x => { return x.id * 1; });

      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (selected.length == 0) {
          that.$message({ message: '请选择要删除的工单！', type: 'warning' });
        } else {
          console.log(selected)
          that.$axios.delete('/yiiapi/workorder/del', {
            data: { id: selected }          })
            .then(resp => {
              let { status, msg, data } = resp.data;
              if (status == 0) {
                that.$message.success('删除工单成功');
                that.get_list_works();
                that.$emit('updateNum');
              } else {
                if (msg == '' || msg == undefined) {
                  that.$message.error('删除工单失败');
                } else {
                  that.$message.error(msg);
                }
                that.$refs.multipleTable.clearSelection();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }

      }).catch(() => {
        this.$refs.multipleTable.clearSelection();
      });
    },

    /*******************新增编辑**************************下载********************************************************/

    //新增
    open_task_new () {
      //新增
      this.task_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        type: 'asset'
      };
      this.table_operator.tableData = [];
      this.open_task();
    },

    //打开工单新增编辑弹窗
    open_task () {


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
    },

    //关闭新建工单
    closed_task_new () {
      this.task.new = false;
      this.task.new_contet = false;
      this.task.status = '';
      this.task_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        type: 'asset'
      };
      this.table_operator.tableData = [];
      this.$refs.multipleTable.clearSelection();
    },

    //下一步时候验证工单名称，优先级、经办人等参数
    next_task_new () {
      if (this.task_params.name == '') {
        this.$message.error('工单名称不能为空');
      } else if (this.task_params.level == '') {
        this.$message.error('优先级未选择');
      } else if (this.table_operator.tableData.length == 0) {
        this.$message.error('经办人未选择');
      } else {
        this.task.new_contet = false;
        this.handle.active = 0;

        console.log('下一步')
        this.get_list_assets_info();
        this.get_list_alerts_info();
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
      let selected_name_attr = this.table_operator.tableData.map(x => { return x.username });
      this.task_params.new_operator = selected_name_attr;
    },

    //tabs下table每页显示多少条          ------------------wu
    sc_table_assets (val) {
      /* this.table_assets.eachPage = val;
       this.table_assets.pageNow = 1;
       //调用资产列表
       this.get_list_assets_info();*/
    },

    //tabs下第一个table页数点击(资产)
    hcc_table_assets (val) {
      this.table_assets.pageNow = val;
      this.get_list_assets_info();
    },


    //tabs下table每页显示多少条           ------------------wu
    sc_table_alerts (val) {
      /*this.table_alerts.eachPage = val;
      this.table_alerts.pageNow = 1;
      this.get_list_alerts_info();*/
    },
    //tabs下第一个table页数点击(页数点击)
    hcc_table_alerts (val) {
      this.table_alerts.pageNow = val;
      this.get_list_alerts_info();
    },

    //资产匹配
    getRowKeys_assets (row) {
      console.log(row)
      return row.asset_ip;
    },

    //告警匹配
    getRowKeys_alerts (row) {
      return row.id;
    },

    //tab下第一个table多选
    handle_sel_table_assets (val) {
      this.table_assets.multipleSelection = val;
    },

    //tab下第一个table多选
    handle_sel_table_alerts (val) {
      this.table_alerts.multipleSelection = val;
    },

    //新增工单按钮切换
    table_btn_toggle (index) {
      this.handle.active = index;
      if (index == 0) {
        this.task_params.type = 'asset';
      } else if (index == 1) {
        this.task_params.type = 'alert';
      }
    },

    //新建工单分配
    prev_task_handle_assign () {
      let multiple_assets = this.table_assets.multipleSelection.map(x => { return x.asset_ip });
      let multiple_alerts = this.table_alerts.multipleSelection.map(x => { return x.id * 1 });

      if (this.task_params.type == 'asset') {
        if (multiple_assets.length == 0) {
          this.$message({ message: '至少选择一条资产/告警！', type: 'warning' });
        } else {
          multiple_alerts = [];

          let all_params = {
            name: this.task_params.name,
            priority: this.task_params.level,
            perator: this.task_params.new_operator,
            remarks: this.task_params.textarea,
            type: this.task_params.type,
            te_alert: multiple_alerts,
            risk_asset: multiple_assets,
            remind: this.task_params.notice
          };
          this.get_distribution(all_params);
        }
      } else if (this.task_params.type == 'alert') {
        if (multiple_alerts.length == 0) {
          this.$message({ message: '至少选择一条资产/告警！', type: 'warning' });
        } else {
          multiple_assets = [];

          let all_params = {
            name: this.task_params.name,
            priority: this.task_params.level,
            perator: this.task_params.new_operator,
            remarks: this.task_params.textarea,
            type: this.task_params.type,
            te_alert: multiple_alerts,
            risk_asset: multiple_assets,
            remind: this.task_params.notice
          };

          this.get_distribution(all_params);
        }
      }
    },
    //分配参数具体请求
    get_distribution (all_params) {
      this.handle.save = true;
      this.$axios.put('/yiiapi/workorder/distribution', all_params)
        .then((resp) => {
          this.handle.save = false;
          let { status, msg, data } = resp.data;
          if (status == 0) {
            this.$message.success('分配成功');
            this.closed_task_new();
            this.get_list_works();
            this.$emit('updateNum');
          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //新建工单保存
    prev_task_handle_save () {
      let multiple_assets = this.table_assets.multipleSelection.map(x => { return x.asset_ip });
      let multiple_alerts = this.table_alerts.multipleSelection.map(x => { return x.id * 1 });

      if (this.task_params.type == 'asset') {
        if (multiple_assets.length == 0) {
          this.$message({ message: '至少选择一条资产/告警！', type: 'warning' });
        } else {
          multiple_alerts = [];
          let all_params = {
            name: this.task_params.name,
            priority: this.task_params.level,
            perator: this.task_params.new_operator,
            remarks: this.task_params.textarea,
            type: this.task_params.type,
            te_alert: multiple_alerts,
            risk_asset: multiple_assets,
            remind: this.task_params.notice
          };
          this.get_save(all_params);
        }
      } else if (this.task_params.type == 'alert') {
        if (multiple_alerts.length == 0) {
          this.$message({ message: '至少选择一条资产/告警！', type: 'warning' });
        } else {
          multiple_assets = [];

          let all_params = {
            name: this.task_params.name,
            priority: this.task_params.level,
            perator: this.task_params.new_operator,
            remarks: this.task_params.textarea,
            type: this.task_params.type,
            te_alert: multiple_alerts,
            risk_asset: multiple_assets,
            remind: this.task_params.notice
          };
          this.get_save(all_params);
        }
      }
    },
    //新建工单具体保存
    get_save (all_params) {
      this.handle.save = true;
      this.$axios.post('/yiiapi/workorder/add', all_params)
        .then((resp) => {
          this.handle.save = false;
          let { status, msg, data } = resp.data;
          if (status == 0) {
            this.$message.success('保存成功');
            this.closed_task_new();
            this.get_list_works();
            this.$emit('updateNum');
          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑工单 重写 szs --------------------------------------------------
    //打开工单新增编辑弹窗
    //获取用户列表(经办人使用)
    open_task_edit () {
      this.$axios.get('/yiiapi/site/user-list')
        .then(resp => {
          let { status, data } = resp.data;
          if (status == 0) {
            console.log(this.edit);

            this.edit.operator_list = data;
            if (this.edit.data.perator && this.edit.data.perator.length != 0) {
              this.edit.operator_list.forEach(element => {
                this.edit.data.perator.forEach(item => {
                  if (element.username == item) {
                    this.edit.table_operator.push(element)
                  }
                });
              });
            } else {
              this.edit.table_operator = []
            }

            console.log(this.edit.operator_list);

            this.edit.pop = true
            this.edit.task.frist = true;
          }
        })
        .catch(err => {
          console.log('用户列表错误');
          console.log(err);
        })
    },
    // 关闭弹窗
    closed_edit_pop () {
      this.edit.pop = false
    },
    // 打开编辑弹窗
    edit_task_pop (item) {
      // 初始化  // 编辑工单数据
      this.edit.data = {}
      this.edit.notice = []
      this.edit.perator = []
      this.edit.table_operator = []
      this.edit.operator_list = []
      this.edit.handle_sel = []
      this.edit.asset_list = []
      this.edit.alert_list = []
      this.edit.page = 1
      this.edit.rows = 10
      let sel_table_data = this.table.multipleSelection;
      if (sel_table_data.length != 1) {
        this.$message({ message: '请选择一项需要编辑的工单！', type: 'warning' });
        return false;
      }
      if (sel_table_data[0].status != '0') {
        this.$message({ message: '工单状态只有‘待分配’可以被编辑！', type: 'warning' });
        return false;
      }
      this.edit.data = sel_table_data[0]
      this.edit.notice = JSON.parse(this.edit.data.remind)
      // 储存资产数组
      this.edit.data.risk_asset_cn = []
      if (JSON.parse(this.edit.data.risk_asset).length != 0) {
        this.edit.data.risk_asset_cn = JSON.parse(this.edit.data.risk_asset)
      } else {
        this.edit.data.risk_asset_cn = []
      }
      // 储存告警数组
      this.edit.data.risk_alert_cn = []
      if (JSON.parse(this.edit.data.te_alert).length != 0) {
        JSON.parse(this.edit.data.te_alert).forEach(element => {
          if (element != '') {
            this.edit.data.risk_alert_cn.push(element + '')
          }
        });
      } else {
        this.edit.data.risk_alert_cn = []
      }



      // 获取经办人
      this.open_task_edit();
    },
    //经办人change处理
    select_changced_edit (item) {
      console.log(item);
      let level_list = this.edit.table_operator
      let selected_id_attr = level_list.map(x => { return x.id });
      if (selected_id_attr.includes(item.id)) {
        this.$message.error('已存在');
      } else {
        this.edit.table_operator.unshift(item);
      }
      let selected_name_attr = this.edit.table_operator.map(x => { return x.username });
      console.log(selected_name_attr);

      // this.task_params.new_operator = selected_name_attr;
    },
    //下一步时候验证工单名称，优先级、经办人等参数
    next_task_edit () {
      if (this.edit.data.name == '') {
        this.$message.error('工单名称不能为空');
      } else if (this.edit.data.level == '') {
        this.$message.error('优先级未选择');
      } else if (this.edit.table_operator.length == 0) {
        this.$message.error('经办人未选择');
      } else {
        this.task.new_contet = false;
        if (this.edit.data.type == 'asset') {
          this.get_list_assets()
        } else if (this.edit.data.type == 'alert') {
          this.get_list_alert()
        }
        console.log(this.edit.data.risk_asset_cn);
        console.log(this.edit.data.risk_alert_cn);
        console.log(this.edit);
        this.edit.task.frist = false;
        this.edit.handle_sel = []
      }
    },
    //上一步
    prev_task_handle_edit () {
      this.edit.task.frist = true;
    },
    //获取全部资产列表
    get_list_assets (name) {
      this.$axios.get('/yiiapi/workorder/asset-list', {
        params: {
          page: this.edit.page,
          rows: this.edit.rows,
          id: this.edit.data.id
        }
      })
        .then((resp) => {
          let { status, data } = resp.data;
          // console.log(data);
          this.edit.asset_list = data
          this.edit.asset_list.data.map(function (v, k) {
            v.label = JSON.parse(v.label);
            if (v.label && v.label.length) {
              v.label_group = v.label.join(',');
            } else {
              v.label_group = '';
            }
          });
          this.edit.handle_sel = []
          this.edit.data.risk_asset_cn.forEach(element => {
            this.edit.asset_list.data.forEach((item, index) => {
              if (element == item.asset_ip) {
                // console.log(item);
                this.$nextTick(() => {
                  // this.edit.data.risk_asset_cn.splice(element, 1);
                  this.$refs.assetTable.toggleRowSelection(item, true);
                })
              }
            });
          });
        });
    },
    //获取全部告警列表
    get_list_alert () {
      this.$axios.get('/yiiapi/workorder/alert-list', {
        params: {
          page: this.edit.page,
          rows: this.edit.rows,
          id: this.edit.data.id
        }
      })
        .then((resp) => {
          let { status, data } = resp.data;
          console.log(data);
          this.edit.alert_list = data;
          // 清空选择
          this.edit.data.risk_alert_cn.forEach(element => {
            this.edit.alert_list.data.forEach((item, index) => {
              if (element == item.id) {
                // console.log(item);
                this.$nextTick(() => {
                  // this.edit.data.risk_asset_cn.splice(element, 1);
                  this.$refs.alertTable.toggleRowSelection(item, true);
                })
              }
            });
          });

        });
    },
    getRowKeys (row) {
      return row.id;
    },
    // 选择资产列表
    handle_sel_assets (val) {
      this.edit.handle_sel = val

      var arr1 = []
      var arr2 = []
      if (this.edit.handle_sel.length == 0) {
        this.edit.asset_list.data.forEach(item => {
          arr1.push(item.asset_ip)
        });
      } else {
        this.edit.asset_list.data.forEach(element => {
          this.edit.handle_sel.forEach(item => {
            if (item.asset_ip != element.asset_ip) {
              arr1.push(element.asset_ip)
            } else {
              arr2.push(element.asset_ip)
            }
          });
        });
      }
      this.edit.data.risk_asset_cn.forEach(element => {
        arr1.forEach(item => {
          if (element == item) {
            this.removeByValue(this.edit.data.risk_asset_cn, item)
          }
        });
      });
      this.edit.data.risk_asset_cn = this.arr_repeat(this.edit.data.risk_asset_cn, arr2)
      console.log(arr1);
      console.log(arr2);
      console.log(this.edit.data.risk_asset_cn);


    },
    // 选择告警列表
    handle_sel_alert (val) {
      this.edit.handle_sel = val
      var arr1 = []
      var arr2 = []
      if (this.edit.handle_sel.length == 0) {
        this.edit.alert_list.data.forEach(item => {
          arr1.push(item.id)
        });
      } else {
        this.edit.alert_list.data.forEach(element => {
          this.edit.handle_sel.forEach(item => {
            if (item.id != element.id) {
              arr1.push(element.id)
            } else {
              arr2.push(element.id)
            }
          });
        });
      }
      this.edit.data.risk_alert_cn.forEach(element => {
        arr1.forEach(item => {
          if (element == item) {
            this.removeByValue(this.edit.data.risk_alert_cn, item)
          }
        });
      });
      this.edit.data.risk_alert_cn = this.arr_repeat(this.edit.data.risk_alert_cn, arr2)
      console.log(arr1);
      console.log(arr2);
      console.log(this.edit.data.risk_alert_cn);
    },

    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
      return arr
    },
    // 资产分页
    current_change_assets (val) {
      this.edit.page = val
    },
    // 封装数组去重
    arr_repeat (arr1, arr2) {
      //合并两个数组
      arr1.push(...arr2)//或者arr1 = [...arr1,...arr2]
      //去重
      let arr3 = Array.from(new Set(arr1))//let arr3 = [...new Set(arr1)]
      return arr3
    },
    // 告警分页
    current_change_alert (val) {
      this.edit.page = val
      this.get_list_alert();
    },

    //编辑工单保存
    prev_task_handle_save_edit () {
      console.log(this.edit);
      this.edit.table_operator.forEach(element => {
        this.edit.perator.push(element.username)
      });

      var handle_sel_list = []
      this.edit.handle_sel.forEach(element => {
        handle_sel_list.push(element.asset_ip)
      });
      this.edit.data.risk_asset_cn = this.arr_repeat(this.edit.data.risk_asset_cn, handle_sel_list)
      console.log(this.edit.data);

      let all_params = {
        id: this.edit.data.id,
        name: this.edit.data.name,
        priority: this.edit.data.priority,
        perator: this.edit.perator,
        remarks: this.edit.data.remarks,
        type: this.edit.data.type,
        remind: this.edit.notice
      };
      if (this.edit.data.type == 'asset') {
        if (this.edit.data.risk_asset_cn.length == 0) {
          this.$message({ message: '请选择至少一项资产！', type: 'warning' });
          return false;
        }
        all_params.risk_asset = this.edit.data.risk_asset_cn
      } else {

        if (this.edit.data.risk_alert_cn.length == 0) {
          this.$message({ message: '请选择至少一项告警！', type: 'warning' });
          return false;
        }
        var risk_alert_cn_arr = []
        this.edit.data.risk_alert_cn.forEach(element => {
          risk_alert_cn_arr.push(parseInt(element))
        });


        all_params.te_alert = risk_alert_cn_arr
      }
      console.log(all_params);
      this.handle.save = true
      this.$axios.post('/yiiapi/workorder/add', all_params)
        .then((resp) => {
          this.handle.save = false
          let { status, msg, data } = resp.data;
          console.log(resp);
          // "存在已被创建工单的资产"
          if (resp.data.status == 0) {
            this.$message.success('修改成功');
            this.get_list_works();
            this.edit.pop = false
          } else {
            this.$message.error(resp.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    //分配工单
    prev_task_handle_assign_edit () {
      this.edit.table_operator.forEach(element => {
        this.edit.perator.push(element.username)
      });
      console.log(this.edit);
      var handle_sel_list = []
      this.edit.handle_sel.forEach(element => {
        handle_sel_list.push(element.asset_ip)
      });
      this.edit.data.risk_asset_cn = this.arr_repeat(this.edit.data.risk_asset_cn, handle_sel_list)
      console.log(this.edit.data);

      let all_params = {
        id: this.edit.data.id,
        name: this.edit.data.name,
        priority: this.edit.data.priority,
        perator: this.edit.perator,
        remarks: this.edit.data.remarks,
        type: this.edit.data.type,
        remind: this.edit.notice
      };
      if (this.edit.data.type == 'asset') {
        if (this.edit.data.risk_asset_cn.length == 0) {
          this.$message({ message: '请选择至少一项资产！', type: 'warning' });
          return false;
        }
        all_params.risk_asset = this.edit.data.risk_asset_cn
      } else {

        if (this.edit.data.risk_alert_cn.length == 0) {
          this.$message({ message: '请选择至少一项告警！', type: 'warning' });
          return false;
        }

        var risk_alert_cn_arr = []
        this.edit.data.risk_alert_cn.forEach(element => {
          risk_alert_cn_arr.push(parseInt(element))
        });
        all_params.te_alert = risk_alert_cn_arr
      }
      console.log(all_params);
      this.handle.save = true
      this.$axios.put('/yiiapi/workorder/distribution', all_params)
        .then((resp) => {
          this.handle.save = false
          let { status, msg, data } = resp.data;
          console.log(resp);
          // "存在已被创建工单的资产"
          if (resp.data.status == 0) {
            this.$message.success('修改成功');
            this.get_list_works();
            this.edit.pop = false
          } else {
            this.$message.error(resp.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>

<style scoped lang="less">
@import '../../../../assets/css/less/common-tabs-pattern.less';
@import '../../../../assets/css/less/common-table-pattern.less';
.common-pattern {
  .common_btn {
    .common_box {
      padding-bottom: 16px;
      border-bottom: 1px solid #ececec;
      .common_btn_list {
        font-size: 0;
        /deep/ .bw_btn {
          font-size: 14px;
          height: 42px;
          width: 116px;
          outline: none;
          margin-right: 8px;
          line-height: 0;
          margin-left: 0;
          font-family: PingFangMedium;
          &.b_btn_add {
            color: #fff;
            background: #0070ff;
            border: 1px solid #0070ff;
          }
          &.b_btn_edit {
            color: #0070ff;
            border: 1px solid #0070ff;
            background-color: #fff;
          }
          &.bw_btn_download {
            color: #0070ff;
            border: 1px solid #0070ff;
            background-color: #fff;
          }
          &.bw_btn_remove {
            color: #0070ff;
            border: 1px solid #0070ff;
            background-color: #fff;
          }
        }
      }
    }
  }
  .common_priority {
    height: 60px;
    line-height: 56px;
    .common_btn_priority {
      height: 60px;
      .item_list {
        .item {
          font-size: 14px;
          color: #666666;
          font-family: PingFang;
          margin-right: 20px;
          .num {
            color: #0070ff;
          }
        }
        /deep/ .el-tag {
          height: 24px;
          width: 72px;
          line-height: 22px;
          border-radius: 0;
          border-width: 0;
          position: relative;
          color: #fff;
          .nums {
            position: absolute;
            right: 10px;
            top: 0px;
          }
          &.e-tag-1 {
            background: #dc5f5f;
          }
          &.e-tag-2 {
            background: #e0c840;
          }
          &.e-tag-3 {
            background: #5389e0;
          }
          &.e-tag-4 {
            background: #47cad9;
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
//新建工单
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

            /deep/ .el-textarea {
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

            /deep/ .el-table td {
              padding: 0;
              height: 32px;
            }
            /deep/ .el-table th {
              padding: 0;
              height: 36px;
              background: #f8f8f8;
              .cell {
              }
            }

            /deep/ .el-pagination {
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
        .tb_tolling {
          height: 400px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 3px;
            /*高宽分别对应横竖滚动条的尺寸*/
            /* border-radius: 6px;*/
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
        }
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

/deep/ .pop_box {
  .el-dialog {
    background: #ffffff;
    border-radius: 4px;
    position: fixed;
    // top: 200px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
