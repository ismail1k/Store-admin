<template>
    <div>
        <div class="card-header d-flex justify-content-end">
            <vue-excel-xlsx v-if="x && orders.length" class="btn btn-outline-primary ml-2"
                :data="x.data"
                :columns="x.header"
                :file-name="$moment(new Date()).format('Y-d-m H:mm:s')"
                :file-type="'xlsx'"
                :sheet-name="'sheetname'">
                Export
            </vue-excel-xlsx>
            <router-link to="/product" class="btn btn-outline-primary ml-2">Product</router-link>
        </div>
        <div class="card-body">
            <Spinner v-if="loading"></Spinner>
            <div v-if="!loading && orders.length">
                <div class="form-check form-switch d-flex justify-content-end" title="Show unpayed orders">
                    <label class="form-check-label" style="margin-right:40px;" for="allOrders">Show all</label>
                    <input class="form-check-input" type="checkbox" v-model="allOrders" id="allOrders" role="switch">
                </div>
                <table class="table">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Payment Method</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="order, index in orders.filter(i => allOrders || i.payment)" :key="(order, index)">
                        <td v-text="index + 1"></td>
                        <td>
                            <div class="p-0"><b v-text="order.fullname"></b></div>
                            <small class="p-0"><i v-text="order.phone"></i></small>
                        </td>
                        <td v-text="order.address"></td>
                        <td>
                            <span class="badge bg-primary" v-text="order.payment.provider"></span>
                        </td>
                        <td>
                            <span v-if="order.state == 0" class="badge bg-danger">Reject</span>
                            <span v-if="order.state == 1" class="badge bg-warning">Pending</span>
                            <span v-if="order.state == 2" class="badge bg-info">Processing</span>
                            <span v-if="order.state == 3" class="badge bg-success">Complete</span>
                            <span v-if="order.state == 4" class="badge bg-info">Refund</span>
                        </td>
                        <td>
                            <router-link :to="'/order/'+order.id+'/view'" class="btn btn-sm btn-outline-primary py-1 px-3">More</router-link>
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
            allOrders: false,
            x: {},
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
    watch: {
        allOrders(value){
            localStorage.setItem('allOrders', value)
        },
        orders(value){
            let orders = []
            let id = 0
            value.forEach(order => {
                order.items.forEach(item => {
                    id++
                    orders.push({
                        id: id,
                        fullname: order.fullname,
                        email: order.email,
                        phone: order.phone,
                        address: order.address,
                        payment_method: order.payment.provider,
                        state: order.state==0?'reject':order.state==1?'pending':order.state==2?'processing':order.state==3?'complete':order.state==4?'refund':order.state,
                        note: order.note,
                        product: item.name,
                        quantity: item.quantity,
                    })
                });
            });
            this.x.data = orders
            this.x.header = [
                {
                    label: '#',
                    field: 'id',
                },
                {
                    label: 'Fullname',
                    field: 'fullname',
                },
                {
                    label: 'Email',
                    field: 'email',
                },
                {
                    label: 'Phone',
                    field: 'phone',
                },
                {
                    label: 'Address',
                    field: 'address',
                },
                {
                    label: 'Payment Method',
                    field: 'payment_method',
                },
                {
                    label: 'State',
                    field: 'state',
                },
                {
                    label: 'Note',
                    field: 'note',
                },
                {
                    label: 'Product',
                    field: 'product',
                },
                {
                    label: 'Quantity',
                    field: 'quantity',
                },
            ]
        },
    },
    created(){
        this.load()
        if(localStorage.getItem('allOrders') == 'true'){
            this.allOrders = true
        } else {
            this.allOrders = false
        }
    },
}
</script>
<style scoped>
.table>:not(:first-child){
    border:0;
}
</style>