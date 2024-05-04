<script setup lang="ts">
import type {
	ProductOptionDto, 
} from '@/models/dto/products/model'

defineProps<{
	options: ProductOptionDto
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
		@update:model-value="emit('change', selected ?? null)"
	>
		<v-radio
			v-for="choice in options?.choices"
			:key="choice.text"
			:label="choice.text"
			:value="choice.text"
		/>
	</v-radio-group>
</template>
