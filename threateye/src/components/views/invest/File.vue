<template>
  <div id="invest_file" class="common-invest">
    <div class="invest">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--网络视角-->
        <el-tab-pane label="网络视角" name="first">
          <div class="invest_form invest_form_network">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">

                  <!--文件名-->
                  <el-input class="s_key" placeholder="文件名" v-model="params_net.source_address" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--哈希值-->
                  <el-input class="s_key" placeholder="哈希值" v-model="params_net.source_port" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--主机IP-->
                  <el-input class="s_key" placeholder="主机IP" v-model="params_net.destion_address" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--时间-->
                  <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                  <el-button class="s_btn">搜索</el-button>
                  <el-link class="s_link">重置</el-link>
                </el-col>
              </el-row>
            </el-form>
            <el-link class="s_download">下载</el-link>
          </div>
          <div class="invest_table">
            <el-row class="invest-common-table-pattern">
              <el-col :span="24">
                <el-table class="common-table" ref="multipleTable" :data="tableNetData">
                  <el-table-column prop="file_pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="file_time" label="时间" min-width="120" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_name" label="文件名" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_hash" label="哈希号"  min-width="150" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_source" label="来源"  show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_host_ip" label="主机IP" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_apply" label="应用" width="80"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" class="e-pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5, 10, 20]"
                  :page-size="10"
                  :total="20"
                  layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!--端点视角-->
        <el-tab-pane label="端点视角" name="second">
          <div class="invest_form invest_form_point">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">

                  <!--域名/IP地址-->
                  <el-input class="s_key" placeholder="域名/IP地址" v-model="params_point.domain_ip" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--端口-->
                  <el-input class="s_key" placeholder="端口" v-model="params_point.port" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--进程排除-->
                  <el-input class="s_key" placeholder="进程排除" v-model="params_point.process" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--时间-->
                  <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

                  <el-button class="s_btn">搜索</el-button>
                  <el-link class="s_link">重置</el-link>
                </el-col>
              </el-row>
            </el-form>
            <el-link class="s_download">下载</el-link>
          </div>
          <div class="invest_table invest_table_point">
            <el-row class="invest-common-table-pattern">
              <el-col :span="24">
                <el-table class="common-table" ref="multipleTable" :data="tablePointData">
                  <el-table-column prop="file_pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="file_user" label="用户名" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_computer" label="计算机名" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_ip" label="IP地址"  show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_name" label="文件名 "  show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_process_name" label="进程名" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_PID" label="PID" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_MD5" label="MD5"  show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_process_child" label="子进程" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_process_parent" label="父进程" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_command" label="Command Line" min-width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_move" label="动作" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_apply" label="应用" show-overflow-tooltip ></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" class="e-pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5, 10, 20]"
                  :page-size="10"
                  :total="20"
                  layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: "invest_file",
    data() {
      return {
        activeName: 'first',
        loading_net:true,
        loading_point:true,
        params_net: {
          source_address: "",
          source_port:"",
          destion_address: "",
          destion_port:"",
          startTime: "",
          endTime: "",
        },
        params_point: {
          domain_ip: "",
          port:"",
          process: "",
          startTime: "",
          endTime: "",
        },
        tableNetData: [
          {
            file_pid: '01',
            file_time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            file_name: "/cgi-bin/httpconm",
            file_hash: "58ueiewshdlaklksha48973ajsaldjsaljsdjaslka",
            file_source: "119.255.133.57",
            file_host_ip: "119.255.133.57",
            file_apply:'https'
          },
          {
            file_pid: '02',
            file_time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            file_name: "/cgi-bin/httpconm",
            file_hash: "58ueiewshdlaklksha48973ajsaldjsaljsdjaslka",
            file_source: "119.255.133.57",
            file_host_ip: "119.255.133.57",
            file_apply:'https'
          },
          {
            file_pid: '03',
            file_time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            file_name: "/cgi-bin/httpconm",
            file_hash: "58ueiewshdlaklksha48973ajsaldjsaljsdjaslka",
            file_source: "119.255.133.57",
            file_host_ip: "119.255.133.57",
            file_apply:'https'
          }
        ],
        tablePointData: [
          {
            file_pid: '01',
            file_user: "kellen",
            file_computer: "kellen-PC",
            file_ip: "192.168.1.184",
            file_name: "photolaunch.exe",
            file_process_name: "photolaunch.exe",
            file_PID:'9140',
            file_MD5: "— —",
            file_process_child: "explore.exe",
            file_process_child_name: "explore.exe",
            file_command :'C:\\Users\\kellen\\eedds',
            file_move:'CREATEEEE',
            file_apply:'https'
          },
          {
            file_pid: '02',
            file_user: "kellen",
            file_computer: "kellen-PC",
            file_ip: "192.168.1.184",
            file_name: "photolaunch.exe",
            file_process_name: "photolaunch.exe",
            file_PID:'9140',
            file_MD5: "— —",
            file_process_child: "explore.exe",
            file_process_child_name: "explore.exe",
            file_command :'C:\\Users\\kellen\\eedds',
            file_move:'CREATEEEE',
            file_apply:'https'
          },
          {
            file_pid: '03',
            file_user: "kellen",
            file_computer: "kellen-PC",
            file_ip: "192.168.1.184",
            file_name: "photolaunch.exe",
            file_process_name: "photolaunch.exe",
            file_PID:'9140',
            file_MD5: "— —",
            file_process_child: "explore.exe",
            file_process_child_name: "explore.exe",
            file_command :'C:\\Users\\kellen\\eedds',
            file_move:'CREATEEEE',
            file_apply:'https'
          }
        ]
      };
    },
    components:{
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
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/invest-common-pattern.less";
  @import "../../../assets/css/less/invest-common-table-pattern.less";
</style>

