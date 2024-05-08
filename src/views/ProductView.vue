<script setup lang="ts">
import {
	onBeforeMount,
	toRef,
} from 'vue'

import ProductDetails from '@/components/products/ProductDetails.vue'
import { useProductDetails } from '@/composables/products/product-details'
import { getProductIdFromSlug } from '@/core/features/product'

const props = defineProps<{
	slug: string
}>()

const {
	data,
	isLoading,
	loadData,
} = useProductDetails(toRef(() => getProductIdFromSlug(props.slug)))

onBeforeMount(async () => {
	await loadData()
})
</script>

<template>
	<ProductDetails
		v-if="data"
		:product="data"
	/>
	<div v-else>
		Loading...
	</div>
</template>
