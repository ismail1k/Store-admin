<template>
    <div>
        <div class="card-header">
            <div class="d-flex align-items-center">
                <input type="text" class="form-control" v-model="category_name" placeholder="New Category">
                <button class="btn btn-outline-primary ml-3 px-4" @click="make()">Create</button>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-5" v-if="loading"></Spinner>
            <table class="table table-striped" v-if="!loading && categories.length">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Products</th>
                    <th width="120px">Action</th>
                </tr>
                <tr class="border-0" v-for="(category, index) in categories" :key="(category, index)">
                    <td><span v-text="index+1"></span></td>
                    <td><span v-text="category.name"></span></td>
                    <td><span v-text="category.product"></span></td>
                    <td>
                        <button class="btn btn-outline-danger" @click="remove(category.id)">Remove</button>
                    </td>
                </tr>
            </table>
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
            categories: false,
            loading: false,
            category_name: '',
        }
    },
    name: 'Category',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            const toast = useToast()
            let self = this
            this.loading = true
            axios.get(this.$api+'/category')
            .then(function(response){
                self.categories = response.data
            })
            .catch(function(error){
                toast.error("Error!")
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        remove: function(id){
            this.$confirm("Are you sure you want to remove category?<br>Any product linked to this category will be uncategoried.")
            .then(() => {
                const toast = useToast()
                let self = this
                axios.post(this.$api+'/category/remove', {
                    token: localStorage.getItem('token'),
                    category_id: id,
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.info("Category removed!")
                    }else if(response.data.status == 403){
                        toast.warning('Permission denied!')
                    }else{
                        toast.error('Error!')
                    }
                })
                .catch(function(error){
                    toast.error("Error!")
                    console.log(error)
                })
                .finally(function(){
                    self.load()
                })
            });
            
        },
        make: function(){
            let toast = useToast()
            let self = this
            if(!this.category_name){
                toast.warning('Category name must be not empty')
                return false
            }
            axios.post(this.$api+'/category/new', {
                token: localStorage.getItem('token'),
                category_name: self.category_name
            })
            .then(function(response){
                if(response.data.status == 200){
                    toast.info('Category created!')
                }else if(response.data.status == 403){
                    toast.warning('Permission denied!')
                }else{
                    toast.error('Error!')
                }
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.load()
            })
        },
    },
    created(){
        this.load()
    },
}
</script>