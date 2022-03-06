<template>
    <div>
        <div class="card-header d-flex justify-content-between align-items-center">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <Spinner class="my-4" v-if="loading"></Spinner>
        <div class="card-body" v-if="!loading && user">
            <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Fullname: </label></div>
                <div class="col-12 col-md-8">
                <input type="text" class="form-control" v-model="user.name" placeholder="fullname" />
                </div>
            </div>
            <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Email: </label></div>
                <div class="col-12 col-md-8">
                <input type="text" class="form-control" v-model="user.email" placeholder="fullname"/>
                </div>
            </div>
            <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Phone: </label></div>
                <div class="col-12 col-md-8">
                <input type="text" class="form-control" v-model="user.phone" placeholder="Phone number"/>
                </div>
            </div>
            <div class="form-group d-md-flex my-3" v-if="user.id != $store.state.user.id">
                <div class="col-md-4"><label for="">Role: </label></div>
                <div class="col-12 col-md-8">
                    <select class="form-select" v-model="user.role" aria-label="Default select example">
                        <option value="1">Memeber</option>
                        <option value="2" class="text-success">Staff</option>
                        <option value="3" class="text-danger" v-if="$store.state.user.role == 3">Owner</option>
                    </select>
                    <small v-if="user.role == 3"><i>* If the user has the owner role, they will have access to everything.</i></small>
                </div>
            </div>
            <div v-if="user.role == 2 && user.id != $store.state.user.id" class="fw-bolder mt-5">Give access to:</div>
            <div v-if="user.role == 2 && user.id != $store.state.user.id" class="row justify-content-start mx-3">
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.dashboard" class="form-check-input" id="dashboard" type="checkbox" role="switch">
                        <label class="form-check-label" for="dashboard">Dashboard</label>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.order" class="form-check-input" id="order" type="checkbox" role="switch">
                        <label class="form-check-label" for="order">Order</label>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.product" class="form-check-input" id="product" type="checkbox" role="switch">
                        <label class="form-check-label" for="product">Product</label>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.inventory" class="form-check-input" id="inventory" type="checkbox" role="switch">
                        <label class="form-check-label" for="inventory">Inventory</label>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.category" class="form-check-input" id="category" type="checkbox" role="switch">
                        <label class="form-check-label" for="category">Category</label>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.customer" class="form-check-input" id="customer" type="checkbox" role="switch">
                        <label class="form-check-label" for="customer">Customer</label>
                    </div>
                </div>
                <div class="col-3 d-flex justify-content-between">
                    <div class="form-check form-switch mt-3">
                        <input v-model="user.permission.settings" class="form-check-input" id="settings" type="checkbox" role="switch">
                        <label class="form-check-label" for="settings">Settings</label>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mx-3 px-3 mt-3">
                <button type="button" class="btn btn-outline-success" @click="save()">Save</button>
            </div>
        </div>
        <div v-if="!loading && !user" class="d-flex justify-content-center">
            <span>User not found!</span>
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
            user: false,
        }
    },
    name: 'Customers-Edit',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/user', {
                params: {
                    token: localStorage.getItem('token'),
                    user_id: self.$route.params.user_id,
                },
            })
            .then(function(response){
                self.user = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    role: response.data.role,
                    permission: response.data.permission,
                }
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
        },
        editUser: async function(){
            let self = this
            let ok = false
            let toast = useToast()
            await axios.post(this.$api+'/user/edit', {
                token: localStorage.getItem('token'),
                user_id: self.user.id,
                name: self.user.name,
                email: self.user.email,
                phone: self.user.phone,
                role: self.user.role,
            })
            .then(function(response){
                if(response.data.status == 200){
                    ok = true
                } else if(response.data.status == 403){
                    toast.warning('Unauthorized action!')
                } else {
                    toast.warning('Error!')
                }
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
            return ok
        },
        editPermission: async function(){
            let self = this
            let toast = useToast()
            let ok = false
            await axios.post(this.$api+'/permission/update', Object.assign({
                token: localStorage.getItem('token'),
                user_id: self.$route.params.user_id,
            }, this.user.permission))
            .then(function(response){
                if(response.data.status == 200){
                    ok = true
                } else {
                    toast.error('Error!')
                }
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
            return ok
        },
        save: async function(){
            this.loading = true
            let toast = useToast()
            if(!await this.editUser()){
                toast.error('Cannot edit user!')
                this.loading = false
                return false
            }
            if(this.user.role == 2){
                if(!await this.editPermission()){
                    toast.error('Cannot edit permissions!')
                    this.loading = false
                    return false
                }
            }
            this.loading = false
            toast.info('User info changed!')
            
        },
    },
    created(){
        this.load()
    }
}
</script>