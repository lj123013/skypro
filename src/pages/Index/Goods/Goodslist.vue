<template>
  <div id="goodslist">
    <!-- 编辑弹框 -->
    <el-dialog
      title="修改商品"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品ID">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            list-type="picture-card"
            :action="goodsImgupload"
            :file-list="filelist"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.goodsDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消修改</el-button>
        <el-button type="primary" @click="changeclick">确定修改</el-button>
      </span>
    </el-dialog>
    <el-card>
      <p>商品列表</p>
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品图片" prop="imgUrl">
                <span
                  ><img
                    :src="serverupload + props.row.imgUrl"
                    style="width: 50px; height: 50px"
                /></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="所属分类" prop="category"> </el-table-column>
        <el-table-column label="商品价格" prop="price"> </el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img
              :src="serverupload + scope.row.imgUrl"
              style="width: 50px; height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
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
  API_GOODS_LIST,
  GOODS_GOODSIMG_UPLOAD,
  API_GOODS_DEL,
  SERVER_UPLOAD,
  API_GOODS_EDIT,
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [], //表格数据
      page: {
        currentPage: 1, //当前页码
        pageSize: 5, //每页条数
      },

      total: 0,
      pageSizes: [5, 10, 15, 20],
      dialogVisible: false, //编辑弹框
      serverupload: SERVER_UPLOAD, //服务器商品地址
      goodsImgupload: GOODS_GOODSIMG_UPLOAD, //商品上传地址
      form: {
        id: "",
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
      },
      filelist: [],
      imageUrl: "",
    };
  },
  methods: {
    freachData(page) {
      API_GOODS_LIST(page).then((res) => {
        this.total = res.data.total;
        res.data.data.forEach((v) => {
          // console.log(v.ctime);
          v.ctime = this.formatDate(v.ctime);
        });
        this.tableData = res.data.data;
      });
    },
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

    //编辑
    handleEdit(row) {
      console.log(row);
      this.dialogVisible = true;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.category = row.category;
      this.form.price = row.price;
      this.form.imgUrl = row.imgUrl;
      this.form.goodsDesc = row.goodsDesc;
    },
    //点击确定修改按钮
    changeclick() {
      let changeData = {};
      changeData.id = this.form.id;
      changeData.name = this.form.name;
      changeData.category = this.form.category;
      changeData.price = this.form.price;
      changeData.imgUrl = this.form.imgUrl;
      changeData.goodsDesc = this.form.goodsDesc;
      API_GOODS_EDIT(changeData).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.dialogVisible = false;
          this.freachData(this.page);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
    //弹框确认关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    //删除
    handleDelete(row) {
      //console.log(row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API_GOODS_DEL(row.id).then((res) => {
            //console.log(res);
            this.freachData(this.page);
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
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
    // 分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.freachData(this.page);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.freachData(this.page);
    },
    //上传图片成功回调
    handleAvatarSuccess(res, file) {
      this.form.imgUrl = res.imgUrl;
    },
  },
  created() {
    this.freachData(this.page);
  },
};
</script>

<style lang="less" scoped>
#goodslist {
  .el-card {
    p {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    .demo-table-expand {
      font-size: 0;
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
  .el-dialog {
    .el-form {
      .el-form-item {
        .goodspic {
          border: 1px solid #ccc;
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>