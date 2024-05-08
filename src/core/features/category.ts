import type { Category } from '@/core/models/category'

export function getCategoryPageLink(category: Category): string {
	return `/products/${category.slug}-${category.id}`
}
