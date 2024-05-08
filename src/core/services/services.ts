import type {
	GetCategoryListRequest, GetCategoryListResponse, ICategoriesService, 
} from '@/core/gateways/categories-service'
import type { HttpErrorResponse } from '@/core/gateways/http-client'
import { fromCategoryModelDto } from '@/core/adapters/fromCategoryModelDto'
import type { EcwidApi } from '@/core/api'
import type { Pagination } from '@/core/gateways/pagination'
import {
	type Either,
	makeRight,
	makeLeft, 
} from '@/core/utils/either'

export class CategoriesService implements ICategoriesService {
	constructor(private readonly api: EcwidApi) {}

	async getCategoryList(payload?: GetCategoryListRequest, pagination?: Pagination): Promise<Either<HttpErrorResponse, GetCategoryListResponse>> {
		try {
			const {
				data,
			} = await this.api.getCategories({
				...payload,
				limit: pagination?.perPage,
				offset: pagination ? (pagination.page - 1) * pagination.perPage : undefined,
			})

			const response: GetCategoryListResponse = {
				items: (data?.items ?? []).map(fromCategoryModelDto),
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
