import Vue from 'vue'
import Vuex from 'vuex'
import meterials from './modules/meterials'
Vue.use(Vuex);


export function createStore() {
    return new Vuex.Store({
        modules:{
            meterials
        }
    })
}
