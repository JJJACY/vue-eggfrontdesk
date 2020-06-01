import Todokeyresult from './../../models/todokeyresult.js';
Page({
  data:{
    okr:[]
  },
  onLoad: function(opt){
    let id = opt.id;
    Todokeyresult.index(id).then(res => {
      this.setData({ id, okr: res.okr })
    })
  },
  handleChange: function (e) {
    let todo_id = this.data.id;
    // console.log(todo_id)
    let keyresult_id = e.currentTarget.dataset.keyresult_id;
    console.log(e)
    let active = e.currentTarget.dataset.active;
    let index = e.currentTarget.dataset.index;
    let objective_index = e.currentTarget.dataset.objective_index;
    let changeActive = !active;
    let okr = this.data.okr;
    console.log(okr)

    if (changeActive) {
      console.log(123,todo_id,keyresult_id)
      Todokeyresult.insert(todo_id, {
        todo_id,
        keyresult_id,
      }).then(res => {
        console.log(123)
        okr[objective_index].keyresults[index].active = changeActive;
        this.setData({ okr })
      })
    } else {
      Todokeyresult.delete(todo_id, {
        todo_id,
        keyresult_id,
      }).then(res => {
        okr[objective_index].keyresults[index].active = changeActive;
        this.setData({ okr })
      })
    }
  }
  
})