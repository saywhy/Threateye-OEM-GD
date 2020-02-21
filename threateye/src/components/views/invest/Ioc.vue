<template>
  <div id="invest_ioc" class="common-invest">
    <div class="invest">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--网络视角-->
        <el-tab-pane label="网络视角" name="first">
          <div class="invest_form invest_form_network">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="e-icon-upload"></i>
                    <div class="el-upload__text"><em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">
                      <p class="tip1">IOC.ioc已上传100%</p>
                      <p class="tip2">请选择 .txt <a class="tip2_a" href="#">(下载模板)</a> 或者<br/>
                        .ioc的格式文件搜索</p>
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
            </el-form>

            <el-row class="invest_btn_group">
              <el-button class="e_key e_download">下载</el-button>
              <el-button class="e_key e_delete">删除</el-button>
            </el-row>
          </div>
          <div class="invest_table">
            <el-row class="invest-common-table-pattern">
              <el-col :span="24">
                <el-table class="common-table" ref="multipleTable" :data="tableNetData">
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="time" label="时间" min-width="180" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="ori_address" label="源地址" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="ori_port" label="源端口"  show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="des_address" label="目的地址" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="des_port" label="目的端口" width="120" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="ttl" label="TTL" width="100" align="center"></el-table-column>
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
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="e-icon-upload"></i>
                    <div class="el-upload__text"><em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">
                      <p class="tip1">IOC.ioc已上传100%</p>
                      <p class="tip2">请选择 .txt <a class="tip2_a" href="#">(下载模板)</a> 或者<br/>
                        .ioc的格式文件搜索</p>
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
            </el-form>

            <el-row class="invest_btn_group">
              <el-button class="e_key e_download">下载</el-button>
              <el-button class="e_key e_delete">删除</el-button>
            </el-row>
          </div>
          <div class="invest_table invest_table_point">
            <el-row class="invest-common-table-pattern">
              <el-col :span="24">
                <el-table class="common-table" ref="multipleTable" :data="tablePointData">
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="computer" label="计算机名" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="computer_ip" label="计算机IP地址"  min-width="100" show-overflow-tooltip></el-table-column>
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
    name: "invest_ioc",
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
            ori_address: "192.168.1.187",
            ori_port: "29284",
            des_address: "119.255.133.57",
            des_port: "443",
            ttl:'— —'
          },
          {
            pid: '02',
            time: "2019.11.08 15:33:24 ~ 2019.11.08 15:33:24",
            ori_address: "192.168.1.187",
            ori_port: "29284",
            des_address: "119.255.133.57",
            des_port: "443",
            ttl: '— —'
          }
        ],
        tablePointData: [
          {
            pid: '01',
            computer: "Vcenter",
            computer_ip: "192.168.1.90",
            jour_os: "Windows Server 2008 R2 (64-bit)",
            jour_pid: "1532",
            file_url:'c:\\program files\\vmware\\vc…',
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
  #invest_ioc{
    .invest{
      .invest_form{
        .common_box {
          padding: 0 0 15px 0;
          .common_box_list{
            margin: 9px 0 15px;
            /deep/
            .el-upload{
              width: 164px;
              height: 88px;
              display: inline-block;
              .el-upload-dragger{
                width: 100%;
                height: 100%;
                position: relative;
                background: #f8f8f8;
                .e-icon-upload{
                  width: 36px;
                  height: 36px;
                  left: 64px;
                  top: 15px;
                  position: absolute;
                  background-repeat: no-repeat;
                  background-image: url("../../../assets/images/invest/upload.png");
                  background-size: 36px;
                }
                .el-upload__text{
                  margin-top: 50px;
                }
              }
            }
            .el-upload__tip{
              display: inline-block;
              vertical-align: top;
              margin-left: 20px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              .tip2{
                margin-top: 8px;
                .tip2_a{
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #0070FF;
                  line-height: 20px;
                }
              }
            }
          }
        }
        .invest_btn_group{
          text-align: left;
          font-size: 0;
          padding-bottom: 9px;
          .e_key{
            display: inline-block;
            width: 148px;
            height: 40px;
            font-size: 14px;
            color: #0070ff;
            background: #fff;
            border: 1px solid #0070FF;
            &.e_download{
              background: #0070FF;
              color: #fff;
            }
          }
        }
      }
    }
  }

</style>

