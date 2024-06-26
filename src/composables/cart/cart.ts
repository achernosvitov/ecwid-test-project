import { useCartService } from '@/core/composition/cart-service'
import type { Product } from '@/core/models/products/model'
import type {
	SelectedProductOptions,
} from '@/core/models/products/selected-product'
import { useCartStore } from '@/stores/cart'
import { useNotificationService } from '@/core/composition/notification-service'
import { isLeft } from '@/core/utils/either'
import type { CartItem } from '@/core/models/cart'

export function useCart() {
	const service = useCartService()
	const store = useCartStore()
	const notification = useNotificationService()

	async function setCart(): Promise<void> {
		store.isLoading = true

		const response = await service.setCart(store.items)

		if (isLeft(response)) {
			notification.error('An error occured while changing a cart state')
		} else {
			store.setCart(response.right)
		}

		store.isLoading = false
	}

	async function loadCart(): Promise<void> {
		store.isLoading = true

		const response = await service.getCart()

		if (isLeft(response)) {
			notification.error('An error occured while getting a cart')
		} else {
			store.items = response.right
		}

		store.isLoading = false
	}
	
	async function addProduct(product: Product, options: SelectedProductOptions): Promise<void> {
		await loadCart()

		store.addProduct({
			product,
			options,
		})

		await setCart()
	}

	async function removeItem(item: CartItem): Promise<void> {
		await loadCart()

		store.removeItemById(item.id)

		await setCart()
	}

	async function setItemQuantity(item: CartItem, quantity: number): Promise<void> {
		await loadCart()

		store.setItemQuantity(item.id, quantity)
		
		await setCart()
	}

	async function reset(): Promise<void> {
		store.isLoading = true

		await service.reset()

		store.resetCart()

		store.isLoading = false
	}

	return {
		store,
		loadCart,
		addProduct,
		removeItem,
		setItemQuantity,
		reset,
	}
}
