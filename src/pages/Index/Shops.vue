<template>
  <div id="shops">
    <el-card>
      <div class="header">
        <p>店铺管理</p>
        <el-button type="primary" @click="changeclick">修改</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="form.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="shopsuploadimg"
            :show-file-list="false"
            :on-success="shopheadsuccess"
          >
            <img
              v-if="form.avatar"
              :src="shopsupload + form.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            class="avatar-uploader"
            list-type="picture-card"
            :action="shopsuploadimg"
            :file-list="filelist"
            :on-success="shopsimgsuccess"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              style="width: 100px; height: 100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="起送">
          <el-input v-model="form.minPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="checklist">
            <el-checkbox
              v-for="(item, index) in form.supports"
              :key="index"
              :label="item"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { API_SHOP_INFO, SHOPS_UPLOAD, SHOPS_UPLOAD_IMG , API_SHOPS_EDIT} from "@/api/apis";
export default {
  data() {
    return {
      form: {},
      imageUrl: "",
      filelist: [],
      checklist: [], //活动性质的复选框
      supports: [],
      shopsupload: SHOPS_UPLOAD, //店铺头像地址
      shopsuploadimg: SHOPS_UPLOAD_IMG, //店铺上传地址
    };
  },
  methods: {
    //店铺头像成功回调
    shopheadsuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.imgUrl;
    },
    //店铺图片成功回调
    shopsimgsuccess(res, file) {
      this.pics.push(res.imgUrl);
    },
    //点击修改
    changeclick() {
      //console.log(this.pics);
      //console.log(this.checklist);
      //深拷贝——展开运算符
      console.log(this.form.date);
      let object = { ...this.form };
      object.supports = JSON.stringify(this.checklist);
      object.date = JSON.stringify(this.date);
      object.pics = JSON.stringify(this.pics.concat(this.form.pics));
      console.log(object);
      //修改内容地址
       API_SHOPS_EDIT(object).then(res=>{
         console.log(res);
       })
    },
  },
  created() {
    API_SHOP_INFO().then((res) => {
      console.log(res.data.data);
      this.form = res.data.data;
      let newarr = res.data.data.pics.map((v) => {
        return { url: this.shopsupload + v };
      });
      this.filelist=newarr
      this.checklist=res.data.data.supports
    });
  },
};
</script>

<style lang="less" scoped>
#shops {
  .el-card {
    .header {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0px;
      }
    }
    .el-form {
      .el-input {
        width: 20%;
      }
      .el-textarea {
        width: 20%;

        /deep/.el-textarea__inner {
          min-height: 200px !important;
        }
      }
    }
  }
}
</style>