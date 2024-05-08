import type { Product } from '@/core/models/products/model'
import type { Either } from '@/core/utils/either'
import type { HttpErrorResponse } from '@/core/gateways/http-client'
import type { Pagination } from '@/core/gateways/pagination'

export type GetProductListRequest = {
	categories?: string
}

export type GetProductListResponse = {
	items: Product[]
	total: number
	count: number
	offset: number
	limit: number
}

export interface IProductsService {
	getProduct(id: string): Promise<Either<HttpErrorResponse, Product>>
	getProductList(payload?: GetProductListRequest, pagination?: Pagination): Promise<Either<HttpErrorResponse, GetProductListResponse>>
}
