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
                    <input type="text" class="form-control" placeholder="Product name...." />
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Short Description : </label></div>
                <div class="col-12 col-md-8">
                    <input type="text" class="form-control" placeholder="Paste your short description here...." />
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Description : </label></div>
                <div class="col-12 col-md-8">
                    <ckeditor class="border" :editor="editor" v-model="product.description"></ckeditor>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Category : </label></div>
                <div class="col-md-8">
                    <select class="form-select">
                        <option value="0" selected disabled>Select Category</option>
                        <option value="1" >Category 1</option>
                        <option value="2" >Category 2</option>
                        <option value="3" >Category 3</option>
                    </select>
                </div>
            </div>
            <div class="form-group d-md-flex">
                <div class="col-md-4"><label for="">Inventory : </label></div>
                <div class="col-md-8 d-flex justify-content-between">
                    <input type="text" class="form-control" placeholder="Paste your Inventory name here...."/>
                    <select class="form-select w-75 ml-2">
                        <option value="1" selected>Physical</option>
                        <option value="2" >Digital</option>
                    </select>
                </div>
            </div>
            <div class="d-flex justify-content-end m-3">
                <button type="button" class="btn btn-outline-success">Create</button>
            </div>
        </div>
    </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block';
// import CKEditor from '@ckeditor/ckeditor5-build-balloon-block';
export default {
    data(){
        return {
            editor: ClassicEditor,
            editorConfig: {
                toolbar: [ 'bold', 'italic', '|', 'link' ]
            },
            product: {
                name: '',
                short_description: '',
                description: '',
                category: 0,
                inventory:{
                    name: '',
                    type: '2',
                },
            },
        }
    },
    name: 'Product-New',
    methods: {
        create: function(){
        },
    }
}
</script>