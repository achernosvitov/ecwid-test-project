import type {
	HttpRequestOptions,
	IHttpClient, 
} from '@/core/gateways/http-client'
import type {
	GetCategoriesRequestDto,
	GetCategoriesResponseDto, 
} from '@/models/dto/categories/get-categories'
import type {
	GetProductRequestDto,
	GetProductResponseDto, 
} from '@/models/dto/products/get-product'
import type {
	SearchProductsOptionAttributeFilterDto, SearchProductsRequestDto, SearchProductsResponseDto, 
} from '@/models/dto/products/search-products'

export class EcwidApi {
	private readonly baseUrl = 'https://app.ecwid.com/'
	// @TODO: it's better to store these data in environment variables
	private storeId = '58958138'
	private token = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'
		
	constructor(private readonly http: IHttpClient) {}

	private request<Request = unknown, Response = unknown>(options: HttpRequestOptions<Request>): Promise<Response> {
		return this.http.request({
			...options,
			url: this.baseUrl + options.url,
			headers: {
				Authorization: `Bearer ${this.token}`,
				...options.headers ?? {},
			},
		})
	}

	async getCategories(payload: GetCategoriesRequestDto = {}): Promise<GetCategoriesResponseDto> {
		return this.request<GetCategoriesRequestDto, GetCategoriesResponseDto>({
			method: 'GET',
			url: `api/v3/${this.storeId}/categories`,
			body: payload,
		})
	}

	async getProduct(id: number, payload: GetProductRequestDto = {}): Promise<GetProductResponseDto> {
		return this.request<GetProductRequestDto, GetProductResponseDto>({
			method: 'GET',
			url: `api/v3/${this.storeId}/products/${id}`,
			body: payload,
		})
	}

	async searchProducts(payload: SearchProductsRequestDto = {}, filter: SearchProductsOptionAttributeFilterDto = {}): Promise<SearchProductsResponseDto> {
		return this.request<SearchProductsRequestDto & SearchProductsOptionAttributeFilterDto, SearchProductsResponseDto>({
			method: 'GET',
			url: `api/v3/${this.storeId}/products`,
			body: {
				...payload,
				...filter,
			} as SearchProductsRequestDto & SearchProductsOptionAttributeFilterDto,
		})
	}
}
