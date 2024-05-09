<script setup lang="ts">
const value = defineModel({
	type: Number,
	required: true,
	set(newValue: number): void {
		if (props.min !== undefined && newValue < props.min) {
			return
		}

		if (props.max !== undefined && newValue > props.max) {
			return
		}

		return newValue
	},
})

const props = defineProps<{
	min?: number
	max?: number
	density?: 'default' | 'comfortable' | 'compact'
}>()
</script>

<template>
	<div class="d-flex align-center">
		<v-btn
			icon="mdi-minus"
			variant="plain"
			:density="density"
			@click="() => value = value - 1"
		/>

		<v-text-field
			v-model.number="value"
			class="mx-1"
			:density="density"
			variant="outlined"
			hide-details
		/>

		<v-btn
			icon="mdi-plus"
			variant="plain"
			:density="density"
			@click="() => value = value + 1"
		/>
	</div>
</template>
