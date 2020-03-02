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
              <span>在线：
                <span>{{equipment_top.engine.online_count}}</span> 台</span>
              <span class="red"></span>
              <span>离线：
                <span>{{equipment_top.engine.offline_count}}</span>台</span>
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
              <span>在线：
                <span>{{equipment_top.sensor.online_count}}</span>台</span>
              <span class="red"></span>
              <span>离线：
                <span>{{equipment_top.sensor.offline_count}}</span>台</span>
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
              <span>在线：
                <span>{{equipment_top.sandbox.online_count}}</span>台</span>
              <span class="red"></span>
              <span>离线：
                <span>{{equipment_top.sandbox.offline_count}}</span>台</span>
            </p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btn_box">
          <el-button type="primary"
                     class="btn_i"
                     @click="add_box">新增</el-button>
          <el-button type="primary"
                     class="btn_o"
                     @click="del_equipment">删除</el-button>
        </div>
        <div class="equipment_table">
          <el-table ref="multipleTable"
                    class="reset_table"
                    align="center"
                    :data="equipment_list.list"
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
            <el-table-column label="序号"
                             width="80">
              <template slot-scope="scope">
                {{(equipment_data.page-1)*(equipment_data.rows) + scope.row.index_cn}}
              </template>
            </el-table-column>

            <el-table-column label='设备名称'>
              <template slot-scope="scope">
                <span class="color_span"
                      @click.stop='alert_detail(scope.row)'>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type"
                             label="设备类型"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.type=='1'">探针</span>
                <span v-if="scope.row.type=='2'">引擎</span>
                <span v-if="scope.row.type=='3'">探针+引擎</span>
                <span v-if="scope.row.type=='4'">沙箱</span>
              </template>
            </el-table-column>
            <el-table-column label='设备IP'>
              <template slot-scope="scope">
                <span class="color_span"
                      @click.stop='alert_detail(scope.row)'>{{scope.row.ip}}</span>
              </template>
            </el-table-column>
            <el-table-column label="设备状态">
              <template slot-scope="scope">
                <span :class="scope.row.status=='offline'?'red_s':'green'"></span>
                <span v-if="scope.row.status!='offline'">正常</span>
                <el-popover placement="top"
                            width="50"
                            :content="scope.row.status"
                            trigger="hover"
                            v-if="scope.row.status=='offline'">
                  <span slot="reference">异常</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="equipment_list.pageNow"
                         :page-sizes="[10,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="equipment_list.count">
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
                       :key="item.type"
                       :label="item.name"
                       :value="item.type">
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
                   @click="add_equipment">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "system_control_orient",
  data () {
    return {
      equipment_list: {
      },
      equipment_data: {
        page: 1,
        rows: 10
      },
      equipment_top: {
        engine: {},
        sandbox: {},
        sensor: {},
      },
      equipment_pop: {
        show: false,
        name: '',
        type: '',
        type_list: [
          { name: '引擎', type: "2" },
          { name: '沙箱', type: "4" },
          { name: '探针', type: "1" },
        ],
        ip: '',
      },
      select_list: []
    };
  },
  mounted () {
    this.get_data();
    this.get_top();
  },
  methods: {
    // 获取列表
    get_data () {
      this.$axios.get('/api/yiiapi/dev/list', {
        params: {
          page: this.equipment_data.page,
          rows: this.equipment_data.rows,
        }
      })
        .then(response => {
          console.log(response);
          this.equipment_list = response.data.data
          this.equipment_list.pageNow *= 1
          this.equipment_list.rows *= 1
          this.equipment_list.list.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    get_top () {
      this.$axios.get('/api/yiiapi/dev/top')
        .then(response => {
          console.log(response);
          this.equipment_top = response.data.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 添加设备
    add_box () {
      this.equipment_pop.show = true
      this.equipment_pop.name = ''
      this.equipment_pop.type = ''
      this.equipment_pop.ip = ''
    },
    add_equipment () {
      console.log(1212);
      console.log(this.equipment_pop);
      if (this.equipment_pop.name == '') {
        this.$message(
          {
            message: '请输入设备名称',
            type: 'error',
          }
        );
        return false
      }
      if (this.equipment_pop.type == '') {
        this.$message(
          {
            message: '请选择设备类型',
            type: 'error',
          }
        );
        return false
      }
      if (this.equipment_pop.ip == '') {
        this.$message(
          {
            message: '请输入设备IP',
            type: 'error',
          }
        );
        return false
      }
      this.$axios.post('/api/yiiapi/dev/add', {
        name: this.equipment_pop.name,
        type: this.equipment_pop.type,
        ip: this.equipment_pop.ip,
      })
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            this.get_data()
            this.equipment_pop.show = false
            this.$message(
              {
                message: '添加设备成功',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: response,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 删除
    del_equipment () {
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请先选中需删除的信息',
            type: 'error',
          }
        );
        return false
      }
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.select_list.forEach(element => {
          id_list.push(element.id)
        });
        this.$axios.delete('/api/yiiapi/dev/del', {
          data: {
            id: id_list
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败',
                  type: 'error',
                }
              );
            }
          })
          .catch(error => {
            console.log(error);
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 分页
    handleSizeChange (val) {
      this.equipment_data.rows = val;
      this.get_data();
    },
    handleCurrentChange (val) {
      this.equipment_data.page = val
      this.get_data();
    },
    // 全选择
    handleSelectionChange (val) {
      this.select_list = val
    },
    alert_detail (item) {
      console.log(item);
    },
    closed_add_box () {
      this.equipment_pop.show = false
    },
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
    .color_span {
      color: #0070ff;
      cursor: pointer;
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