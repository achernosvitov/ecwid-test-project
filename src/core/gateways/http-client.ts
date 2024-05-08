export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS'

export type HttpRequestOptions<R> = {
	method: HttpMethod
	url: string
	headers?: Record<string, string>
	body?: R
}

export type HttpResponse<T> = {
	data?: T
	statusCode?: number
}

export interface HttpErrorResponse<T = any> {
	message?: string
	code?: string
	response?: HttpResponse<T>
}

export interface IHttpClient {
	request<Request = unknown, Response = unknown>(options: HttpRequestOptions<Request>): Promise<HttpResponse<Response>>
}
