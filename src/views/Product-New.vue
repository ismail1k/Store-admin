<template>
    <div class="container my-2">
        <div class="card-header d-flex justify-content-between align-items-center my-2">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <router-link to="/category" class="btn btn-outline-primary ml-2">Categories</router-link>
                <router-link to="/inventory" class="btn btn-outline-primary ml-2">Inventories</router-link>
            </div>
        </div>
        <spinner v-if="loading"></spinner>
        <div v-show="!loading">
            <div class="input-group mb-3">
                <div class="col-md-4"><label for="">Images: </label></div>
                <div class="col-12 col-md-8 d-flex px-0">
                    <div class="col-6">
                        <input type="file" class="form-control" id="media_primary"/>
                        <small><i>Choose a primary image for the thumbnail.</i></small>
                    </div>
                    <div class="col-6">
                        <input type="file" class="form-control" id="media_secondary" multiple/>
                        <small><i>You can add more images if you have.</i></small>
                    </div>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Product Name: </label></div>
                <div class="col-12 col-md-8">
                    <input type="text" v-model="product.name" class="form-control" placeholder="Product name" />
                    <small class="text-danger" v-if="product.name.includes('/')"><i>The product name must not contain slash .</i></small>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Tags: </label></div>
                <div class="col-12 col-md-8">
                    <input type="text" v-model="product.tags" class="form-control" placeholder="sport, news, blog..." />
                    <small><i>This helps customers to find the product in the search easy, recommended to use it.</i></small>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Short Description : </label></div>
                <div class="col-12 col-md-8">
                    <textarea type="text" v-model="product.short_description" class="form-control" placeholder="Small Description" />
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Description : </label></div>
                <div class="col-12 col-md-8">
                    <textarea type="text" v-model="product.description" class="form-control" placeholder="Full Description" />
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Category : </label></div>
                <div class="col-md-8 d-flex justify-content-between">
                    <select class="form-select" v-model="product.category.id">
                        <option value="null" selected>Uncategoried</option>
                        <option v-for="category in categories" :key="category" :value="category.id"><span v-text="category.name"></span> (Has <span v-text="category.product"></span> products)</option>
                        <option value="0">New Category</option>
                    </select>
                    <input v-if="product.category.id == 0" v-model="product.category.name" type="text" class="col-9 form-control ml-2" placeholder="Category name">
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Inventory : </label></div>
                <div class="col-md-8 d-flex justify-content-between">
                    <select class="form-select" v-model="product.inventory.type">
                        <option value="1" selected>Physical</option>
                        <option value="2">Digital</option>
                    </select>
                    <input type="text" v-model="product.inventory.name" class="col-9 form-control ml-2" placeholder="Inventory name"/>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Price : </label></div>
                <div class="col-md-8 d-flex justify-content-between">
                    <div class="col-4 px-0">
                        <input type="number" step="0.01" v-model="product.price.original" class="form-control text-center" placeholder="Original Price"/>
                        <small><i>Original Price</i></small>
                    </div>
                    <div class="col-4 px-0 mx-1">
                        <input type="number" step="0.01" v-model="product.price.discount" class="form-control text-center" placeholder="Discount"/>
                        <small><i>Discount</i></small>
                    </div>
                    <div class="px-0 mr-1">
                        <input type="text" :value="parseInt(product.price.original - product.price.discount)+' '+$store.state.currency" class="form-control text-center" placeholder="Discount" readonly/>
                        <small><i>Selling Price</i></small>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end m-3">
                <button type="button" class="btn btn-outline-success" @click="create()">Create</button>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { useToast } from "vue-toastification"
import Spinner from '@/components/Spinner.vue'

