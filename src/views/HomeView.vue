<script setup lang="ts">
import CategoryList from '@/components/categories/CategoryList.vue'
import ProductList from '@/components/products/ProductList.vue'
</script>

<template>
	<v-container>
		<CategoryList class="mb-8" />
		<ProductList />
	</v-container>
</template>
