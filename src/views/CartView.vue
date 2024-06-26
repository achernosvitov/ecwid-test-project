<script setup lang="ts">
import { ref } from 'vue'

import { useCart } from '@/composables/cart/cart'
import CartItem from '@/components/cart/CartItem.vue'
import { formatPrice } from '@/core/utils/money'
import { CURRENCY_RUR } from '@/core/models/money'
import OrderConfirmationPopup from '@/components/cart/OrderConfirmationPopup.vue'

const {
	store,
	reset,
} = useCart()

// @TODO: there are no taxes in product models at the moment
const formattedTaxSummary = formatPrice({
	amount: 0,
	currency: CURRENCY_RUR,
})

// @TODO: there are no products without free delivery at the moment
const formattedDeliveryPrice = formatPrice({
	amount: 0,
	currency: CURRENCY_RUR,
})

const shouldShowPopup = ref(false)

async function placeOrder(): Promise<void> {
	await reset()

	shouldShowPopup.value = true
}
</script>

<template>
	<v-container>
		<v-row v-if="store.isLoading && store.itemCount === 0">
			<v-col
				cols="12"
				md="8"
			>
				<v-skeleton-loader
					class="mb-4"
					type="list-item-avatar-three-line"
				/>
				<v-skeleton-loader
					class="mb-4"
					type="list-item-avatar-three-line"
				/>
				<v-skeleton-loader
					class="mb-4"
					type="list-item-avatar-three-line"
				/>
			</v-col>

			<v-col
				cols="12"
				md="4"
			>
				<v-skeleton-loader
					class="mb-4"
					type="card"
				/>
			</v-col>
		</v-row>

		<v-row v-else-if="store.itemCount === 0">
			<v-col cols="12">
				<v-sheet
					class="pa-4"
					rounded
				>
					<div class="mb-2 text-h5">
						Ваша корзина пуста
					</div>

					<p>
						Приглашаем вас ознакомиться с нашим ассортиментом на <router-link
							class="text-decoration-none text-info"
							to="/"
						>
							главной странице.
						</router-link>
					</p>
				</v-sheet>
			</v-col>
		</v-row>

		<v-row v-else>
			<v-col
				cols="12"
				md="8"
			>
				<v-card>
					<v-card-item>
						<h1 class="mb-2 text-h5">
							Корзина
						</h1>

						<template
							v-for="(item, index) in store.items"
							:key="item.id"
						>
							<CartItem
								class="px-0"
								:item="item"
							/>

							<v-divider
								v-if="index + 1 < store.items.length"
								class="border-opacity-50"
							/>
						</template>
					</v-card-item>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				md="4"
			>
				<v-card>
					<v-card-title class="mb-2 text-h5">
						Заказ
					</v-card-title>

					<v-card-text>
						<div class="my-2 d-flex justify-space-between align-center">
							<div class="text-medium-emphasis">
								Налог
							</div>

							<div class="font-weight-bold text-success">
								{{ formattedTaxSummary }}
							</div>
						</div>
						<div class="my-2 d-flex justify-space-between align-center">
							<div class="text-medium-emphasis">
								Доставка
							</div>

							<div class="font-weight-bold text-success">
								{{ formattedDeliveryPrice }}
							</div>
						</div>

						<v-divider class="my-2" />

						<div class="d-flex justify-space-between align-center">
							<div class="text-medium-emphasis">
								Итого
							</div>

							<div class="text-h6">
								{{ formatPrice(store.cartSummary) }}
							</div>
						</div>
					</v-card-text>

					<v-card-actions>
						<v-btn
							variant="elevated"
							size="large"
							color="success"
							block
							:loading="store.isLoading"
							@click="placeOrder"
						>
							<v-icon
								icon="mdi-check-circle"
								start
							/>
							Оформить заказ
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<OrderConfirmationPopup v-model="shouldShowPopup" />
</template>
