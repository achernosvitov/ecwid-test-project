import type { CartItem } from '@/core/models/cart'
import {
	makeLeft, type Either, makeRight, 
} from '@/core/utils/either'

export class CartService {
	private readonly storageKey = 'ECWID_TEST_PROJECT_CART'

	constructor(private readonly storage: Storage) {}

	private parseString(value: string): CartItem[] {
		return JSON.parse(value) as CartItem[]
	}

	async getCart(): Promise<Either<Error, CartItem[]>> {
		try {
			const value = this.storage.getItem(this.storageKey)

			if (!value) {
				return makeRight([])
			}

			return makeRight(this.parseString(value))
		} catch (error) {
			return makeLeft(error as Error)
		}
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
		try {
			await this.storage.removeItem(this.storageKey)

			return makeRight(true)
		} catch (error) {
			return makeLeft(error as Error)
		}
	}
}
