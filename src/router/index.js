import { createRouter, createWebHistory } from 'vue-router'

//Routes
import Dashboard from '@/views/Dashboard.vue'
import Category from '@/views/Category.vue'
import Inventory from '@/views/Inventory.vue'

//Other Path
import C404 from '@/views/C404.vue'

//Auth Path
import Login from '@/views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            layout: true,
        },
    },
    {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {
            layout: true,
        },
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: Inventory,
        meta: {
            layout: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            layout: false,
        },
    },
    {
        path: '/store',
        name: 'store',
        redirect: () => {
            window.location.href = 'http://www.' + location.host
        },
    },
    {
        path: '/:catchAll(.*)',
        component: C404,
        meta: {
            layout: true,
        },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
