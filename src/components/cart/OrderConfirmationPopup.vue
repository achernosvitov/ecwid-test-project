<script setup lang="ts">
const show = defineModel({
	type: Boolean,
	required: true,
})
</script>

<template>
	<v-dialog
		v-model="show"
		max-width="500"
	>
		<v-sheet
			class="pa-4 text-center mx-auto"
			elevation="12"
			max-width="600"
			rounded="lg"
			width="100%"
		>
			<v-icon
				class="mb-5"
				color="success"
				icon="mdi-check-circle"
				size="112"
			/>

			<h2 class="text-h5 mb-6">
				Thank You for Your Order!
			</h2>

			<p class="mb-4 text-medium-emphasis text-body-2">
				Congratulations on your successful purchase! Your order has been successfully placed.
				We appreciate your choice of our store.
			</p>

			<p class="mb-4 text-medium-emphasis text-body-2">
				To continue shopping or explore more products, please <router-link
					class="text-decoration-none text-info"
					to="/"
				>
					navigate back to the homepage.
				</router-link>
			</p>

			<v-divider class="mb-4" />

			<div class="text-end">
				<v-btn
					class="text-none"
					color="success"
					variant="flat"
					width="90"
					@click="show = false"
				>
					Done
				</v-btn>
			</div>
		</v-sheet>
	</v-dialog>
</template>
