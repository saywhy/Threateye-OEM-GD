<template>
    <div class="detail-works" v-cloak v-loading="page_show">
      <back-title :title-name="title_name"></back-title>
      <div class="detail_base_top">
          <div class="top_left">
              <img class="top_left_img" src="@/assets/images/handle/others/works.png" alt="">
              <span class="top_left_title">基本信息</span>
          </div>
          <div class="top_right">
            <el-link target="_blank" :href="loadlinks">
              <el-button class="download_btn">下载</el-button>
            </el-link>
          </div>
      </div>
      <div class="detail_base_mid">
          <div class="bom_item" >
              <li>
                  <span class="title"><i class="b_i b_name"></i>工单名称：</span>
                  <span class="content">{{data.name}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>创建人：</span>
                  <span class="content">{{data.creator}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>经办人：</span>
                  <span class="content">{{data.new_perator}}</span>
              </li>
              <li>
                  <span class="title"><i class="b_i"></i>状态：</span>
                  <span class="content">{{data.status | work_status}}</span>
              </li>
          </div>
          <div class="bom_item">
              <li>
                  <span class="title">优先级：</span>
                <span class="content">{{data.priority | priority}}</span>
              </li>
              <li>
                  <span class="title">创建时间：</span>
                  <span class="content">{{data.created_at | time}}</span>
              </li>
              <li>
                  <span class="title">更新时间：</span>
                  <span class="content">{{data.updated_at | time }}</span>
              </li>
              <li>
                  <span class="title">备注：</span>
                  <span class="content">{{data.remarks}}</span>
              </li>
          </div>
      </div>
      <div class="detail_base_bom">
        <!-- tabs列表 -->
        <el-tabs v-model="activeName">

          <el-tab-pane :label="table.tabsFlag == 0?'资产':'告警'" class="tabs-item" name="first">
            <!-- 资产 -->
            <div v-show="table.tabsFlag == 0">
              <el-table ref="multipleTable" class="handle_table_detail"
                        tooltip-effect="dark"
                        :data="table.tableData">
                <el-table-column prop="asset_ip" label="资产" show-overflow-tooltip></el-table-column>
                <el-table-column prop="assets_group" label="资产组" show-overflow-tooltip></el-table-column>
                <el-table-column prop="category_group" label="关联威胁" show-overflow-tooltip></el-table-column>
                <el-table-column prop="degree" label="威胁等级" show-overflow-tooltip></el-table-column>
                <el-table-column label="失陷确定性">
                  <template slot-scope="scope">{{ scope.row.fall_certainty | certainty }}</template>
                </el-table-column>
                <el-table-column label="状态" width="80">
                  <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 告警 -->
            <div v-show="table.tabsFlag == 1">
              <el-table ref="multipleTable" class="handle_table_detail"
                        :data="table.tableData"
                        tooltip-effect="dark">
                <el-table-column label="告警时间" width="180" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
                </el-table-column>
                <el-table-column prop="category" label="告警类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip></el-table-column>
                <el-table-column prop="src_ip" label="源地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="dest_ip" label="目的地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="application" label="应用" show-overflow-tooltip></el-table-column>
                <el-table-column prop="degree" label="威胁等级" show-overflow-tooltip></el-table-column>
                <el-table-column prop="fall_certainty" label="失陷确定性" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.fall_certainty | certainty }}</template>
                </el-table-column>
                <el-table-column label="状态" width="80">
                  <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination class="handle_pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[5,10,20]"
                           :current-page="table.pageNow"
                           :page-size="table.eachPage"
                           :total="table.count"
                           layout="total, sizes, prev, pager, next">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="detail_base_cot">
        <div class="top_left">
          <img class="top_left_img" src="@/assets/images/handle/others/works.png" alt="">
          <span class="top_left_title">回复记录</span>
        </div>
      </div>
      <div class="detail_base_lst">
         <ul class="lit-list">
           <li class="item" v-for="item in table_reply.tableData" :key="item.id">
             <img class="lst_left_img" src="@/assets/images/handle/others/user.png" alt="">
             <span class="lst_left_title">{{item.username}}</span>
             <span class="lst_left_time"><i class="lst_time"></i>{{item.created_at | time}}</span>
             <p class="lst_left_content">{{item.comment}}</p>
           </li>
         </ul>
         <el-pagination class="detail_pagination"
                       @size-change="handleSizeChangeReply"
                       @current-change="handleCurrentChangeReply"
                       :current-page="table_reply.pageNow"
                       :page-sizes="[5,10,20]"
                       :page-size="table_reply.eachPage"
                       :total="table_reply.count"
                       layout="total, sizes, prev, pager, next">
        </el-pagination>
      </div>
      <div class="detail_base_fot">
        <textarea class="detail_works_reply" v-model="reply"></textarea>
      </div>
      <div class="detail_base_anw">
        <el-button class="detail_works_answer" @click="submitReplyClick">回复</el-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: "detail-works",
  components: {
    backTitle,
  },
  data() {
    return {
      id: 0,
      page_show:true,
      loadlinks:'/yiiapi/workorder/download?id=',
      title_name: "工单详情",
      activeName: 'first',
      data:{
        created_at:'1583753107',
        updated_at:'1583753107'
      },
      //资产or告警
      table: {
        tableData:[],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: [],
        loading: true,
        tabsFlag: 0
      },

      //回复记录table
      table_reply:{
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: []
      },
      //回复内容
      reply: ''
    };
  },

  created(){
    let newId = this.$route.query.id;
    this.id = newId;
    this.loadlinks += newId;

    this.get_list_works_detail();
    this.get_reply_works_detail();
  },


  methods: {
    //获取工单详情列表
    get_list_works_detail(){
      this.page_show = true;
      this.$axios.get('/yiiapi/workorder/details',
        {
          params: {
            id: this.id,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        })
        .then((resp) => {

          console.log(resp.data)

          let {status, data} = resp.data;

          if (status == 0) {

            //对经办人处理
            let attr = data.perator.map(x => {return x.perator});
            data.new_perator = attr.join(',');

            //顶部数据参数
            this.data = data;

            this.page_show = false;

            /**
            * 判断是资产还是告警
            * */
            if(data.risk_asset != '[]') {
              //是资产
              this.table.tabsFlag = 0;
              this.table.tableData = data.risk_asset.data;
              this.table.count = data.risk_asset.count;
              this.table.maxPage = data.risk_asset.maxPage;
              this.table.pageNow = data.risk_asset.pageNow;
            }

            if(data.alerts != '[]'){
              //是告警
              this.table.tabsFlag = 1;
              this.table.tableData = data.alerts.data;
              this.table.count = data.alerts.count;
              this.table.maxPage = data.alerts.maxPage;
              this.table.pageNow = data.alerts.pageNow;

              console.log(this.table.tableData)
            }
          }
        });
    },

    //回复记录列表
    get_reply_works_detail(){
      this.$axios.get('/yiiapi/workorder/reply-list',
        {
          params: {
            id: this.id,
            page: this.table_reply.pageNow,
            rows: this.table_reply.eachPage
          }
        })
        .then((resp) => {

          let {status, data} = resp.data;

          let datas = data;

          if (status == 0) {

            let {data, count, maxPage, pageNow} = datas;

            this.table_reply.tableData = data;
            this.table_reply.count = count;
            this.table_reply.maxPage = maxPage;
            this.table_reply.pageNow = pageNow;
          }
        });
    },

    /*********************************************/
    //每頁多少條切換
    handleSizeChange(val){
      this.table.eachPage = val;
      this.table.pageNow = 1;
      this.get_list_works_detail();
    },
    //頁數點擊切換
    handleCurrentChange(val){
      this.table.pageNow = val;
      this.get_list_works_detail();
    },
    /*********************************************/
    //每頁多少條切換(回复)
    handleSizeChangeReply(val) {
      this.table_reply.eachPage = val;
      this.table_reply.pageNow = 1;
      this.get_reply_works_detail();
    },

    //頁數點擊切換(回复)
    handleCurrentChangeReply(val) {
      this.table_reply.pageNow = val;
      this.get_reply_works_detail();
    },
    /*********************************************/

    //回复记录
    submitReplyClick(){
      this.$axios.post('/yiiapi/workorder/reply',
        {
          work_order_id: this.id,
          comment:this.reply
        })
        .then((resp) => {

          let {status, data} = resp.data;

          if (status == 0) {
            this.$message.success('提交成功。');
            this.reply = '';
            this.get_reply_works_detail();
          }
        });
    },

  }
};
</script>

