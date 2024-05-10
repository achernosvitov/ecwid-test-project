export function setPageMeta(namedArgs: {
	title?: string
	metaDescription?: string
}): void {
	const {
		title,
		metaDescription,
	} = namedArgs

	if (title !== undefined) {
		document.title = title
	}

	if (metaDescription !== undefined) {
		const meta = document.createElement('meta')

		meta.name = 'description'
		meta.content = metaDescription

		document.getElementsByTagName('head')[0].appendChild(meta)
	}
}

export function resetPageMeta(): void {
	document.title = ''
	document.querySelectorAll('meta[name=description]').forEach((element) => element.remove())
}
