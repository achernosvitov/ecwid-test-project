import { ref } from 'vue'

import { useCategoriesService } from '@/core/composition/categories-service'
import type {
	GetCategoryListRequest, GetCategoryListResponse, 
} from '@/core/gateways/categories-service'
import { useAsyncStateWithPagination } from '@/composables/async-state-with-pagination'
import { isLeft } from '@/core/utils/either'

export function useCategoryList() {
	const service = useCategoriesService()

	const perPage = ref(12)

	const filters = ref<GetCategoryListRequest>({})

	const {
		pages,
		error,
		isLoading,
		isLoadingNextPage,
		hasNextPage,
		loadPage,
	} = useAsyncStateWithPagination({
		async getFn(pageNumber = 1): Promise<GetCategoryListResponse> {
			const response = await service.getCategoryList(filters.value, {
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

	async function loadNextPage(): Promise<void> {
		await loadPage()
	}

	return {
		filters,
		pages,
		error,
		isLoading,
		isLoadingNextPage,
		hasNextPage,
		loadNextPage,
	}
}
