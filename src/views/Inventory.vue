<template>
    <div class="container my-3">
        <div class="card-header">
            <div class="d-flex align-items-center">
                <input type="text" class="form-control" v-model="inventory_name" placeholder="New inventory">
                <button class="btn btn-outline-primary ml-3 px-4" @click="make()">Create</button>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-5" v-if="loading"></Spinner>
            <table class="table table-striped" v-if="!loading && inventories.length">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                <tr class="border-0" v-for="(inventory, index) in inventories" :key="(inventory, index)">
                    <td><span v-text="index+1"></span></td>
                    <td><span v-text="inventory.name"></span></td>
                    <td><span v-text="inventory.quantity"></span></td>
                    <td>
                        <a href="javascript:void(0)" @click="view(inventory.id)"><i class="fa-solid fa-eye"></i></a>
                    </td>
                </tr>
            </table>
        </div>
        <div id="open_inventory" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">View Inventory</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="open_inventory == false"></button>
                    </div>
                    <div class="modal-body">
                        <Spinner class="my-5" v-if="!open_inventory"></Spinner>
                        <div v-if="open_inventory">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="col-3">Inventory Name:</div>
                                <div class="col-9"><input type="text" class="form-control" v-model="open_inventory.name"></div>
                            </div>
                            <div class="d-flex align-items-center justify-content-center my-3">
                                <div class="col-3">Quantity:</div>
                                <div class="col-9">8 items</div>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <table class="table table-striped table-bordered mx-2">
                                    <tr>
                                        <th>#</th>
                                        <th>Value</th>
                                        <th width="100px">Availability</th>
                                        <th width="100px">Action</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <span>Physical/Digital</span>
                                        </td>
                                        <td align="center">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                                            </div>
                                        </td>
                                        <td align="center">
                                            <span><a href="javascript:void(0)" class="text-danger"><i class="fa-solid fa-xmark"></i></a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;-</td>
                                        <td>
                                            <input type="text" placeholder="if product is digital, leave it empty." class="form-control form-control-sm">
                                        </td>
                                        <td align="center">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                                            </div>
                                        </td>
                                        <td align="center">
                                            <a href="javascript:void(0)" class="text-success"><i class="fa-solid fa-check"></i></a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger mr-auto" @click="remove()">Remove</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="open_inventory == false">Close</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'
import { useToast } from "vue-toastification"
import { Modal } from 'bootstrap'
export default {
    data(){
        return {
            loading: false,
            inventories: false,
            inventory_name: '',
            open_inventory: false,
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
        view: function(inventory_id){
            this.open_inventory = false
            let toast = useToast()
            let self = this
            let m = new Modal($('#open_inventory'))
            m.show()
            axios.get(this.$api+'/inventory/view', {
                params: {
                    token: localStorage.getItem('token'),
                    inventory_id: inventory_id,
                },
            })
            .then(function(response){
                console.log(response.data)
                self.open_inventory = response.data
            })
            .catch(function(error){
                toast.error('Error!')
                console.log(error)
            })
        },
        remove: function(id){
            console.log(id)
        },
    },
    created(){
        this.load()
    },
}
</script>