import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Main = resolve => require(['../views/Main.vue'], resolve)
export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes:[
      {
        path: '/',
        name: 'Main',
        component: Main,
        redirect:'home',
        children: [
          { path: 'home', component: () => import('../views/home/Index.vue'), name: '首页'  },
          { path: 'production', component: () => import('../views/production/Index.vue'), name: '产品与服务'  },
          { path: 'aboutme', component: () => import('../views/aboutme/Index.vue'), name: '关于我们'  },
        ]
      }
    ]
  })
}