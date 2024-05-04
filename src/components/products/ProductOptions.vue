<script setup lang="ts">
import ProductOptionsRadio from '@/components/products/ProductOptionsRadio.vue'
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
	<!-- Currently there are only products with radio type options provided so there is no reason to implement other types -->
	<ProductOptionsRadio
		v-if="options.type === 'RADIO'"
		:options="options"
		:model-value="selected"
		@change="emit('change', selected ?? null)"
	/>
	<div v-else>
		{{ options.name }}: this option type is not supported yet.
	</div>
</template>
