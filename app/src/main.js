import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase'
import vueMoment from 'vue-moment'
import {WebRTC} from 'vue-webrtc'
import {createProvider} from './plugins/vue-apollo'
import Crud from './plugins/prisma-crud'

Vue.use(firebase)
Vue.use(vueMoment)
Vue.use(Crud, {
  operations: [
    'product',
    'productType',
    'user'
]
})
Vue.component(WebRTC.name, WebRTC)

const apolloProvider = createProvider()

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')