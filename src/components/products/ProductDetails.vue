<script setup lang="ts">
import {
	toRef,
} from 'vue'

import ProductGallery from '@/components/products/ProductGallery.vue'
import ProductOptions from '@/components/products/ProductOptions.vue'
import type { Product } from '@/core/models/products/model'
import { useProduct } from '@/composables/products/product'

const props = defineProps<{
	product: Product
}>()

const {
	cartItem,
	selectedOptions,
	isAddToCartDisabled,
	formattedPrice,
	description,
	setOptionValue,
	setCartItemQuantity,
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
				<v-sheet aspect-ratio="1">
					<ProductGallery
						v-if="!!product.media?.images"
						:images="product.media?.images"
					/>
					<v-img
						v-else
						:src="product.thumbnail.hdThumnnailUrl"
						aspect-ratio="1"
					/>
				</v-sheet>
			</v-col>

			<v-col
				cols="12"
				lg="6"
			>
				<v-sheet>
					<h1 class="text-h5 font-weight-bold mb-2">
						{{ product.name }}
					</h1>

					<div class="text-h6 font-weight-bold mb-2">
						{{ formattedPrice }}
					</div>

					<div class="text-h6 font-weight-bold mb-2">
						Options
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
							In stock
						</div>

						<v-card
							v-if="cartItem"
							style="width: 240px"
							class="mb-4"
						>
							<v-card-item>
								<v-card-subtitle>
									<v-btn
										to="/cart"
										text="Proceed to cart"
										variant="text"
										size="x-small"
									/>
								</v-card-subtitle>

								<div class="d-flex">
									<v-btn
										icon="mdi-minus"
										variant="plain"
										@click="() => setCartItemQuantity(cartItem!.quantity - 1)"
									/>

									<v-text-field
										v-model="cartItem.quantity"
										class="ml-2 mr-2"
										density="comfortable"
										type="number"
										variant="outlined"
										hide-details
									/>

									<v-btn
										icon="mdi-plus"
										variant="plain"
										@click="() => setCartItemQuantity(cartItem!.quantity + 1)"
									/>
								</div>
							</v-card-item>
						</v-card>
						<v-btn
							v-else
							class="mb-4"
							:disabled="isAddToCartDisabled"
							text="Add to cart"
							size="large"
							@click="addProductToCart"
						/>
					</template>

					<template v-if="description">
						<div class="text-h6 font-weight-bold mb-2">
							Description
						</div>
						<!-- eslint-disable-next-line vue/no-v-html -->
						<div v-html="description" />
					</template>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>
