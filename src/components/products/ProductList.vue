<script setup lang="ts">
import {
	onBeforeMount, watch, 
} from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'
import { useProductList } from '@/composables/products/product-list'
import type { GetProductListRequest } from '@/core/gateways/products-service'

const props = defineProps<{
	filters?: GetProductListRequest
}>()

const {
	pages,
	filters: storeFilters,
	isLoading,
	loadFirstPage,
} = useProductList()

onBeforeMount(async () => {
	if (props.filters) {
		storeFilters.value = props.filters 
	}
	
	await loadFirstPage()
})

watch(
	() => props.filters,
	async (value) => {
		if (value) {
			storeFilters.value = value
		}
		
		await loadFirstPage()
	},
	{
		deep: true,
	},
)
</script>

<template>
	<v-container>
		<v-row
			justify="center"
			align-content="stretch"
		>
			<template v-if="isLoading">
				<v-col
					v-for="key in [1, 2, 3, 4]"
					:key="key"
					cols="12"
					sm="6"
					md="4"
					lg="3"
				>
					<v-skeleton-loader
						type="image, article"
					/>
				</v-col>
			</template>

			<template
				v-for="(page, index) in pages"
				v-else
				:key="index"
			>
				<v-col
					v-for="product in page.items"
					:key="product.id"
					cols="12"
					sm="6"
					md="4"
					lg="3"
				>
					<ProductCard
						:product="product"
					/>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>
