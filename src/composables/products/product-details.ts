import {
	watch, type Ref, 
} from 'vue'
import { useRouter } from 'vue-router'

import { useAsyncState } from '@/composables/async-state'
import { useProductsService } from '@/core/composition/products-service'
import { isLeft } from '@/core/utils/either'
import { setPageMeta } from '@/core/utils/meta'

export function useProductDetails(productId: Ref<string>) {
	const router = useRouter()
	const service = useProductsService()

	const {
		data,
		isLoading,
		error,
		loadData,
	} = useAsyncState(async () => {
		const response = await service.getProduct(productId.value)

		if (isLeft(response)) {
			throw response.left
		}

		return response.right
	})

	watch(data, (value) =>{
		if (!value) {
			return
		}

		setPageMeta({
			title: data.value?.name,
			metaDescription: data.value?.seoDescription,
		})
	})

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
