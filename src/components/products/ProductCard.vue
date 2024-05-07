<script setup lang="ts">
import {
	computed,
	type StyleValue, 
} from 'vue'

import { getDominatingColorStyle } from '@/core/utils/color'
import type { Product } from '@/core/models/products/model'
import { getProductPageLink } from '@/core/features/product'
import { formatPrice } from '@/core/utils/money'

const props = defineProps<{
	product: Product
}>()

const productLink = computed<string>(() => {
	return getProductPageLink(props.product)
})

const placeholderBackground = computed<StyleValue | undefined>(() => {
	const dominatingColor = props.product.placeholder

	return dominatingColor
		? `background: ${getDominatingColorStyle(dominatingColor)}`
		: undefined
})

const formattedPrice = computed<string>(() => {
	return formatPrice(props.product.price)
})
</script>

<template>
	<v-card
		:to="productLink"
		hover
	>
		<v-img
			:src="product.thumbnail.thumbnailUrl"
			aspect-ratio="1"
			rounded="lg"
		>
			<template #placeholder>
				<div
					class="w-100 h-100"
					:style="placeholderBackground"
				/>
			</template>
		</v-img>

		<v-card-title class="text-subtitle-1">
			{{ product.name }}
		</v-card-title>

		<v-card-subtitle class="font-weight-bold opacity-100">
			{{ formattedPrice }}
		</v-card-subtitle>

		<v-card-actions>
			<v-btn
				text="Add to cart"
			/>
		</v-card-actions>
	</v-card>
</template>

<style scoped>
.product-title {
	white-space: wrap;
}
</style>
