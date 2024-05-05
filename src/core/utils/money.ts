import {
	dinero,
	toDecimal, 
} from 'dinero.js'

import { CURRENCY_DICTIONARY } from '../dictionaries/currency'

import type { Money } from '@/core/models/money'

export function formatPrice(price: Money): string {
	const d = dinero({
		...price,
		amount: price.amount,
	})

	return toDecimal(d, function({
		value, currency,
	}) {
		const label = CURRENCY_DICTIONARY[currency.code].label

		return `${value} ${label ?? currency.code}`
	})
}
