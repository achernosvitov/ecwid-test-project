import type { Product } from '@/core/models/products/model'

export function getProductPageLink(product: Product): string {
	return `/products/${product.slug}-${product.id}`
}
