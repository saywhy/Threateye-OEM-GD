<template>
  <div id="system_control_react"
       class="container">
    <div class="content_box">
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="外部动态列表设置"
                     class="tabs-item"
                     name="first">
          <outside-set></outside-set>
        </el-tab-pane>
        <el-tab-pane label="外部动态列表"
                     class="tabs-item"
                     name="second">
          <outside-list></outside-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import outsideSet from "@/components/views/system/vm-react/outside-set";
import outsideList from "@/components/views/system/vm-react/outside-list";
export default {
  components: {
    outsideSet,
    outsideList
  },
  name: "system_control_react",
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
