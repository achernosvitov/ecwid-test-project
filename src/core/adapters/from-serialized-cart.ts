import type { CartItem } from '@/core/models/cart'

type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T

function isValidCartItem(item: DeepPartial<CartItem>): item is CartItem {
	if (!item.id || !item.product || !item.quantity) {
		return false
	}

	return true
}

export function fromSerializedCart(cart: string): CartItem[] {
	const items: DeepPartial<CartItem>[] = JSON.parse(cart)

	return items.reduce<CartItem[]>((acc, item) => {
		if (item && isValidCartItem(item)) {
			acc.push(item)
		}

		return acc
	}, [])
}
