<template>
    <div>
        <div class="card-header d-flex justify-content-between align-items-center">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <div class="card-body">
            <Spinner v-if="loading"></Spinner>
            <div v-if="!loading && order">
                <table class="table table-bordered">
                    <tr>
                        <td>Created by</td>
                        <td v-text="order.user.name"></td>
                    </tr>
                    <tr>
                        <td>Fullname</td>
                        <td v-text="order.fullname"></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td v-text="order.address"></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td v-text="order.phone"></td>
                    </tr>
                    <tr>
                        <td>Payment Method</td>
                        <td>
                            <span class="badge bg-primary" v-if="order.payment_method == 'paypal'">PayPal</span>
                            <span class="badge bg-primary" v-if="order.payment_method == 'cod'">Cash On Delivery</span>
                            <span class="badge bg-primary" v-if="order.payment_method == 'cc'">Credit Card</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Note from buyer</td>
                        <td v-text="order.note"></td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>
                            <span v-if="order.state == 0" class="badge bg-danger">Reject</span>
                            <span v-if="order.state == 1" class="badge bg-warning">Pending</span>
                            <span v-if="order.state == 2" class="badge bg-info">Processing</span>
                            <span v-if="order.state == 3" class="badge bg-success">Complete</span>
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered">
                    <tr>
                        <th width="50px">#</th>
                        <th>Product</th>
                        <th width="120px">Quantity</th>
                        <th width="100px">Remove</th>
                    </tr>
                    <tr v-for="item, index in order.cart.items" :key="(item, index)">
                        <td v-text="index+1"></td>
                        <td v-text="item.name"></td>
                        <td v-text="item.quantity"></td>
                        <td>
                            <button class="btn btn-outline-danger py-1" @click="removeItem(item.id)"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </table>
                <div class="d-flex justify-content-end">
                    <button v-if="order.state == 1" @click="reject(order.id)" class="mx-1 btn btn-outline-danger">Reject</button>
                    <button v-if="order.state == 1" @click="confirm(order.id)" class="mx-1 btn btn-outline-success">Confirm</button>
                    <button v-if="order.state == 2" @click="complete(order.id)" class="mx-1 btn btn-outline-primary">Mark as Complete</button>
                    <button v-if="order.state == 3" @click="remove(order.id)" class="mx-1 btn btn-outline-danger">Remove</button>
                </div>
            </div>
            <div v-if="!loading && !order" class="d-flex justify-content-center">
                <span>Order not found!</span>
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
            order: false,
        }
    },
    name: 'Order-View',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/order/view', {
                params: {
                    token: localStorage.getItem('token'),
                    order_id: self.$route.params.order_id,
                },
            })
            .then(function(response){
                if(response.data.id){
                    self.order = response.data
                } else {
                    toast.warning('Error')
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
        reject: function(){
            let self = this
            this.$confirm('Are you sure you want to reject this order?')
            .then(function(){
                console.log('Order Rejected!')
                self.$router.back()
            })
        },
        confirm: function(){
            let self = this
            let toast = useToast()
            this.$confirm('Are you sure you want to confirm this order?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/order/edit', {
                    token: localStorage.getItem('token'),
                    order_id: self.order.id,
                    state: 2,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.success('Order has been Confirmed!')
                        self.$router.back()
                    } else {
                        toast.warning('Error!')
                    }
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                })
            })
        },
        complete: function(){
            let self = this
            this.$confirm('Are you sure you want to complete this order?')
            .then(function(){
                console.log('Order Completed!')
                self.$router.back()
            })
        },
        remove: function(){
            let self = this
            this.$confirm('Are you sure you want to remove this order?')
            .then(function(){
                console.log('Order Removed!')
                self.$router.back()
            })
        },
    },
    created(){
        this.load()
    }
}
</script>
<style scoped>
.table>:not(:first-child){
    border:0;
}
.table-bordered>:not(caption)>*>* {
    border-width: 1px;
}
</style>