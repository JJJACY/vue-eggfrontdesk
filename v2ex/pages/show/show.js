Page({
  data:{
    replies:{},
    topic:{}
  },
  onLoad: function(options){
    this.getTopics(options.id);
    this.getReplies(options.id);
  },
  getTopics: function(id){
    wx.request({
      url:'https://www.v2ex.com/api/topics/show.json?id='+id,
      success:(res)=>{
        this.setData({
          topic: res.data[0],
        })
      }
    })
  },
  getReplies: function(id){
    wx.request({
      url:'https://www.v2ex.com/api/replies/show.json?topic_id='+id,
      success:(res)=>{
        console.log(res)
        this.setData({
          replies: res.data,
        })
      }
    })
  }
})