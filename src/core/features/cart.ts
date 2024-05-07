import {
	addMoney, multiplyMoney, 
} from '@/core/utils/money'
import { cloneDeep } from '@/core/utils/clone'
import type { SelectedProductVariant } from '@/core/models/products/selected-product'
import type { CartItem } from '@/core/models/cart'
import {
	CURRENCY_RUR, type Money, 
} from '@/core/models/money'

const ITEM_MIN_QUANTITY = 1

export function calculateProductVariantId(variant: SelectedProductVariant): string {
	const selectedOptionsId = Object.entries(variant.options).reduce((acc, entry) => {
		return acc + `_${entry[0]}=${entry[1]}`
	}, '')

	return variant.product.id + (selectedOptionsId ? '__' : '') + selectedOptionsId
}

export function addProductToCart(productVariant: SelectedProductVariant, cartItems: CartItem[]): CartItem[] {
	const items = cloneDeep(cartItems)
	const productVariantId = calculateProductVariantId(productVariant)
	const sameVariantIndex = items.findIndex((item) => item.id === productVariantId)

	if (sameVariantIndex !== -1) {
		items[sameVariantIndex].quantity++
		
		return items
	}

	items.push({
		id: productVariantId,
		product: productVariant.product,
		selectedOptions: productVariant.options,
		quantity: 1,
	})

	return items
}

export function removeCartItemById(id: string, cartItems: CartItem[]): CartItem[] {
	const items = cloneDeep(cartItems)
	const itemIndex = items.findIndex((item) => item.id === id)

	if (itemIndex === -1) {
		return items
	}

	items.splice(itemIndex, 1)

	return items
}

export function setCartItemQuantityById(id: string, quantity: number, cartItems: CartItem[]): CartItem[] {
	const items = cloneDeep(cartItems)
	const itemIndex = items.findIndex((item) => item.id === id)

	if (itemIndex === -1) {
		return items
	}

	if (quantity < ITEM_MIN_QUANTITY) {
		return removeCartItemById(items[itemIndex].id, items)
	}

	items[itemIndex].quantity = quantity

	return items
}

export function calculateCartItemPrice(cartItem: CartItem): Money {
	return multiplyMoney(cartItem.product.price, cartItem.quantity)
}

export function calculateCartSummaryCount(cartItems: CartItem[]): Money {
	const baseSummary: Money = {
		currency: CURRENCY_RUR,
		amount: 0,
	}

	return cartItems.reduce<Money>((acc, item) => {
		const productVariantPrice = calculateCartItemPrice(item)

		return addMoney(acc, productVariantPrice)
	}, baseSummary)
}
