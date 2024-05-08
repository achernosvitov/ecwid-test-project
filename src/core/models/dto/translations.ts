export type LanguageCodeDto = 'en'

export type TranslationsDto = Record<LanguageCodeDto, string>

export type AltTranslationsDto = TranslationsDto & {
	main?: string
}
