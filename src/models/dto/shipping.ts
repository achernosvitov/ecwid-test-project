export type ShippingSettingsDto = {
	type?: string
	methodMarkup?: number
	flatRate?: number
	disabledMethods?: string[]
	enabledMethods?: string[]
}
