<script setup lang="ts">
import { useCart } from '@/composables/cart/cart'
import CartItem from '@/components/cart/CartItem.vue'

const cart = useCart()
</script>

<template>
	<v-container>
		<h1 class="mb-4 text-h3">
			Cart
		</h1>
		<v-row>
			<v-col
				cols="12"
				lg="6"
			>
				<v-card>
					<v-card-item>
						<div class="text-subtitle">
							Product list
						</div>

						<template
							v-for="(item, index) in cart.store.items"
							:key="item.id"
						>
							<CartItem
								:item="item"
							/>

							<v-divider
								v-if="index + 1 < cart.store.items.length"
								class="border-opacity-50 mx-4"
							/>
						</template>
					</v-card-item>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
