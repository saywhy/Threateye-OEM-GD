<template>
  <el-col class="vm-main-target">
    <el-tag class="vm-tag tag1">1.23.4.156</el-tag>
    <el-tag class="vm-tag tag2">202.106.195.68</el-tag>
    <el-tag class="vm-tag tag3">www.rasn.com</el-tag>
    <el-tag class="vm-tag tag4">/xpsl/verinwer.exe</el-tag>
    <el-tag class="vm-tag tag5">555.org.xlc.icmp</el-tag>
    <el-tag class="vm-tag tag1">1.23.4.156</el-tag>
    <el-tag class="vm-tag tag2">202.106.195.68</el-tag>
    <el-tag class="vm-tag tag3">www.rasn.com</el-tag>
    <el-tag class="vm-tag tag4">/xpsl/verinwer.exe</el-tag>
    <el-tag class="vm-tag tag5">555.org.xlc.icmp</el-tag>
  </el-col>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vm-main-target',
    data() {
      return {}
    }
  }
</script>
<style scoped lang="less">
  .vm-main-target{
    height: 100%;
    padding: 50px 0 10px;
    text-align: left;
    .vm-tag{
      background-color: #0288D1;
      display: inline-block;
      height: 38px;
      padding: 0 10px;
      margin-bottom: 8px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-width: 0;
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      white-space: nowrap;
      &.tag2{
        background-color: #CDDC39;
      }
      &.tag3{
        background-color: #4CAF50;
      }
      &.tag4{
        background-color: #00BCD4;
      }
      &.tag5{
        background-color: #F57C00;
      }
    }
  }
</style>
