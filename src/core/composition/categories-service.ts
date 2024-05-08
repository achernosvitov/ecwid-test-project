import { useEcwidApi } from '@/core/composition/api'
import type { ICategoriesService } from '@/core/gateways/categories-service'
import { CategoriesService } from '@/core/services/services'

let instance: ICategoriesService

export function useCategoriesService(): ICategoriesService {
	if (!instance) {
		instance = new CategoriesService(useEcwidApi())
	}

	return instance
}
