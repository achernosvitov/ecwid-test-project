import type { Category } from '@/core/models/category'

export function getCategoryPageLink(category: Category): string {
	return `/categories/${category.slug}-${category.id}`
}

export function getCategoryIdFromSlug(slug: string): string {
	const idRegExp = /\d+$/

	return slug.match(idRegExp)?.[0] ?? ''
}
