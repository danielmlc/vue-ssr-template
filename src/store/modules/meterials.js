import {fetchToken} from '../../api'
const  LIST='LIST';
 /* 
 物料明细
 */
const state = {
    list:{}
}

const getters = {
    getList: status =>status.list,
}

const mutations = {
    [LIST](state, status) {
        state.list = status
    },
}

const actions = {
    setList({ commit }, status) {
        return fetchToken()
          .then(data => {
              commit(LIST, {data})
          })
       
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}