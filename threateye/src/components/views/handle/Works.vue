<template>
 <div class="handle-works">
   <div class="handle-works-top common-invest">
     <div class="invest">
       <el-tabs v-model="activeName" @tab-click="handleClick">

         <!--我创建的-->
         <el-tab-pane label="我创建的" name="first">
            <vm-handle-works :owned="owned" v-if="childUpdate1"></vm-handle-works>
         </el-tab-pane>

         <!--分配给我的-->
         <el-tab-pane label="分配给我的" name="second">
           <vm-handle-works :owned="owned" v-if="childUpdate2"></vm-handle-works>
         </el-tab-pane>

         <!--所有工单-->
         <el-tab-pane label="所有工单" name="third">
           <vm-handle-works :owned="owned" v-if="childUpdate3"></vm-handle-works>
         </el-tab-pane>

       </el-tabs>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
  import VmHandleWorks from  './vm-handle/vm-handle-works'
  export default {
    name: "handle-works",
    data() {
      return {
        activeName: 'first',
        owned:'created',
        childUpdate1:true,
        childUpdate2:false,
        childUpdate3:false
      };
    },
    components:{
      VmHandleWorks
    },
    methods: {
      /*****************************/
      handleClick(tab, event) {
        let name = tab.name;
        if(name == "first"){
          this.owned = 'created';
          this.childUpdate1 = true;
          this.childUpdate2 = false;
          this.childUpdate3 = false;
        }else if(name == "second"){
          this.owned = 'distributed';
          this.childUpdate1 = false;
          this.childUpdate2 = true;
          this.childUpdate3 = false;
        }else if(name == "third"){
          this.owned = 'all';
          this.childUpdate1 = false;
          this.childUpdate2 = false;
          this.childUpdate3 = true;
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/invest-common-pattern.less";
  @import "../../../assets/css/less/invest-common-table-pattern.less";
  .handle-works{
    padding: 24px;
  }
</style>

