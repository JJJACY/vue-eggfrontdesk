// miniprogram/pages/my_reply/my_reply.js
const db = wx.cloud.database()
const App = getApp();

Page({
  data: {
    replies: []
  },
  onLoad: function () {
    this.getReplies();
  },
  getReplies: function (id) {
    db.collection('reply').orderBy('createTime', 'desc').where({
      _openid: App.globalData.openid,
    }).get({
      success: (res) => {
        console.log(123,res)
        let replies = res.data;
        this.setData({ replies })
      }
    })
  }
})