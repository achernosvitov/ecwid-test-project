<script setup lang="ts">
import type { ProductOption } from '@/core/models/products/model'

defineProps<{
	options: ProductOption
}>()

const selected = defineModel({
	type: String,
})

const emit = defineEmits<{
	change: [choice: string | null]
}>()
</script>

<template>
	<v-radio-group
		v-model="selected"
		:label="options.name"
		hide-details="auto"
		@update:model-value="(value) => emit('change', value)"
	>
		<v-radio
			v-for="variant in options.variants"
			:key="variant.value"
			:label="variant.value"
			:value="variant.value"
		/>
	</v-radio-group>
</template>
