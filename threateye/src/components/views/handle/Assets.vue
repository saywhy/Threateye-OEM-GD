<template>
  <div class="handle-assets" v-cloak>
    <vm-handle-tabs :data_top="data_top" v-if="data_top_show"></vm-handle-tabs>
    <!--全部资产-->
    <div class="assets_all">
      <el-row class="assets_all_list">
        <h3 class="title">全部资产</h3>
        <div class="all_list">
          <el-tag
            v-for="tag in assets_all.tags"
            :key="tag.name"
            closable
            size="small"
            type=""
            effect="plain"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>

        <el-button class="assets-toggle" @click="toggle_top_show = !toggle_top_show">
          <span class="name">收起更多</span>
          <i class="icons" :class="{'top_down':!toggle_top_show}"></i>
        </el-button>
      </el-row>
      <el-row class="assets_all_detail" v-show="toggle_top_show">
         <ul class="all_detail">
           <li class="all_detail_item" v-for="(item,$index) in assets_all.base" :key="$index">
             <h4 class="title">{{item.name}}：</h4>
             <div class="detail_list">
               <el-button class="d_base_btn" size="small" :key="$idx" v-for="(it,$idx) in item.value">{{it}}</el-button>
             </div>
             <div class="detail-toggle">
               <label class="tog-types" v-if="$index == 0"
                      v-show="assets_all.base[0].value.length > 15">
                 <span class="name">更多</span>
                 <i class="icons"></i>
               </label>
               <label class="tog-types" v-if="$index == 1"
                      v-show="assets_all.base[1].value.length > 15">
                 <span class="name">更多</span>
                 <i class="icons"></i>
               </label>
               <label class="tog-types" v-if="$index == 2"
                      v-show="assets_all.base[2].value.length > 15">
                 <span class="name">更多</span>
                 <i class="icons"></i>
               </label>
               <label class="tog-types" v-if="$index == 3"
                      v-show="assets_all.base[3].value.length > 15">
                 <span class="name">更多</span>
                 <i class="icons"></i>
               </label>
             </div>
           </li>
         </ul>
      </el-row>
    </div>

    <!--风险资产-->
    <div class="assets_risk">
      <el-form class="common-pattern">
        <h3 class="title">风险资产</h3>
        <el-row class="common_box" style="padding: 15px 0;">
          <el-col :span="24" class="common_box_list">
            <el-input class="s_key" placeholder="搜索关键词" v-model="params.key" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-select class="s_key" v-model="params.threat" clearable placeholder="关联威胁">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select class="s_key" v-model="params.rank" clearable placeholder="风险等级">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select class="s_key" v-model="params.status" clearable placeholder="处理状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-button class="s_btn">搜索</el-button>
            <el-link class="s_link">重置</el-link>
          </el-col>
        </el-row>
        <el-row class="common_btn">
          <el-col :span="24" class="common_btn_list">
            <el-dropdown trigger="click" placement='bottom-start' size='148'>
              <el-button type="primary" class="b_btn b_btn_status">
                <span>状态变更</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                <el-dropdown-item command="处置中" class="select_item">处置中</el-dropdown-item>
                <el-dropdown-item command="已忽略" class="select_item">已忽略</el-dropdown-item>
                <el-dropdown-item command="误报" class="select_item">误报</el-dropdown-item>
                <el-dropdown-item command="已处置" class="select_item">已处置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown placement='bottom-start' trigger="click">
              <el-button type="primary" class="b_btn b_btn_status">
                <span>工单任务</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="dropdown_ul_box">
                <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
                <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table
            class="common-table"
            ref="multipleTable"
            :data="table.tableData"
            @row-click="detailClick"
            @selection-change="handleSelectionChange">
            <el-table-column label="全选" width="40"></el-table-column>
            <el-table-column align='left' type="selection" width="40"></el-table-column>
            <el-table-column prop="asset" label="资产"></el-table-column>
            <el-table-column prop="asset_group" label="资产组"></el-table-column>
            <el-table-column prop="threat" label="关联威胁"></el-table-column>
            <el-table-column prop="rank" label="威胁等级"></el-table-column>
            <el-table-column prop="fall" label="失陷确定性"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="e-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :page-size="10"
            :total="table.tableData.length"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const qs = require('qs');
  import VmHandleTabs from "./vm-handle/vm-handle-tabs";
  export default {
    name: 'assets',
    components: {
      VmHandleTabs
    },
    data() {
      return {
        //頂部數據
        data_top:{},
        data_top_show:false,
        assets_all:{
          tags:['服务器','终端','网络设备'],
          base:[
              {name:'基础分类',value:['服务器','终端','网络设备','服务器','终端','网络设备','网络设备','服务器','网络设备','服务器','网络设备','服务器','终端','网络设备','网络设备','网络设备','服务器','网络设备','服务器']},
              {name:'业务',value:['业务1','业务2','业务3','业务4','业务5','业务6','业务7','业务8','业务9']},
              {name:'分支',value:['分支1','分支2','分支3','分支4','分支5','分支6','分支7','分支8','分支9']},
              {name:'部门',value:['部门1','部门2','部门3','部门4','部门5','部门6','部门7','部门8','部门9']}
            ]
        },
        toggle_top_show:true,
        toggle_1_show:false,
        toggle_2_show:false,
        toggle_3_show:false,
        toggle_4_show:false,
        params: {
          key: "",
          rank:"",
          threat: "",
          status: "",
        },
        options: [
          {
            value: "1",
            label: "恶意程序"
          },
          {
            value: "2",
            label: "漏洞利用"
          },
          {
            value: "3",
            label: "恶意文件通讯"
          },
          {
            value: "4",
            label: "僵尸网络C&C"
          },
          {
            value: "5",
            label: "恶意地址"
          }
        ],
        table: {
          tableData: [
            {
              id: 3,
              asset: "恶意地址",
              asset_group: "服务器",
              threat: "恶意地址",
              rank: "高危 ",
              fall: "— —",
              status: "待处置"
            }
          ],
          count:0,
          maxPage:0,
          pageNow: 1,
          multipleSelection: [],
        }
      };
    },
    created() {
      //頂部
      this.get_list_top();

      //全部資產
      this.get_list_all();

      //風險資產
      this.get_list_risk();
    },
    methods: {
      //頂部
      get_list_top(){
        this.$axios.get('/api/yiiapi/alert/risk-asset-top')
          .then((resp) => {
            let data = resp.data.data;
            this.data_top = data;
            this.$set(this.data_top,data);
            this.data_top_show = true;
          })
      },

      //全部資產列表
      get_list_all(){
        this.$axios.get('/api/yiiapi/alert/all-asset-labels')
          .then((resp) => {
           // console.log(resp)

            let { status,data } = resp.data;
            let datas = data;

            if(status == 0){
              let data = datas;
              this.assets_all.base[0].value = data[0];
              this.assets_all.base[1].value = data[1];
              this.assets_all.base[2].value = data[2];
              this.assets_all.base[3].value = data[3];
            }
          });
      },

      //風險資產列表
      get_list_risk(){
        this.$axios.get('/api/yiiapi/alert/risk-asset',
          {
            params:{
              label:'["终端","bb"]',
              key_word:'终端',
              fall_certainty:1,
              degree:'高',
              page:1,
              rows:10
            },
            paramsSerializer: function(params) {
              return qs.stringify(params, {arrayFormat: 'repeat'})
            }
          })
          .then((resp) => {
           // console.log(resp)

            let { status,data } = resp.data;
            let datas = data;

            if(status == 0){
              let {data, count, maxPage,pageNow } = datas;
              this.table.tableData = data;
              this.table.count = count;
              this.table.maxPage = maxPage;
              this.table.pageNow = pageNow;
            }
          });
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      handleClose(tag) {
        this.assets_all.tags.splice(this.assets_all.tags.indexOf(tag), 1);
      },
      /************************************/
      detailClick(row, column, event) {
        this.$router.push({path: '/detail/assets', query: {id: row.id}});
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/common-pattern.less";
  @import "../../../assets/css/less/common-table-pattern.less";
  .handle-assets {
    padding: 24px;
    .assets_all {
      height: auto;
      background: #fff;
      border-radius: 4px;
      margin-top: 30px;
      .assets_all_list{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ececec;
        display: flex;
        position: relative;
        .title{
          width: 120px;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          font-family: PingFangSC-Medium;
        }
        .all_list{
          flex: 1;
          text-align: left;
          /deep/
          .el-tag{
            border-radius:2px;
            margin-right: 5px;
            border-style: dashed;
          }
        }
        /deep/
        .assets-toggle{
          position: absolute;
          bottom: 0;
          right: 0;
          height: 34px;
          width: 124px;
          line-height: 0;
          border-width: 0;
          background: #F8F8F8;
          text-align: center;
          .name{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
          }
          .icons{
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 0px -2px;
            background-image: url("../../../assets/images/handle/others/tog-top-down.png");
            &.top_down{
              background-position: 0px -4px;
              background-image: url("../../../assets/images/handle/others/tog-top.png");
            }
          }
        }
      }
      .assets_all_detail{
        background: #ccc;
        font-family: PingFangSC-Regular;
        .all_detail{
          .all_detail_item{
            display: flex;
            height: 100%;
            .title{
              width: 120px;
              display: inline-block;
              background: #F8F8F8;
              font-size: 14px;
              color: #333;
              text-align: left;
              padding-top: 12px;
              padding-left: 20px;
            }
            .detail_list{
              flex: 1;
              text-align: left;
              padding:  0 3px;
              /*line-height: 32px;*/
              /*padding: 8px 10px;*/
              background: #fff;
              border-bottom: 1px solid #ececec;
              height: 40px;
              overflow-y: hidden;
              display: inline-block;
              font-size: 0;
              /deep/
              .d_base_btn{
                width: 88px;
                height: 28px;
                line-height: 10px;
                margin: 6px 3px 6px 3px;
              }
            }
            .detail-toggle{
              width: 80px;
              background: #fff;
              position: relative;
              border-bottom: 1px solid #ececec;
              .tog-types{
                position: absolute;
                top: 9px;
                left: 9px;
                .name{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #0070FF;
                  display: inline-block;
                }
                .icons{
                  width: 16px;
                  height: 16px;
                  display: inline-block;
                  vertical-align: middle;
                  background-repeat: no-repeat;
                  background-size: 16px;
                  background-position: 0px -2px;
                  background-image: url("../../../assets/images/handle/others/tog-types-down.png");
                }
              }
            }
            &:last-child{
              .detail_list{
                border-width: 0;
              }
              .detail-toggle{
                border-width: 0;
              }
            }
          }
        }
      }
    }
    .assets_risk{
      border-radius: 4px;
      margin-top: 20px;
      padding: 20px 24px;
      height: auto;
      background: #fff;
      text-align: left;
    }
  }
</style>
