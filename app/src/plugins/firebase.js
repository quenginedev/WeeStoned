import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCd_Ibh1iIyMqocoWISK--cgBgpvleasto",
    authDomain: "weestoned-app.firebaseapp.com",
    databaseURL: "https://weestoned-app.firebaseio.com",
    projectId: "weestoned-app",
    storageBucket: "weestoned-app.appspot.com",
    messagingSenderId: "85962881517",
    appId: "1:85962881517:web:d16130b5fb9ab28318cfe4",
    measurementId: "G-4YTQEQSEV1"
} 

export default {
    install(Vue, options){
        firebase.initializeApp(firebaseConfig)
        Vue.prototype.$firebase = firebase
    }
}