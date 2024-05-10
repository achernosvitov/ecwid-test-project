<script setup lang="ts">
import AppLogo from '@/components/layout/AppLogo.vue'
import CartButton from '@/components/cart/CartButton.vue'
</script>

<template>
	<v-app-bar
		color="primary"
		elevation="1"
	>
		<v-container class="d-flex mx-auto align-center justify-center">
			<router-link to="/">
				<AppLogo />
			</router-link>

			<v-spacer />
			
			<CartButton />
		</v-container>
	</v-app-bar>
</template>

