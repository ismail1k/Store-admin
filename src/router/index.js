import { RouterView, createRouter, createWebHistory } from 'vue-router'

//Routes
import Dashboard from '@/views/Dashboard.vue'
import Category from '@/views/Category.vue'
import Order from '@/views/Order.vue'
import ProductList from '@/views/Product-List.vue'
import ProductNew from '@/views/Product-New.vue'
import ProductView from '@/views/Product-View.vue'
import Inventory from '@/views/Inventory.vue'
import Inventory_Edit from '@/views/Inventory_Edit.vue'
import Customers from '@/views/Customers.vue'
import Customers_Edit from '@/views/Customers-Edit.vue'
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
        name: 'dashboard',
        component: Dashboard,
        meta: {
            layout: true,
        },
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
            layout: true,
        },
    },
    {
        path: '/product',
        name: 'product',
        component: RouterView,
        children: [
            {
                path: '',
                component: ProductList,
            },
            {
                path: 'create',
                component: ProductNew,
            },
            {
                path: ':product_id/view',
                component: ProductView,
            },
        ],
        meta: {
            layout: true,
        },
    },
    {
        path: '/category',
        name: 'category',
        component: Category,
        meta: {
            layout: true,
        },
    },
    {
        path: '/inventory',
        name: 'inventory',
        component: RouterView,
        children: [
            {
                path: '',
                component: Inventory,
            },
            {
                path: ':inventory_id/edit',
                component: Inventory_Edit,
            },
        ],
        meta: {
            layout: true,
        },
    },
    {
        path: '/customer',
        name: 'customer',
        component: RouterView,
        children: [
            {
                path: '',
                component: Customers,
            },
            {
                path: ':user_id/view',
                component: Customers_Edit,
            },
        ],
        meta: {
            layout: true,
        },
    },
    {
        path: '/settings',
        name: 'settings',
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
    mode: 'history',
    routes
})

export default router
