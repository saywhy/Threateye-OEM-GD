<template>
    <div class="vm_set_base">
      <el-form class="content" ref="form">
        <div class="section">
          <h3 class="name">我是基础设置</h3>
          <div class="form-item">
            <label class="title">大屏名称</label>
            <el-form-item>
              <el-input v-model="baseInfo.ScreenName" placeholder="请输入大屏名称"></el-input>
            </el-form-item>
            <el-divider></el-divider>
          </div>
          <div class="form-item">
            <label class="title">分支</label>
            <el-form-item class="e-form-item_branch" :key="$index"
                          v-for="(item,$index) in baseInfo.ExtraneousDistribution">
              <div class="item">
                <span class="title_sub">显示名称</span>
                <el-input v-model="item.name" placeholder="上汽荣威" class="input_special"></el-input>
              </div>
              <div class="divider"></div>
              <div class="item">
                <span class="title_sub">所在城市</span>
                <el-cascader placeholder="请选择地理位置"
                             v-model="item.cascader"
                             :options="area_array"
                             filterable
                             clearable>
                </el-cascader>
              </div>
              <i class="e-item-i e-item-add"></i>
              <i class="e-item-i e-item-delete" v-show="$index != 0"></i>
            </el-form-item>
          </div>
        </div>
        <!--<div class="section">
          <h3 class="name">轮播设置</h3>
          <div class="form-item">
            <label class="title">大屏名称</label>
            <el-form-item class="el-form-item_radio">
              <el-radio-group v-model="form.radio">
                <el-radio :label="1">不轮播</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>-->
        <div class="btn-group">
          <el-button class="btn btn_cacel" @click="click_screen_cancel();">取消</el-button>
          <el-button class="btn btn_ok" @click="click_screen_ok();">确认</el-button>
        </div>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
  import { pca, pcaa } from "area-data";
    export default {
      name: "vm-set-base",
      data() {
        return {
          area_array:[],
          baseInfo:{
            ScreenName:'',
            ExtraneousDistributionType:'',
            ExtraneousDistribution: [{name: "", cascader: []},
              {name: "", cascader: []},
              {name: "", cascader: []}
            ]
          }
        }
      },
      created(){
        this.getName();

        var options = []
        // 遍历省级
        Object.keys(pca[86]).forEach(function (key) {
          var obj = {}
          obj.id = key
          obj.value = pca[86][key]
          obj.label = pca[86][key]
          obj.children = []
          options.push(obj)
        });
        // 添加市级
        options.forEach(element => {
          Object.keys(pca).forEach(function (key) {
            if (element.id == key) {
              Object.keys(pca[key]).forEach(function (item) {
                var obj = {}
                obj.value = pca[key][item]
                obj.label = pca[key][item]
                element.children.push(obj)
              })
            }
          });
        });
        this.area_array = options;
      },
      methods:{
        //获取大屏名称
        getName () {
          this.$axios
            .get('/yiiapi/demonstration/get-base-config')

            .then((resp) => {

              let {status, data} = resp.data;

              console.log(data)
            })
            .catch((error) => {

              console.log(error);

            });
        },
      }
    }
</script>

<style scoped lang="less">
.vm_set_base{
  margin-left:12px;
  background: #fff;
  padding: 0 36px 0 24px;
  height: calc(100vh - 64px);
  /deep/
  .content{
    .section{
      padding: 20px 0;
      .name{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        text-align: left;
        font-weight: bold;
      }
      .form-item{
        text-align: left;
        .title{
          font-size: 12px;
          color: #999999;
          margin: 30px 0 12px;
          display: block;
          font-family: PingFangSC-Regular;
        }
        .el-divider--horizontal{
          width: 788px;
          &.el-divider{
            background-color: #ececec;
          }
        }
        .el-form-item{
          text-align: left;
          width: 788px;
          position: relative;
          .el-form-item__content{
            display: flex;
            .title{
              display: block;
            }
            .item {
              flex: 1;
              .title_sub {
                display: inline-block;
                width: 70px;
                line-height: 42px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
              }
              .input_special{
                width: auto;
                float: right;
                .el-input__inner{
                  width: 280px;
                  height: 42px;
                }
              }
              /deep/
              .el-cascader{
                float: right;
                width: 280px;
              }
            }
            .divider{
              width: 60px;
            }
            .el-radio-group{
              .el-radio__label{
                color: #333;
              }
            }
          }
          .e-item-i{
            position: absolute;
            top: 12px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            &.e-item-add{
              right: -30px;
              background-image: url("../../../../assets/images/screen/set-add.png");
            }
            &.e-item-delete{
              right: -60px;
              background-image: url("../../../../assets/images/screen/set-delete.png");
            }
          }
          &.el-form-item_radio{
            margin-top: 20px;
          }
        }
      }
    }
    .btn-group {
      width: 788px;
      text-align: right;
      /deep/
      .btn {
        margin: 9px 0;
        border: 1px solid #0070FF;
        width: 136px;
        height: 38px;
        line-height: initial;
        border-radius: 0;
        font-size: 16px;
        padding: 0;
        font-family: PingFangSC-Regular;
        &.btn_cacel {
          background: #fff;
          color: #0070FF;
          margin-right: 10px;
        }
        &.btn_ok {
          background: #0070FF;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
