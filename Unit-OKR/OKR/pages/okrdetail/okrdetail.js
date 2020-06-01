// pages/okrdetail/okrdetail.js
import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';
import Objective from './../../models/objective.js';
import { formatTime } from './../../utils/date.js';

Page({
  data:{
    okr:''
  },
  onLoad:function(opt){
    let id = opt.id;
    // console.log(opt)
    Okr.show(id).then(res=>{
      this.setData({ okr: res.okr, id })
    })
  },
  handleObjectiveActionSheet: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';
    wx.showActionSheet({
      itemList: [statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res) => {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            this.handleChangeobj(id, statusChange)
            console.log(statusChange)
            break;
          case 1:
            this.handleDeleteobj(id)
            break;
        }
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
  },
  handleKeyresultActionSheet: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let status = e.currentTarget.dataset.status;
    console.log(status)
    let statusChange = status? 0 : 1 ;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';
    wx.showActionSheet({
      itemList: [statusChangeDisplay,'删除'],
      itemColor: '#333',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
            Keyresult.update(id,{status}).then(res=>{
              console.log(123,res)
              let okr = this.data.okr;
              console.log(okr)
              okr.keyresults[index].status = statusChange;
              console.log(statusChange)
              this.setData({okr})
            })
            break;
          case 1:
            Keyresult.delete(id).then(res=>{
              let okr = this.data.okr;
              okr.keyresults.splice(index,1)
              this.setData({okr})
            })
            break;
        }
      },
      fail: (res)=>{
        console.log(res.errMsg)
      }
    })
  },
  handleChangeobj: function (id, status){
    console.log(status)
    Objective.update(id, {status}).then(res=>{
      let finished_time = status? formatTime( new Date()) : null;
      let okr = this.data.okr ;
      console.log(okr)
      okr.status = status;
      okr.finished_time = finished_time;
      this.setData({okr})
    })
  },
  handleDeleteobj: function(id){
    Objective.delete(id).then(res=>{
      wx.showToast({
        title: '删除',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/okr/okr',
        },1000)
      })
    })

  },
})