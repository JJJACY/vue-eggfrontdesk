//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    value: ''
  },
  //事件处理函数
  handleChange: function(event){
    let value = event.detail.value;
    this.setData({value})
  },
  handleSubmit: function(){
    let value = this.data.value;
    if(!value){
      wx.showToast({
        title: '请输入快递单号',
        icon: 'none'
      })
    }else{
      let url = `/pages/detail/detail?order_id=${value}`;
      wx.navigateTo({url});
    }
  },
  handleScancode: function(){
    wx.scanCode({
      success(res){
        let order_id = res.result.trim();
        let url = `/pages/detail/detail?order_id=${order_id}`
        wx.navigateTo({url});
      }
    })
  }
})
