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

const props = defineProps<{
	id: string
}>()

const service = useProductsService()

const product = ref<Product | null>(null)
const selectedOptions = reactive<Record<string, string | null>>({})

onBeforeMount(async () => {
	const productId = props.id.match(/\d+$/)?.[0] ?? ''
	
	const data = await service.getProduct(productId)

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

const isAddToCardDisabled = computed<boolean>(() => {
	return Object.values(selectedOptions).some((value) => value === null)
})
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

						<v-btn
							class="mb-4"
							:disabled="isAddToCardDisabled"
							text="Add to cart"
							size="large"
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
