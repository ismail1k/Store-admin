<template>
    <div>
        <div class="card-header d-flex justify-content-between align-items-center">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <a v-if="product.availability" href="javascript:void(0)" class="btn btn-outline-danger ml-2" @click="hide()">Hide Product</a>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-4" v-if="loading"></Spinner>
            <div v-show="!loading && product">
                <div class="alert alert-warning" v-if="!product.availability">
                    <span>This product is not available for all customers! <a href="javascript:void(0)" @click="show()">click here</a> to make it availabe to all.</span>
                </div>
                <div class="input-group mb-3">
                    <div class="col-md-4"><label for="">Images: </label></div>
                    <div class="col-12 col-md-8">
                        <div class="d-flex mb-2">
                            <div class="col-6">
                                <img v-if="product.media.primary" :src="$base_url+product.media.primary.path" class="img-thumbnail rounded ">
                            </div>
                            <div class="col-6 overflow-auto mx-md-3 px-0 row" style="max-height:250px;">
                                <div class="col-4 position-relative d-flex justify-content-between p-0" v-for="media in product.media.attachment" :key="media">
                                    <span>
                                        <img :src="$base_url+media.path" class="rounded position-relative w-100 px-1 py-2">
                                        <button class="btn btn-sm btn-danger py-0 position-absolute top-0 end-0 m-1" @click="removeMedia(media)"><i class="fas fa-times"></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-6">
                                <input type="file" class="form-control" id="media_primary"/>
                                <small><i>leave it empty if you dont want to change it.</i></small>
                            </div>
                            <div class="col-6">
                                <input type="file" class="form-control" id="media_secondary" multiple/>
                                <small><i>You can add more images if you have.</i></small>
                            </div>
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
                        <select class="form-select mr-2" v-model="product.inventory.id">
                            <option v-for="inventory in inventories" :key="inventory" :value="inventory.id" selected>{{inventory.name}}</option>
                            <option value="0" selected>New Inventory</option>
                        </select>
                        <select v-if="product.inventory.id == 0" class="col-2 form-select" v-model="product.inventory.type">
                            <option value="1" selected>Physical</option>
                            <option value="2">Digital</option>
                        </select>
                        <input v-if="product.inventory.id == 0" type="text" v-model="product.inventory.name" class="col-6 form-control ml-2" placeholder="Inventory name"/>
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
                    <button type="button" class="btn btn-outline-primary" @click="save()">Save</button>
                </div>
            </div>
        </div>
        <div v-if="!loading && !product" class="my-5 d-flex justify-content-center">
            <span>No product found!</span>
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
                },
                media:{
                    primary: false,
                    attachment: [],
                }
            },
            categories: [],
            inventories: [],
        }
    },
    name: 'Product-View',
    components: {
        Spinner,
    },
    methods: {
        load: async function(){
            this.loading = true
            let self = this
            let toast = useToast()
            await axios.get(this.$api+'/category')
            .then(function(response){
                self.categories = response.data
            })
            .catch(function(error){
                console.log(error)
                toast.error('Cannot load Categories!')
            })
            await axios.get(this.$api+'/inventory')
            .then(function(response){
                self.inventories = response.data
            })
            .catch(function(error){
                console.log(error)
                toast.error('Cannot load Inventories!')
            })
            axios.get(this.$api+'/product/view', {
                params: {
                    token: localStorage.getItem('token'),
                    product_id: self.$route.params.product_id,
                },
            })
            .then(function(response){
                if(response.data.status == 404){
                    self.product = false
                    toast.warning('No product found!')
                } else {
                    self.product = response.data
                }
                self.product = {
                    id: response.data.id,
                    name: response.data.name,
                    tags: response.data.tags.toString(),
                    short_description: response.data.short_description,
                    description: response.data.description,
                    availability: response.data.availability,
                    category: {
                        id: response.data.category?response.data.category.id:null,
                    },
                    inventory: {
                        id: response.data.inventory.id?response.data.inventory.id:0,
                        type: 1,
                        name: '',
                    },
                    price: {
                        original: response.data.price,
                        discount: response.data.discount,
                    },
                    media: {
                        primary: response.data.media.primary,
                        attachment: response.data.media.image,
                    },

                }
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
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
            if(product.inventory.id == 0 && !product.inventory.name){
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
            return true
        },
        upload: async function(image, product_id, primary = false){
            let ok = false
            let request = new FormData();
            request.set('attachment', image)
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
        removeMedia: function(media){
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/media/remove', {
                params: {
                    token: localStorage.getItem('token'),
                    media_id: media.id,
                },
            })
            .then(function(response){
                if(response.data.status == 200){
                    if(self.product.media.attachment.indexOf(media) >= 0){
                        self.product.media.attachment.splice(self.product.media.attachment.indexOf(media), 1)
                    }
                } else {
                    self.load()
                }
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
        },
        updateMedia: async function(){
            let self = this
            this.loading = true
            for(let index = 0; index < $('#media_primary').get(0).files.length; index++){
                await self.upload($('#media_primary').get(0).files[index], self.product.id, true)
            }
            for(let index = 0; index < $('#media_secondary').get(0).files.length; index++){
                await self.upload($('#media_secondary').get(0).files[index], self.product.id, false)
            }
            this.loading = false
            return true
        },
        updateCategory: async function(){
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
        updateInventory: async function(){
            this.loading = true
            let toast = useToast()
            let self = this
            let ok = false
            if(this.product.inventory.id == 0){
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
            }
            if((this.product.inventory.id == null) || (this.product.inventory.id == 'null')){
                this.product.inventory.id = 0
                ok = true
            }
            if(this.product.inventory.id > 0){
                ok = true
            }
            return ok
        },
        updateProduct: async function(){
            this.loading = true
            let self = this
            let product = this.product
            let toast = useToast()
            let ok = false
            await axios.post(this.$api+'/product/edit', {
                token: localStorage.getItem('token'),
                product_id: product.id,
                name: product.name,
                short_description: product.short_description,
                description: product.description,
                tags: product.tags,
                category_id: product.category.id?product.category.id:null,
                inventory_id: product.inventory.id,
                price: product.price.original,
                discount: product.price.discount,
                available: product.availability,
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
        hide: async function(){
            let self = this
            let toast = useToast()
            this.$confirm("Are you sure you want to hide this product from store?<br>Product will be unavailable to all.")
            .then(() => {
                self.loading = true
                axios.post(this.$api+'/product/edit', {
                    token: localStorage.getItem('token'),
                    product_id: self.product.id,
                    available: false,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        self.$alert('Product now is unavailable to all!<br> You can change it at any time to available.')
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
        },
        show: async function(){
            let self = this
            let toast = useToast()
            self.loading = true
            axios.post(this.$api+'/product/edit', {
                token: localStorage.getItem('token'),
                product_id: self.product.id,
                available: true,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.$alert('Product now is available to all!')
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
        },
        save: async function(){
            let toast = useToast()
            let self = this
            if(!await this.validate()){
                self.loading = false
                return false
            }
            if(!await this.updateMedia()){
                toast.warning('Cannot Update images!')
                self.loading = false
                return false
            }
            if(!await this.updateCategory()){
                toast.warning('Cannot Update Category!')
                self.loading = false
                return false
            }
            if(!await this.updateInventory()){
                toast.warning('Cannot Update Inventory!')
                self.loading = false
                return false
            }
            if(!await this.updateProduct()){
                toast.warning('Cannot Update Product!')
                self.loading = false
                return false
            }
            await self.load()
            this.$alert('Product updated!')
        },
    },
    created(){
        this.load()
    },
    mounted(){
        $('#media_primary').get(0).value = null
        $('#media_secondary').get(0).value = null
    }
}
</script>