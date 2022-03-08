<template>
    <div>
        <div class="card-header d-flex justify-content-end">
            <router-link to="/inventory" class="btn btn-outline-primary ml-2">Inventory</router-link>
            <router-link to="/product/create" class="btn btn-outline-primary ml-2">Create Product</router-link>
        </div>
        <div class="card-body">
            <Spinner class="my-4" v-if="loading"></Spinner>
            <div v-if="!loading">
                <table class="table" v-if="products.length">
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th width="100px">Quantity</th>
                        <th width="100px">Price</th>
                        <th width="130px">Action</th>
                    </tr>
                    <tr v-for="product, index in products" :key="(product, index)">
                        <td v-text="index+1"></td>
                        <td>
                            <b><span v-text="product.name"></span> <span v-if="!product.availability" class="badge bg-warning text-dark">Inactive</span></b>
                            <span v-if="product.inventory.digital"><small><i>(Digital)</i></small></span><br>
                            <i class="d-none d-md-block py-0"><small v-text="product.short_description.substring(0, 180)"></small>...</i>
                        </td>
                        <td><span v-text="product.inventory.quantity + ' Item'"></span></td>
                        <td><span v-text="product.price-product.discount"></span>{{$store.state.currency}}</td>
                        <td>
                            <a class="btn text-danger py-0 mx-1" @click="remove(product.id)"><i class="fa-solid fa-trash-can"></i></a>
                            <router-link :to="'/product/'+product.id+'/view'" class="btn text-primary py-0 mx-1" ><i class="fa-solid fa-pen-to-square"></i></router-link>
                        </td>
                    </tr>
                </table>
                <div v-if="!products.length" class="d-flex justify-content-center">
                    <span>No product found!</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { useToast } from "vue-toastification"
import Spinner from '../components/Spinner.vue';
export default {
  components: { Spinner },
    data() {
        return {
            loading: false,
            products: false,
        };
    },
    name: "Product-List",
    methods: {
        load: function(){
            let self = this
            let toast = useToast()
            this.loading = true
            axios.get(this.$api+'/product', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                self.products = response.data
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        remove: function(product_id){
            let toast = useToast()
            let self = this
            this.$confirm("Are you sure you want to remove product?")
            .then(() => {
                self.loading = true
                axios.get(self.$api+'/product/remove', {
                    params: {
                        token: localStorage.getItem('token'),
                        product_id: product_id,
                    },
                })
                .then(function(response){
                    if(response.data.status == 200){
                        self.$alert('Product was removed!')
                    }
                })
                .catch(function(error){
                    console.log(error)
                    toast.error('Error!')
                })
                .finally(function(){
                    self.loading = false
                    self.load()
                })
            })
            
        }
    },
    created(){
        this.load()
    }
};
</script>
<style scoped>
.table>:not(:first-child){
    border:0;
}
</style>