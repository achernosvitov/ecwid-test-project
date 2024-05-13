<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	min?: number
	max?: number
	density?: 'default' | 'comfortable' | 'compact'
	disabled?: boolean
	loading?: boolean
}>()

const value = defineModel({
	type: Number,
	required: true,
	set(newValue: number): number {
		if (props.min !== undefined && newValue < props.min) {
			return props.min
		}

		if (props.max !== undefined && newValue > props.max) {
			return props.max
		}

		return newValue
	},
})

const decrementDisabled = computed<boolean>(() => {
	return props.loading
		|| props.disabled
		|| (props.min !== undefined && value.value <= props.min)
})

const incrementDisabled = computed<boolean>(() => {
	return props.loading
		|| props.disabled
		|| (props.max !== undefined && value.value >= props.max)
})
</script>

<template>
	<div class="d-flex align-center">
		<v-btn
			icon="mdi-minus"
			variant="plain"
			:density="density"
			:disabled="decrementDisabled"
			@click="() => value = value - 1"
		/>

		<v-text-field
			v-model.number="value"
			class="mx-1"
			variant="outlined"
			:density="density"
			:disabled="disabled"
			hide-details
		/>

		<v-btn
			icon="mdi-plus"
			variant="plain"
			:density="density"
			:disabled="incrementDisabled"
			@click="() => value = value + 1"
		/>
	</div>
</template>
