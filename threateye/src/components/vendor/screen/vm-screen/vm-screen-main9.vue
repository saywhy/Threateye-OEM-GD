<template>
    <div class="vm-screen-main9">
      <el-table :data="tableData" class="screen-table">
        <el-table-column label="告警时间" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.alert_time | time }}
          </template>
        </el-table-column>
        <el-table-column prop="category" label="告警类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="indicator" label="威胁指标" show-overflow-tooltip></el-table-column>
        <el-table-column prop="asset_ip" label="风险资产" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="attack_stage" label="攻击阶段" show-overflow-tooltip></el-table-column>-->
      </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main9",
      data(){
          return{
            tableData: []
          }
      },
      created() {
        this.getData();
      },
      methods:{
        //获取数据
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/threat-range')

            .then((resp) => {

              let {status, data} = resp.data;

              //console.log(resp.data)

              if(status == 0){

                this.tableData = data;
              }

            })
            .catch((error) => {

              console.log(error);

            });
        },
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main9{
  padding: 0 16px 16px;
  /deep/
  .screen-table{
    background-color: transparent!important;
    &:before{
      height: 0;
    }
    .el-table__header{
      th{
        /*background: rgba(0,215,233,0.24);*/
        border-width: 0;
        padding: 0;
        height: 36px;
        line-height: 36px;
        background: #034061;
        .cell{
          color: #fff;
        }
      }
    }
    .el-table__body{
      td{
        border-width: 0;
        padding: 0;
        height: 40px;
        line-height: 40px;
        background: #00134A;
        .cell{
          color: #fff;
        }
      }
    }
  }
}
</style>
