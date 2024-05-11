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
				<v-responsive aspect-ratio="1">
					<v-skeleton-loader class="h-100" />
				</v-responsive>
			</v-col>

			<v-col
				cols="12"
				lg="6"
			>
				<v-responsive :aspect-ratio="3 / 4">
					<v-skeleton-loader
						class="h-100"
						type="article, paragraph, list-item-three-line, paragraph"
					/>
				</v-responsive>
			</v-col>
		</v-row>
	</v-container>
</template>
