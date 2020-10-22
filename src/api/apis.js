import axios from 'axios'
// 服务器IP地址
export const SERVRR_IP = "http://127.0.0.1:5000"
axios.defaults.baseURL = SERVRR_IP
//服务器商品图片地址
export const SERVER_UPLOAD = SERVRR_IP + "/upload/imgs/goods_img/"
//服务器头像上传地址
export const USER_AVATAR_UPLOAD = SERVRR_IP + "/users/avatar_upload"
//服务器商品上传图片地址/goods/goods_img_upload
export const GOODS_GOODSIMG_UPLOAD = SERVRR_IP + "/goods/goods_img_upload"

//服务器店铺地址
export const SHOPS_UPLOAD = SERVRR_IP + "/upload/shop/"
//服务器店铺上传地址
export const SHOPS_UPLOAD_IMG = SERVRR_IP + "/shop/upload/"
//API:登录
export const API_LOGIN = (post) => axios.post("/users/checkLogin", post)
//API:验证token是否过期/users/checktoken
export const API_TOKEN = (token) => axios.get("/users/checktoken", {
    params: {
        token
    }
})
//API:添加账号
export const API_USERS_ADD = (post) => axios.post("/users/add", post)
//获取账号列表
export const API_USERS_LIST = (get) => axios.get("/users/list", {
    params: get
})
//删除账号
export const API_USERS_DEL = (id) => axios.get("/users/del", {
    params: {
        id
    }
})
//批量删除
export const API_USERS_BATCHDEL = (ids) => axios.get("/users/batchdel", {
    params: {
        ids
    }
})
//修改账号
export const API_USERS_EDIT = (post) => axios.post("/users/edit", post)
//获取个人中心

export const API_USERS_PERSONAL = (id) => axios.get("/users/accountinfo", {
    params: {
        id
    }
})
//获取分类
export const API_GOODS_CATELIST = (get) => axios.get("/goods/catelist", {
    params: get
})
//删除分类
export const API_GOODS_DELCATE = (id) => axios.get("/goods/delcate", {
    params: {
        id
    }
})
//修改分类
export const API_GOODS_EDITCATE = (post) => axios.post("/goods/editcate", post)
//添加分类
export const API_GOODS_ADDCATE = (post) => axios.post("/goods/addcate", post)
//查询所有分类名称

export const API_GOODS_CATEGORIES = () => axios.get("/goods/categories", )
//添加商品
export const API_GOODS_ADD = (post) => axios.post("/goods/add", post)
//商品列表
export const API_GOODS_LIST = (get) => axios.get("/goods/list", {
    params: get
})
//删除商品/goods/del
export const API_GOODS_DEL = (id) => axios.get("/goods/del", {
    params: {
        id
    }
})
//修改商品

export const API_GOODS_EDIT = (post) => axios.post("/goods/edit", post)

//获取订单列表

export const API_ORDER_LIST = (get) => axios.get("/order/list", {
    params: get
})
//获取订单详情
export const API_ORDER_DETAIL = (id) => axios.get("/order/detail", {
    params: {
        id
    }
})

//修改订单/order/edit
export const API_ORDER_EDIT = (post) => axios.post("/order/edit", post)
//获取店铺详情
export const API_SHOP_INFO = () => axios.get("/shop/info", {
    params: {}
})
//店铺修改

export const API_SHOPS_EDIT = (post) => axios.post("/shop/edit", post)
//首页报表
export const API_ORDER_TOTALDATA = () => axios.get("/order/totaldata", {
    params: {}
})
//订单报表
export const API_ORDER_ORDERTOTAL = (date) => axios.get("/order/ordertotal", {
    params: {date}
})
//检查旧密码是否正确