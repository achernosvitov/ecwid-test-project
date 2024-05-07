import { CartService } from '@/core/services/cart'

export function useCartService(): CartService {
	return new CartService(localStorage)
}
