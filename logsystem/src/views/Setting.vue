<template>
  <div class="Setting">
    <SideMenu class="Setting-left"></SideMenu>
    <div class="Setting-right">
      <el-form  ref="form" :model="form" label-width="150px" style="width:400px">
        <el-form-item label="webSocket ip">
          <el-input v-model="form.ip_address"></el-input>
        </el-form-item>
        <el-form-item label="webSocket 端口">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";
import "echarts/lib/component/title";
export default {
  name: "Setting",
  components: {
    SideMenu,
  },

    data() {
      return {
        form: {
            ip_address:"",
            port:"",
        }
      }
    },
    mounted() {
        this.form.ip_address = localStorage.getItem('ip_address') ? localStorage.getItem('ip_address') : "127.0.0.1";
        this.form.port = localStorage.getItem('port') ? localStorage.getItem('port') : "9002";
    },
    methods: {
      onSubmit() {
        localStorage.clear();
        localStorage.setItem('ip_address', this.form.ip_address);
        localStorage.setItem('port', this.form.port);
        
        this.$store.commit('clear');
        
      this.$router.replace('/About');
      location.reload();
      }
    }
};
</script>

<style lang="stylus" scoped>
.Setting {
  // 使用flex布局 菜单居左固定宽度 右侧内容区域自适应宽度
  display: flex;

  .Setting-left {
    box-sizing: border-box;
  }

  .Setting-right {
    box-sizing: border-box;
    width: calc(100% - 200px);
    padding: 8px 24px;
    flex: 1;
  }
}
</style>