<template>
  <div id="equipment">
    <div class="container">
      <div class="top">
        <div class="left item">
          <div class="item_left">
            <img class="img_box"
                 src="@/assets/images/setting/yq.png"
                 alt="">
          </div>
          <div class="item_right">
            <p class="item_right_title left_title">引擎</p>
            <p class="">
              <span class="green"></span>
              <span>在线：2台</span>
              <span class="red"></span>
              <span>离线：0台</span>
            </p>
          </div>
        </div>
        <div class="mid item">
          <div class="item_left">
            <img class="img_box"
                 src="@/assets/images/setting/tz.png"
                 alt="">
          </div>
          <div class="item_right">
            <p class="item_right_title ">探针</p>
            <p class="">
              <span class="green"></span>
              <span>在线：2台</span>
              <span class="red"></span>
              <span>离线：0台</span>
            </p>
          </div>
        </div>
        <div class="right item">
          <div class="item_left">
            <img class="img_box"
                 src="@/assets/images/setting/sb.png"
                 alt="">
          </div>
          <div class="item_right">
            <p class="item_right_title ">沙箱</p>
            <p class="">
              <span class="green"></span>
              <span>在线：2台</span>
              <span class="red"></span>
              <span>离线：0台</span>
            </p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btn_box">
          <el-button type="primary"
                     class="btn_i"
                     @click="add_equipment">新增</el-button>
          <el-button type="primary"
                     class="btn_o">删除</el-button>
        </div>
        <div class="equipment_table">
          <el-table ref="multipleTable"
                    class="reset_table"
                    align="center"
                    :data="equipment.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    @row-click="alert_detail">
            <el-table-column label="全选"
                             prop=""
                             width="50">
            </el-table-column>
            <el-table-column type="selection"
                             width="50">
            </el-table-column>
            <el-table-column prop="index"
                             label="序号"
                             width="50"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name"
                             label="设备名称"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="type"
                             label="设备类型"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ip"
                             label="设备IP"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ip"
                             label="设备状态"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="设备状态">
              <template slot-scope="scope">
                <span :class="scope.row.status=='正常'?'green':'red_s'"></span>
                <span v-if="scope.row.status=='正常'">{{scope.row.status}}</span>
                <el-popover placement="top"
                            width="60"
                            content="设备异常"
                            trigger="hover"
                            v-if="scope.row.status!='正常'">
                  <span slot="reference">{{scope.row.status}}</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="equipment.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="equipment.count">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增设备 -->
    <el-dialog class="add_box pop_box"
               :visible.sync="equipment_pop.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">新增设备</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">设备名称</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入设备名称"
                    v-model="equipment_pop.name"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">设备类型</span>
          </p>
          <el-select class="select_box"
                     v-model="equipment_pop.type"
                     placeholder="请选择设备类型">
            <el-option v-for="item in equipment_pop.type_list"
                       :key="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="content_item">
          <p>
            <span class="title">设备IP</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入设备IP"
                    v-model="equipment_pop.ip"
                    clearable>
          </el-input>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_list">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: "system_control_orient",
    data () {
      return {
        equipment: {
          data: [{
            index: '01',
            name: 'SAVDNW_SDD345_MDSSS',
            type: '引擎',
            ip: '192.168.234.1',
            status: '正常',
          }, {
            index: '01',
            name: 'SAVDNW_SDD345_MDSSS',
            type: '引擎',
            ip: '192.168.234.1',
            status: '异常',
          }
          ],
          pageNow: 1,
          count: 1002,
        },
        equipment_pop: {
          show: false,
          name: '',
          type: '',
          type_list: [
            { name: '引擎' },
            { name: '沙箱' },
            { name: '探针' },
          ],
          ip: '',
        }
      };
    },
    mounted () {
      this.get_data();
    },
    methods: {
      get_data () {
        this.$axios.get('/api/yiiapi/dev/list')
          .then(response => {
            console.log('333333333')
             console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      },
      handleSizeChange () {
      },
      handleCurrentChange () {
      },
      handleSelectionChange () {
      },
      alert_detail () {
      },
      add_equipment () {
        this.equipment_pop.show = true
      },
      closed_add_box () {
        this.equipment_pop.show = false
      },
      add_list () {

      }

    }


  }
</script>

<style scoped lang="less">
  #equipment {
    text-align: left;
    padding: 16px 36px 20px 16px;
    .container {
      .red {
        width: 8px;
        height: 8px;
        display: inline-block;
        background: #ff5f5c;
        border-radius: 8px;
        margin-left: 26px;
      }
      .red_s {
        width: 8px;
        height: 8px;
        display: inline-block;
        background: #ff5f5c;
        border-radius: 8px;
      }
      .green {
        width: 8px;
        height: 8px;
        display: inline-block;
        background: #7ace4c;
        border-radius: 8px;
      }
      .top {
        display: flex;
        margin-bottom: 24px;
        .item {
          width: 324px;
          height: 108px;
          background: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 4px;
          margin-right: 10px;
          display: flex;
          .item_left {
            width: 84px;
            height: 108px;
            position: relative;
            .img_box {
              width: 48px;
              height: 48px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .item_right {
            .item_right_title {
              font-family: PingFangSC-Medium;
              font-size: 18px;
              color: #333333;
              margin-top: 25px;
              margin-bottom: 16px;
            }
            .left_title {
              color: #e1bf3e;
            }
          }
        }
        .left {
          border: 1px solid #e1bf3e;
          box-shadow: 0 0 6px 2px rgba(46, 63, 96, 0.12);
        }
      }
      .bottom {
        background: #ffffff;
        border-radius: 2px;
        padding: 24px 24px 24px 16px;
        .btn_box {
          margin-bottom: 16px;
          .btn_i {
            padding: 0;
            background: #0070ff;
            color: #fff;
            width: 124px;
            height: 36px;
          }
          .btn_o {
            padding: 0;
            background: #fff;
            border-color: #0070ff;
            color: #0070ff;
            width: 124px;
            height: 36px;
          }
        }
        .pagination_box {
          text-align: center;
          margin-top: 24px;
        }
      }
    }
  }
</style>

<style lang='less'>
  @import '../../../assets/css/less/reset_css/reset_table.less';
  @import '../../../assets/css/less/reset_css/reset_pop.less';
  #equipment {
    .add_box {
      .el-dialog {
        width: 440px;
        .content_item {
          margin-top: 24px;
          .select_box {
            width: 100%;
            height: 38px;
            margin-top: 6px;
            .el-input__inner {
              background: #f8f8f8;
              border: 0;
            }
          }
        }
        .btn_box {
          margin-top: 24px;
        }
      }
    }
  }
</style>