<style scoped lang="less">
  .detail-works {
    text-align: left;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      background: #fff;
      position: relative;
      /*border-bottom: 1px solid #ececec;*/
      .top_left {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 46px;
        .top_left_img {
          vertical-align: middle;
          transform: scale(.5);
        }
        .top_left_title {
          font-family: PingFangSC-Medium;
          vertical-align: middle;
          font-size: 16px;
          color: #333333;
        }
      }
      .top_right {
        float: right;
        line-height: 62px;
        /deep/
        .el-link{
          &:after{
            border-bottom: 0 !important;
          }
          .download_btn {
            height: 34px;
            width: 116px;
            padding: 0;
            color: #fff;
            font-size: 14px;
            background: #0070ff;
            border: 1px solid #0070ff;
            font-family: PingFangSC-Medium;
          }
        }

      }
    }
    .detail_base_mid {
      padding: 24px 56px;
      background: #fff;
      display: flex;
      height: 247px;
      width: 100%;
      .bom_item {
        flex: 1;
        li {
          display: flex;
          margin-bottom: 16px;
          line-height: 36px;
          .title {
            width: 120px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            .b_i{
              width: 18px;
              height: 18px;
              display: inline-block;
              &.b_name{
                vertical-align: middle;
                background-repeat: no-repeat;
                background-size: 18px;
                background-image: url("../../../../assets/images/handle/others/works-name.png");
              }
            }
          }
          .content {
            flex: 1;
            font-size: 16px;
            color: #666666;
            .status {
              background: #eef6ff;
              border-radius: 2px;
              font-size: 10px;
              color: #999999;
              padding: 5px 14px;
            }
          }
        }
      }
    }
    .detail_base_bom {
      margin-top: 24px;
      /*height: 717px;*/
      height: auto;
      background: #fff;
      padding: 24px 56px;
      /deep/
      .el-tabs{
        .el-tabs__header{
          .el-tabs__nav-wrap{
            &:after{
              background-color:#EEF6FF;
            }
            .el-tabs__nav{
              /*line*/
              .el-tabs__active-bar{
                top: 0!important;
                width: 164px!important;
                background-color: #0070FF;
                transition: transform .1s cubic-bezier(.645,.045,.355,1),
                -webkit-transform .1s cubic-bezier(.645,.045,.355,1);
              }
              /*tabs*/
              .el-tabs__item{
                padding: 0!important;
                width: 164px;
                font-size: 14px;
                color: #bbb;
                text-align: center;
                &.is-active{
                  color: #0070FF;
                  background: #EEF6FF;
                }
              }
            }
          }
        }
        .el-tabs__content{
          /deep/
          .handle_table_detail {
            .el-table__header-wrapper{
              .el-table__header{
                thead.has-gutter{
                  th{
                    background: #F8F8F8;
                    height: 48px;
                    .cell{
                      color: #333;
                      font-size: 14px;
                      font-weight: bold;
                      font-family: PingFangSC-Medium;
                    }
                  }
                }
              }
            }
            .el-table__body-wrapper{
              .el-table__row {
                height: 48px;
              }
              td > .cell{
                .degree_box {
                  button {
                    height: 30px;
                    width: 72px;
                    padding: 0;
                    border: 0;
                  }
                }
                .high {
                  button {
                    background: #dc5f5f;
                  }
                }
                .mid {
                  button {
                    background: #e0c840;
                  }
                }
                .low {
                  button {
                    background: #47cad9;
                  }
                }
              }
            }
          }

          .handle_pagination_box {
            margin: 24px 0;
            text-align: center;
          }
        }

      }
    }
    .detail_base_cot {
        margin-top: 24px;
        padding: 0 56px;
        height: 62px;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #ececec;
        .top_left {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 46px;
          .top_left_img {
            vertical-align: middle;
            transform: scale(.5);
          }
          .top_left_title {
            font-family: PingFangSC-Medium;
            vertical-align: middle;
            font-size: 16px;
            color: #333333;
          }
        }
      }
    .detail_base_lst {
      /*height: 532px;*/
      height: auto;
      padding-bottom: 24px;
      background: #fff;
      .lit-list{
        margin: 0 56px;
        .item{
          height: 88px;
          position: relative;
          border-bottom: 1px solid #ececec;
          .lst_left_img{
            position: absolute;
            width: 34px;
            height: 34px;
            top: 16px;
            left: 16px;
          }
          .lst_left_title{
            position: absolute;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            text-align: center;
            width: 64px;
            height: 32px;
            bottom: 0;
            display: block;
          }
          .lst_left_time{
            position: absolute;
            left: 80px;
            top: 6px;
            font-size: 12px;
            color: #999999;
            font-family: PingFangSC-Regular;
            .lst_time{
              margin-right: 5px;
              height: 16px;
              width: 16px;
              background-repeat: no-repeat;
              display: inline-block;
              background-size: 16px;
              vertical-align: middle;
              margin-top: -2px;
              background-image: url("../../../../assets/images/handle/others/time.png");
            }
          }
          .lst_left_content{
            position: absolute;
            left: 80px;
            top: 34px;
            font-size: 14px;
            color: #333333;
            font-family: PingFangSC-Regular;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;  /*要显示的行数*/
            -webkit-box-orient: vertical;
          }
        }

      }
      .detail_pagination{
        text-align: center;
        padding-top: 24px;
      }
    }
    .detail_base_fot {
      margin: 24px 56px;
      height: 156px;
      background: #fff;
      .detail_works_reply{
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        resize:none;
        padding: 24px;
      }
    }

    .detail_base_anw{
      height: 42px;
      margin: 0 56px 36px 56px;
      text-align: right;
      /deep/
      .detail_works_answer{
        width: 148px;
        height: 42px;
        color: #fff;
        outline: none;
        font-size: 14px;
        background: #0070FF;
        font-family: PingFangSC-Medium;
      }
    }

}
</style>
