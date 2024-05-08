import type { ProductModelDto } from '@/core/models/dto/products/model'

export type SearchProductsOptionAttributeFilterDto = Record<string, string>

export type SearchProductsRequestDto = {
	keyword?: string
	searchMethod?: string
	externalReferenceId?: string
	priceFrom?: number
	priceTo?: number
	categories?: string
	includeProductsFromSubcategories?: boolean
	sortBy?: 'RELEVANCE' | 'DEFINED_BY_STORE_OWNER' | 'ADDED_TIME_DESC' | 'ADDED_TIME_ASC' | 'NAME_ASC' | 'NAME_DESC' | 'PRICE_ASC' | 'PRICE_DESC' | 'UPDATED_TIME_ASC' | 'UPDATED_TIME_DESC'
	offset?: number
	limit?: number
	/**
	 * @format UNIX timestamp
	 */
	createdFrom?: string
	/**
	 * @format UNIX timestamp
	 */
	createdTo?: string
	/**
	 * @format UNIX timestamp
	 */
	updatedTo?: string
	enabled?: boolean
	sku?: string
	productId?: number
	isGiftCard?: boolean
	discountsAllowed?: boolean
	baseUrl?: string
	cleanUrls?: boolean
	slugsWithoutIds?: boolean
	onsale?: 'onsale' | 'notonsale'
	inventory?: 'instock' | 'outofstock'
	isCustomerSetPrice?: boolean
	visibleInStorefront?: boolean
	responseFields?: string
}

export type SearchProductsResponseDto = {
	total?: number
	count?: number
	offset?: number
	limit?: number
	items?: ProductModelDto[]
}
