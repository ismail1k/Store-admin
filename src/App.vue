<template>
    <Layout v-if="$route.meta.layout">
        <router-view/>
    </Layout>
    <router-view v-else/>
</template>

<script>
import Layout from "./components/Layout.vue"

export default {
    name: 'App',
    components: { Layout },
}
</script>
