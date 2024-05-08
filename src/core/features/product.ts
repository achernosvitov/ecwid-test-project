import type {
	Product, ProductOptionVariant, 
} from '@/core/models/products/model'
import type {
	SelectedProductOptions, SelectedProductVariant, 
} from '@/core/models/products/selected-product'
import { cloneDeep } from '@/core/utils/clone'

export function getProductPageLink(product: Product): string {
	return `/products/${product.slug}-${product.id}`
}

export function getProductIdFromSlug(slug: string): string {
	const idRegExp = /\d+$/

	return slug.match(idRegExp)?.[0] ?? ''
}

export function canAddProductToCart(productVariant: SelectedProductVariant): boolean {
	return Object.values(productVariant.options).some((value) => value === null)
}

export function findDefaultVariantValue(variants: ProductOptionVariant[]): string | null {
	return variants.find((variant) => variant.isDefault)?.value ?? null
}

export function getProductInitialOptions(product: Product): SelectedProductOptions {
	const options: SelectedProductOptions = {}

	product.options?.forEach((option) => {
		if (!option.name) {
			return
		}

		options[option.name] = option.variants !== undefined
			? findDefaultVariantValue(option.variants)
			: null
	})

	return options
}

export function setProductOptionValue(name: string, value: string | null, options: SelectedProductOptions): SelectedProductOptions {
	const newOptions = cloneDeep(options)

	newOptions[name] = value

	return newOptions
}
