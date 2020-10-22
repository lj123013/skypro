<template>
  <div id="goodsub">
    <!-- 编辑弹框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="dialogData" label-width="80px">
        <el-form-item label="账户ID">
          <el-input v-model="dialogData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="cateName">
          <el-input v-model="dialogData.cateName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" width="200" prop="state">
          <el-switch
            v-model="dialogData.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加分类 -->
    <el-dialog
      title="修改分类"
      :visible.sync="addsub"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="商品分类" prop="cateName">
          <el-input v-model="formData.cateName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" width="200" prop="state">
          <el-switch
            v-model="formData.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addsub = false">取 消</el-button>
        <el-button type="primary" @click="addDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <el-card>
      <div class="sub">
        <p>商品分类</p>
        <el-button type="primary" @click="addSub">添加分类</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column
          label="序号"
          width="120"
          type="index"
        ></el-table-column>
        <el-table-column
          label="分类名称"
          width="200"
          prop="cateName"
        ></el-table-column>
        <el-table-column label="是否启用" width="200" prop="state">
          <template slot-scope="scop">
            <el-switch
              v-model="scop.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
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
    </el-card>
  </div>
</template>

<script>
import {
  API_GOODS_CATELIST,
  API_GOODS_DELCATE,
  API_GOODS_EDITCATE,
  API_GOODS_ADDCATE,
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [], //表格
      page: {
        currentPage: 1, //当前页码
        pageSize: 5, //每页显示的条数
      },
      dialogVisible: false, //修改弹框
      dialogData: {
        //弹框里面的data值
        id: "",
        cateName: "",
        state: false,
      },
      pageSizes: [5, 10, 15, 20],
      total: 0,
      addsub: false, //添加分类弹框
      formData: {
        cateName: "",
        state: false,
      },
    };
  },
  methods: {
    freachData(page) {
      API_GOODS_CATELIST(page).then((res) => {
        res.data.data.forEach((v) => {
          switch (v.state) {
            case 0:
              v.state = false;
              break;
            case 1:
              v.state = true;
              break;
          }
          // console.log();
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      this.dialogData.id = row.id;
      this.dialogData.cateName = row.cateName;
      this.dialogVisible = true;
    },
    //点击确定发送请求
    determine() {
      let changeData = {};
      changeData.id = this.dialogData.id;
      changeData.cateName = this.dialogData.cateName;
      changeData.state = this.dialogData.state;
      API_GOODS_EDITCATE(changeData).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.dialogVisible = true;
          this.freachData(this.page);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 删除按钮
    handleDelete(row) {
      console.log(row.id);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API_GOODS_DELCATE(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.freachData(this.page);
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
    // 分页事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.freachData(this.page);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.freachData(this.page);
    },
    //添加分类
    addSub() {
      this.addsub = true;
    },
    //添加分类确定
    addDetermine() {
      API_GOODS_ADDCATE(this.formData).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.addsub = false;
          this.freachData(this.page);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
  },
  created() {
    this.freachData(this.page);
  },
};
</script>

<style lang="less" scoped>
#goodsub {
  .el-card {
    .sub {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      height: 40px;
    }
  }
}
</style>