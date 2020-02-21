<template>
  <div id="invest_data" class="common-invest">
    <div class="invest">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="网络视角" name="first">
          <div class="invest_form">
            <el-form class="common-pattern">
              <el-row class="common_box">
                <el-col :span="24" class="common_box_list">

                  <!--流量超过 (B)-->
                  <el-input class="s_key" placeholder="流量超过 (B)" v-model="params.limit_data" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--链接时长超过 (s)-->
                  <el-input class="s_key" placeholder="链接时长超过 (s)" v-model="params.limit_time" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>

                  <!--主机IP-->
                  <el-input class="s_key" placeholder="主机IP" v-model="params.host_ip" clearable>
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
                <el-table class="common-table" ref="multipleTable" :data="tableData" v-loading = "loading">
                  <el-table-column prop="pid" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="time" label="时间" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="dns" label="DNS服务器IP" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="main_address" label="主机地址" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="type" label="类型" show-overflow-tooltip width="100"></el-table-column>
                  <el-table-column prop="domain" label="域名" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="resolve_address" label="解析地址" show-overflow-tooltip ></el-table-column>
                  <el-table-column prop="ttl" label="TTL" width="100" align="center"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" class="e-pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5, 10, 20]"
                  :page-size="pagation.rows"
                  :total="tableData.length"
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
  import { mapState } from 'vuex'
  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
    name: "invest_data",
    data() {
      return {
        activeName: 'first',
        loading:true,
        params: {
          limit_data: "",
          limit_time:"",
          host_ip:"",
          startTime: "",
          endTime: "",
        },
        pagation:{
          pageNow: 1,
          rows:10
        }
      };
    },
    components:{
      VmEmergePicker
    },
    computed:{
      ...mapState({
        tableData:state => state.invest.dnsData
      })
    },
    mounted(){
      this.getTableInfo();
    },
    methods: {
      //获取table数据
      getTableInfo(){
        let params_table = {
          ...this.params,
          ...this.pagation
        }
        console.log(params_table);
        this.loading = true;
        this.$store.dispatch('getDnsData',params_table)
          .then(resp => {
            if(resp) this.loading = false;
          });
      },
      //顶部tabs切换事件
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      //每页显示条数切换事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagation.rows = val;
        this.getTableInfo();
      },
      //页面切换事件
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagation.pageNow = val;
        this.getTableInfo();
      },
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/css/less/invest-common-pattern.less";
  @import "../../../assets/css/less/invest-common-table-pattern.less";
</style>
