<template>
  <div id="report-sending">
    <div class="r_top">
      <div class="r_content_top">
        <h3 class="title">报表发送</h3>
      </div>
      <el-form class="r_content_main">
        <el-row type="flex" class="r_main_list">
          <el-col :span="3"><span class="title">状态</span></el-col>
          <el-col :span="21"><div class="r_radio">
            <el-radio v-model="radio1" label="1" class="r_radio_item">启用</el-radio>
            <el-radio v-model="radio1" label="2" class="r_radio_item">停用</el-radio>
          </div></el-col>
        </el-row>
        <el-row type="flex" class="r_main_list">
          <el-col :span="3"><span class="title">发送周期</span></el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="radio2" label="1" class="r_radio_item">每日</el-radio>
              <el-radio v-model="radio2" label="2" class="r_radio_item">每周</el-radio>
              <el-radio v-model="radio2" label="3" class="r_radio_item">每月</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" class="r_main_list">
          <el-col :span="3"><span class="title">发送格式</span></el-col>
          <el-col :span="21"><div class="r_radio">
            <el-radio v-model="radio3" label="1" class="r_radio_item">Word</el-radio>
            <el-radio v-model="radio3" label="2" class="r_radio_item">Execl</el-radio></div>
          </el-col>
        </el-row>
        <el-row type="flex" class="r_main_list r_special_list">
          <el-col :span="3"><span class="title">发件人邮箱</span></el-col>
          <el-col :span="21">
            <div class="r_main_list_item">
              <el-input class="report-input" placeholder="" v-model="input" clearable>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <i class="r_item_icon r_icon_remove"></i>
            </div>
            <div class="r_main_list_item">
              <el-input class="report-input" placeholder="" v-model="input" clearable>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <i class="r_item_icon r_icon_add"></i>
            </div>
          </el-col>
        </el-row>
        <div class="r_btn_group">
          <el-button class="b_btn b_ok">确定</el-button>
          <el-button class="b_btn b_cancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: "report-sending",
    data() {
      return {
        value1: '',
        radio1: '1',
        radio2: '1',
        radio3: '1',
        input: ''
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/css/less/report_less/rewrite_radio.less";
  #report-sending {
    padding: 24px;
    .r_top {
      background: #fff;
      min-height: 900px;
      font-family: PingFangSC-Medium;
      .r_content_top{
        height: 80px;
        line-height: 80px;
        text-align: left;
        border-bottom: 1px solid #ececec;
        .title{
          font-size: 18px;
          color: #333333;
          font-weight: 600;
          padding: 0 24px;
        }
      }
      .r_content_main{
        padding: 0 24px;
        text-align: left;
        .r_main_list{
          height: 62px;
          line-height: 60px;
          border-bottom: 1px solid #ececec;
          .title{
            font-size: 14px;
            color: #333;
            font-weight: 600;
          }
          .r_radio{
            .r_radio_item{
              font-size: 14px;
              color: #333;
            }
          }
          &.r_special_list{
            border-width: 0;
            height: auto;
            min-height: 120px;
            position: relative;
            .r_main_list_item{
              .report-input{
                width: 340px;
              }
              .r_item_icon{
                height: 16px;
                width: 16px;
                display: inline-block;
                background-size: 16px;
                background-repeat: no-repeat;
                vertical-align: middle;
                &.r_icon_remove{
                  background-image: url("../../../assets/images/report/remove.png");
                }
                &.r_icon_add{
                  background-image: url("../../../assets/images/report/add.png");
                }
              }
            }
          }
        }
        .r_btn_group{
          text-align: right;
          height: 42px;
          z-index: 999;
          font-size: 0;
          /deep/
          .b_btn{
            width: 136px;
            height: 42px;
            font-size: 16px;
            vertical-align: text-bottom;
            border: 1px solid #0070FF;
            &.b_ok{
              background: #0070FF;
              color: #fff;
            }
            &.b_cancel{
              background: #fff;
              color: #0070FF;
              margin-left: 24px;
            }
          }
        }
      }
    }
  }
</style>
