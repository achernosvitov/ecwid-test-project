import type { SelectedProductOptions } from './products/selected-product'

import type { Product } from '@/core/models/products/model'

export type CartItem = {
	id: string
	product: Product
	quantity: number
	selectedOptions: SelectedProductOptions
}
