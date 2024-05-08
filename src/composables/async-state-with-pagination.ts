import {
	ref,
	type Ref,
} from 'vue'

export function useAsyncStateWithPagination<T, E = unknown>(namedArgs: {
	getFn: (page: number) => Promise<T>
	getNextPage: (lastPage: T, pages: T[]) => number | null
}) {
	const {
		getFn,
		getNextPage,
	} = namedArgs

	const pages = ref<T[]>([]) as Ref<T[]>
	const isLoading = ref(false)
	const isLoadingNextPage = ref(false)
	const error = ref<E>()
	const hasNextPage = ref(true)

	async function loadPage(): Promise<void> {
	
		const nextPage = pages.value.length
			? getNextPage(pages.value[pages.value.length - 1], pages.value)
			: 1

		if (!nextPage) {
			return
		}

		error.value = undefined
		isLoading.value = true

		try {
			const response = await getFn(nextPage)

			pages.value.push(response)
		} catch (e) {
			error.value = e as E
		}

		hasNextPage.value = pages.value.length
			? Boolean(getNextPage(pages.value[pages.value.length - 1], pages.value))
			: false

		isLoading.value = false
	}

	return {
		pages,
		isLoading,
		isLoadingNextPage,
		error,
		hasNextPage,
		loadPage,
	}
}
