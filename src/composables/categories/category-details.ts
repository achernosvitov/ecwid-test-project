import type { Ref } from 'vue'

import { useCategoriesService } from '@/core/composition/categories-service'
import { useAsyncState } from '@/composables/async-state'
import { isLeft } from '@/core/utils/either'

export function useCategoryDetails(categoryId: Ref<string>) {
	const service = useCategoriesService()

	const {
		data,
		isLoading,
		loadData,
		error,
	} = useAsyncState(async () => {
		const response = await service.getCategory(categoryId.value)

		if (isLeft(response)) {
			throw response.left
		}

		return response.right
	})

	return {
		data,
		isLoading,
		error,
		loadData,
	}
}
