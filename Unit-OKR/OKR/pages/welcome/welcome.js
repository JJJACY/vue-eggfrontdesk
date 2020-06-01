//index.js
import User from './../../models/user.js';

Page({
  //事件处理函数
  onLoad: function () {
    let token = wx.getStorageSync('token')
    if (token) {
      // Do something with return value
      wx.switchTab({
        url: '/pages/todo/todo'
      })
      return
    }
  },
  handlesubmit: function(){
    wx.login({
      success:(res)=> {
        console.log(res)
        if (res.code) {//发起网络请求
          User.login(res.code).then(res=>{
            console.log(res)
            let token = res.token;
            wx.setStorage({key: "token",data: token})
            wx.switchTab({url: '/pages/todo/todo'})
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
