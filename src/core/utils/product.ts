import type { SelectedProductVariant } from '@/core/models/products/selected-product'

export function calculateProductVariantId(variant: SelectedProductVariant): string {
	const selectedOptionsId = Object.entries(variant.options).reduce((acc, entry) => {
		return acc + `_${entry[0]}=${entry[1]}`
	}, '')

	return variant.product.id + (selectedOptionsId ? '__' : '') + selectedOptionsId
}
