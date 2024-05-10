import { fromSerializedCart } from '@/core/adapters/from-serialized-cart'
import type { CartItem } from '@/core/models/cart'
import {
	makeLeft,
	type Either,
	makeRight,
} from '@/core/utils/either'

export class CartService {
	private readonly storageKey = 'ECWID_TEST_PROJECT_CART'

	constructor(private readonly storage: Storage) { }

	async getCart(): Promise<Either<Error, CartItem[]>> {
		return new Promise<Either<Error, CartItem[]>>((resolve) => {
			setTimeout(() => {
				try {
					const value = this.storage.getItem(this.storageKey)

					if (!value) {
						return resolve(makeRight([]))
					}

					resolve(makeRight(fromSerializedCart(value)))
				} catch (error) {
					resolve(makeLeft(error as Error))
				}
			}, 1000)
		})

	}

	async setCart(items: CartItem[]): Promise<Either<Error, CartItem[]>> {
		try {
			this.storage.setItem(this.storageKey, JSON.stringify(items))

			// to avoid inconsistency
			return await this.getCart()
		} catch (error) {
			return makeLeft(error as Error)
		}
	}

	async reset(): Promise<Either<Error, boolean>> {
		return new Promise<Either<Error, boolean>>((resolve) => {
			setTimeout(() => {
				try {
					this.storage.removeItem(this.storageKey)
		
					resolve(makeRight(true))
				} catch (error) {
					resolve(makeLeft(error as Error))
				}
			}, 3000)
		})
		
	}
}
