<template>
  <div id="personal">
    <el-card>
      <div class="msg">
        <p>管理员信息</p>
        <p>
          管理员ID:<span>{{ personalData.id }}</span>
        </p>
        <p>
          账号:<span>{{ personalData.account }}</span>
        </p>
        <p>
          用户组:<span>{{ personalData.userGroup }}</span>
        </p>
        <p>
          创建时间:<span>{{ personalData.ctime }}</span>
        </p>
      </div>
      <div class="pic">
        <span>管理员头像：</span>
        <div class="userpic">
            <img :src="personalData.imgUrl"/> 
        </div>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="data"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import { API_USERS_PERSONAL,USER_AVATAR_UPLOAD } from "@/api/apis";
export default {
  data() {
    return {
     data: { id: localStorage.id },
      imageUrl: "",
      personalData: {
        id: "",
        account: "",
        userGroup: "",
        ctime: "",
      },
     // useravatarupload:USER_AVATAR_UPLOAD//服务器头像上传地址
    };
  },
  methods: {
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
    handleAvatarSuccess(res, file) {
        console.log(res);
      window.location.reload()//刷新页面
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    API_USERS_PERSONAL(localStorage.id).then((res) => {
      //console.log(res.data.accountInfo);
      res.data.accountInfo.ctime = this.formatDate(res.data.accountInfo.ctime);
      this.personalData = res.data.accountInfo;
    });
    //console.log(localStorage.id);
  },
};
</script>

<style lang="less" scoped>
#personal {
  .el-card {
    .msg {
        p{
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
        }
    }
  .pic{
      display: flex;
      align-items: center;
      .userpic{
      
        width: 176px;
        height: 176px;
        border: 1px solid #ccc;
        margin-right: 20px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      //上传图片样式
      .avatar-uploader{
         border: 1px dashed #d9d9d9;
         border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover{
            border-color: #409eff;
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
}
</style>