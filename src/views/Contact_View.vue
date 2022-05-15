<template>
    <div>
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
                <a href="javascript:void(0)" @click="$router.back()" class="text-decoration-none text-primary">Return Back</a>
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-4" v-if="loading"></Spinner>
            <div>
                <div v-if="!loading && mail">
                    <div class="form-group d-flex">
                        <div class="col-4"><label for="">Firstname: </label></div>
                        <div class="col-8">
                            <span v-text="mail.firstname"></span>
                        </div>
                    </div>
                    <div class="form-group d-flex">
                        <div class="col-4"><label for="">Lastname: </label></div>
                        <div class="col-8">
                            <span v-text="mail.lastname"></span>
                        </div>
                    </div>
                    <div class="form-group d-flex">
                        <div class="col-4"><label for="">Date: </label></div>
                        <div class="col-8">
                            <span v-text="mail.created_at"></span>
                        </div>
                    </div>
                    <div class="form-group d-flex">
                        <div class="col-4"><label for="">From: </label></div>
                        <div class="col-8">
                            <span v-text="mail.email"></span>
                        </div>
                    </div>
                    <div class="form-group d-flex">
                        <div class="col-4"><label for="">Subject: </label></div>
                        <div class="col-8">
                            <span v-text="mail.subject"></span>
                        </div>
                    </div>
                    <div class="form-group d-flex">
                        <div class="col-4"><label for="">Message: </label></div>
                        <div class="col-8">
                            <span v-text="mail.message"></span>
                        </div>
                    </div>
                </div>
                <div v-if="!loading && !mail" class="d-flex justify-content-center">
                    <span>No Mail found!</span>
                </div>
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
            mail: false,
            loading: false,
        }
    },
    name: 'Contact_View',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.get(this.$api+'/contact/view', {
                params: {
                    token: localStorage.getItem('token'),
                    mail_id: self.$route.params.mail_id,
                },
            })
            .then(function(response){
                if(response.data.id){
                    self.mail = response.data
                } else {
                    toast.error('Error!')
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
<style scoped>
.table > :not(:first-child) {
  border: 0;
}
</style>