<template>
    <div class="vm-screen-middle1">
      <vm-screen-map v-show="tabIndex==0"></vm-screen-map>
      <vm-screen-spread v-show="tabIndex==1"></vm-screen-spread>
      <!--<div id="spreader">
        <el-carousel trigger="click" :autoplay="false">
          <el-carousel-item>
            <vm-map></vm-map>
          </el-carousel-item>
          <el-carousel-item>
            222222222222222222
          </el-carousel-item>
        </el-carousel>
      </div>-->
      <ul class="tab-list">
        <li class="item" :class="{active:tabIndex==0}" @click="tabIndex=0"></li>
        <li class="item" :class="{active:tabIndex==1}" @click="tabIndex=1"></li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenMap from '../vm-screen-sup/vm-screen-map';
  import VmScreenSpread from '../vm-screen-sup/vm-screen-spread'
  export default {
      name: "vm-screen-middle1",
      data(){
          return{
            tabIndex:0 ,
            data:[]
          }
      },
      components:{
        VmScreenMap,
        VmScreenSpread
      },
      mounted() {

      },
      methods:{

      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle1{
  padding: 0 16px 16px;
  position: relative;
  height: 480px;
  .tab-list{
    width: calc(100% - 32px);
    position: absolute;
    bottom: 10px;
    z-index: 9999;
    .item{
      width: 8px;
      height: 4px;
      opacity: 0.48;
      background: #00D7E9;
      border-radius: 2px;
      cursor: pointer;
      display: inline-block;
      &.active{
        width: 24px;
        opacity: 1;
      }
    }

  }
}
</style>
