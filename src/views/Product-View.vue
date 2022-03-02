<template>
    <div class="container my-2">
        <div class="card-header d-flex justify-content-between align-items-center my-2">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
        </div>
        <Spinner v-if="loading" class="my-5"></Spinner>
        <div v-if="!loading && product">
            <div class="alert alert-warning mx-3 mt-3" v-if="!product.availability">
                <span>This product is not available for all customers! <a href="javascript:void(0)" @click="product.availability = true">click here</a> to make it availabe to all.</span>
            </div>
            <div class="input-group mb-3">
                <div class="col-md-4"><label for="">Images: </label></div>
                <div class="col-12 col-md-8">
                    <div class="d-flex">
                        <div class="col-6 mb-2">
                            <img :src="$base_url+product.media.primary.path" class="img-thumbnail rounded ">
                        </div>
                        <div class="col-6 overflow-auto mb-2 row">
                            <div class="col-4 position-relative d-flex justify-content-center" v-for="media in product.media.attachment" :key="media">
                                <img :src="$base_url+media.path" class="rounded position-absolute w-100">
                                <button class="btn btn-sm btn-danger py-0 position-absolute top-0 end-0 m-1" @click="removeMedia(media)"><i class="fas fa-times"></i></button>
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
                <button type="button" class="btn btn-outline-primary" @click="save()">Save</button>
            </div>
        </div>
        <div v-if="!loading && !product" class="my-5 d-flex justify-content-center">
            <span>No product found!</span>
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
            product: false,
            categories: [],
        }
    },
    name: 'Product-View',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/product/view', {
                params: {
                    token: localStorage.getItem('token'),
                    product_id: self.$route.params.product_id,
                },
            })
            .then(function(response){
                if(response.data.status == 404){
                    toast.warning('No product found!')
                } else {
                    self.product = response.data
                }
                self.product = {
                    name: response.data.name,
                    tags: response.data.tags,
                    short_description: response.data.short_description,
                    description: response.data.description,
                    availability: response.data.availability,
                    category: {
                        id: response.data.category?response.data.category.id:null,
                    },
                    inventory: {
                        type: response.data.inventory.digital?2:1,
                        name: response.data.inventory.name,
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
                console.log(response.data)
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        removeMedia: function(media){
            console.log(media)
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
            return true
        },
        updateMedia: async function(){

        },
        save: async function(){
            let toast = useToast()
            let self = this
            if(!await this.validate()){
                self.loading = false
                return false
            }
            if(!await this.updateMedia()){
                toast.warning('Cannot insert images!')
                self.loading = false
                return false
            }
            this.$alert('You have updated a product!')
        },
    },
    created(){
        this.load()
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