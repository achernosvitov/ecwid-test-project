export type TaxInfoDto = {
	taxable?: boolean
	defaultLocationIncludedTaxRate?: number
	enabledManualTaxes?: number[]
	taxClassCode?: string
}
