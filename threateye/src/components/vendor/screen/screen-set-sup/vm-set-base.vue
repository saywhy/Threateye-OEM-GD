<template>
    <div class="vm_set_base">
      <el-form class="content" ref="form" :model="form">
        <div class="section">
          <h3 class="name">我是基础设置</h3>
          <div class="form-item">
            <label class="title">大屏名称</label>
            <el-form-item>
              <el-input v-model="form.name" placeholder="iView态势感知系统"></el-input>
            </el-form-item>
            <el-divider></el-divider>
          </div>
          <div class="form-item">
            <label class="title">总部</label>
            <el-form-item>
              <div class="item">
                <span class="title_sub">显示名称</span>
                <el-input v-model="form.name1" placeholder="上汽荣威" class="input_special"></el-input>
              </div>
              <div class="divider"></div>
              <div class="item">
                <span class="title_sub">所在城市</span>
                <el-select v-model="form.region" placeholder="请选择区域" class="input_special">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
          <div class="form-item">
            <label class="title">分支</label>
            <el-form-item class="e-form-item_branch">
              <div class="item">
                <span class="title_sub">显示名称</span>
                <el-input v-model="form.name1" placeholder="上汽荣威" class="input_special"></el-input>
              </div>
              <div class="divider"></div>
              <div class="item">
                <span class="title_sub">所在城市</span>
                <el-select v-model="form.region" placeholder="请选择区域" class="input_special">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </div>
              <i class="e-item-i e-item-add"></i>
              <i class="e-item-i e-item-delete"></i>
            </el-form-item>
            <el-form-item class="e-form-item_branch">
              <div class="item">
                <span class="title_sub">显示名称</span>
                <el-input v-model="form.name1" placeholder="上汽荣威" class="input_special"></el-input>
              </div>
              <div class="divider"></div>
              <div class="item">
                <span class="title_sub">所在城市</span>
                <el-select v-model="form.region" placeholder="请选择区域" class="input_special">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </div>
              <i class="e-item-i e-item-add"></i>
              <i class="e-item-i e-item-delete"></i>
            </el-form-item>
          </div>
        </div>
        <div class="section">
          <h3 class="name">轮播设置</h3>
          <div class="form-item">
            <label class="title">大屏名称</label>
            <el-form-item class="el-form-item_radio">
              <el-radio-group v-model="form.radio">
                <el-radio :label="1">不轮播</el-radio>
                <el-radio :label="2">每十分钟</el-radio>
                <el-radio :label="3">每半小时</el-radio>
                <el-radio :label="4">每一小时</el-radio>
                <el-radio :label="5">每天</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-set-base",
      data() {
        return {
          form: {
            name: '',
            name1: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            radio: 1
          }
        }
      }
    }
</script>

<style scoped lang="less">
.vm_set_base{
  margin-left:12px;
  background: #fff;
  padding: 0 36px 0 24px;
  height: 100%;
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
  }
}
</style>
