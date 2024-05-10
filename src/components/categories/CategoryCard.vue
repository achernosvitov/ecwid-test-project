<script setup lang="ts">
import {
	computed, type StyleValue, 
} from 'vue'

import { getDominatingColorStyle } from '@/core/utils/color'
import type { Category } from '@/core/models/category'
import { getCategoryPageLink } from '@/core/features/category'

const props = withDefaults(defineProps<{
	category: Category
	variant?: 'compact' | 'details'
	aspectRatio?: number | string
}>(), {
	variant: () => 'compact',
	aspectRatio: () => 1,
})

const categoryLink = computed<string>(() => {
	return getCategoryPageLink(props.category)
})

const placeholderBackground = computed<StyleValue | undefined>(() => {
	const dominatingColor = props.category.placeholder

	return dominatingColor
		? `background: ${getDominatingColorStyle(dominatingColor)}`
		: undefined
})
</script>

<template>
	<v-card
		:to="variant === 'compact' ? categoryLink : undefined"
		:hover="variant === 'compact'"
	>
		<v-img
			:src="category.thumbnail?.imageUrl"
			class="align-end text-white"
			gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.6)"
			:aspect-ratio="aspectRatio"
			cover
		>
			<template #placeholder>
				<div
					class="w-100 h-100"
					:style="placeholderBackground"
				/>
			</template>

			<v-card-item>
				<v-card-title>
					{{ category.name }}
				</v-card-title>

				<v-card-subtitle v-if="category.productCount && category.productCount > 0">
					{{ category.productCount }} Product{{ category.productCount > 1 ? 's' : '' }}
				</v-card-subtitle>
			</v-card-item>
		</v-img>
	</v-card>
</template>
