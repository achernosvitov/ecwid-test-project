<script setup lang="ts">
import CartButton from '@/components/cart/CartButton.vue'
</script>

<template>
	<v-app-bar
		color="primary"
		elevation="1"
	>
		<v-container class="d-flex mx-auto align-center justify-center">
			<v-app-bar-title>
				The Shop
			</v-app-bar-title>

			<v-spacer />
			
			<CartButton />
		</v-container>
	</v-app-bar>
</template>

