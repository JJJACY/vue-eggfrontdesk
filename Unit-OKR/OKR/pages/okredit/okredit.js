// pages/okredit/okredit.js
import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';
Page({
  data:{
    okr:null,
    objective: '',
    keyresult:[{
      title:''
    }]
  },
  onLoad: function(opt){
    let  id = opt.id ;
    Okr.show(id).then(res=>{
      let objective = res.okr.title;
      let keyresult = res.okr.keyresults;
      this.setData({okr:res.okr,objective,keyresult,id})
    })
  },
  handleaddkeyresult: function () {
    let keyresult = this.data.keyresult;
    keyresult.push({ title: '' })
    this.setData({ keyresult })
  },
  handledeletekeyresult: function (e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let keyresult = this.data.keyresult;
    Keyresult.delete(id).then((res)=>{
      console.log(res)
      keyresult.splice(index, 1)
      this.setData({ keyresult })
    })
  },
  handlechangeobj: function (e) {
    console.log(e)
    let value = e.detail.value;
    this.setData({ objective: value })
  },
  handlechangekr: function (e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let keyresult = this.data.keyresult;
    keyresult[index].title = value;
    this.setData({ keyresult })
  },
  handleSubmit: function(){
    let objective = this.data.objective;
    let keyresult = this.data.keyresult;
    if (!objective || !keyresult.length) {
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    let tmp = keyresult.every(data => data.title);
    if (!tmp) {
      wx.showToast({
        title: '所添加成果为必填',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }

    let id = this.data.id;
    let params = {title: objective}
    params.keyresult = keyresult
    console.log(keyresult)
    Okr.update(id, params).then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      setTimeout(() => {
        wx.switchTab({ url: '/pages/okr/okr' })
      }, 1000)
    })
  }
})