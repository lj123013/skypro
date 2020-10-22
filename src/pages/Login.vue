<template>
  <div id="login_box">
    <el-card>
      <h2>天团管理系统</h2>
      <el-input v-model="loginData.account" placeholder="请输入内容"></el-input>
      <el-input
        v-model="loginData.password"
        class="pwd"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" class="loginclick" @click="loginclick"
        >登录</el-button
      >
      <p v-show="error" style="color: red">登录失败，请检查用户名或密码</p>
    </el-card>
  </div>
</template>

<script>
import { API_LOGIN } from "@/api/apis";
export default {
  data() {
    return {
      loginData: {},
      error: false,
      isquer: true, //最开始是可以点击的
    };
  },
  methods: {
    loginclick() {
      //console.log(111);
      //防抖节流，利用计时器来完成，点击一次间隔3秒后才可以再次点击
      if (this.isquer == false) return; //如果是flase时就停止点击
      this.isquer = false; //当不可以点击时才发送请求
      //发送登录请求

      API_LOGIN(this.loginData).then((res) => {
        if (res.data.code == 0) {
          //登录成功是的提示
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("index/home"); //登录成功时跳转到首页页面
          }, 2000);

          //成功时的操作
          localStorage.token = res.data.token; //保存token值来验证登录是否过期
          localStorage.account = this.loginData.account;
          localStorage.id = res.data.id;
          localStorage.img = res.data.avatar;
          localStorage.role = res.data.role;
        } else {
          //登录失败时的提示
          this.$message.error(res.data.msg);
          this.error = true;
        }
      });
      setTimeout(() => {
        this.isquer = true; //3秒过后恢复点击
      }, 3000);
    },
  },
};
</script>

<style lang="less" scoped>
@base: #2d3a4b;
#login_box {
  width: 100%;
  height: 100%;
  background: @base;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    width: 360px;
    height: 300px;
    h2 {
      text-align: center;
    }
    .pwd {
      margin-top: 10px;
    }
    .loginclick {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>