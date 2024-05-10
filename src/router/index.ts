import {
	createRouter,
	createWebHistory,
} from 'vue-router'

import HomeView from '../views/HomeView.vue'

import ProductView from '@/views/ProductView.vue'
import CartView from '@/views/CartView.vue'
import CategoryView from '@/views/CategoryView.vue'

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/categories/:slug',
			name: 'category-details',
			component: CategoryView,
			props: true,
		},
		{
			path: '/products/:slug',
			name: 'product-details',
			component: ProductView,
			props: true,
		},
		{
			path: '/cart',
			name: 'cart',
			component: CartView,
		},
	],
})
