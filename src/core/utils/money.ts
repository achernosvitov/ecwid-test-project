import {
	add,
	dinero,
	multiply,
	toDecimal,
	toSnapshot, 
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

export function multiplyMoney(money: Money, multiplier: number): Money {
	const d = dinero(money)
	const multiplied = multiply(d, multiplier)

	return toSnapshot(multiplied) as Money
}

export function addMoney(augend: Money, addend: Money): Money {
	const d1 = dinero(augend)
	const d2 = dinero(addend)

	const sum = add(d1, d2)

	return toSnapshot(sum) as Money
}
