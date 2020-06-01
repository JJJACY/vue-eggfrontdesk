//logs.js
import Todo from './../../models/todo.js';
import {formatTime} from './../../utils/date.js';
import Todokeyresult from './../../models/todokeyresult.js';

Page({
  data: {
    todos: [],
    value: '',
  },
  onShow: function (options) {
    Todo.index({status:0}).then(res=>{
      this.setData({todos: res.todos})
    })
  },
  handleInput: function(e) {
    let value = e.detail.value;
    this.setData({value})
  },
  handleConfirm: function(e){
    let title = e.detail.value;
    Todo.insert({title}).then(res=>{
      console.log(res)
      let created_time = formatTime(new Date())
      let id = res.id;
      let todos = this.data.todos;
      todos.push({id,title,created_time})
      this.setData({value:'',todos})
    })
  },
  handleShowActionSheet: function(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['关联', '完成', '删除'],
      itemColor: '#333',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
            wx.navigateTo({url: '/pages/todo_keyresult/todo_keyresult?id=' + id})
            break;
          case 1:
            this.handleFinishTodo(id,index)
            break;
          case 2:
            wx.showModal({
              title: '删除',
              content: '是否删除todo',
              success:(res)=> {
                if (res.confirm) {
                  this.handleDeleteTodo(id,index)
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
  handleFinishTodo: function(id,index){
    Todo.update(id,{status:1}).then(res=>{
      let todos = this.data.todos;
      todos.splice(index, 1)
      this.setData({ todos })
    })
  },
  handleDeleteTodo:function(id,index){
    Todo.delete(id).then(res=>{
      let todos = this.data.todos;
      todos.splice(index, 1)
      this.setData({ todos })
    })
  }
})
