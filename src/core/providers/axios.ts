import type { Axios } from 'axios'

import type {
	HttpRequestOptions,
	IHttpClient,
} from '@/core/gateways/http-client'

export class AxiosProvider implements IHttpClient {
	constructor(private axios: Axios) {}

	async request<Request = unknown, Response = unknown>(options: HttpRequestOptions<Request>): Promise<Response> {
		return await this.axios.request({
			method: options.method,
			url: options.url,
			headers: options.headers,
			params: options.body,
		})
	}
}

