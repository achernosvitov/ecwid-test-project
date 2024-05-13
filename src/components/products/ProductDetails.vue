<script setup lang="ts">
import {
	toRef,
} from 'vue'

import ProductGallery from '@/components/products/ProductGallery.vue'
import ProductOptions from '@/components/products/ProductOptions.vue'
import type { Product } from '@/core/models/products/model'
import { useProduct } from '@/composables/products/product'
import { useCart } from '@/composables/cart/cart'
import InputCount from '@/components/InputCount.vue'

const props = defineProps<{
	product: Product
}>()

const {
	store: cartStore,
} = useCart()

const {
	cartItem,
	selectedOptions,
	isAddToCartDisabled,
	cartItemQuantity,
	formattedPrice,
	description,
	setOptionValue,
	addProductToCart,
} = useProduct(toRef(() => props.product))
</script>

<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				lg="6"
			>
				<ProductGallery
					v-if="!!product.media?.images"
					:images="product.media?.images"
				/>

				<v-img
					v-else
					:src="product.thumbnail.hdThumnnailUrl"
					aspect-ratio="1"
				/>
			</v-col>

			<v-col
				cols="12"
				lg="6"
			>
				<v-sheet
					class="pa-4"
					rounded
				>
					<h1 class="text-h5 font-weight-bold mb-2">
						{{ product.name }}
					</h1>

					<div class="text-h6 font-weight-bold mb-2">
						{{ formattedPrice }}
					</div>

					<div class="text-h6 font-weight-bold mb-2">
						Параметры
					</div>

					<ProductOptions
						v-for="options in product.options"
						:key="options.name"
						class="mb-2"
						:options="options"
						:model-value="selectedOptions[options.name ?? '']"
						@change="(value) => setOptionValue(options.name, value)"
					/>

					<template v-if="product.stock.inStock">
						<div class="text-h6 mb-2">
							В наличии
						</div>

						<v-card
							class="mb-4 w-100 w-sm-50"
						>
							<v-card-item>
								<template v-if="cartItem">
									<InputCount
										v-model.number="cartItemQuantity"
										class="mb-4 mx-auto"
										style="width: 180px"
										:min="0"
										:max="9999"
										:disabled="cartStore.isLoading"
										density="compact"
									/>

									<v-btn
										:disabled="isAddToCartDisabled"
										:loading="cartStore.isLoading"
										text="Перейти в корзину"
										size="large"
										color="success"
										to="/cart"
										block
									/>
								</template>

								<v-btn
									v-else
									:disabled="isAddToCartDisabled"
									:loading="cartStore.isLoading"
									text="Добавить в корзину"
									size="large"
									color="success"
									block
									@click="addProductToCart"
								/>
							</v-card-item>
						</v-card>
					</template>

					<template v-if="description">
						<div class="text-h6 font-weight-bold mb-2">
							Описание
						</div>
						<!-- eslint-disable-next-line vue/no-v-html -->
						<div v-html="description" />
					</template>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>
