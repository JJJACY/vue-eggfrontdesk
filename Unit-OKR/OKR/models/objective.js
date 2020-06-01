import { request } from './request.js';
import API from './api.js';

export default{
  insert(params) {
    return request({ url:API.objective, method:'POST' ,data: params})
  },
  update(id,params){
    return request({ url:API.objectiveItem(id), method:'PUT' , data: params})
  },
  delete(id) {
    return request({url: API.objectiveItem(id), method: 'DELETE' })
  }
}