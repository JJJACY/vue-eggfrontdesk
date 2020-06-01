// pages/okr/okr.js
import Okr from './../../models/okr.js';
import Objective from './../../models/objective.js';
Page({
  data: {
    objective: []
  },
  onShow: function () {
    console.log(123)
    Okr.index({}).then(res => {
      console.log(res)
      this.setData({ objective: res.objective })
    })
  },
  handlecheckout:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let status = e.currentTarget.dataset.status;
    console.log(status)
    let statusChange = status? 0: 1;
    let statusChangeDisplay = statusChange? '已完成' : '未完成';
    wx.showActionSheet({
      itemList: ['查看', '编辑', statusChangeDisplay,'删除'],
      success:(res)=> {
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
            wx.navigateTo({ url: '/pages/okrdetail/okrdetail?id=' + id })
            break;
          case 1:
            wx.navigateTo({url: '/pages/okredit/okredit?id=' + id})
            break;
          case 2:
            this.handleChangeobj(id,index,statusChange)
            break;
          case 3:
            wx.showModal({
              title: '删除',
              content: '是否删除 OKR',
              success:(res)=> {
                if (res.confirm) {
                  this.hanledeleteokr(id,index)
                } 
              }
            })
            break; 
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleChangeobj: function(id,index,status){
    Objective.update(id,{status}).then(res=>{
      let objective = this.data.objective;
      objective[index].status =status;
      this.setData({objective})
    })
  },
  hanledeleteokr: function(id,index){
    console.log(index)
    Objective.delete(id).then( res=>{
      let objective = this.data.objective;
      objective.splice(index,1)
      this.setData({objective})
    })
  }
})