<template>
  <div id="system_control_electric"
       class="container">
    <div class="content_box">
      <div class="network_tab">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 class="reset_tab">
          <el-tab-pane label="网卡配置"
                       class="tabs-item"
                       name="first">
            <network-card></network-card>
          </el-tab-pane>
          <el-tab-pane label="代理服务器"
                       class="tabs-item"
                       name="second">
            <proxy-server></proxy-server>
          </el-tab-pane>
          <el-tab-pane label="路由设置"
                       class="tabs-item"
                       name="third">
            <router-set></router-set>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import networkCard from "@/components/views/system/vm-electric/network-card";
import proxyServer from "@/components/views/system/vm-electric/proxy-server";
import routerSet from "@/components/views/system/vm-electric/router-set";
export default {
  components: {
    networkCard,
    proxyServer,
    routerSet
  },
  name: "system_control_electric",
  data () {
    return {
      activeName: "first"
    };
  },
  mounted () {
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab.label);
    },

  }
};
</script>
<style lang='less'>
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>
<style scoped lang='less'>
@import '../../../assets/css/less/system/setting/common_box.less';
</style>


