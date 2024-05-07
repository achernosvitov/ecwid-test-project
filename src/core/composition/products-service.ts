import { useEcwidApi } from './api'

import type { IProductsService } from '@/core/gateways/products-service'
import { ProductsService } from '@/core/services/products'

let instance: IProductsService

export function useProductsService(): IProductsService {
	if (!instance) {
		instance = new ProductsService(useEcwidApi())
	}

	return instance
}
