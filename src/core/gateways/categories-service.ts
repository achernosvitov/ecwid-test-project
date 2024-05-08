import type { Pagination } from '@/core/gateways/pagination'
import type { HttpErrorResponse } from '@/core/gateways/http-client'
import type { Category } from '@/core/models/category'
import type { Either } from '@/core/utils/either'

export type GetCategoryListRequest = {
	parentCategoryId?: string
	offset?: number
	limit?: number
}

export type GetCategoryListResponse = {
	items: Category[]
	total: number
	count: number
	offset: number
	limit: number
}

export interface ICategoriesService {
	getCategoryList(payload?: GetCategoryListRequest, pagination?: Pagination): Promise<Either<HttpErrorResponse, GetCategoryListResponse>>
}
