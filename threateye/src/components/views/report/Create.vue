<template>
  <div id="report_create">
    <div class="r_top">
      <div class="r_content_top">
        <h3 class="title">报表生成</h3>
      </div>
      <el-form class="r_content_main">
        <el-row type="flex" class="r_main_list">
          <el-col :span="3"><span class="title">事件范围</span></el-col>
          <el-col :span="21">
            <div class="r_time">
              <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" class="r_main_list">
          <el-col :span="3"><span class="title">发送格式</span></el-col>
          <el-col :span="21">
            <div class="r_radio">
              <el-radio v-model="radio" label="1" class="r_radio_item">Word</el-radio>
              <el-radio v-model="radio" label="2" class="r_radio_item">Execl</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" class="r_main_list r_special_list">
          <el-col :span="3"><span class="title">报表名称</span></el-col>
          <el-col :span="21">
            <el-input class="report-input" placeholder="请输入报表名称" v-model="input" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <div class="r_btn_group">
            <el-button class="b_btn b_ok">确定</el-button>
            <el-button class="b_btn b_cancel">取消</el-button>
          </div>
        </el-row>
      </el-form>
    </div>
    <div class="r_middle">
      <div class="r_btn_middle_group">
        <el-button class="b_btn b_download">下载</el-button>
        <el-button class="b_btn b_delete">删除</el-button>
      </div>
    </div>
    <div class="r_bottom">
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table
            class="common-table" ref="multipleTable" :data="tableData"
            style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column label="全选" width="40"></el-table-column>
            <el-table-column align='left' type="selection" width="40"></el-table-column>
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="frame" label="时间范围"></el-table-column>
            <el-table-column prop="form" label="格式"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="e-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :page-size="pagation.rows"
            :total="tableData.length"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VmEmergePicker from "@/components/common/vm-emerge-picker";
  export default {
      name: "report_create",
      data(){
        return{
          value1: '',
          radio: '1',
          input:'',
          tableData:[
            {
              id:"01",
              date: "2019-1-13",
              name: "运行报表",
              frame: "2018-12-20 至 2019-1-13",
              form: "Word"
            },
            {
              id:"02",
              date: "2019-1-13",
              name: "运行报表",
              frame: "2018-12-20 至 2019-1-13",
              form: "Word"
            }
          ],
          pagation:{
            pageNow: 1,
            rows:10
          }
        }
      },
      components:{VmEmergePicker},
      methods:{
        changeTime(data) {
          console.log(data);
          console.log(data[0].valueOf());
          console.log(data[1].valueOf());
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
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../../assets/css/less/report_less/rewrite_radio.less";
  @import "../../../assets/css/less/common-table-pattern.less";
  #report_create{
    padding: 24px;
    .r_top{
      background: #fff;
      font-family: PingFangSC-Medium;
      border-bottom: 1px solid #ececec;

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
          .r_time{
            line-height: 58px;
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
            min-height: 164px;
            position: relative;
            .report-input{
              width: 240px;
            }
            .r_btn_group{
              position: absolute;
              right: 0;
              bottom: 24px;
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
    }
    .r_middle{
      height: 90px;
      width: 100%;
      background: #fff;
      position: relative;
      text-align:left;
      padding: 0 24px;
      .r_btn_middle_group{
        position: absolute;
        top: 24px;
        height: 42px;
        z-index: 999;
        font-size: 0;
        .b_btn{
          width: 148px;
          height: 42px;
          font-size: 16px;
          vertical-align: text-bottom;
          border: 1px solid #0070FF;
          &.b_download{
            background: #0070FF;
            color: #fff;
          }
          &.b_delete{
            background: #fff;
            color: #0070FF;
            margin-left: 8px;
          }
        }
      }
    }
    .r_bottom{
      background: #fff;
      padding: 0 24px;
      min-height: 441px;
    }
  }
</style>
