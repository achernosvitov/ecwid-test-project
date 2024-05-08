import type { ColorDto } from '@/core/models/dto/media'

export function getDominatingColorStyle(color: ColorDto): string {
	const {
		red, green, blue, alpha, 
	} = color

	if (alpha) {
		return `rgba(${red},${green},${blue},${alpha})`
	}

	return `rgb(${red},${green},${blue})`
}
