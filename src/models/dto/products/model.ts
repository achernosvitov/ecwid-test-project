import type { TaxInfoDto } from '@/models/dto/tax'
import type {
	AltTranslationsDto, TranslationsDto, 
} from '@/models/dto/translations'
import type { ImageBorderInfoDto } from '@/models/dto/media'
import type { ShippingSettingsDto } from '@/models/dto/shipping'

export type WholesalePriceDto = {
	quantity?: number
	price?: number
}

export type ProductOptionChoiceDto = {
	text?: string
	textTranslated?: string
	priceModifier?: number
	priceModifierType?: string
}

export type ProductOptionDto = {
	type?: 'SELECT' | 'RADIO' | 'CHECKBOX' | 'TEXTFIELD' | 'TEXTAREA' | 'DATE' | 'FILES' | 'SIZE'
	name?: string
	nameTranslated?: TranslationsDto
	choices?: ProductOptionChoiceDto[]
	defaultChoice?: number
	required?: boolean
}

export type ProductOriginalImagesDto = {
	url?: string
	width?: number
	height?: number
}

export type ProductGalleryImageDto = {
	id?: number
	url?: string
	thumbnail?: string
	originalImageUrl?: string
	imageUrl?: string
	hdThumbnailUrl?: string
	thumbnailUrl?: string
	smallThumbnailUrl?: string
	width?: number
	height?: number
	orderBy?: number
	borderInfo?: ImageBorderInfoDto
}

export type ProductImageDto = {
	id?: number
	alt?: AltTranslationsDto
	orderBy?: number
	isMain?: boolean
	image160pxUrl?: string
	image400pxUrl?: string
	image800pxUrl?: string
	image1500pxUrl?: string
	imageOriginalUrl?: string
}

export type ProductVideoDto = {
	id?: number
	videoCoverId?: number
	url?: string
	/**
	 * @format html
	 */
	embedHtml?: string
	providerName?: string
	title?: string
	image160pxUrl?: string
	image400pxUrl?: string
	image800pxUrl?: string
	image1500pxUrl?: string
	imageOriginalUrl?: string
}

export type ProductMediaDto = {
	images?: ProductImageDto[]
	videos?: ProductVideoDto[]
}

export type ProductCategoryInfoDto = {
	id?: number
	enabled?: boolean
}

export type ProductFavoritesStatsDto = {
	count?: number
	displayedCount?: string
}

export type ProductAttributeValueDto = {
	id?: number
	name?: string
	nameTranslated?: TranslationsDto
	value?: string
	valueTranslated?: TranslationsDto
	type?: 'CUSTOM' | 'UPC' | 'BRAND' | 'GENDER' | 'AGE_GROUP' | 'COLOR' | 'SIZE' | 'PRICE_PER_UNIT' | 'UNITS_IN_PRODUCT'
	show?: 'NOTSHOW' | 'DESCR' | 'PRICE'
}

export type ProductFileDto = {
	id?: number
	name?: string
	description?: string
	size?: number
	adminUrl?: string
}

export type ProductRelatedCategory = {
	enabled?: boolean
	categoryId?: number
	productCount?: number
}

export type RelatedProductDto = {
	productIds?: number[]
	relatedCategory?: ProductRelatedCategory
}

export type ProductionOptionValueDto = {
	name?: string
	nameTranslated?: TranslationsDto
	value?: string
	valueTranslated?: TranslationsDto
}

export type ProductVariationDto = {
	id?: number
	combinationNumber?: number
	options?: ProductionOptionValueDto[]
	sku?: string
	thumbnailUrl?: string
	imageUrl?: string
	smallThumbnailUrl?: string
	hdThumbnailUrl?: string
	originalImageUrl?: string
	quantity?: number
	unlimited?: boolean
	price?: number
	wholesalePrices?: WholesalePriceDto
	weight?: number
	warningLimit?: number
	attributes?: ProductAttributeValueDto[]
	compareToPrice?: number
	minPurchaseQuantity?: number
	maxPurchaseQuantity?: number
	outOfStockVisibilityBehaviour?: 'SHOW' | 'HIDE' | 'ALLOW_PREORDER'
}

