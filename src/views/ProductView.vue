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
	<v-container v-else-if="isLoading">
		<v-row>
			<v-col
				cols="12"
				lg="6"
			>
				<v-skeleton-loader
					ratio="1"
					height="500px"
				/>
			</v-col>

			<v-col
				cols="12"
				lg="6"
			>
				<v-skeleton-loader height="800px" />
			</v-col>
		</v-row>
	</v-container>
</template>
