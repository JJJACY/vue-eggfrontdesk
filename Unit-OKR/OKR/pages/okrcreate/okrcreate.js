// pages/okrcreate/okrcreate.js
import okr from './../../models/okr.js';
Page({
  data:{
    objectve:'',
    keyresult:[]
  },
  handleaddkeyresult: function(){
    let keyresult = this.data.keyresult;
    keyresult.push({title:''})
    this.setData({keyresult})
  },
  handledeletekeyresult: function(e){
    let index = e.currentTarget.dataset.index;
    let keyresult = this.data.keyresult;
    keyresult.splice(index,1)
    this.setData({keyresult})
  },
  handlechangeobj: function(e){
    let value = e.detail.value;
    this.setData({objective:value})
  },
  handlechangekr: function(e){
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let keyresult = this.data.keyresult;
    keyresult[index].title =value;
    this.setData({keyresult})
  },
  handleSubmit: function(e){
    let keyresult = this.data.keyresult;
    let objective = this.data.objective;
    let value = keyresult.some(data => data.title == '')
    if (!objective || value){
      wx.showToast({
        title: '目标成果缺一不可',
        icon: 'none',
        mask:'true',
        duration: 2000
      })
      return
    }
    let params = {keyresult,objective}
    okr.insert(params).then(res=>{
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/okr/okr'
        })
        duration: 500
      })
    })
  }
})