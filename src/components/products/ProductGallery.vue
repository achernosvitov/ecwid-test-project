<script setup lang="ts">
import type { ProductImageDto } from '@/models/dto/products/model'

defineProps<{
	images: ProductImageDto[] 
}>()
</script>

<template>
	<v-carousel>
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
