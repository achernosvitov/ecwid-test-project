<script setup lang="ts">
import {
	onBeforeMount,
	reactive,
	ref, 
	watch,
	computed,
} from 'vue'

import ProductGallery from '@/components/products/ProductGallery.vue'
import ProductOptions from '@/components/products/ProductOptions.vue'
import { useProductsService } from '@/core/composition/products-service'
import { isRight } from '@/core/utils/either'
import type { Product } from '@/core/models/products/model'
import { formatPrice } from '@/core/utils/money'
import type {
	SelectedProductOptions, SelectedProductVariant, 
} from '@/core/models/products/selected-product'
import { calculateProductVariantId } from '@/core/features/cart'
import type { CartItem } from '@/core/models/cart'
import { useCart } from '@/composables/cart/cart'

const props = defineProps<{
	id: string
}>()

const cart = useCart()
const service = useProductsService()

const product = ref<Product | null>(null)
const selectedOptions = reactive<SelectedProductOptions>({})

const productVariant = computed<SelectedProductVariant | null>(() => {
	if (!product.value) {
		return null
	}

	return {
		product: product.value,
		options: selectedOptions,
	}
})

const productVariantId = computed<string | null>(() => {
	if (!productVariant.value) {
		return null
	}

	return calculateProductVariantId(productVariant.value)
})

const isAddToCartDisabled = computed<boolean>(() => {
	return Object.values(selectedOptions).some((value) => value === null)
})

const cartItem = computed<CartItem | null>(() => {
	if (!cart.store.items || !productVariantId.value) {
		return null
	}

	return cart.store.items.find((item) => {
		return item.id === productVariantId.value
	}) ?? null
})

onBeforeMount(async () => {
	const productId = props.id.match(/\d+$/)?.[0] ?? ''
	
	const data = await service.getProduct(productId)

	await cart.getCart()

	if (isRight(data)) {
		product.value = data.right
	}
})

watch(
	product,
	(value, oldValue) => {
		if (oldValue !== null) {
			return
		}

		value?.options?.forEach((option) => {
			if (!option.name) {
				return
			}

			selectedOptions[option.name] = option.variants !== undefined ? option.variants.find((variant) => variant.isDefault)?.value ?? null : null
		})
		
	},
)

async function addProductToCart(): Promise<void> {
	if (!product?.value) {
		return
	}

	await cart.addProduct(product.value, selectedOptions)
}

async function setCartItemQuantity(quantity: number): Promise<void> {
	if (!cartItem.value) {
		return
	}

	await cart.setItemQuantity(cartItem.value, quantity)
}
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
						v-if="!!product?.media?.images"
						:images="product?.media?.images"
					/>
					<v-img
						v-else
						:src="product?.thumbnail.hdThumnnailUrl"
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
						{{ product?.name }}
					</h1>

					<div
						v-if="product?.price"
						class="text-h6 font-weight-bold mb-2"
					>
						{{ formatPrice(product.price) }}
					</div>

					<div class="text-h6 font-weight-bold mb-2">
						Options
					</div>

					<ProductOptions
						v-for="options in product?.options"
						:key="options.name"
						class="mb-2"
						:options="options"
						:model-value="selectedOptions[options.name ?? '']"
						@change="(variant) => selectedOptions[options.name ?? ''] = variant"
					/>

					<template v-if="product?.stock.inStock">
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

					<template v-if="product?.description">
						<div class="text-h6 font-weight-bold mb-2">
							Description
						</div>
						<!-- @TODO: add sanitizing -->
						<div v-html="product.description" />
					</template>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>
