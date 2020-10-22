<template>
  <div id="order">
    <!-- 表格——查看弹框 -->
    <el-dialog
      title="查看详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="账号ID">
          <el-input v-model="formData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="下单号">
          <el-input v-model="formData.orderNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-input v-model="formData.orderTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formData.consignee" disabled></el-input>
        </el-form-item>
        <el-form-item label="送达地址">
          <el-input v-model="formData.deliverAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="送货时间">
          <el-input v-model="formData.deliveryTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remarks" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="formData.orderAmount" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="formData.orderState" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 表格——编辑 -->
    <el-dialog
      title="修改订单"
      :visible.sync="dialogVisibleEdit"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="EditData" label-width="80px">
        <el-form-item label="账号ID">
          <el-input v-model="EditData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="下单号">
          <el-input v-model="EditData.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-input v-model="EditData.orderTime"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="EditData.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="EditData.consignee"></el-input>
        </el-form-item>
        <el-form-item label="送达地址">
          <el-input v-model="EditData.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送货时间">
          <el-input v-model="EditData.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="EditData.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="EditData.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="EditData.orderState"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="deitcilck">确 定</el-button>
      </span>
    </el-dialog>

    <el-card>
      <!-- 头部表单 -->
      <el-form :inline="true" :data="page" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="page.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="page.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="page.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="page.orderState" placeholder="订单状态"></el-input>
        </el-form-item>
        <!-- 活动时间 -->
        <div>
          <el-form-item label="选择时间">
            <!--  <el-col :span="22">设置长度 -->
            <el-date-picker
              v-model="page.date"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryClick">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" border>
        <el-table-column fixed prop="orderNo" label="订单号" width="100">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="160">
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300">
        </el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="200">
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120">
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="handledit(scope.row)"
              >编辑</el-button
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
import { API_ORDER_LIST, API_ORDER_DETAIL, API_ORDER_EDIT } from "@/api/apis";
export default {
  data() {
    return {
      page: {},
      tableData: [],
      page: {
        currentPage: 1, //当前页码
        pageSize: 5, //每页条数
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      },
      pageSizes: [5, 10, 15, 20],
      total: 0,
      dialogVisible: false,
      formData: {}, //表格查看详情
      dialogVisibleEdit: false, //表格编辑弹框
      EditData: {
        id: "",
        orderNo: "",
        orderTime: "",
        phone: "",
        consigne: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: "",
      },
    };
  },
  methods: {
    //   转时间戳
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
    //请求数据——带刷新页面
    freachData(page) {
      API_ORDER_LIST(page).then((res) => {
        //console.log(res.data.data);

        res.data.data.forEach((v) => {
          v.orderTime = this.formatDate(v.orderTime);
          v.deliveryTime = this.formatDate(v.deliveryTime);
        });
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },

    //   查询功能
    queryClick() {
      let time = this.page.date.map((v) => this.formatDate(v));
      this.page.date = JSON.stringify(time);
      console.log(this.page.date);
      this.freachData(this.page);
    },
    //表格——查看
    handleClick(row) {
      this.dialogVisible = true;
      API_ORDER_DETAIL(row.id).then((res) => {
        this.formData = res.data.data;
      });
    },
    // 表格——编辑
    handledit(row) {
      this.dialogVisibleEdit = true;
      //   数据深拷贝——实现数据回填
      let object = { ...row };
      //console.log(object);
      this.EditData = object;
    },
    // 点击确定发送修改订单请求
    deitcilck() {
      let changeData = {};
      changeData = this.EditData;
      API_ORDER_EDIT(changeData).then((res) => {
        if (res.data.code == 0) {
          this.dialogVisibleEdit = false;
          this.freachData(this.page);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
    // 弹框确认关闭的回调
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 每页多少条
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.freachData(this.page); //刷新页面
    },
    // 当前页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.freachData(this.page); //刷新页面
    },
    pickerOptions() {},
  },
  created() {
    this.freachData(this.page);
  },
};
</script>

<style lang="less" scoped>
#order {
}
</style>