export default {
    data(){
        return {
            loading: false,
            product: {
                id: null,
                name: '',
                tags: '',
                short_description: '',
                description: '',
                price: {
                    original: 0.01,
                    discount: 0,
                },
                category: {
                    id: null,
                    name: '',
                },
                inventory:{
                    id: null,
                    name: '',
                    type: 1,
                }
            },
            categories: [],
        }
    },
    name: 'Product-New',
    components: {
        Spinner,
    },
    methods: {
        upload: async function(image, product_id, primary = false){
            let request = new FormData();
            let ok = false
            request.append('attachment', image)
            request.set('token', localStorage.getItem('token'))
            request.set('product_id', product_id)
            request.set('primary', primary == true?'1':'0')
            await axios.post(this.$api+'/media/new', request)
            .then(function(response){
                if(response.data.status == 200){
                    ok = true
                }
            })
            .catch(function(error){
                console.log(error)
            })
            return ok
        },
        validate: async function(){
            let product = this.product
            if(!product.name){
                this.$alert('Please set a valid Product name!')
                return false
            }
            if(product.name.includes('/')){
                this.$alert('The product name must not contain / !')
                return false
            }
            if(!product.short_description){
                this.$alert('Please set a valid Short description!')
                return false
            }
            if(product.category.id == 0 && !product.category.name){
                this.$alert('Please set category name!')
                return false
            }
            if(!product.inventory.name){
                this.$alert('Please set inventory name!')
                return false
            }
            if(product.price.original <= 0.5){
                this.$alert('Original price must be greater than 0.5!')
                return false
            }
            if(product.price.discount < 0){
                this.$alert('Discount price must be positive!')
                return false
            }
            if(!$('#media_primary').get(0).files.length){
                this.$alert('Please a primary image!')
                return false
            }
            return true
        },
        createCategory: async function(){
            this.loading = true
            let toast = useToast()
            let self = this
            let ok = false
            if(this.product.category.id == 0){
                await axios.post(this.$api+'/category/new', {
                    token: localStorage.getItem('token'),
                    category_name: self.product.category.name,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        self.product.category.id = response.data.category_id
                        self.loading = false
                        ok = true
                    }
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                })
            }
            if((this.product.category.id == null) || (this.product.category.id == 'null')){
                this.product.category.id = 0
                ok = true
            }
            if(this.product.category.id > 0){
                ok = true
            }
            return ok
        },
        createInventory: async function(){
            this.loading = true
            let toast = useToast()
            let self = this
            let ok = false
            await axios.post(this.$api+'/inventory/new', {
                token: localStorage.getItem('token'),
                name: self.product.inventory.name,
                type: self.product.inventory.type,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.product.inventory.id = response.data.inventory_id
                    self.loading = false
                    ok = true
                }
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
            return ok
        },
        createProduct: async function(){
            this.loading = true
            let self = this
            let product = this.product
            let toast = useToast()
            let ok = false
            await axios.post(this.$api+'/product/new', {
                token: localStorage.getItem('token'),
                name: product.name,
                short_description: product.short_description,
                description: product.description,
                tags: product.tags,
                category_id: product.category.id,
                inventory_id: product.inventory.id,
                price: product.price.original,
                discount: product.price.discount,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.product.id = response.data.product_id
                    self.loading = false
                    ok = true
                }
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
            return ok
        },
        insertMedia: async function(){
            let self = this
            this.loading = true
            for (let index = 0; index < $('#media_primary').get(0).files.length; index++) {
                let image = $('#media_primary').get(0).files[index]
                await self.upload(image, self.product.id, true)
            }
            for (let index = 0; index < $('#media_secondary').get(0).files.length; index++) {
                let image = $('#media_secondary').get(0).files[index]
                await self.upload(image, self.product.id, false)
            }
            this.loading = false
            return true
            
        },
        create: async function(){
            let toast = useToast()
            let self = this
            if(!await this.validate()){
                self.loading = false
                return false
            }
            if(!await this.createCategory()){
                toast.warning('Cannot create category!')
                self.loading = false
                return false
            }
            if(!await this.createInventory()){
                toast.warning('Cannot create inventory!')
                self.loading = false
                return false
            }
            if(!await this.createProduct()){
                toast.warning('Cannot create product!')
                self.loading = false
                return false
            }
            if(!await this.insertMedia()){
                toast.warning('Cannot insert images!')
                self.loading = false
                return false
            }
            this.$alert('You have created a product!')
        },
    },
    created(){
        let self = this
        let toast = useToast()
        axios.get(this.$api+'/category')
        .then(function(response){
            self.categories = response.data
        })
        .catch(function(error){
            console.log(error)
            toast.error('Cannot load Categories!')
        })
    }
}
</script>