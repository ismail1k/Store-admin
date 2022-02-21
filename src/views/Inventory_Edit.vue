<template>
    <div class="container my-3">
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-end">
                <button class="btn btn-outline-primary ml-3 px-4" @click="$router.back()">Back</button>
            </div>
        </div>
        <spinner v-if="loading"></spinner>
        <div class="cart-body" v-else>
            <div class="d-flex my-1">
                <div class="col-6"><span>Inventory Name: </span> </div>
                <div class="col-6"><span class="text-primary" v-text="inventory.name"></span></div>
            </div>
            <div class="d-flex my-1">
                <div class="col-6"><span>Inventory Type: </span> </div>
                <div class="col-6">
                    <span class="text-primary" v-if="inventory.digital">Digital</span>
                    <span class="text-primary" v-if="!inventory.digital">Physical</span>
                </div>
            </div>
            <div class="d-flex my-1">
                <div class="col-6"><span>Quantity: </span> </div>
                <div class="col-6"><span class="text-primary"><span v-text="inventory.items.length"></span> Items</span></div>
            </div>
            <div class="my-3" v-if="inventory.items && !inventory.digital">
                <table class="table table-bordered" v-if="inventory.items.length">
                    <tr>
                        <th width="50px">#</th>
                        <th>Value</th>
                        <th width="100px">Availability</th>
                        <th width="50px">Action</th>
                    </tr>
                    <tr v-for="item, index in inventory.items" :key="(item, index)">
                        <td v-text="index+1"></td>
                        <td v-text="item.value"></td>
                        <td align="center">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" :value="inventory.items[index].valid" v-model="inventory.items[index].valid" class="custom-control-input" :id="'customSwitch_'+index">
                                <label class="custom-control-label" :for="'customSwitch_'+index"></label>
                            </div>
                        </td>
                        <td align="center">
                            <span class="text-danger btn" @click="removeItem(index)"><i class="fa-solid fa-xmark"></i></span>
                        </td>
                    </tr>
                    <tr>
                        <td>--</td>
                        <td>
                            <div class="p-1">
                                <input type="text" class="form-control form-control-sm" placeholder="Add new item">
                            </div>
                        </td>
                        <td align="center">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitch2">
                                <label class="custom-control-label" for="customSwitch2"></label>
                            </div>
                        </td>
                        <td align="center">
                            <span class="text-success btn"><i class="fa-solid fa-check"></i></span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="d-flex justify-content-end my-1">
                <button class="btn btn-primary" :disabled="save == false">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'
import { useToast } from "vue-toastification"
export default {
    data(){
        return {
            loading: true,
            inventory: false,
            inventory_origin: false,
            save: false,
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
                self.inventory.items.forEach(item => {
                    let index = self.inventory.items.indexOf(item)
                    self.inventory.items[index].valid = item.valid==1?true:false
                })
                self.inventory_origin = self.inventory
                console.log(self.inventory_origin)
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        removeItem: function(index){
            this.inventory.items.splice(index, 1)
        },
    },
    watch: {
        inventory: {
            handler(){
                console.log(this.inventory)
                console.log(this.inventory_origin)
                if(_.isEqual(this.inventory_origin, this.inventory)){
                    this.save = false
                } else {
                    this.save = true
                }
            },
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