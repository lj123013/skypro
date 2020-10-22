<template>
  <div id="add_account">
    <el-card>
      <p>添加账号</p>
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="formData.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addclick">添加账号</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { API_USERS_ADD } from "@/api/apis";
export default {
  data() {
    return {
      formData: {}, //添加账号参数
    };
  },
  methods: {
    //点击添加账号
    addclick() {
      API_USERS_ADD(this.formData).then((res) => {
        //console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#add_account {
  .el-card {
    .el-form {
      width: 400px;
    }
  }
}
</style>