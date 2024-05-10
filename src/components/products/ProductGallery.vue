<script setup lang="ts">
import type { ProductImage } from '@/core/models/products/model'

defineProps<{
	images: ProductImage[] 
}>()
</script>

<template>
	<v-carousel hide-delimiters>
		<v-carousel-item
			v-for="image in images"
			:key="image.id"
		>
			<v-img
				:src="image.image800pxUrl"
				aspect-ratio="1"
			/>
		</v-carousel-item>
	</v-carousel>
</template>
