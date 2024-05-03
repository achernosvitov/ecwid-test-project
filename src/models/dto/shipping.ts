export type ShippingSettingsDto = {
	type?: 'GLOBAL_METHODS' | 'SELECTED_METHODS' | 'FLAT_RATE' | 'FREE_SHIPPING'
	methodMarkup?: number
	flatRate?: number
	disabledMethods?: string[]
	enabledMethods?: string[]
}
