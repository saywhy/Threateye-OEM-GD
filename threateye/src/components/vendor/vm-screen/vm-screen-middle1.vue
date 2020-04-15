<template>
    <div class="vm-screen-middle1">
      <vm-map></vm-map>
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
    </div>
</template>

<script type="text/ecmascript-6">
  import VmMap from '../vm-screen-sup/BMap'
    export default {
      name: "vm-screen-middle1",
      data(){
          return{
            data:[]
          }
      },
      components:{VmMap},
      mounted() {

      },
      methods:{

      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle1{
  padding: 0 16px 16px;
  #spreader{
    width: 100%;
    height: 460px;
    /deep/
    .el-carousel{
      height: 460px;
      .el-carousel__container{
        height: 460px;
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }
        .el-carousel__item:nth-child(2n+1) {
          background-color: #d3dce6;
        }
      }

    }

  }
}
</style>
