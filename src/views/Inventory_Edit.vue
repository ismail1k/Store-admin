<template>
    <div class="container my-3">
        <div class="card-header d-flex justify-content-between align-items-center my-2">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
        </div>
        <spinner v-if="loading"></spinner>
        <div class="cart-body" v-else>
            <div class="d-flex my-1">
                <div class="col-4"><span>Inventory Name: </span> </div>
                <div class="col-8"><input type="text" v-model="inventory.name" class="form-control"></div>
            </div>
            <div class="d-flex my-1">
                <div class="col-4"><span>Quantity (<span>
                    <i v-if="inventory.digital">Digital</i>
                    <i v-if="!inventory.digital">Physical</i>
                </span>): </span> </div>
                <div class="col-8">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="inventory.quantity" placeholder="Set the quantity you want to add." :disabled="inventory.digital">
                        <span class="input-group-text" id="basic-addon2">item</span>
                    </div>
                </div>
            </div>
            <div class="my-3" v-if="inventory.digital">
                <table class="table table-bordered">
                    <tr>
                        <th width="50px">#</th>
                        <th>Value</th>
                        <th width="50px">Action</th>
                    </tr>
                    <tr v-for="item, index in inventory.items" :key="(item, index)">
                        <td v-text="index+1"></td>
                        <td v-text="item.value"></td>
                        <td align="center">
                            <span class="text-danger btn" @click="removeItem(item.id)"><i class="fa-solid fa-xmark"></i></span>
                        </td>
                    </tr>
                    <tr>
                        <td>--</td>
                        <td>
                            <div class="p-1">
                                <input type="text" v-model="newItemKey" class="form-control form-control-sm" placeholder="Add new item">
                            </div>
                        </td>
                        <td align="center">
                            <span class="text-success btn" @click="insertItem()"><i class="fa-solid fa-check"></i></span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="d-flex align-items-center justify-content-end m-2">
                <span v-if="inventory.product"><i class="text-muted">if you want to remove this inventory, please go to <router-link to="/product" >product page</router-link> and try to unlink it from all products!</i></span>
                <button v-if="!inventory.product" class="btn btn-outline-danger" @click="removeInventory()">Remove</button>
                <button class="btn btn-primary ml-2" @click="save()">Save</button>
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
            loading: true,
            inventory: false,
            newItemKey: '',
        }
    },
    name: 'Inventory_Edit',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            let self = this
            let toast = useToast()
            this.loading = true
            axios.get(this.$api+'/inventory/view', {
                params: {
                    token: localStorage.getItem('token'),
                    inventory_id: self.$route.params.inventory_id,
                },
            })
            .then(function(response){
                self.inventory = response.data
                if(self.inventory.digital){
                    self.inventory.items.forEach(item => {
                        let index = self.inventory.items.indexOf(item)
                        self.inventory.items[index].valid = item.valid==1?true:false
                    })
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
        insertItem: function(){
            let inventory_id = this.inventory.id
            let value = this.newItemKey
            let self = this
            let toast = useToast()
            if(!value){
                toast.warning('New items much be not empty!')
                return false
            }
            this.loading = true
            axios.post(this.$api+'/inventory/increment', {
                token: localStorage.getItem('token'),
                value: value,
                inventory_id: inventory_id,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.load()
                }
                if(response.data.status == 500){
                    toast.warning('Item already exist!')
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
        removeItem: function(sku_id){
            this.$confirm("Are you sure you want to remove item?")
            .then(() => {
                let toast = useToast()
                let self = this
                this.loading = true
                console.log(sku_id)
                axios.post(this.$api+'/inventory/descrement', {
                    sku_id: sku_id,
                    token: localStorage.getItem('token'),
                })
                .then(function(response){
                    self.load()
                    console.log(response.data)
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                })
            })
            
        },
        removeInventory: function(){
            this.$confirm("Are you sure you want to remove inventory?")
            .then(() => {
                let self = this
                let toast = useToast()
                this.loading = true
                axios.get(this.$api+'/inventory/remove', {
                    params: {
                        token: localStorage.getItem('token'),
                        inventory_id: self.inventory.id,
                    },
                })
                .then(function(response){
                    if(response.data.status == 200){
                        toast.info('Inventory removed!')
                        self.$router.back()
                    }
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                })
            })
        },
        save: async function(){
            let self = this
            let toast = useToast()
            if(!this.inventory.digital){
                await axios.post(this.$api+'/inventory/increment', {
                    token: localStorage.getItem('token'),
                    inventory_id: self.inventory.id,
                    quantity: self.inventory.quantity,
                })
                .then(function(){
                })
                .catch(function(error){
                    toast.error('Error!')
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                })
            }
            await axios.post(this.$api+'/inventory/edit', {
                token: localStorage.getItem('token'),
                inventory_id: self.inventory.id,
                new_name: self.inventory.name,
            })
            .then(function(){
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
            toast.info('Changes saved!')
            self.$router.back()
        },
    },
    mounted(){
        this.load()
    },
}
</script>
<style scoped>
.table>:not(:first-child){
    border:0;
}
</style>