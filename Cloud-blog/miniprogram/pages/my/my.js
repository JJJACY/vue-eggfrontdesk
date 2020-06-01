// pages/my/my.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  getUserInfo: function(){
    let userInfo = App.globalData.userInfo;
    if(userInfo.nickName){
      this.setData({
        login: true,
        userInfo: userInfo
      })
    }
  },
  onGetUserInfo: function(e){
    if(e.detail.userInfo){
      let userInfo = e.detail.userInfo;
      App.getUserInfo((res)=>{
        this.setData({
          userInfo: res.userInfo
        })
      })
    }
  },
  navgitortonewblog: function(){
    wx.navigateTo({
      url: '/pages/create/create'
    })
  },
  navgitortomyblog: function () {
    wx.navigateTo({
      url: '/pages/my_topic/my_topic'
    })
  },
  navgitortomyreply: function () {
    wx.navigateTo({
      url: '/pages/my_reply/my_reply'
    })
  }
  
})