import Todo from './../../models/todo'
Page({
  data:{
    todos:[],  
  },
  onShow:function(){
    Todo.index({ status: 1 }).then(res => {
      this.setData({ todos: res.todos })
    })
  },
  handleShowActionSheet: function(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['修改已完成', '删除'],
      success:(res)=> {
        console.log(res.tapIndex)
        console.log(res)
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
            this.handleChangeTodo(id,index)
            break;
          case 1:
            wx.showModal({
              title: '删除',
              content: '是否删除已完成的todo',
              success: (res) => {
                if (res.confirm) {
                  this.handleDeleteTodo(id, index)
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
  handleChangeTodo: function(id,index){
    Todo.update(id, { status: 0 , finished_time: null}).then(res=>{
      let todos = this.data.todos;
      todos.splice(index,1)
      this.setData({todos})
    })
  },
  handleDeleteTodo: function (id, index) {
    Todo.delete(id).then(res => {
      let todos = this.data.todos;
      todos.splice(index, 1)
      this.setData({ todos })
    })
  }
    
})