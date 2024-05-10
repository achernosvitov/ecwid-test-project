<script setup lang="ts">
import { useCart } from '@/composables/cart/cart'

const cart = useCart()
</script>

<template>
	<v-badge
		v-if="cart.store.itemCount > 0"
		color="red"
		max="9"
		offset-x="4"
		offset-y="4"
		:content="cart.store.itemCount"
	>
		<v-btn
			to="/cart"
			icon="mdi-cart"
			rounded="circle"
		/>
	</v-badge>
	<v-btn
		v-else
		to="/cart"
		icon="mdi-cart"
		rounded="circle"
		variant="text"
	/>
</template>
