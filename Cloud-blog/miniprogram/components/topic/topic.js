// components/topic.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topic:{
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fullScreen: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePreviewImage: function (e) {
      console.log(e)
      let url = e.currentTarget.dataset.url;
      console.log(url)
      wx.previewImage({
        current: 'url', // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
    handlePreviewVideo: function (e) {
      console.log(e)
      let id = e.currentTarget.dataset.id;
      let Videoctx = wx.createVideoContext(id)
      console.log(Videoctx)
      let fullScreen = this.data.fullScreen;
      if (fullScreen) {
        Videoctx.pause()
        Videoctx.exitFullScreen()
        this.setData({ fullScreen: false })
      } else {
        Videoctx.requestFullScreen()
        Videoctx.play()
        this.setData({ fullScreen: true })
      }
    }
  }
})
