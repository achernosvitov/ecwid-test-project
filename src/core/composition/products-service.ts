import { useEcwidApi } from './api'

import { ProductsService } from '@/core/services/products'

let instance: ProductsService

export function useProductsService(): ProductsService {
	if (!instance) {
		instance = new ProductsService(useEcwidApi())
	}

	return instance
}
