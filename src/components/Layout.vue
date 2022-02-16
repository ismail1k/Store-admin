<template>
    <div>
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <router-link class="navbar-brand" to="/">Management</router-link>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            
            <ul class="navbar-nav ml-auto mr-md-0">
                <li class="nav-item dropdown" @click="logout()">
                    <a class="nav-link"><i class="fas fa-arrow-right-from-bracket fa-fw"></i></a>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav" v-if="menu.length">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <router-link v-for="m in menu" :key="m" class="nav-link" :to="'/'+m.url">
                                <div class="sb-nav-link-icon"><i :class="'fas fa-'+m.icon"></i></div>
                                {{m.name}}
                            </router-link>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer" v-if="user">
                        <div class="small">Logged in as:</div>
                        {{user.name}}
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <Spinner class="my-5" v-if="loading"></Spinner>
                <main v-show="!loading">
                    <div id="toast-container"></div>
                    <slot></slot>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div>
                            </div>
                            <div class="text-muted">Copyright &copy; {{$hostname}} 2021</div>
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
        loadUser: async function(){
            let user = false
            let self = this
            if(!localStorage.getItem('token')){
                self.$router.push({path: '/login'})
                return false
            }
            await axios.get(this.$api+'/auth/me', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                if(response.data.admin == true){
                    user = response.data
                } else {
                    localStorage.setItem('token', '')
                    this.$router.push('/login')
                    user = false
                }
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.user = user
                return false
            })
        },
        loadMenu: async function(){
            let menu = false
            let self = this
            await axios.get(this.$api+'/data/menu', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                menu = response.data
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.menu = menu
            })
        },
        logout: function(){
            let self = this
            axios.post(this.$api+'/auth/logout', {
                token: localStorage.getItem('token'),
            })
            .then(function(){
                localStorage.setItem('token', '')
                self.$router.push({path: '/login'})
            })
            .catch(function(error){
                console.log(error)
            })
        },
    },
    async created(){
        await this.loadUser()
        await this.loadMenu()
        this.loading = false
    },
    mounted(){
        $("#sidebarToggle").on("click", function(e) {
            e.preventDefault()
            $("body").toggleClass("sb-sidenav-toggled")
        })
        let self = this
        setInterval(async function(){
            await self.loadUser()
        }, 10000)
    },
}
</script>