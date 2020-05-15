<template>
    <div class="vm-screen-middle0">
      <div class="risks">
        <dl class="item-list" v-for="(item,index) in riskData" :key="index">
          <dt class="name">{{item.name}}</dt>
          <dd class="content">
            <span class="item" v-for="(it,idx) in item.num" :key="idx">{{it}}</span>
            <!--<span class="item">1</span>
            <span class="item">9</span>
            <span class="item">8</span>
            <span class="item">7</span>
            <span class="item">3</span>-->
          </dd>
        </dl>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-middle0",
      data(){
          return{
            riskData:[{name:'风险资产数',num:[1,9,8,7,3]},
              {name:'外连资产数',num:[1,9,8,7,3]},
              {name:'告警数',num:[1,9,8,7,3]},
              {name:'未处理告警数',num:[1,9,8,7,3]}]
          }
      },
      mounted() {
        this.drawGraph();
      },
      methods:{
        drawGraph(){


        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle0{
  padding: 0 16px 16px;
  .risks{
    height: 80px;
    display: flex;
    .item-list{
      color: #fff;
      flex: 1;
      text-align: left;
      padding: 4px 0;
      .name{
        height: 28px;
      }
      .content{
        .item{
          margin-right: 2px;
          text-align: center;
          width: 24px;
          height: 40px;
          line-height: 40px;
          background-size: 24px 40px;
          background-repeat: no-repeat;
          display: inline-block;
          background-image: url("../../../../assets/images/screen/risk.png");
        }
      }
    }
  }
}
</style>
