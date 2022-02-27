import { createRouter, createWebHistory } from 'vue-router'

//Routes
import Dashboard from '@/views/Dashboard.vue'
import Category from '@/views/Category.vue'
import ProductList from '@/views/Product-List.vue'
import ProductNew from '@/views/Product-New.vue'
import ProductView from '@/views/Product-View.vue'
import Inventory from '@/views/Inventory.vue'
import Inventory_Edit from '@/views/Inventory_Edit.vue'
import Customers from '@/views/Customers.vue'
import Settings from '@/views/Settings.vue'

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
        path: '/product',
        name: 'Product',
        component: ProductList,
        meta: {
            layout: true,
        },
    },
    {
        path: '/product/create',
        name: 'ProductCreate',
        component: ProductNew,
        meta: {
            layout: true,
        },
    },
    {
        path: '/product/:id/view',
        name: 'ProductView',
        component: ProductView,
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
        path: '/inventory/:inventory_id/edit',
        name: 'Inventory_Edit',
        component: Inventory_Edit,
        meta: {
            layout: true,
        },
    },
    {
        path: '/customer',
        name: 'Customers',
        component: Customers,
        meta: {
            layout: true,
        },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
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
