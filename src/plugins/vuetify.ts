import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import colors from 'vuetify/util/colors'

const lightTheme = {
	colors: {
		primary: colors.indigo.darken1,
	},
}

export const vuetify = createVuetify({
	blueprint: md2,
	theme: {
		themes: {
			light: lightTheme,
		},
	},
})
