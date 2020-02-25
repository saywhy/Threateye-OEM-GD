<template>
  <div id="system_control_record"
       class="container">
    <div class="content_box">
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="审计日志"
                     class="tabs-item"
                     name="first">
          <audit-log></audit-log>
        </el-tab-pane>
        <el-tab-pane label="SYSLOG配置"
                     class="tabs-item"
                     name="second">
          <syslog-set></syslog-set>
        </el-tab-pane>
        <el-tab-pane label="故障日志"
                     class="tabs-item"
                     name="third">
          <fault-log></fault-log>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import auditLog from "@/components/views/system/vm-record/audit-log";
import faultLog from "@/components/views/system/vm-record/fault-log";
import syslogSet from "@/components/views/system/vm-record/syslog-set";
export default {
  components: {
    auditLog,
    faultLog,
    syslogSet
  },
  name: "system_control_record",
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
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>
<style scoped lang='less'>
@import '../../../assets/css/less/system/setting/common_box.less';
</style>
