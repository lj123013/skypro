<template>
  <div>
    <el-card>
      <div id="myecharts_box"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ORDER_ORDERTOTAL } from "@/api/apis";
export default {
  data() {
    return {
      date: {},
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
  },
  mounted() {
    let myecharts = echarts.init(document.getElementById("myecharts_box"));
    //  {orderTime: "2020-06-04 17:30:09", orderAmount: 19.88}
    // let {orderTime}=this.changeData
    API_ORDER_ORDERTOTAL(this.date).then((res) => {
      res.data.data.forEach((v) => {
        v.orderTime = this.formatDate(v.orderTime);
      });
      //console.log(res.data.data);
      this.changeData = res.data.data;
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };
      myecharts.setOption(option);
    });
  },
  created() {},
};
</script>

<style lang="less" scoped>
#myecharts_box {
  width: 100%;
  height: 500px;
}
</style>