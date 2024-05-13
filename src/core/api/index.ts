import type {
	HttpRequestOptions,
	HttpResponse,
	IHttpClient, 
} from '@/core/gateways/http-client'
import type {
	GetCategoriesRequestDto,
	GetCategoriesResponseDto, 
} from '@/core/models/dto/categories/get-categories'
import type { CategoryModelDto } from '@/core/models/dto/categories/model'
import type {
	GetProductRequestDto,
	GetProductResponseDto, 
} from '@/core/models/dto/products/get-product'
import type {
	SearchProductsOptionAttributeFilterDto, SearchProductsRequestDto, SearchProductsResponseDto, 
} from '@/core/models/dto/products/search-products'

export class EcwidApi {
	private readonly baseUrl = import.meta.env.VITE_ECWID_API_BASE_URL
	private readonly storeId = import.meta.env.VITE_ECWID_API_STORE_ID
	private readonly token = import.meta.env.VITE_ECWID_API_PUBLIC_TOKEN
		
	constructor(private readonly http: IHttpClient) {}

	private request<Request = unknown, Response = unknown>(options: HttpRequestOptions<Request>): Promise<HttpResponse<Response>> {
		return this.http.request({
			...options,
			url: this.baseUrl + options.url,
			headers: {
				Authorization: `Bearer ${this.token}`,
				...options.headers ?? {},
			},
		})
	}

	async getCategories(payload: GetCategoriesRequestDto = {}) {
		return this.request<GetCategoriesRequestDto, GetCategoriesResponseDto>({
			method: 'GET',
			url: `api/v3/${this.storeId}/categories`,
			body: payload,
		})
	}

	async getCategory(id: number) {
		return this.request<{}, CategoryModelDto>({
			method: 'GET',
			url: `api/v3/${this.storeId}/categories/${id}`,
		})
	}

	async getProduct(id: number, payload: GetProductRequestDto = {}) {
		return this.request<GetProductRequestDto, GetProductResponseDto>({
			method: 'GET',
			url: `api/v3/${this.storeId}/products/${id}`,
			body: payload,
		})
	}

	async searchProducts(payload: SearchProductsRequestDto = {}, filter: SearchProductsOptionAttributeFilterDto = {}) {
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
