import type { Product } from '@/core/models/products/model'

export type SelectedProductOptions = Record<string, string | null>

export type SelectedProductVariant = {
	product: Product
	options: SelectedProductOptions
}
