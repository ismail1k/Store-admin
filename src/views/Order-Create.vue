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
            <div v-if="!loading">
                Order Create
            </div>
        </div>
    </div>
</template>
<script>
import Spinner from '@/components/Spinner.vue'

export default {
    data(){
        return {
            loading: false,
        }
    },
    name: 'Order-View',
    components: {
        Spinner,
    },
    methods: {
    },
    created(){
    }
}
</script>