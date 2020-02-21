<template>
  <div id="system_control_account"
       class="container">
    <div class="content_box">
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="用户管理"
                     class="tabs-item"
                     name="first">
          <user-management></user-management>
        </el-tab-pane>
        <el-tab-pane label="角色管理"
                     class="tabs-item"
                     name="second">
          <role-management></role-management>
        </el-tab-pane>
        <el-tab-pane label="用户安全策略"
                     class="tabs-item"
                     name="third">
          <security-policy></security-policy>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import userManagement from "@/components/views/system/setting/vm-account/user-management";
import roleManagement from "@/components/views/system/setting/vm-account/role-management";
import securityPolicy from "@/components/views/system/setting/vm-account/security-policy";
export default {
  components: {
    userManagement,
    roleManagement,
    securityPolicy
  },
  name: "system_control_account",
  data () {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick () { }
  }
};
</script>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_tab.less';
</style>
<style scoped lang='less'>
@import '../../../../assets/css/less/system/setting/common_box.less';
</style>

