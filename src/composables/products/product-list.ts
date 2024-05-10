import { ref } from 'vue'

import { useAsyncStateWithPagination } from '@/composables/async-state-with-pagination'
import { useProductsService } from '@/core/composition/products-service'
import type {
	GetProductListRequest,
	GetProductListResponse, 
} from '@/core/gateways/products-service'
import { isLeft } from '@/core/utils/either'

export function useProductList() {
	const service = useProductsService()

	const perPage = ref(12)

	const filters = ref<GetProductListRequest>({})

	const {
		pages,
		error,
		isLoading,
		isLoadingNextPage,
		hasNextPage,
		loadPage,
	} = useAsyncStateWithPagination({
		async getFn(pageNumber = 1): Promise<GetProductListResponse> {
			const response = await service.getProductList(filters.value, {
				page: pageNumber,
				perPage: perPage.value,
			})
			
			if (isLeft(response)) {
				throw response.left
			} else {
				return response.right
			}
		},
		getNextPage(lastPage, pages) {
			return lastPage.total > pages.length * perPage.value
				? pages.length + 1
				: null
		},
	})

	async function loadFirstPage(): Promise<void> {
		pages.value = []

		await loadPage()
	}

	async function loadNextPage(): Promise<void> {
		await loadPage()
	}

	return {
		filters,
		perPage,
		pages,
		error,
		isLoading,
		isLoadingNextPage,
		hasNextPage,
		loadFirstPage,
		loadNextPage,
	}
}
