<template>
    <div class="d-flex justify-content-center align-items-center">
        <div :class="'spinner-border text-'+color" role="status">
            <span class="visually-hidden"></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Spinner',
    props: {
        color: {
            type: String,
            default: 'dark',
        }
    }
}
</script>