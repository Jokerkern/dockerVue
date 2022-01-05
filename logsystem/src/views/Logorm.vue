<template>
  <div class="Logorm">
    <SideMenu class="Logorm-left"></SideMenu>
    <div class="Logorm-right">
      <el-row
        ><el-col :span="12">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-col>
        <el-col :span="8"
          ><el-input v-model="input" placeholder="请输入内容"></el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="submit" @click="check">确认</el-button></el-col
        ></el-row
      >
      <!-- <div id="app">
      {{message}}
      </div> -->
      <el-table
        :data="
          message.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column
          prop="time"
          label="时间"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="logger"
          label="文件"
          width="250"
          align="center"
        ></el-table-column
        ><el-table-column
          prop="level"
          label="类别"
          column-key="date"
          width="200"
          align="center"
          :filters="[
            { text: 'info', value: 'info' },
            { text: 'debug', value: 'debug' },
            { text: 'warning', value: 'warning' },
            { text: 'error', value: 'error' },
          ]"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column
          prop="log"
          label="内容"
          width="400"
          align="center"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="message.length"
        align="center"
      >
        //这是显示总共有多少数据
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";
import { Query } from "@/request/user.js";
export default {
  name: "Logorm",
  components: {
    SideMenu,
  },

  data() {
    return {
      options: [
        {
          value: "file",
          label: "文件",
        },
        {
          value: "level",
          label: "级别",
        },

        {
          value: "log",
          label: "内容",
        },
      ],
      value: "log",
      input: "",
      message: [],
      currentPage: 1,
      pagesize: 10,
    };
  },
  methods: {
    check() {
      //var data = "/"+this.input;
      switch (this.value) {
        case "file":
          Query({ file: this.input }).then((res) => {
            //console.log(res.data);
            this.message = [];
            this.message.push.apply(this.message, res.data);
            //console.log(this.message);
          });
          break;
        case "level":
          Query({ level: this.input }).then((res) => {
            //console.log(res.data);
            this.message = [];
            this.message.push.apply(this.message, res.data);
            //console.log(this.message);
          });
          break;
        case "log":
          Query({ log: this.input }).then((res) => {
            //console.log(res.data);
            this.message = [];
            this.message.push.apply(this.message, res.data);
            //console.log(this.message);
          });
          break;
      }
      /*Query({log: this.input}).then((res) =>{
            console.log(res.data);
            this.message=[];
            this.message.push.apply(this.message,res.data);
            console.log(this.message);
        })*/
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      //console.log(size); //每页下拉显示数据
    },
    handleCurrentChange: function (event) {
      this.currentPage = event; //每页下拉显示数据
    },
  },
};
</script>

<style lang="stylus" scoped>
.Logorm {
  display: flex;

  .Logorm-left {
    box-sizing: border-box;
  }

  .Logorm-right {
    box-sizing: border-box;
    width: calc(100% - 200px);
    padding: 8px 24px;
    flex: 1;
  }
}
</style>