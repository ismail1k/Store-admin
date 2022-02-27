<template>
    <div class="container my-2">
        <div class="card-header d-flex justify-content-between align-items-center my-2">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <router-link to="/category" class="btn btn-outline-primary ml-2">Categories</router-link>
                <router-link to="/inventory" class="btn btn-outline-primary ml-2">Inventories</router-link>
            </div>
        </div>
        <div>
            <div class="input-group mb-3">
                <div class="col-md-4"><label for="">Images: </label></div>
                <div class="col-12 col-md-8 d-flex px-0">
                    <div class="col-6">
                        <input type="file" class="form-control"/>
                        <small><i>Choose a primary image for the thumbnail.</i></small>
                    </div>
                    <div class="col-6">
                        <input type="file" class="form-control" multiple/>
                        <small><i>You can add more images if you have.</i></small>
                    </div>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Product Name: </label></div>
                <div class="col-12 col-md-8">
                    <input type="text" v-model="product.name" class="form-control" placeholder="Product name" />
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
                    <ckeditor class="border" v-model="product.description" :editor="editor" :config="editorConfig"></ckeditor>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Category : </label></div>
                <div class="col-md-8 d-flex justify-content-between">
                    <select class="form-select" v-model="product.category.id">
                        <option value="null" selected disabled>Select Category</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
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
// import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useToast } from "vue-toastification"

export default {
    data(){
        return {
            editor: ClassicEditor,
            editorConfig: {},
            product: {
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
                    name: '',
                    type: 1,
                },
            },
        }
    },
    name: 'Product-New',
    methods: {
        validate: async function(){
            let product = this.product
            if(!product.name){
                this.$alert('Please set a valid Product name!')
                return false
            }
            if(!product.short_description){
                this.$alert('Please set a valid Short description!')
                return false
            }
            if(product.price.original <= 0.5){
                this.$alert('Original price!')
                return false
            }
            if(product.category.id == 0 && !product.category.name){
                return false
            }
            if(!product.inventory.type || !product.inventory.name){
                return false
            }
            return false
        },
        insertMedia: function(){

        },
        createCategory: function(){

        },
        createInventory: function(){

        },
        createProduct: function(){

        },
        create: async function(){
            let toast = useToast()
            if(!await this.validate()){
                toast.warning('Bad credentials!')
                return false
            }
            if(!this.insertMedia()){
                toast.warning('Cannot insert images!')
                return false
            }
            if(!this.createCategory()){
                toast.warning('Cannot create category!')
                return false
            }
            if(!this.createInventory()){
                toast.warning('Cannot create inventory!')
                return false
            }
            if(!this.createInventory()){
                toast.warning('Cannot create product!')
                return false
            }
        },
    },
}
</script>