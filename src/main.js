import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'
import jQuery from 'jquery'
import router from './router'
import Toast, { POSITION } from "vue-toastification"
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueSimpleAlert from "vue3-simple-alert-next"
import "vue-toastification/dist/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

//Initialize
const app = createApp(App)
app.config.globalProperties.$hostname = process.env.VUE_APP_HOSTNAME
app.config.globalProperties.$api = process.env.VUE_APP_API
app.config.globalProperties.$base_url = process.env.VUE_APP_BASE_URL
app.config.globalProperties.$store = process.env.VUE_APP_BASE_URL
const store = new vuex.Store({
    state: {
        user: false,
    },
    mutations: {
        loadUser(state){
            if(localStorage.getItem('token')){
                axios.get(process.env.VUE_APP_API+'/auth/me', {
                    params: {
                        token: localStorage.getItem('token'),
                    },
                })
                .then(function(response){
                    if(response.data.auth == true){
                        state.user = response.data
                    }
                    if(response.data.auth == false){
                        localStorage.setItem('token', '')
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        },
    }
})
const ToastOptions = {
    hideProgressBar: true,
    maxToasts: 3,
    transition: 'none',
    timeout: 3000,
    position: POSITION.BOTTOM_RIGHT,
    containerClassName: "px-2"
}
window.$ = jQuery;
app.use(router).use(store).use(Toast, ToastOptions).use(CKEditor).use(VueSimpleAlert, { reverseButtons: true }).mount('#app')