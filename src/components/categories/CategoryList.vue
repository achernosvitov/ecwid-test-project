<script setup lang="ts">
import {
	ref, onBeforeMount, 
} from 'vue'

import CategoryCard from '@/components/categories/CategoryCard.vue'
import type { CategoryModelDto } from '@/models/dto/categories/model'
import { useEcwidApi } from '@/core/composables/api'

const api = useEcwidApi()
const categoryList = ref<CategoryModelDto[] | null>(null)

onBeforeMount(async () => {
	// @TODO: create and replace getCategories service
	const response = await api.getCategories({
		limit: 8,
	})

	categoryList.value = response.data?.items ?? []
})
</script>

<template>
	<v-container>
		<v-row justify="center">
			<v-col
				v-for="category in categoryList"
				:key="category.id"
				cols="12"
				sm="6"
				md="4"
				lg="3"
			>
				<CategoryCard
					:category="category"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
