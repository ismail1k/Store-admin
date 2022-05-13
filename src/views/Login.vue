<template>
    <div class="d-flex justify-content-center">
        <Spinner v-if="loading"></Spinner>
        <div class="col-12 col-md-10 col-lg-8 col-xl-5">
            <div class="form-group my-5">
                <div class="d-flex justify-content-center">
                    <div class="footer_logo"><a>{{$hostname}}</a></div>
                </div>
            </div>
            <div class="form-group" v-if="alert">
                <div class="alert alert-danger">
                    <span>{{alert}}</span>
                </div>
            </div>
            <div>
                <div class="form-group row align-items-center mb-3">
                    <div class="d-flex justify-content-start">
                        <label for="email">Email: </label>
                    </div>
                    <div>
                        <input type="text" class="form-control" v-model="email" id="email" placeholder="Email">
                    </div>
                </div>
                <div class="form-group row align-items-center mb-3">
                    <div class="d-flex justify-content-start">
                        <label for="password">Password: </label>
                    </div>
                    <div>
                        <input type="password" class="form-control" v-model="password" id="password" placeholder="Password">
                    </div>
                </div>
                <div class="form-group">
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-ligth border-2 border-dark px-5 rounded-0" @click="login()"><span>Login</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'

export default {
    data(){
        return {
            loading: false,
            email: '',
            password: '',
            alert: false,
        }
    },
    name: 'Login',
    components: {
        Spinner,
    },
    methods: {
        login: function(){
            let self = this
            this.alert = false
            this.loading = true
            axios.post(this.$api+'/auth/login',{
                email: self.email,
                password: self.password
            })
            .then(function(response){
                if(response.data.auth == true){
                    if(response.data.admin == true){
                        if(!response.data.active){
                            self.alert = "Your account is suspended! You can't login."
                            return true
                        }else if(response.data.owner == true){
                            localStorage.setItem('token', response.data.token)
                            self.$router.back()
                            return true
                        }else if(response.data.admin == true){
                            $.each(response.data.permission, function(key, value){
                                if(value == true){
                                    localStorage.setItem('token', response.data.token)
                                    self.$router.push('/'+key) 
                                    return true
                                }
                            })
                        }
                        self.alert = "You can't access admin panel, try to contact the owner."
                    }else{
                        self.alert = 'You are not allowed to access admin panel.'
                    }
                } else {
                    self.alert = response.data.message
                }
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
    },
    created(){
        if(this.$store.state.user.auth){
            if(localStorage.getItem('token')){
                this.$router.back()
            }
        }
    },
}
</script>