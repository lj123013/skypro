<template>
  <div id="account_list">
    <!-- 修改账号——对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="formData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>

        <el-form-item label="用户组">
          <el-select v-model="formData.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickchange">确 定</el-button>
      </span>
    </el-dialog>
    <!-- selection-change当选择项发生变化时会触发该事件 -->
    <el-card>
      <p>账号列表</p>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="账号" prop="account" width="120">
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="120">
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="300">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <el-button
        type="danger"
        @click="batchDeletion"
        :disabled="ids.length > 0 ? false : true"
        >批量删除</el-button
      >
    </el-card>
  </div>
</template>

<script>
import {
  API_USERS_LIST,
  API_USERS_DEL,
  API_USERS_BATCHDEL,
  API_USERS_EDIT,
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      page: {
        currentPage: 1, //当前页码
        pageSize: 5, //每页条数
      },
      pageSizes: [5, 10, 15, 20],
      total: 0, //总条数
      dialogVisible: false, //修改弹框
      ids: [], //批量删除id
      formData: {
        id: "",
        account: "",
        userGroup: "",
      },
    };
  },
  methods: {
    //封装函数
    freachaccount(page) {
      API_USERS_LIST(page).then((res) => {
        //console.log(res.data.data);

        res.data.data.forEach((item) => {
          //console.log(item.ctime);
          item.ctime = this.formatDate(item.ctime); //得到转过的时间
        });
        this.tableData = res.data.data; //数据渲染页面
        this.total = res.data.total; //总数据条数
      });
    },
    //转时间戳
    formatDate(date) {
      var date = new Date(date);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 选中
    handleSelectionChange(val) {
      var idArr = val.map((v) => v.id);
      this.ids = idArr;
    },
    // 批量删除
    batchDeletion() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = JSON.stringify(this.ids);
          API_USERS_BATCHDEL(data).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.freachaccount(this.page);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.freachaccount(this.page);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.freachaccount(this.page);
    },
    //编辑按钮
    handleEdit(row) {
      //console.log(row.id);
      this.formData.id = row.id;
      this.formData.account = row.account;
      this.formData.userGroup = row.userGroup;
      this.dialogVisible = true;
    },
    // 点击确定修改
    clickchange() {
      let changeData = {};
      changeData.id = this.formData.id;
      changeData.account = this.formData.account;
      changeData.userGroup = this.formData.userGroup;
      console.log(changeData);
      API_USERS_EDIT(changeData).then((res) => {
        if (res.data.code == 0) {
          this.dialogVisible = false;
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.freachaccount(this.page);
        }

        //console.log(res);
      });
    },
    //删除按钮
    handleDelete(row) {
      this.dialogVisible = true;
      //console.log(row);

      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API_USERS_DEL(row.id).then((res) => {
            //console.log(res);
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.freachaccount(this.page); //刷新页面
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //弹框关闭前的回调函数
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.freachaccount(this.page);
  },
};
</script>

<style lang="less" scoped>
#account_list {
  .el-card {
    p {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
  }
}
</style>