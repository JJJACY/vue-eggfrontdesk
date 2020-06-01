const db = wx.cloud.database()//获取数据库的引用
const App = getApp();
import { formatTime } from './../../utils/util.js';

Page({
  data:{
    id:'',
    topic:{},
    userInfo: {},
    message:'',
    replies: []
  },
  onLoad: function(opt){
    console.log(opt)
    this.getTopics(opt.id);
    this.getUserInfo();
    this.getReplies(opt.id)
  },
  getTopics: function(id){
    db.collection('topic').doc(id).get({
      success: (res)=>{
        console.log(res)
        let topic = res.data;
        this.setData({topic,id})
      }
    })
  },
  getUserInfo: function(){
    console.log(App)
    let userInfo = App.globalData.userInfo;
    if(userInfo.nickName){
      this.setData({userInfo: userInfo})
    }
  },
  getReplies: function(id){
    db.collection('reply').orderBy('createTime', 'desc').where({
      topic_id: id
    }).get({
      success: (res) => {
        console.log(res)
        let replies = res.data;
        this.setData({ replies, id })
      }
    })
  },
  onGetUserInfo: function(e){
    console.log(e)
    if(e.detail.userInfo){
      let userInfo = e.detail.userInfo;
      console.log(userInfo)
      App.getUserInfo((res)=>{
        console.log(res)
        this.setData({userInfo: res.userInfo})
      })
    }
  },
  handleChange: function(e){
    let message =e.detail.value;
    this.setData({message})
  },
  handleSubmit: function () {
    let date = new Date();
    let date_display = formatTime(date);
    let createTime = db.serverDate();
    let content = this.data.message;
    let topic_id = this.data.topic_id
    let userInfo = App.globalData.userInfo;
    let replies = this.data.replies;
    if (!content ) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    db.collection('reply').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content, userInfo, createTime, date_display,topic_id
      },
      success: (res) => {
        wx.showToast({
          title: '上传成功',
          icon: 'none'
        })
        replies.unshift({ content, userInfo, createTime, date_display, topic_id})
        this.setData({replies,message:''})
        this.incReply(topic_id)
      },
      fail: (err) => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.log('[数据库] [新增记录] 失败：', err)
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },
  incReply: function(topic_id){
    wx.cloud.callFunction({
      name:'inReply',
      data:{
        topic_id: topic_id
      },
      success: (res)=>{
        console.log('[云函数] [addReply] user openid: ', res.result)
      },
      fail: (err)=>{
        console.error('[云函数] [addReply] 调用失败', err)
      }
       
    })
  }
  

})