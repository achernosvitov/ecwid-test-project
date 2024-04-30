export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS'

export type HttpRequestOptions<R> = {
	method: HttpMethod
	url: string
	headers?: Record<string, string>
	body?: R
}

export interface IHttpClient {
	request<Request = unknown, Response = unknown>(options: HttpRequestOptions<Request>): Promise<Response>
}
