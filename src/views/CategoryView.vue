<script setup lang=ts>
import {
	computed,
	onBeforeMount,
	toRef, 
} from 'vue'

import CategoryCard from '@/components/categories/CategoryCard.vue'
import ProductList from '@/components/products/ProductList.vue'
import { useCategoryDetails } from '@/composables/categories/category-details'
import { getCategoryIdFromSlug } from '@/core/features/category'
import type { GetProductListRequest } from '@/core/gateways/products-service'

const props = defineProps<{
	slug: string
}>()

const {
	data: category,
	isLoading,
	loadData: loadCategory,
} = useCategoryDetails(toRef(() => getCategoryIdFromSlug(props.slug)))

const productFilers = computed<GetProductListRequest>(() => {
	return {
		categories: getCategoryIdFromSlug(props.slug),
	}
})

async function initData(): Promise<void> {
	await loadCategory()
}

onBeforeMount(initData)
</script>

<template>
	<v-container>
		<v-skeleton-loader
			v-if="isLoading"
			height="300px"
			elevation="1"
		/>
		<CategoryCard
			v-else-if="category"
			class="mb-4"
			style="height: 300px;"
			:category="category"
			variant="details"
		/>

		<ProductList :filters="productFilers" />
	</v-container>
</template>
