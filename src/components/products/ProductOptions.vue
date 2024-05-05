<script setup lang="ts">
import ProductOptionsRadio from '@/components/products/ProductOptionsRadio.vue'
import {
	ProductOptionType, type ProductOption, 
} from '@/core/models/products/model'

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
	<!-- Currently there are only products with radio type options provided so there is no reason to implement other types -->
	<ProductOptionsRadio
		v-if="options.type === ProductOptionType.Radio"
		:options="options"
		:model-value="selected"
		@change="(value) => emit('change', value)"
	/>
	<div v-else>
		{{ options.name }}: this option type is not supported yet.
	</div>
</template>
