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
      {name: 'new-user', path: 'new-user', component: _=>import('../views/Forms/NewUser')},
      {name: 'checkout', path: 'checkout', component: _=>import('../views/Main/Checkout')},
      { name: 'brand', path: 'brand', component: _=>import('../views/Main/Brand'), children: [
        {name: 'brand-dashboard', path: '', component: _=>import('../views/Main/Brand/Dashboard.vue')},
        {name: 'brand-products',  path: 'products', component: _=>import('../views/Main/Brand/Products.vue')},
      ]},

      {name: 'account', path: 'account', component: _=>import('../views/Main/Account/index.vue'), children: [
        {name: 'account-main', path: '', component: _=>import('../views/Main/Account/AccountHome.vue')},
        {name: 'new-brand', path: 'new-brand', component: _=>import('../views/Forms/NewBrand.vue')},
      ]},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
