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

const productList = useProductList()

onBeforeMount(async () => {
	if (props.filters) {
		productList.filters.value = props.filters 
	}
	
	await productList.loadFirstPage()
})

watch(
	() => props.filters,
	async () => await productList.loadFirstPage(),
)
</script>

<template>
	<v-container>
		<v-row
			justify="center"
			align-content="stretch"
		>
			<template
				v-for="(page, index) in productList.pages.value"
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
