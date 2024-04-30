import type { CategoryModelDto } from '@/models/dto/categories/model'

export type GetCategoriesRequestDto = {
	keyword?: string
	parentCategoryId?: string
	categoryIds?: string
	hidden_categories?: boolean
	returnProductsIds?: boolean
	baseUrl?: string
	cleanUrls?: boolean
	slugsWithoutIds?: boolean
	offset?: number
	limit?: number
	lang?: string
	responseFields?: string
}

export type GetCategoriesResponseDto = {
	total?: number
	count?: number
	offset?: number
	limit?: number
	items?: CategoryModelDto[]
}
