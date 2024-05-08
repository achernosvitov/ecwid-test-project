import type {
	GetProductListRequest,
	GetProductListResponse, IProductsService, 
} from '@/core/gateways/products-service'
import type { EcwidApi } from '@/core/api'
import type {
	HttpErrorResponse,
} from '@/core/gateways/http-client'
import type { Product } from '@/core/models/products/model'
import { fromProductModelDto } from '@/core/adapters/fromProductModelDto'
import {
	makeRight, type Either, makeLeft, 
} from '@/core/utils/either'
import type { Pagination } from '@/core/gateways/pagination'

export class ProductsService implements IProductsService {
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

	async getProductList(payload: GetProductListRequest = {}, pagination?: Pagination): Promise<Either<HttpErrorResponse, GetProductListResponse>> {
		try {
			const {
				data,
			} = await this.api.searchProducts({
				...payload,
				limit: pagination?.perPage,
				offset: pagination ? (pagination.page - 1) * pagination.perPage : undefined,
			})

			const response: GetProductListResponse = {
				items: (data?.items ?? []).map(fromProductModelDto),
				total: data?.total ?? 0,
				count: data?.count ?? 0,
				limit: data?.limit ?? 0,
				offset: data?.offset ?? 0,
			}

			return makeRight(response)
		} catch (e) {
			return makeLeft(e as HttpErrorResponse)
		}
	}
}
