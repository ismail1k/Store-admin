<template>
    <div>
        <div class="card-header d-flex justify-content-end">
            <router-link to="/order/create" class="btn btn-outline-primary ml-2">Create Order</router-link>
        </div>
        <div class="card-body">
            <Spinner v-if="loading"></Spinner>
            <div v-if="!loading && orders.length">
                <table class="table">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="order, index in orders" :key="(order, index)">
                        <td v-text="index + 1"></td>
                        <td>
                            <div><b v-text="order.fullname"></b></div>
                            <small><i v-text="order.phone"></i></small>
                        </td>
                        <td v-text="order.address"></td>
                        <td>
                            <span v-if="order.state == 0" class="badge bg-danger">Reject</span>
                            <span v-if="order.state == 1" class="badge bg-warning">Pending</span>
                            <span v-if="order.state == 2" class="badge bg-info">Processing</span>
                            <span v-if="order.state == 3" class="badge bg-success">Complete</span>
                        </td>
                        <td>
                            <router-link :to="'/order/'+order.id+'/view'" class="btn btn-sm btn-outline-primary">More</router-link>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="!loading && !orders.length" class="d-flex justify-content-center">
                <span>No order found!</span>
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
            orders: false,
        }
    },
    name: 'Order',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/order', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                self.orders = response.data
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
        },
    },
    created(){
        this.load()
    },
}
</script>
<style scoped>
.table>:not(:first-child){
    border:0;
}
</style>