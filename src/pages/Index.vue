<template>
  <div id="index_box">
    <!-- 容器布局 -->
    <el-container>
      <!-- 左边树菜单 -->
      <el-aside width="200px">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <div v-for="item in newtreelist" :key="item.index">
            <!-- 有二级列表的选项 -->
            <el-submenu v-if="item.children" :index="item.index">
              <template slot="title">
                <i :class="item.cls"></i>
                <span>{{ item.title }}</span>
              </template>

              <el-menu-item
                v-for="child in item.children"
                :key="child.index"
                :index="child.index"
              >
                <span slot="title">{{ child.title }}</span>
              </el-menu-item>
            </el-submenu>
            <!-- 没有二级列表的选项 -->
            <el-menu-item v-else :index="item.index">
              <i :class="item.cls"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>

          <!-- 没有下拉选项的菜单 -->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部导航 -->
        <el-header height="50px">
          <div class="nav_box">
            <el-breadcrumb
              separator-class="el-icon-arrow-right"
              style="padding-top: 20px"
            >
              <!-- 面包屑 -->

              <el-breadcrumb-item v-for="item in breadlist" :key="item">{{
                item
              }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div>
              <p>
                欢迎你，<span v-html="usename"></span>
                <span @click="headpicterClick" class="headpic">
                  <img :src="headImg" style="width: 30px; height: 30px" />
                </span>
              </p>
            </div>
          </div>
        </el-header>
        <!-- 中间内容 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { API_TOKEN, API_USERS_PERSONAL } from "@/api/apis";
export default {
  data() {
    return {
      //左侧树菜单
      treelist: [
        //   首页
        {
          index: "/index/home",
          cls: "iconfont icon-1",
          title: "首页",
          role: ["super", "normal"],
        },
        {
          index: "/index/order",
          cls: "iconfont icon-icon-test",
          title: "订单管理",
          role: ["super", "normal"],
        },
        {
          //有下拉选项的下拉框
          index: "goods",
          cls: "iconfont icon-shangpin",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            {
              index: "/index/goodslist",
              title: "商品列表",
            },
            {
              index: "/index/goodsadd",
              title: "商品添加",
            },
            {
              index: "/index/goodsub",
              title: "商品分类",
            },
          ],
        },
        //店铺管理
        {
          index: "/index/shops",
          cls: "iconfont icon-dianpu",
          title: "店铺管理",
          role: ["super"],
        },

        {
          //有下拉选项的下拉框
          index: "account",
          cls: "iconfont icon-zhanghao",
          title: "账号管理",
          role: ["super"],
          children: [
            {
              index: "/index/accountlist",
              title: "账号列表",
            },
            {
              index: "/index/addaccount",
              title: "添加账号",
            },
            {
              index: "/index/changepwd",
              title: "修改密码",
            },
          ],
        },
        {
          //有下拉选项的下拉框
          index: "salse",
          cls: "iconfont icon-xiaoshoumubiao",
          title: "销售统计",
          role: ["super"],
          children: [
            {
              index: "/index/ordersalse",
              title: "订单统计",
            },
          ],
        },
      ],
      breadlist: ["首页"], //面包屑
      defaultActive: "", //默认选中状态
      usename: "请登录",
      headImg: "",
      role:""
    };
  },
  //路由监听当hash值发生变化是检测路由变化
  watch: {
    $route: {
      handler: function (val) {
        // console.log(val.path); //得到当前点击的页面
        window.indexthis.changeBreadlist(this.$route.path); //this指向问题

        // console.log(this.breadlist);
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeBreadlist(hash) {
      let arr = [];
      switch (hash) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/goodslist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/goodsadd":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/goodsub":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/shops":
          arr = ["店铺管理"];
          break;
        case "/index/accountlist":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/addaccount":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/changepwd":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/ordersalse":
          arr = ["销售统计"];
          break;
        case "/index/personal":
          arr = ["个人中心"];
          break;
      }
      //console.log(arr);
      this.breadlist = arr; //将新数组得到的值赋值给定义的数组
    },

    //点击头像显示个人中心
    headpicterClick() {
      this.$router.push("/index/personal");
    },
  },
  created() {
    // console.log(this.$route.path)
    let hash = this.$route.path;
    this.defaultActive = hash; //根据hash值变化，点击那个页面当刷新时也不会改变
    this.changeBreadlist(hash); //点击哪个页面hash变化时刷新也不会改变页面
    window.indexthis = this; //解决vuethis指向问题
    //console.log(localStorage.token);//后台拿到的数据
    //console.log(localStorage.account);//获取的用户名
    //验证token是否过期
    API_TOKEN(localStorage.token).then((res) => {
      //console.log(res);
      if (res.data.code == 0) {
        //登录还未过期，token还有效
        this.usename = localStorage.account; //将获取到的值添加到页面中
      } else {
        //登录已过期，请重新登录
        this.usename = "<a href=''>请登录</a>";
      }
    });
    // 发送个人中心
    API_USERS_PERSONAL(localStorage.id).then((res) => {
      //console.log(res.data.accountInfo.imgUrl);
      this.headImg = res.data.accountInfo.imgUrl;
      this.role=localStorage.role
    });
  },
  computed: {
    //利用计算属性来进行权限操作
    newtreelist() {
      //  var newarr= this.treelist.filter(item=>{
      //     console.log(item.role.includes(this.role));
      //   })
  return this.treelist.filter((i) => i.role.includes(this.role));
    },
  },
};
</script>

<style lang="less" scoped>
@base: #2d3a4b;

#index_box {
  height: 100%;
  .el-container {
    height: 100%;
  } //左侧树菜单背景色
  .el-aside {
    background: #545c64;
    //树菜单
    .el-menu {
      border-right: 0;
    }
  }
  .el-header {
    .nav_box {
      display: flex;
      justify-content: space-between;
      .headpic {
        cursor: pointer;
      }
    }
  }
  //主题内容背景色
  .el-main {
    background: #ccc;
  }
}
</style>