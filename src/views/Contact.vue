<template>
    <div>
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-end">
                <router-link to="/settings" class="btn btn-outline-primary">Settings</router-link>
            </div>
        </div>
        <div class="card-body">
            <Spinner class="my-4" v-if="loading"></Spinner>
            <div>
                <table v-if="!loading && mails.length" class="table">
                    <tr>
                        <th width="50px">#</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>From</th>
                        <th width="130px">Action</th>
                    </tr>
                    <tr v-for="mail, index in mails" :key="(mail, index)" :class="!mail.read?'table-secondary':''">
                        <td><span v-text="index+1"></span></td>
                        <td><span v-text="mail.firstname+' '+mail.lastname"></span></td>
                        <td><span v-text="mail.subject"></span></td>
                        <td><span v-text="mail.email"></span></td>
                        <td>
                            <button @click="remove(mail.id)" class="btn text-danger py-0"><i class="fa-solid fa-trash"></i></button>
                            <router-link :to="'/contact/'+mail.id" class="btn text-primary py-0"><i class="fa-solid fa-eye"></i></router-link>
                        </td>
                    </tr>
                </table>
                <div v-if="!loading && !mails.length" class="d-flex justify-content-center">
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
            mails: false,
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
            axios.get(this.$api+'/contact', {
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            .then(function(response){
                self.mails = response.data
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
            })
        },
        remove: function(mail_id){
            this.loading = true
            let self = this
            let toast = useToast()
            axios.post(this.$api+'/contact/remove', {
                token: localStorage.getItem('token'),
                mail_id: mail_id,
            })
            .then(function(response){
                if(response.data.status != 200){
                    toast.error('Error!')
                }
            })
            .catch(function(error){
                console.log(error)
                toast.error('Error!')
            })
            .finally(function(){
                self.loading = false
                self.load()
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
.table-secondary>:not(caption)>* {
    background-color: #d6d8db;
}
</style>