import type { Money } from '@/core/models/money'

export type ProductStock = {
	quantity: number | null
	isUnlimited: boolean
	inStock: boolean
}

export enum ProductOptionType {
	Radio,
	Select,
	Checkbox,
	TextField,
	TextArea,
	Date,
	Files,
	Size,
}

export type ProductOptionVariant = {
	value: string
	isDefault: boolean
}

export type ProductOption = {
	type: ProductOptionType
	name: string
	variants: ProductOptionVariant[]
	required: boolean
}

export type ProductThumbnail = {
	/**
	 * max resolution 160px
	 */
	smallThumbnailUrl?: string
	/**
	 * max resolution 400px
	 */
	thumbnailUrl?: string
	/**
	 * max resolution 800px
	 */
	hdThumnnailUrl?: string
}

export type ImagePlaceholderColor = {
	red: number
	green: number
	blue: number
	alpha?: number
}

export type ProductImage = {
	id: string
	alt?: string
	isMain?: boolean
	image160pxUrl?: string
	image400pxUrl?: string
	image800pxUrl?: string
	image1500pxUrl?: string
	imageOriginalUrl?: string
}

export type ProductMedia = {
	images?: ProductImage[]
}

export type Product = {
	id: string
	sku: string
	name: string
	slug: string
	stock: ProductStock
	price: Money
	media: ProductMedia
	thumbnail: ProductThumbnail
	description?: string
	/**
	 * @format html
	 */
	options?: ProductOption[]
	placeholder?: ImagePlaceholderColor
}
