<script setup lang="ts">
import {
	onBeforeMount,
	reactive,
	ref, 
	watch,
	computed,
} from 'vue'

import { useEcwidApi } from '@/core/composables/api'
import type { ProductModelDto } from '@/models/dto/products/model'
import ProductGallery from '@/components/products/ProductGallery.vue'
import ProductOptions from '@/components/products/ProductOptions.vue'

const props = defineProps<{
	id: string
}>()

const api = useEcwidApi()

const product = ref<ProductModelDto | null>(null)

const selectedOptions = reactive<Record<string, string | null>>({})

onBeforeMount(async () => {
	const productId = props.id.match(/\d+$/)?.[0] ?? ''
	
	product.value = (await api.getProduct(parseInt(productId))).data ?? null
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

			selectedOptions[option.name] = option.choices && option.defaultChoice !== undefined ? option.choices[option.defaultChoice].text ?? null : null
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
						:src="product?.thumbnailUrl"
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

					<div class="text-h6 font-weight-bold mb-2">
						{{ product?.defaultDisplayedPriceFormatted }}
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
						@change="(choice) => selectedOptions[options.name ?? ''] = choice"
					/>

					<template v-if="product?.inStock">
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
