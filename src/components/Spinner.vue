<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="progress position-absolute top-0 w-100" style="height:4px;">
            <div class="progress-bar bg-warning" role="progressbar" style="width:10%"></div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name: 'Spinner',
    props: {
        color: {
            type: String,
            default: 'dark',
        }
    },
    mounted(){
        $(".progress-bar").animate({
                width: "80%",
        }, 50)
    }
}
</script>