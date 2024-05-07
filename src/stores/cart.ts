import { defineStore } from 'pinia'
import {
	computed,
	ref,
} from 'vue'

import type { CartItem } from '@/core/models/cart'
import type { SelectedProductVariant } from '@/core/models/products/selected-product'
import {
	addProductToCart,
	removeCartItemById,
	setCartItemQuantityById, 
	calculateCartSummaryCount,
} from '@/core/features/cart'
import type { Money } from '@/core/models/money'

export const useCartStore = defineStore('Cart', () => {
	const items = ref<CartItem[]>([])
	const isLoading = ref(false)

	const cartSummary = computed<Money>(() => {
		return calculateCartSummaryCount(items.value)
	})

	function setCart(_items: CartItem[]): void {
		items.value = _items
	}

	function resetCart(): void {
		items.value = []
	}

	function addProduct(productVariant: SelectedProductVariant): void {
		items.value = addProductToCart(productVariant, items.value)
	}

	function removeItemById(id: string): void {
		items.value = removeCartItemById(id, items.value)
	}

	function setItemQuantity(id: string, quantity: number): void {
		items.value = setCartItemQuantityById(id, quantity, items.value)
	}

	return {
		items,
		isLoading,
		cartSummary,
		setCart,
		resetCart,
		addProduct,
		removeItemById,
		setItemQuantity,
	}
})
