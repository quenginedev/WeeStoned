import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'sign_in', path: '/sign_in', component: _=>import('../views/Forms/SignIn.vue')
  },
  {
    path: '/', component: _=>import('../views/Main'), children: [
      {name: 'home', path: '', component: _=>import('../views/Main/Home.vue')},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
