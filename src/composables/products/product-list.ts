import {
	reactive,
	ref,
	computed,
} from 'vue'

import type { Product } from '@/core/models/products/model'
import { useProductsService } from '@/core/composition/products-service'
import type { HttpErrorResponse } from '@/core/gateways/http-client'
import type { GetProductListRequest } from '@/core/gateways/products-service'
import { isLeft } from '@/core/utils/either'
import type { Pagination } from '@/core/gateways/pagination'

export function useProductList() {
	const service = useProductsService()

	const total = ref(0)
	const pagination = reactive<Pagination>({
		page: 1,
		perPage: 12,
	})

	const filters = ref<GetProductListRequest>({})
	const pages = ref<Product[][]>([])
	const isLoading = ref(false)
	const error = ref<HttpErrorResponse>()

	const hasNextPage = computed<boolean>(() => {
		const count = pagination.page * pagination.perPage

		return count < total.value
	})

	async function loadPage(_pagination?: Pagination): Promise<void> {
		error.value = undefined
		isLoading.value = true

		const response = await service.getProductList(filters.value, _pagination)

		if (isLeft(response)) {
			error.value = response.left
		} else {
			pages.value.push(response.right.items)
			total.value = response.right.total
		}

		isLoading.value = false
	}

	async function loadFirstPage(): Promise<void> {
		pagination.page = 1
		pages.value = []

		await loadPage(pagination)
	}

	async function loadNextPage(): Promise<void> {
		if (!hasNextPage.value) {
			return
		}

		pagination.page++

		await loadPage(pagination)
	}

	return {
		pagination,
		filters,
		pages,
		error,
		hasNextPage,
		loadFirstPage,
		loadNextPage,
	}
}
