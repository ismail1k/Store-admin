<template>
    <div class="container my-2">
        <div class="card-header d-flex justify-content-end my-2">
            <router-link to="/product/create" class="btn btn-outline-primary">Create Product</router-link>
        </div>
        <spinner v-if="loading"></spinner>
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
                        <b><span v-text="product.name"></span></b>
                        <span v-if="product.inventory.digital"><small><i>(Digital)</i></small></span><br>
                        <i class="d-none d-md-block py-0"><small v-text="product.short_description.substring(0, 180)"></small>...</i>
                    </td>
                    <td><span v-text="product.inventory.quantity"></span>Item</td>
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
        remove: function(){
            console.log('remove')
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