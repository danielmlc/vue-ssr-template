import {fetchData} from '../../api'
const  RESULT='RESULT';
 /* 
 数据获取
 */
const state = {
    result:{}
}

const getters = {
    getResult: status =>status.result,
}

const mutations = {
    [RESULT](state, status) {
        state.result = status
    },
}

const actions = {
    setResult({ commit }, status) {
        return fetchData(status)
          .then(data => {
              commit(RESULT, {data})
          })
       
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}