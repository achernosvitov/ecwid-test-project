import type { ProductModelDto } from './model'

export type GetProductRequestDto = {
	baseUrl?: string
	lang?: string
	cleanUrls?: boolean
	slugsWithoutIds?: boolean
}

export type GetProductResponseDto = ProductModelDto
