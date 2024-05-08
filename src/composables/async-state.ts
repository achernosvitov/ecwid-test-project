import { ref } from 'vue'

export function useAsyncState<T, E = unknown>(getFn: () => Promise<T>) {

	const data = ref<T>()
	const isLoading = ref(false)
	const error = ref<E>()

	async function loadData(): Promise<void> {
		error.value = undefined
		isLoading.value = true

		try {
			data.value = await getFn()
		} catch (e) {
			error.value = e as E
		}

		isLoading.value = false
	}

	return {
		data,
		isLoading,
		error,
		loadData,
	}
}
