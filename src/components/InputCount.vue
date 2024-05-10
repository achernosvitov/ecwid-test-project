<script setup lang="ts">
const props = defineProps<{
	min?: number
	max?: number
	density?: 'default' | 'comfortable' | 'compact'
	disabled?: boolean
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
</script>

<template>
	<div class="d-flex align-center">
		<v-btn
			icon="mdi-minus"
			variant="plain"
			:density="density"
			:disabled="disabled"
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
			:disabled="disabled"
			@click="() => value = value + 1"
		/>
	</div>
</template>