export type ProductDimensionsDto = {
	length?: number
	width?: number
	height?: number
}

export type ProductRecurringChargeSettingsDto = {
	recurringInterval?: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
	recurringIntervalCount?: number
	subscriptionPriceWithSignUpFee?: number
	subscriptionPriceWithSignUpFeeFormatted?: string
	signUpFee?: number
	signUpFeeFormatted?: string
}

export type ProductSubscriptionSettingsDto = {
	subscriptionAllowed?: boolean
	oneTimePurchaseAllowed?: boolean
	oneTimePurchasePrice?: number
	oneTimePurchasePriceFormatted?: string
	oneTimePurchaseMarkup?: number
	oneTimePurchaseMarkupFormatted?: string
	oneTimePurchaseMarkupPercent?: number
	oneTimePurchaseMarkupPercentFormatted?: string
	displayedOneTimePurchaseMarkupPercent?: number
	displayedOneTimePurchaseMarkupPercentFormatted?: string
	recurringChargeSettings?: ProductRecurringChargeSettingsDto
}

export type ProductRibbonDto = {
	text?: string
	color?: string
}

export type ProductModelDto = {
	id?: number
	sku?: string
	thumbnailUrl?: string
	quantity?: number
	locationInventory?: Record<string, number>
	unlimited?: boolean
	inStock?: boolean
	name?: string
	nameTranslated?: TranslationsDto
	price?: number
	priceInProductList?: number
	defaultDisplayedPrice?: number
	defaultDisplayedPriceFormatted?: string
	costPrice?: number
	tax?: TaxInfoDto
	wholesalePrices?: WholesalePriceDto
	lowestPrice?: number
	defaultDisplayedLowestPrice?: number
	defaultDisplayedLowestPriceFormatted?: string
	compareToPrice?: number
	compareToPriceFormatted?: string
	compareToPriceDiscount?: number
	compareToPriceDiscountFormatted?: string
	compareToPriceDiscountPercent?: number
	compareToPriceDiscountPercentFormatted?: string
	isShippingRequired?: boolean
	weight?: number
	url?: string
	autogeneratedSlug?: string
	customSlug?: string
	/**
	 * @format ISO 8601 string YYYY-MM-DDTHH:mm:ss.sssZ
	 */ 
	created?: string
	/**
	 * @format ISO 8601 string YYYY-MM-DDTHH:mm:ss.sssZ
	 */ 
	updated?: string
	createTimestamp?: number
	updateTimestamp?: number
	productClassId?: number
	enabled?: boolean
	options?: ProductOptionDto[]
	warningLimit?: number
	fixedShippingRateOnly?: boolean
	fixedShippingRate?: number
	shipping?: ShippingSettingsDto
	defaultCombinationId?: number
	originalImage?: ProductOriginalImagesDto[]
	/**
	 * @format html
	 */
	description?: string
	descriptionTranslated?: TranslationsDto
	galleryImages?: ProductGalleryImageDto[]
	borderInfo?: ImageBorderInfoDto
	categoryIds?: number[]
	categories?: ProductCategoryInfoDto[]
	defaultCategoryId?: number
	seoTitle?: string
	seoTitleTranslated?: string
	seoDescription?: string
	seoDecriptionTranslated?: string
	attributes?: ProductAttributeValueDto[]
	files?: ProductFileDto[]
	relatedProducts?: RelatedProductDto[]
	combinations?: ProductVariationDto[]
	dimensions?: ProductDimensionsDto
	volume?: number
	showOnFrontpage?: number
	isSampleProduct?: boolean
	isGiftCard?: boolean
	discountsAllowed?: boolean
	nameYourPriceEnabled?: boolean
	subscriptionSettings?: ProductSubscriptionSettingsDto
	subtitle?: string
	ribbon?: ProductRibbonDto
	subtitleTranslated?: TranslationsDto
	ribbonTranslated?: TranslationsDto
	externalReferenceId?: string
	customsHsTariffCode?: string
	outOfStockVisibilityBehaviour?: 'SHOW' | 'HIDE' | 'ALLOW_PREORDER'
	minPurchaseQuantity?: number
	maxPurchaseQuantity?: number
}
