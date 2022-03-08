<template>
    <div>
        <div class="card-header d-flex justify-content-between align-items-center">
            <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
            <div class="d-flex justify-content-end">
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <div class="card-body">
            <Spinner v-if="loading"></Spinner>
            <div v-if="!loading && order">
                Order
            </div>
            <div v-if="!loading && !order" class="d-flex justify-content-center">
                <span>Order not found!</span>
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
            order: false,
        }
    },
    name: 'Order-View',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/order/view', {
                params: {
                    token: localStorage.getItem('token'),
                    order_id: self.$route.params.order_id,
                },
            })
            .then(function(response){
                if(response.data.id){
                    self.order = response.data
                } else {
                    toast.warning('Error')
                }
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
        },
    },
    created(){
        this.load()
    }
}
</script>