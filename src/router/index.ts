import {
	createRouter,
	createWebHistory,
} from 'vue-router'
import type {
	RouteLocation, 
} from 'vue-router'

import HomeView from '../views/HomeView.vue'

import ProductView from '@/views/ProductView.vue'
import CartView from '@/views/CartView.vue'
import CategoryView from '@/views/CategoryView.vue'
import NotFound from '@/views/NotFound.vue'
import {
	resetPageMeta, setPageMeta, 
} from '@/core/utils/meta'

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				title: 'Home | My Awesome Storefront ',
			},
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
			meta: {
				title: 'Cart | My Awesome Storefront ',
			},
		},
		{
			path: '/404',
			name: '404-not-found',
			component: NotFound,
			meta: {
				title: 'Page not found | My Awesome Storefront',
			},
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404-not-found',
			component: NotFound,
			meta: {
				title: 'Page not found | My Awesome Storefront',
			},
		},
	],
})

router.beforeEach((to: RouteLocation) => {
	resetPageMeta()

	setPageMeta({
		title: to.meta.title,
		metaDescription: to.meta.description,
	})
})
