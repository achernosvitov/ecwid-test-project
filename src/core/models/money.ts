export enum CurrencyType {
	RUR = 'RUR',
}

export type Currency = {
	code: CurrencyType
	base: number | number[]
	exponent: number
}

export type Money = {
	currency: Currency
	amount: number
}

export const CURRENCY_RUR: Currency = {
	code: CurrencyType.RUR,
	base: 10,
	exponent: 2,
}
