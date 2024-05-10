import {
	type Ref, 
	computed,
	ref,
} from 'vue'

import type { Product } from '@/core/models/products/model'
import { useCart } from '@/composables/cart/cart'
import type {
	SelectedProductOptions,
	SelectedProductVariant, 
} from '@/core/models/products/selected-product'
import { calculateProductVariantId } from '@/core/features/cart'
import {
	canAddProductToCart,
	getProductInitialOptions,
	setProductOptionValue, 
} from '@/core/features/product'
import type { CartItem } from '@/core/models/cart'
import { formatPrice } from '@/core/utils/money'
import { sanitize } from '@/core/utils/sanitize'

export function useProduct(product: Ref<Product>) {
	const cart = useCart()

	const selectedOptions = ref<SelectedProductOptions>(getProductInitialOptions(product.value))

	const productVariant = computed<SelectedProductVariant>(() => {
		return {
			product: product.value,
			options: selectedOptions.value,
		}
	})

	const productVariantId = computed<string | null>(() => {
		if (!productVariant.value) {
			return null
		}
	
		return calculateProductVariantId(productVariant.value)
	})

	const isAddToCartDisabled = computed<boolean>(() => {
		return canAddProductToCart(productVariant.value)
	})

	const cartItem = computed<CartItem | null>(() => {
		if (!cart.store.items || !productVariantId.value) {
			return null
		}
	
		return cart.store.items.find((item) => {
			return item.id === productVariantId.value
		}) ?? null
	})

	const cartItemQuantity = computed({
		get(): number {
			return cartItem.value?.quantity ?? 0
		},
		set(value: number): void {
			setCartItemQuantity(value)
		},
	})

	const formattedPrice = computed<string>(() => {
		return formatPrice(product.value.price)
	})

	const description = computed<string>(() => {
		return product.value.description ? sanitize(product.value.description) : ''
	})

	function setOptionValue(name: string, value: string | null): void {
		selectedOptions.value = setProductOptionValue(name, value, selectedOptions.value)
	}

	async function addProductToCart(): Promise<void> {
		if (!product?.value) {
			return
		}
	
		await cart.addProduct(product.value, selectedOptions.value)
	}

	async function setCartItemQuantity(quantity: number): Promise<void> {
		if (!cartItem.value) {
			return
		}
	
		await cart.setItemQuantity(cartItem.value, quantity)
	}

	return {
		selectedOptions,
		productVariant,
		isAddToCartDisabled,
		cartItem,
		cartItemQuantity,
		formattedPrice,
		description,
		setOptionValue,
		addProductToCart,
		setCartItemQuantity,
	}
}
