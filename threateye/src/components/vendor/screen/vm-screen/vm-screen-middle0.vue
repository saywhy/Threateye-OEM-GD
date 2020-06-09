<template>
    <div class="vm-screen-middle0">
      <div class="risks">
        <dl class="item-list" v-for="(item,index) in riskData" :key="index">
          <dt class="name">{{item.name}}</dt>
          <dd class="content">
            <span class="item" v-for="(it,idx) in item.num" :key="idx">{{it}}</span>
          </dd>
          <i class="close" v-show="!close" @click="topdelClick(item.top_id);"></i>
        </dl>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-middle0",
      props:['topData','close'],
      data(){
          return {
            topFlag: true,
            riskData: [],
            timers: null
          }
      },
      created(){
        this.getData();
      },
      mounted() {
        this.timers = setInterval(()=>{
          this.getData();
        },10000 * 30);
      },
      destroyed(){
        clearInterval(this.timers);
      },
      watch:{
        topData: {
          handler:function(newVal,oldVal){
            if(!this.topFlag){this.getData();}
          },
          //深度监听
          deep:true,
        },
      },
      methods:{
        //获取数据
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/top-count')

            .then((resp) => {

              this.topFlag = false;

              let {status, data} = resp.data;

              if (status == 0) {

                let riskData = this.topData;

                riskData.map(item => {

                  for (let key in data) {

                    if(item.alias == key){

                      let count = String(data[key]).padStart(5,'0');
                      if(!item.num){
                        Object.assign(item,{num:count.toString().split('')});
                      }
                      //item.num = count.toString().split('');
                    }
                  }
                });

                this.riskData = riskData;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        //顶部内容点击删除
        topdelClick(id){
          this.$store.commit('SET_TOP_LISTS_ID', {id,id,flag:false});
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
