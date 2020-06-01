// pages/create/create.js
const {formatTime} = require('./../../utils/util.js');
const App = getApp();
const db = wx.cloud.database()
Page({
  data:{
    content:'',
    inmageUrl:'',
    videoUrl:''
  },
  handleChange: function(e){
   let content = e.detail.value;
   console.log(content)
   this.setData({content})
  },
  handleupLoad: function(e){
    let itemList= ['图片', '视频'];
    let itemListType=['image','video'];
    wx.showActionSheet({
      itemList:itemList,
      success:(res) =>{
        let type = itemListType[res.tapIndex];
        console.log(type)
        if(type === 'video'){
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 15,
            camera: 'back',
            success:(res)=> {
              console.log(res)
              let filePath = res.tempFilePath;
              this.uploadFile(type,filePath)
              console.log(res.tempFilePath)
            }
          })
        }else{
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success:(res)=> {

              let filePath = res.tempFilePaths[0];
              this.uploadFile(type, filePath)
              // tempFilePath可以作为img标签的src属性显示图片
              // const tempFilePaths = res.tempFilePaths
            }
          }) 
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  uploadFile: function(type,filePath){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    console.log(App.globalData)
    let openid = App.globalData.openid;
    console.log(openid)
    let timestamp = Date.now(); 
    let postfix = filePath.match(/\.[^.]+?$/)[0];
    let cloudPath = `${openid}_${timestamp}_${postfix}`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath, // 文件路径
      success: (res) => {
        // get resource ID
        console.log(res.fileID)
        if(type === 'video'){
          this.setData({videoUrl: res.fileID})
        }else{
          this.setData({imageUrl: res.fileID})
        }
      },
      fail: (err) => {
        wx.showToast({
          icon: 'none',
          title: '上传失败'
        })
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  },
  handlesubmit: function(){
    let date = new Date();
    let date_display = formatTime(date);
    let createTime = db.serverDate();
    let content = this.data.content;
    let imageUrl = this.data.imageUrl;
    let videoUrl = this.data.videoUrl;
    let userInfo = App.globalData.userInfo;
    if (!content && !imageUrl && !videoUrl){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    db.collection('topic').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content,userInfo, createTime,date_display,imageUrl,videoUrl
      },
      success:  (res)=> {
        console.log(res)
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log('[数据库] [新增记录] 成功, 记录 _id',res._id)
        let url ='/pages/detail/detail?id=' + res._id;
        wx.redirectTo({ url })
      },
      fail: err=>{
        wx.showToast({
          icon:'none',
          title: '新增记录失败'
        })
      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  }
})