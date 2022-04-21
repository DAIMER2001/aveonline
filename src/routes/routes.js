import {createRouter, createWebHistory} from 'vue-router'
import LayoutVue from '../components/Layout.vue'
import AdminVue from '../pages/Admin.vue'
import Home from '../pages/Home.vue'
import Invoice from '../pages/Invoice.vue'
import Medicine from '../pages/Medicine.vue'
import Promotion from '../pages/Promotion.vue'


const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/invoice/:id',
                name: 'invoice',
                component: Invoice
            },
            {
                path: '/medicine/:id',
                name: 'medicine',
                component: Medicine
            },
            {
                path: '/promotion/:id',
                name: 'promotion',
                component: Promotion
            }
        ]
    },
    {
        path: '/admin/',
        component: AdminVue,
        children: [
            {
                path: '/invoice/:id',
                name: 'invoice',
                component: Invoice
            },
            {
                path: '/medicine/:id',
                name: 'medicine',
                component: Medicine
            },
            {
                path: '/promotion/:id',
                name: 'promotion',
                component: Promotion
            }
        ]

    },
    {
        path: '/layout',
        component: LayoutVue,
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router