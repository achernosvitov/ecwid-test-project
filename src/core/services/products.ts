import type { EcwidApi } from '@/core/api'
import type {
	HttpErrorResponse,
} from '@/core/gateways/http-client'
import type { Product } from '@/core/models/products/model'
import { fromProductModelDto } from '@/core/transformers/fromProductModelDto'
import {
	makeRight, type Either, makeLeft, 
} from '@/core/utils/either'

export class ProductsService {
	constructor(private readonly api: EcwidApi) {}
	
	async getProduct(id: string): Promise<Either<HttpErrorResponse, Product>> {
		try {
			const {
				data,
			} = await this.api.getProduct(parseInt(id))
			const product = fromProductModelDto(data)

			return makeRight(product)
		} catch (e) {
			return makeLeft(e as HttpErrorResponse)
		}

	}
}
