<template>
  <div id="Home">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in totalnum" :key="index"
        ><div class="grid-content bg-purple">
          <div class="Salse">
            <img :src="item.img" style="width: 60px; height: 60px" />
            <ul>
              <li>{{ item.alltotal }}</li>
              <li>{{ item.total }}</li>
            </ul>
          </div>
        </div></el-col
      >
    </el-row>
    <el-card>
      <div id="myecharts_box"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ORDER_TOTALDATA } from "@/api/apis";

export default {
  data() {
    return {
      totalnum: [
        {
          index: 1,
          img: require("../../assets/imgs/alltotal.png"),
          alltotal: "总订单",
          total: "",
        },
        {
          index: 2,
          img: require("../../assets/imgs/allsales.png"),
          alltotal: "总销售",
          total: "",
        },
        {
          index: 3,
          img: require("../../assets/imgs/todayorder.png"),
          alltotal: "今日订单",
          total: "",
        },
        {
          index: 4,
          img: require("../../assets/imgs/todaysales.png"),
          alltotal: "今日销售",
          total: "",
        },
      ],
    };
  },
  methods: {
    echartsTu() {
      let myecharts = echarts.init(document.getElementById("myecharts_box"));
      myecharts.showLoading(); //加载动画
      setTimeout(() => {
        let { xData, orderData, amountData } = this.changData;
        let Option = {
          title: {
            text: "数据统计",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: orderData,
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: amountData,
            },
          ],
        };
        myecharts.setOption(Option);
        myecharts.hideLoading();
      }, 1000);
    },
  },
  mounted() {
    this.echartsTu();
  },
  watch: {
    changeData() {
      this.echartsTu();
    },
  },
  created() {
    API_ORDER_TOTALDATA().then((res) => {
      this.changData = res.data;
      this.totalnum[0].total = res.data.totalOrder;
      this.totalnum[1].total = res.data.totalAmount;
      this.totalnum[2].total = res.data.todayOrder;
      this.totalnum[3].total = res.data.totayAmount;
    });
  },
};
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}
#Home {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      .grid-content {
        border-radius: 4px;
        min-height: 100px;
        background: #fff;
        .Salse {
          display: flex;
          justify-content: space-around;
          padding-top: 20px;
        }
      }
    }
  }

  #myecharts_box {
    width: 100%;
    height: 500px;
  }
}
</style>