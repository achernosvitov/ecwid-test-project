import type {
	AxiosError, Axios, 
} from 'axios'

import type {
	HttpErrorResponse,
	HttpRequestOptions,
	HttpResponse,
	IHttpClient,
} from '@/core/gateways/http-client'

export class AxiosProvider implements IHttpClient {
	constructor(private axios: Axios) {}
	
	async request<Request = unknown, Response = unknown>(options: HttpRequestOptions<Request>): Promise<HttpResponse<Response>> {
		try {
			const response = await this.axios.request({
				method: options.method,
				url: options.url,
				headers: options.headers,
				params: options.body,
			})

			return {
				data: response.data,
				statusCode: response.status,
			}
		} catch (error) {
			const axiosError = error as AxiosError
			const httpErrorResponse: HttpErrorResponse = {
				message: axiosError.message,
				code: axiosError.code,
				response: axiosError.response,
			}
			
			throw httpErrorResponse
		}
	}
}

