const PREFIX  = 'http://localhost:3000/api';
export default {
  test: PREFIX + '/test',
  login: PREFIX + '/login',
  todo: PREFIX  + '/todo',
  todoItem: (id) => `${PREFIX}/todo/${id}`,

  objective: PREFIX + '/objective',
  objectiveItem: (id) => `${PREFIX}/objective/${id}`,
  keyresult: PREFIX + '/keyresult',
  keyresultItem: (id) => `${PREFIX}/keyresult/${id}`,
  
  okr:   PREFIX  +`/okr`,
  okrItem: (id) => `${PREFIX}/okr/${id}`,
  
  todoKeyresult: (id) => `${PREFIX}/todo/${id}/keyresult`,
}