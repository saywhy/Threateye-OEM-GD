<template>
  <div id="invest_user" class="common-invest">
    <div class="invest">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--网络视角-->
        <el-tab-pane label="网络视角" name="first">
          <div class="invest_form invest_form_network">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">

                  <!--用户名-->
                  <el-input class="s_key" placeholder="用户名" v-model="params_net.source_address" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--主机IP-->
                  <el-input class="s_key" placeholder="主机IP" v-model="params_net.source_port" clearable>
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
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="time" label="时间" min-width="180" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="user_name" label="用户名" min-width="150" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="host_ip" label="主机IP"  min-width="150" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="apply" label="应用" show-overflow-tooltip></el-table-column>
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

                  <!--域名-->
                  <el-input class="s_key" placeholder="域名" v-model="params_point.domain_ip" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--用户名-->
                  <el-input class="s_key" placeholder="用户名" v-model="params_point.port" clearable>
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
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="computer" label="计算机名" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="computer_ip" label="计算机IP地址"  min-width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="status" label="状态" width="80">
                    <template slot-scope="scope">
                      <el-button size="mini" class="e-button_status" :class="{'e-break':scope.row.status == 0}">
                        <span v-if="scope.row.status == 1">在线</span>
                        <span v-if="scope.row.status == 0">断开</span>
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="jour_os" label="OS" min-width="150" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="jour_pid" label="PID" width="80" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="file_url" label="文件路径" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="time" label="时间" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="jour_name" label="域名 (IP、端口)" min-width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="action" label="动作" show-overflow-tooltip ></el-table-column>
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
    name: "invest_user",
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
            pid: '01',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            user_name: "system_admin",
            host_ip: "119.255.133.57",
            apply:'— —'
          },
          {
            pid: '02',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            user_name: "system_admin",
            host_ip: "119.255.133.57",
            apply:'— —'
          },
          {
            pid: '03',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            user_name: "system_admin",
            host_ip: "119.255.133.57",
            apply:'— —'
          }
        ],
        tablePointData: [
          {
            pid: '01',
            computer: "Vcenter",
            computer_ip: "192.168.1.90",
            status: "1",
            jour_os: "Windows Server 2008 R2 (64-bit)",
            jour_pid: "1532",
            file_url:'c:\\program files\\vmware\\vc…',
            time: "2019.11.08 15:33:24",
            jour_name: "192.168.1.184:52906",
            action:'NETWORK_CONNECT'
          },
          {
            pid: '02',
            computer: "Vcenter",
            computer_ip: "192.168.1.90",
            status: "1",
            jour_os: "Windows 10 (64-bit)",
            jour_pid: "1532",
            file_url:'c:\\program files\\vmware\\vc…',
            time: "2019.11.08 15:33:24",
            jour_name: "192.168.1.184:52906",
            action:'NETWORK_CONNECT'
          },
          {
            pid: '03',
            computer: "Vcenter",
            computer_ip: "192.168.1.90",
            status: "0",
            jour_os: "Windows Server 2008 R2 (64-bit)",
            jour_pid: "1532",
            file_url:'c:\\program files\\vmware\\vc…',
            time: "2019.11.08 15:33:24",
            jour_name: "192.168.1.184:52906",
            action:'NETWORK_CONNECT'
          },
          {
            pid: '04',
            computer: "Vcenter",
            computer_ip: "192.168.1.90",
            status: "1",
            jour_os: "Windows Server 2008 R2 (64-bit)",
            jour_pid: "4",
            file_url:'system',
            time: "2019.11.08 15:33:24",
            jour_name: "192.168.1.184:52906",
            action:'NETWORK_CONNECT'
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
        console.log(data);
        this.params_net.startTime = data[0].valueOf();
        this.params_net.endTime = data[1].valueOf();
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/invest-common-pattern.less";
  @import "../../../assets/css/less/invest-common-table-pattern.less";
  @import "../../../assets/css/less/invest_less/e-button_status.less";
</style>


