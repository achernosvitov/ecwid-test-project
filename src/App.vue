<script setup lang="ts">
import {
	RouterView, 
} from 'vue-router'
import { onBeforeMount } from 'vue'

import AppHeader from './components/layout/AppHeader.vue'
import { useCart } from './composables/cart/cart'

const cart = useCart()

async function initApp(): Promise<void> {
	console.log('load start')
	
	await cart.loadCart()

	console.log('load end')
	
}

onBeforeMount(initApp)
</script>

<template>
	<v-layout>
		<AppHeader />

		<v-main
			style="min-height: 300px;"
		>
			<RouterView />
		</v-main>
	</v-layout>
</template>
