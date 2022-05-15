<template>
    <div>
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-end">
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-4" v-if="loading"></Spinner>
            <div>
                <table v-if="!loading && users.length" class="table">
                    <tr>
                        <th width="50px">#</th>
                        <th>Account</th>
                        <th width="150px">Role</th>
                        <th width="130px">Action</th>
                    </tr>
                    <tr v-for="user in users" :key="user">
                        <td v-text="user.id"></td>
                        <td>
                            <b v-text="user.name"></b><br />
                            <small><i v-text="user.email"></i></small>
                        </td>
                        <td>
                            <span class="text-dark" v-if="user.role == 1">Memeber</span>
                            <span class="text-success" v-if="user.role == 2">Staff</span>
                            <span class="text-danger" v-if="user.role == 3">Owner</span>
                        </td>
                        <td>
                            <span v-if="$store.state.user.role >= user.role">
                                <a v-if="(user.id != $store.state.user.id) && (!user.active)" class="btn text-success py-0" @click="unban(user.id)"><i class="fa-solid fa-user-check"></i></a>
                                <a v-if="(user.id != $store.state.user.id) && (user.active)" class="btn text-danger py-0" @click="ban(user.id)"><i class="fa-solid fa-user-minus"></i></a>
                                <router-link v-if="user.id != $store.state.user.id" :to="'/customer/'+user.id+'/view'" class="btn text-primary py-0" ><i class="fa-solid fa-pen-to-square"></i></router-link>    
                            </span>
                        </td>
                    </tr>
                </table>
                <div v-if="!loading && !users.length" class="d-flex justify-content-center">
                    <span>No user found!</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'
import { useToast } from "vue-toastification"

export default {
    data(){
        return {
            loading: false,
            users: false,
        }
    },
    name: "Customers",
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/user/all', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                self.users = response.data
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
        },
        ban: function(user_id){
            let toast = useToast()
            let self = this
            this.$confirm('Are you sure you want to ban this user?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/user/ban', {
                    token: localStorage.getItem('token'),
                    user_id: user_id,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.info('User Banned!')
                    } else {
                        toast.error('Error!')
                    }
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                    self.load()
                })
            })
        },
        unban: function(user_id){
            let toast = useToast()
            let self = this
            this.$confirm('Are you sure you want to remove ban from this user?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/user/unban', {
                    token: localStorage.getItem('token'),
                    user_id: user_id,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.info('User Active now!')
                    } else {
                        toast.error('Error!')
                    }
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                    self.load()
                })
            })
        },
    },
    created(){
        this.load()
    }
}
</script>
<style scoped>
.table > :not(:first-child) {
  border: 0;
}
</style>