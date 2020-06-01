//detail.js

Page({
  data: {
    order_id:'',
    detailList:[],
    toastText:'加载中'
  },
  onLoad: function (option) {
    let order_id = option.order_id;
    this.getData(order_id)
  },
  getData: function(order_id){
    let url ='https://wuliu.market.alicloudapi.com/kdi'
    let company = 'jd';
    wx.request({   
      url: url,
      header: {
        "Authorization": "APPCODE 2880573a9d1d4f91a001c1f56e4177ac"
      },
      data:{
        type: company,
        no: order_id
      },
      success: (res)=>{
        console.log(res);
        if(res.data.result.list.length){
          this.setData({
            detailList: res.data.result.list,
            order_id: order_id
          })
        }else{
          this.setData({
            toastText: '网络发生错误'
          })
        }
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  }
})
