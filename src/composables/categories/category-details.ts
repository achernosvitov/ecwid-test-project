import {
	watch,
	type Ref,
} from 'vue'
import { useRouter } from 'vue-router'

import { useCategoriesService } from '@/core/composition/categories-service'
import { useAsyncState } from '@/composables/async-state'
import { isLeft } from '@/core/utils/either'
import { setPageMeta } from '@/core/utils/meta'

export function useCategoryDetails(categoryId: Ref<string>) {
	const router = useRouter()
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

	watch(data,
		(value) =>{
			if (!value) {
				return
			}

			setPageMeta({
				title: data.value?.name,
				metaDescription: data.value?.seoDescription,
			})
		},
		{
			deep: true,
		},
	)

	watch(error, async () => {
		await router.replace({
			path: '/404',
		})
	})

	return {
		data,
		isLoading,
		error,
		loadData,
	}
}
