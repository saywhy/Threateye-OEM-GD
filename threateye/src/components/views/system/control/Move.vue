<template>
    <div id="system_control_move" v-cloak>
        <div class="container">
            <el-row class="container_top  container_item" :gutter="20">
                <el-col :span="6">
                    <div class="top_item" @click="sys_state">
                        <div class="title">
                            <p>
                                <span>系统状态监控</span>
                            </p>
                        </div>
                        <div class="legend">
                            <span class="legend_icon color2"></span>
                            <span>预警:2</span>
                            <span class="legend_icon color5"></span>
                            <span>健康:5</span>
                            <span class="legend_icon color6"></span>
                            <span>离线:3</span>
                        </div>
                        <div class="top_left_content">
                            <top-left></top-left>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="top_item">
                        <div class="title">
                            <p>
                                <span class="title_left">流量文件监控</span>
                                <span class="title_right">
                                    <span class="title_right_icon color1"></span>
                                    <span>流量(M/s)</span>
                                    <span class="title_right_icon color2"></span>
                                    <span>文件(个/s)</span>
                                </span>
                            </p>
                        </div>
                        <div class="top_mid_content">
                            <div class="content_top">
                                <top-mid-flow></top-mid-flow>
                            </div>
                            <div class="content_bom">
                                <top-mid-file></top-mid-file>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="top_item">
                        <div class="title">
                            <p>
                                <span class="title_left">协议统计</span>
                            </p>
                        </div>
                        <div class="legend">
                            <p class="legend_title">单位(P/s)</p>
                        </div>
                        <div class="top_right_content">
                            <top-rgiht></top-rgiht>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="container_bom container_item" :gutter="20">
                <el-col :span="12">
                    <div class="top_item">
                        <div class="title">
                            <p>
                                <span class="title_left">日志监控</span>
                                <span class="title_right">
                                    <span class="title_right_icon color3"></span>
                                    <span>实验日志</span>
                                    <span class="title_right_icon color4"></span>
                                    <span>告警日志</span>
                                </span>
                            </p>
                        </div>
                        <div class="bom_left_content">
                            <div class="content_top">
                                <bom-left-test></bom-left-test>
                            </div>
                            <div class="content_bom">
                                <bom-left-emerge></bom-left-emerge>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="top_item">
                        <div class="title">
                            <p>
                                <span class="title_left">安全设备</span>
                            </p>
                        </div>
                        <div class="legend">
                            <span class="legend_icon color7"></span>
                            <span>设备总数</span>
                            <span class="legend_icon color4"></span>
                            <span>告警总数</span>
                            <span class="legend_icon color8"></span>
                            <span>离线设备</span>
                        </div>
                        <div class="bom_mid_content">
                            <bom-mid></bom-mid>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="top_item">
                        <div class="title">
                            <p>
                                <span class="title_left">EDR监控状态</span>
                            </p>
                        </div>
                        <div class="bom_right_content">
                            <bom-right></bom-right>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="">
            <sys-monitor></sys-monitor>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import topLeft from "./vm-move/top-left";
import topMidFlow from "./vm-move/top-mid-flow";
import topMidFile from "./vm-move/top-mid-file";
import bomLeftTest from "./vm-move/bom-left-test";
import bomLeftEmerge from "./vm-move/bom-left-emerge";
import bomMid from "./vm-move/bom-mid";
import topRgiht from "./vm-move/top-right";
import bomRight from "./vm-move/bom-right";
import sysMonitor from "./vm-move/sys-monitor";
export default {
  name: "system_control_move",
  components: {
    topLeft,
    topMidFlow,
    topMidFile,
    topRgiht,
    bomLeftTest,
    bomLeftEmerge,
    bomMid,
    bomRight,
    sysMonitor
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    sys_state() {
      this.$store.commit("CHANGE_SYS", true);
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../../assets/css/less/system/control/move.less";
</style>
