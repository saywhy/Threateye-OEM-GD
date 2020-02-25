<template>
  <div id="rule_base">
    <p class="title">实时更新</p>
    <p class="item_box">
      <span class="item_name">DF</span>
      <span class="item_time">上次更新时间：2019.11.25 15:23:56</span>
      <span class="item_status">成功</span>
    </p>
    <p class="item_box">
      <span class="item_name">IDS</span>
      <span class="item_time">上次更新时间：2019.11.25 15:23:56</span>
      <span class="item_status">成功</span>
    </p>
    <p class="item_box">
      <span class="item_name">SDK</span>
      <span class="item_time">上次更新时间：2019.11.25 15:23:56</span>
      <span class="item_status">成功</span>
    </p>
    <el-button type="primary"
               class="update">更新</el-button>
    <p class="title">离线更新</p>
    <p class="item_box">
      <span class="item_name">DF</span>
      <span class="item_time">上次更新时间：2019.11.25 15:23:56</span>
      <span class="item_status">成功</span>
    </p>
    <p class="item_box">
      <span class="item_name">IDS</span>
      <span class="item_time">上次更新时间：2019.11.25 15:23:56</span>
      <span class="item_status">成功</span>
    </p>
    <p class="item_box">
      <span class="item_name">SDK</span>
      <span class="item_time">上次更新时间：2019.11.25 15:23:56</span>
      <span class="item_status">成功</span>
    </p>
    <el-button type="primary"
               class="update"
               @click="open_box">上传更新文件</el-button>
    <el-dialog class="import_box pop_box"
               :visible.sync="rule.upload_pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_upload_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">上传更新文件</span>
      </div>
      <div class="content">
        <el-upload class="upload-demo"
                   :on-success="uploadSuccess"
                   :before-upload="onBeforeUpload"
                   :on-change="onChange"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
          <img class="upload_img"
               src="@/assets/images/setting/upload_s.png"
               alt="">
          <!-- <img class="upload_img" src="@/assets/images/setting/upload_e.png" alt=""> -->
          <div class="el-upload__text">
            <em>点击上传</em>
          </div>
        </el-upload>
        <div class="tip_box">
          <span>温馨提示：请上传文件名为sdk.tgz、ids.tgz、df.tgz、sandbox.tgz或yara.tgz的文件</span>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_upload_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "rule_base",
  data () {
    return {
      rule: {
        upload_pop: false
      }
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {

  },

  methods: {
    open_box () {
      this.rule.upload_pop = true;
    },
    closed_upload_box () {
      this.rule.upload_pop = false;
    },
    onBeforeUpload () {

    },
    onChange () {
    },
    uploadSuccess () {
      console.log("1111");
      this.monitor_state.import_loading = false;
    },

  }
};
</script>

<style scoped lang="less">
#rule_base {
  text-align: left;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    color: #333333;
    margin-bottom: 24px;
  }
  .item_box {
    margin-bottom: 16px;
    font-size: 14px;
    color: #333333;
    .item_name {
      display: inline-block;
      width: 90px;
    }
    .item_time {
      display: inline-block;
      width: 296px;
    }
  }
  .update {
    width: 136px;
    height: 42px;
    margin: 36px 0px 48px 0;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#rule_base {
  .el-dialog {
    width: 440px;
    .el-upload-dragger {
      border: 0;
      height: 140px;
      .upload_img {
        margin-top: 20px;
        width: 88px;
      }
    }
    .tip_box {
      font-size: 14px;
      color: #999999;
      margin: 24px 0;
      .download {
        color: #0070ff;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
