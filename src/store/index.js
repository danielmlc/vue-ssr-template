import Vue from 'vue'
import Vuex from 'vuex'
import fetchData from './modules/fetchData'
Vue.use(Vuex);


export function createStore() {
    return new Vuex.Store({
        modules:{
            fetchData
        }
    })
}
