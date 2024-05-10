<script setup lang="ts">
import {
	onBeforeMount,
} from 'vue'

import CategoryCard from '@/components/categories/CategoryCard.vue'
import { useCategoryList } from '@/composables/categories/category-list'

const {
	pages,
	isLoading,
	loadNextPage,
} = useCategoryList()

onBeforeMount(loadNextPage)
</script>

<template>
	<v-container>
		<v-row justify="center">
			<template v-if="isLoading">
				<v-col
					v-for="key in [1, 2]"
					:key="key"
					cols="12"
					sm="6"
					md="4"
					lg="3"
				>
					<v-responsive aspect-ratio="1">
						<v-skeleton-loader
							class="h-100"
						/>
					</v-responsive>
				</v-col>
			</template>

			<template v-else>
				<template
					v-for="(page, index) in pages"
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
			</template>
		</v-row>
	</v-container>
</template>
