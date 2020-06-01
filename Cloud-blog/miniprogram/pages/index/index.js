//index.js
const db = wx.cloud.database();
Page({
  data: {
    topics:[],
    fullScreen: false
  },
  onShow: function(){
    this.getTopics()
  },
  onPullDownRefresh: function(){
    this.getTopics(() => {
      wx.stopPullDownRefresh()
    })
  },
  getTopics: function (cb){
    db.collection('topic').orderBy('createTime', 'desc').get({
      success: (res)=>{
        console.log('[数据库] [查询记录] 成功:',res)
        this.setData({topics:res.data})
        typeof cb=== 'function' && cb();
      },
      fail: (err)=>{
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.log('[数据库] [查询记录] 失败:', err)
      }
    })
      
  },
  handlePreviewImage: function(e){
    console.log(e)
    let url = e.currentTarget.dataset.url;
    console.log(url)
    wx.previewImage({
      current: 'url', // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  handlePreviewVideo: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let Videoctx = wx.createVideoContext(id)
    console.log(Videoctx)
    let fullScreen = this.data.fullScreen;
    if(fullScreen){
      Videoctx.pause()
      Videoctx.exitFullScreen()
      this.setData({fullScreen: false})
    }else{
      Videoctx.requestFullScreen()
      Videoctx.play()
      this.setData({fullScreen: true})
    }
  }
  


})
