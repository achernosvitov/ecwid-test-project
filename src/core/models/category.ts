export type CategoryThumbnail = {
	/**
	 * max resolution 400px
	 */
	thumbnailUrl?: string
	/**
	 * max resolution 800px
	 */
	hdThumnnailUrl?: string
	/**
	 * max resolution 1500px
	 */
	imageUrl?: string
}

export type CategoryImagePlaceholderColor = {
	red: number
	green: number
	blue: number
	alpha?: number
}

export type Category = {
	id: string
	name: string
	slug: string
	productCount: number
	description?: string
	thumbnail?: CategoryThumbnail
	placeholder?: CategoryImagePlaceholderColor
}
