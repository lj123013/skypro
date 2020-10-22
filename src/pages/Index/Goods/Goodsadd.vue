<template>
  <div id="goodsadd">
    <el-card>
      <p>商品添加</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in categorieslist"
              :key="index"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number
            v-model="form.price"
            @change="handleChange"
            :min="1"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="goodsImgupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="form.imgUrl"
              :src="serverupload + form.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.goodsDesc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  API_GOODS_CATEGORIES,
  GOODS_GOODSIMG_UPLOAD,
  API_GOODS_ADD,
  SERVER_UPLOAD,
} from "@/api/apis";
export default {
  data() {
    return {
      categorieslist: [], //商品分类列表
      num: 1,
      imageUrl: "", //上传图片
      goodsImgupload: GOODS_GOODSIMG_UPLOAD, //商品图片上传地址
      serverupload: SERVER_UPLOAD, //服务器商品图片地址
      form: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
      },
    };
  },
  methods: {
    //添加商品
    addGoods() {
      //商品添加

      API_GOODS_ADD(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
    //绑定值被改变时触发
    handleChange(value) {
      //console.log(value);
    },
    handleAvatarSuccess(res, file) {
      this.form.imgUrl = res.imgUrl;
    },
  },
  created() {
    //查询所有分类
    API_GOODS_CATEGORIES().then((res) => {
      this.categorieslist = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
#goodsadd {
  .el-card {
    p {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    .el-form {
      .el-input {
        width: 300px;
      }
      .el-textarea {
        width: 20%;
      }
    }
    .avatar-uploader {
      border: 1px solid #eee;
      width: 178px;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409eff;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>