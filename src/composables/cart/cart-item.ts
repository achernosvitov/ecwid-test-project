import {
	computed, type Ref, 
} from 'vue'

import {
	calculateCartItemPrice, 
} from '@/core/features/cart'
import { formatPrice } from '@/core/utils/money'
import type { CartItem } from '@/core/models/cart'
import { useCart } from '@/composables/cart/cart'

export function useCartItem(cartItem: Ref<CartItem>) {
	const cart = useCart()

	const quantity = computed<number>(({
		get(): number {
			return cartItem.value.quantity
		},
		set(value: number) {
			cart.setItemQuantity(cartItem.value, value)
		},
	}))

	const formattedSummaryPrice = computed<string>(() => {
		const price = calculateCartItemPrice(cartItem.value)

		return formatPrice(price)
	})

	const selectedOptions = computed(() => {
		return Object.entries(cartItem.value.selectedOptions).map(([key, value]) => {
			return {
				key,
				value,
			}
		})
	})

	const isLoading = computed<boolean>(() => {
		return cart.store.isLoading
	})

	async function setQuantity(quantity: number): Promise<void> {
		await cart.setItemQuantity(cartItem.value, quantity)
	}

	async function removeItem(): Promise<void> {
		await cart.removeItem(cartItem.value)
	}

	return {
		quantity,
		formattedSummaryPrice,
		selectedOptions,
		isLoading,
		setQuantity,
		removeItem,
	}
}
