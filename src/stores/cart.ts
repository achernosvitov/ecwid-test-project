import { defineStore } from 'pinia'
import {
	computed, reactive, 
} from 'vue'

import type { CartItem } from '@/core/models/cart'
import type { SelectedProductVariant } from '@/core/models/products/selected-product'
import { calculateProductVariantId } from '@/core/utils/product'

export const useCartStore = defineStore('Cart', () => {
	const _items = reactive<CartItem[]>([])

	const items = computed<CartItem[]>(() => _items)

	function addProduct(productVariant: SelectedProductVariant): void {
		const productVariantId = calculateProductVariantId(productVariant)
		const sameVariantIndex = _items.findIndex((item) => item.id === productVariantId)
		
		if (sameVariantIndex !== -1) {
			_items[sameVariantIndex].quantity++

			return
		}

		_items.push({
			id: productVariantId,
			product: productVariant.product,
			selectedOptions: productVariant.options,
			quantity: 1,
		})
	}

	function removeItemById(id: string): boolean {
		const itemIndex = _items.findIndex((item) => item.id === id)

		if (itemIndex === -1) {
			return false
		}

		_items.splice(itemIndex, 1)

		return true
	}

	function setItemQuantity(id: string, quantity: number): boolean {
		const itemIndex = _items.findIndex((item) => item.id === id)

		if (itemIndex === -1) {
			return false
		}

		_items[itemIndex].quantity = quantity

		return true
	}

	return {
		items,
		addProduct,
		removeItemById,
		setItemQuantity,
	}
})
