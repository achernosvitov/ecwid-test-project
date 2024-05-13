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
				Спасибо за ваш заказ!
			</h2>

			<p class="mb-4 text-medium-emphasis text-body-2">
				Поздравляем с успешной покупкой! Ваш заказ был успешно размещен. Мы благодарим вас за выбор нашего магазина.
			</p>

			<p class="mb-4 text-medium-emphasis text-body-2">
				Чтобы продолжить покупки или посмотреть другие товары, пожалуйста, <router-link
					class="text-decoration-none text-info"
					to="/"
				>
					перейдите на главную страницу.
				</router-link>
			</p>

			<v-divider class="mb-4" />

			<div class="text-center">
				<v-btn
					class="text-none"
					color="success"
					variant="flat"
					width="120"
					@click="show = false"
				>
					Закрыть
				</v-btn>
			</div>
		</v-sheet>
	</v-dialog>
</template>
