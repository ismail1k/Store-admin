<template>
    <div>
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <router-link class="navbar-brand" to="/">Welcome</router-link>
            <a class="btn text-secondary btn-sm order-1 order-lg-0" id="sidebarToggle"><i class="fas fa-bars"></i></a>
            <ul class="navbar-nav ml-auto mr-md-0">
                <li class="nav-item dropdown" @click="logout()">
                    <a class="nav-link text-secondary" role="button"><i class="fas fa-power-off fa-fw"></i></a>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark position-fixed w-100" id="sidenavAccordion">
                    <div class="sb-sidenav-menu overflow-auto">
                        <div class="nav" v-if="menu.length">
                            <div class="sb-sidenav-menu-heading">Management</div>
                            <router-link v-for="m in menu" :key="m" class="nav-link" :to="'/'+m.url">
                                <div class="sb-nav-link-icon" style="width:20px;"><i :class="'fas fa-'+m.icon"></i></div>
                                <span>{{m.name}}</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer position-static bottom-0 w-100" v-if="user">
                        <div class="small">Logged in as:</div>
                        {{user.name}}
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <Spinner class="my-5" v-if="loading"></Spinner>
                <main v-show="!loading" style="height:calc(100vh - 56px - 53px);overflow:auto;">
                    <slot></slot>
                </main>
                <footer class="py-3 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div></div>
                            <div class="text-muted">Copyright &copy; {{$hostname}} {{new Date().getFullYear()}}</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/styles.css'
import '@/assets/plugins/fontawesome-6.0.0/css/all.css'
import $ from 'jquery'
import axios from 'axios'
import Spinner from './Spinner.vue'
import { useToast } from "vue-toastification"
export default {
    data(){
        return {
            loading: true,
            user: false,
            menu: false,
        }
    },
    name: 'Layout',
    components: {
        Spinner,
    },
    methods: {
        loadUser: async function(interval){
            let toast = useToast()
            let user = false
            let self = this
            if(localStorage.getItem('token')){
                await axios.get(this.$api+'/auth/me', {
                    params: {
                        token: localStorage.getItem('token'),
                    },
                })
                .then(function(response){
                    if(response.data.active){
                        if(response.data.admin == true){
                            user = response.data
                            self.$store.state.user = response.data
                            return true
                        }
                    }
                    localStorage.setItem('token', '')
                    user = false
                    self.$router.push('/login')
                })
                .catch(function(error){
                    localStorage.setItem('token', '')
                    toast.error('Please login to the account again!')
                    console.log(error)
                    self.$router.push('/login')
                    user = false
                })
                .finally(function(){
                    self.user = user
                    return false
                })
            }
            if(!localStorage.getItem('token')){
                this.$router.push('/login')
                self.user = user
                clearInterval(interval)
                return false
            }
        },
        loadMenu: async function(){
            let menu = false
            let self = this
            let toast = useToast()
            await axios.get(this.$api+'/data/menu', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                menu = response.data
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.menu = menu
            })
        },
        loadCurrency: async function(){
            let self = this
            let toast = useToast()
            await axios.get(process.env.VUE_APP_API+'/config', {
                params: {
                    token: localStorage.getItem('token'),
                    key: 'currency',
                },
            })
            .then(function(response){
                response.data.forEach(conf => {
                    if(conf.key == 'currency'){
                        self.$store.state.currency = conf.value
                    }
                })
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
        },
        logout: function(){
            let self = this
            let toast = useToast()
            axios.post(this.$api+'/auth/logout', {
                token: localStorage.getItem('token'),
            })
            .then(function(){
                localStorage.setItem('token', '')
                self.$store.state.user = false
                self.$router.push({path: '/login'})
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
        },
        toggleMenu: function(){
            $("body").toggleClass("sb-sidenav-toggled")
        },
    },
    async created(){
        await this.loadUser()
        await this.loadMenu()
        await this.loadCurrency()
        this.loading = false
    },
    mounted(){
        let self = this
        $("#sidebarToggle").on("click", function(e) {
            e.preventDefault()
            $("body").toggleClass("sb-sidenav-toggled")
        })
        $("#layoutSidenav_nav").on("click", function(e) {
            e.preventDefault()
            $("body").removeClass("sb-sidenav-toggled")
        })
        
        $("a").each(function() {
            if (this.href === window.location.href) {
                $(this).addClass("active")
            }
        })
        let interval = setInterval(async function(){
            await self.loadUser(interval)
        }, 10000)
    },
}
</script>
<style>
.router-link-active{
    transition: all 0.1s linear;
    background-color: rgba(255, 255, 255, 0.082);
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    -o-transition: all 0.1s linear;
    border-left: solid 3px #007bff;
}
.router-link-active *{
    transition: all 0.1s linear;
    color:rgb(255, 255, 255);
}
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
::-webkit-scrollbar-thumb {
    background: rgb(141, 141, 141);
    border-radius: 2px;
}
</style>