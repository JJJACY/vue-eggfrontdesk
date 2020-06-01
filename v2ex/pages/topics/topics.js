Page({
  data:{
		topics:[]
	},
	onLoad:function(options){
    this.getData(options.id)
	},
	getData: function(id){
    wx.request({
			url:'https://www.v2ex.com/api/topics/show.json?node_id=' + id,
			success:(res)=>{
				this.setData({
          topics: res.data      
				})
			}
		})
	}
})