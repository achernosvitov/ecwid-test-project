import type { ColorDto } from '@/models/dto/media'

export function getDominatingColorStyle(color: ColorDto): string {
	const {
		red, green, blue, alpha, 
	} = color

	if (alpha) {
		return `rgba(${red},${green},${blue},${alpha})`
	}

	return `rgb(${red},${green},${blue})`
}
