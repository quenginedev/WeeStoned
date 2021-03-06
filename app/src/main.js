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
import VueCurrencyFilter from 'vue-currency-filter'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import Overdrive from 'vue-overdrive'
import Paystack from 'vue-paystack'

Vue.use(Overdrive)
Vue.use(VueAxios, axios)
Vue.use(firebase)
Vue.use(vueMoment)
Vue.use(Crud, {
  operations: [
    'product',
    'productType',
    'user',
    'purchases'
]
})
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_CLOUD_API,
    libraries: 'map', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})
Vue.use(VueCurrencyFilter,{
    symbol : '‎GH₵',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
})

Vue.component(WebRTC.name, WebRTC)
Vue.component('paystack', Paystack)

const apolloProvider = createProvider()

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')