<template>
  <div id="sandbox">
    <div class="container">
      <div class="top">
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
            <em>点击上传,</em>
            <span>请选择需要扫描上传的文件(最大100M)</span>
          </div>
        </el-upload>
      </div>
      <div class="sandbox_table">
        <el-table ref="multipleTable"
                  class="reset_table"
                  align="center"
                  :data="sandbox.data"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  @row-click="alert_detail">
          <el-table-column label="结果"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.res}}</span>
              <span></span>
            </template>
          </el-table-column>
          <el-table-column prop="time"
                           label="创建时间"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status"
                           label="扫描状态"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="name"
                           label='文件名'
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label='扫描详情'>
            <template slot-scope="scope">
              <img src="@/assets/images/common/download.png"
                   alt=""
                   @click.stop='download(scope.row)'>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <img src="@/assets/images/common/delete.png"
                   alt=""
                   @click.stop='del_box(scope.row)'>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination_box"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="sandbox.pageNow"
                       :page-sizes="[10,50,100]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next"
                       :total="sandbox.count">
        </el-pagination>
      </div>

    </div>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "sandbox",
  data () {
    return {
      sandbox: {
        data: [{
          res: '未发现威胁',
          time: '2019-12-03 12:36:48',
          name: 'sougou_pinyin_8.8.0.1814_6991.exe',
          status: '扫描结束',
        }],
        pageNow: 1,
        count: 1002,
      },
    };
  },
  mounted () {
    this.login();
    // this.get_list();
  },
  methods: {
    uploadSuccess () {

    },
    onBeforeUpload () {

    },
    onChange () {

    },
    handleSizeChange () { },
    handleCurrentChange () { },
    alert_detail () { },
    handleSelectionChange () { },
    get_list () {
      this.$axios.get('/yiiapi/ipsegment/list?page=1&rows=1')
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    login () {
      this.$axios.post('/api/yiiapi/site/login',
        {
          "LoginForm": {
            "username": 'admin',
            "password": 'Hoohoolab*123'
          },
          "login-button": ""

        }
      )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style scoped lang="less">
#sandbox {
  padding: 16px 0 16px 16px;
  .container {
    padding: 20px 36px 20px 20px;
    background: #fff;
    border-radius: 2px;
    .top {
      background: #f8f8f8;
      // height: 160px;
      margin-bottom: 16px;
      padding: 10px 500px;
      .upload_img {
        width: 72px;
        height: 72px;
        margin-top: 35px;
      }
    }
  }
}
</style>
<style lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
#sandbox {
  .upload-demo {
    // height: 160px;
    padding-bottom: 10px;
    .el-upload {
      height: 160px;
      .el-upload-dragger {
        height: 160px;
        border: 0;
        background: #f8f8f8;
        .el-upload__text {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>

