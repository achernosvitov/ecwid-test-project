<script setup lang="ts">
import {
	ref, onBeforeMount, 
} from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'
import { useEcwidApi } from '@/core/composables/api'
import type { ProductModelDto } from '@/models/dto/products/model'

const api = useEcwidApi()
const productList = ref<ProductModelDto[] | null>(null)

onBeforeMount(async () => {
	// @TODO: create and replace getCategories service
	const response = await api.searchProducts({
		limit: 12,
	})

	productList.value = response.data?.items ?? []
})
</script>

<template>
	<v-container>
		<v-row
			justify="center"
			align-content="stretch"
		>
			<v-col
				v-for="product in productList"
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
		</v-row>
	</v-container>
</template>
