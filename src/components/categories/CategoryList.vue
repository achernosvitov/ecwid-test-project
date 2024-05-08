<script setup lang="ts">
import {
	onBeforeMount, 
} from 'vue'

import CategoryCard from '@/components/categories/CategoryCard.vue'
import { useCategoryList } from '@/composables/categories/category-list'

const categoryList = useCategoryList()

onBeforeMount(async () => {
	await categoryList.loadNextPage()
})
</script>

<template>
	<v-container>
		<v-row justify="center">
			<template
				v-for="(page, index) in categoryList.pages.value"
				:key="index"
			>
				<v-col
					v-for="category in page.items"
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
			</template>
		</v-row>
	</v-container>
</template>
@/core/models/dto/categories/model
