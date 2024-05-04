<script setup lang="ts">
import {
	RouterView, 
} from 'vue-router'

import AppHeader from './components/layout/AppHeader.vue'
</script>

<template>
	<v-layout>
		<AppHeader />

		<v-main
			style="min-height: 300px;"
		>
			<RouterView />
		</v-main>
	</v-layout>
</template>
