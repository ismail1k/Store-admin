<template>
    <div>
        <div class="card-header d-flex justify-content-between align-items-center">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <a href="javascript:void(0)" @click="print()" class="btn btn-outline-primary mx-2 px-4">Print</a>
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <div class="card-body">
            <Spinner v-if="loading"></Spinner>
            <div v-if="!loading && order">
                <div id="order">
                    <table class="table">
                        <tr>
                            <td>Created by</td>
                            <td v-text="order.user?order.user.name:'Guest'"></td>
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
                            <th width="200px">Price</th>
                        </tr>
                        <tr v-for="item, index in order.cart.items" :key="(item, index)">
                            <td v-text="index+1"></td>
                            <td v-text="item.name"></td>
                            <td v-text="item.quantity"></td>
                            <td>
                                <span class="px-0" v-text="item.unit_price"></span>&nbsp;
                                <span class="px-0" v-text="$store.state.currency+'/Unit'"></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="d-flex justify-content-end">
                    <button v-if="order.state == 4 || order.state == 3 || order.state == 0" @click="remove(order.id)" class="mx-1 btn btn-outline-danger">Remove</button>
                    <button v-if="order.state == 1" @click="reject(order.id)" class="mx-1 btn btn-outline-danger">Reject</button>
                    <button v-if="order.state == 0" @click="remake(order.id)" class="mx-1 btn btn-outline-success">Remake</button>
                    <button v-if="order.state == 1" @click="confirm(order.id)" class="mx-1 btn btn-outline-success">Confirm</button>
                    <button v-if="order.state == 2" @click="complete(order.id)" class="mx-1 btn btn-outline-primary">Mark as Complete</button>
                    <button v-if="order.state == 3" @click="refund(order.id)" class="mx-1 btn btn-outline-info">Refund</button>
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
            let toast = useToast()
            this.$confirm('Are you sure you want to reject this order?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/order/edit', {
                    token: localStorage.getItem('token'),
                    order_id: self.order.id,
                    state: 0,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.success('Order has been Rejected!')
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
        remake: function(){
            let self = this
            let toast = useToast()
            this.$confirm('Are you sure you want to remake this order?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/order/edit', {
                    token: localStorage.getItem('token'),
                    order_id: self.order.id,
                    state: 1,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.success('Order has been Remaked!')
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
            let toast = useToast()
            this.$confirm('Are you sure you want to complete this order?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/order/edit', {
                    token: localStorage.getItem('token'),
                    order_id: self.order.id,
                    state: 3,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.success('Order has been Completed!')
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
        refund: function(){
            let self = this
            let toast = useToast()
            this.$confirm('Are you sure you want to refund this order?')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/order/edit', {
                    token: localStorage.getItem('token'),
                    order_id: self.order.id,
                    state: 4,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.success('Order has been Refund!')
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
        remove: function(){
            let self = this
            let toast = useToast()
            this.$confirm('Are you sure you want to remove this order? <br> You cannot undo this action.')
            .then(function(){
                self.loading = true
                axios.post(self.$api+'/order/remove', {
                    token: localStorage.getItem('token'),
                    order_id: self.order.id,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.success('Order has been Removed!')
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
        print: function(){
            let styles = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            styles += node.outerHTML;
            }
            var page = window.open('', 'PRINT')
            page.document.write("<head>"+styles+"</head>")
            page.document.write(document.getElementById('order').innerHTML)
            page.focus()
            page.print()
            page.close()
        }
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