<script setup lang="ts">
import {
	computed,
	toRef,
	type StyleValue, 
} from 'vue'

import InputCount from '@/components/InputCount.vue'
import { type CartItem } from '@/core/models/cart'
import { getDominatingColorStyle } from '@/core/utils/color'
import { useCartItem } from '@/composables/cart/cart-item'

const props = defineProps<{
	item: CartItem
}>()

const {
	quantity,
	formattedSummaryPrice,
	selectedOptions,
	removeItem,
} = useCartItem(toRef(() => props.item))

const placeholderBackground = computed<StyleValue | undefined>(() => {
	const dominatingColor = props.item.product.placeholder

	return dominatingColor
		? `background: ${getDominatingColorStyle(dominatingColor)}`
		: undefined
})
</script>

<template>
	<v-sheet class="d-flex align-center pa-4">
		<v-img
			class="flex-grow-0 mr-4"
			:src="item.product.thumbnail.smallThumbnailUrl"
			aspect-ratio="1"
			rounded="lg"
			width="80"
			height="80"
		>
			<template #placeholder>
				<div
					class="w-100 h-100"
					:style="placeholderBackground"
				/>
			</template>
		</v-img>

		<div class="flex-grow-1">
			<div>
				<div class="text-subtitle-1">
					{{ item.product.name }}
				</div>

				<div v-if="selectedOptions.length">
					<div
						v-for="option in selectedOptions"
						:key="option.key"
						class="text-body-2"
					>
						<span class="text-medium-emphasis">{{ option.key }}</span>: {{ option.value }}
					</div>
				</div>
			</div>

			<div class="d-flex align-center">
				<div class="text-subtitle-2 font-weight-bold">
					{{ formattedSummaryPrice }}
				</div>

				<v-spacer />

				<input-count
					v-model.number="quantity"
					style="width: 135px"
					:min="1"
					:max="9999"
					density="compact"
				/>

				<v-btn
					class="ml-2"
					icon="mdi-trash-can"
					variant="text"
					density="comfortable"
					@click="removeItem"
				/>
			</div>
		</div>
	</v-sheet>
</template>
