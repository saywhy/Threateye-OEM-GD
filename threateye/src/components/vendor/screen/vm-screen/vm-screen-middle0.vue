<template>
    <div class="vm-screen-middle0">
      <div class="risks">
        <dl class="item-list" v-for="(item,index) in riskData" :key="index">
          <dt class="name">{{item.name}}</dt>
          <dd class="content">
            <span class="item" v-for="(it,idx) in item.num" :key="idx">{{it}}</span>
          </dd>
          <i class="close" v-show="!close" @click="closeTops(item.top_id);"></i>
        </dl>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-middle0",
      props:['data','close'],
      data(){
          return {}
      },
      computed:{
        riskData(){
          let riskData = this.data;
          riskData.map(item => {
            Object.assign(item,{num:item.count.toString().split('')});
          });
          return riskData;
        }
      },
      created(){
        this.$store.dispatch('getScreenTop');
      },
      methods:{
        closeTops(id){
          this.$store.commit('SCREEN_TOP_ID_FALSE', id);
        },
      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle0{
  padding: 0 16px 16px;
  .risks{
    height: 84px;
    .item-list{
      color: #fff;
      width: 192px;
      text-align: left;
      padding: 2px 0;
      position: relative;
      display: inline-block;
      .name{
        height: 28px;
        line-height: 32px;
      }
      .content{
        .item{
          margin-top: 2px;
          margin-right: 3px;
          text-align: center;
          width: 28px;
          height: 40px;
          font-size: 24px;
          line-height: 40px;
          background-size: 28px 40px;
          background-repeat: no-repeat;
          display: inline-block;
          font-family: "LcdD";
          background-image: url("../../../../assets/images/screen/risk.png");
        }
      }
      .close{
        position: absolute;
        left: 132px;
        top: 8px;
        width: 20px;
        height: 20px;
        background-image: url("../../../../assets/images/screen/head-close.png");
        background-repeat: no-repeat;
        background-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
