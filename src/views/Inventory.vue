<template>
    <div>
        <div class="card-header">
            <div class="d-flex align-items-center">
                <input type="text" class="form-control" v-model="inventory_name" placeholder="New inventory">
                <select class="form-control mx-2 col-2" v-model="inventory_type">
                    <option value="1">Physical</option>
                    <option value="2" disabled>Digital</option>
                </select>
                <button class="btn btn-outline-primary px-4" @click="make()">Create</button>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-4" v-if="loading"></Spinner>
            <div v-if="!loading && inventories.length">
                <table class="table table-striped">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Linked to</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    <tr class="border-0" v-for="(inventory, index) in inventories" :key="(inventory, index)">
                        <td><span v-text="index+1"></span></td>
                        <td><span v-text="inventory.name"></span><i v-if="inventory.digital">(Digital)</i></td>
                        <td><span v-text="inventory.product"></span>Product</td>
                        <td><span v-text="inventory.quantity"></span></td>
                        <td>
                            <a href="javascript:void(0)" v-if="!inventory.product" class="text-danger" @click="remove(inventory.id)"><i class="fa-solid fa-trash-can"></i></a>
                            <router-link :to="'/inventory/'+inventory.id+'/edit'"><i class="fa-solid fa-pen-to-square"></i></router-link>
                        </td>
                    </tr>
                </table>
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
            inventories: false,
            inventory_name: '',
            inventory_type: 1,
        }
    },
    name: 'Inventory',
    components: {
        Spinner,
    },
    methods:{
        load: function(){
            let toast = useToast()
            let self = this
            this.loading = true
            axios.get(this.$api+'/inventory', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                self.inventories = response.data
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        make: function(){
            let toast = useToast()
            let self = this
            if(!this.inventory_name.trim()){
                toast.warning('Inventory Name must be not empty!')
                return false
            }
            axios.post(this.$api+'/inventory/new', {
                token: localStorage.getItem('token'),
                name: self.inventory_name.trim(),
                type: self.inventory_type,
            })
            .then(function(){
                toast.info('Inventory created!')
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.load()
            })
        },
        remove: function(inventory_id){
            this.$confirm("Are you sure you want to remove inventory?")
            .then(() => {
                let self = this
                let toast = useToast()
                this.loading = true
                axios.get(this.$api+'/inventory/remove', {
                    params: {
                        token: localStorage.getItem('token'),
                        inventory_id: inventory_id,
                    },
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.info('Inventory removed!')
                    }
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                    self.load()
                })
            })
        },
    },
    created(){
        this.load()
    },
}
</script>