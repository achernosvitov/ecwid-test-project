import { CurrencyType } from '@/core/models/money'

export type CurrencyDictionaryEntry = {
	label: string
}

export const CURRENCY_DICTIONARY: Record<string, CurrencyDictionaryEntry> = {
	[CurrencyType.RUR]: {
		label: '₽',
	},
}
