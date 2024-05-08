import type { Ref } from 'vue'

import { useAsyncState } from '@/composables/async-state'
import { useProductsService } from '@/core/composition/products-service'
import { isLeft } from '@/core/utils/either'

export function useProductDetails(productId: Ref<string>) {
	const service = useProductsService()

	return useAsyncState(async () => {
		const response = await service.getProduct(productId.value)

		if (isLeft(response)) {
			throw response.left
		}

		return response.right
	})
}
