import axios from 'axios'

import { EcwidApi } from '../api'
import { AxiosProvider } from '../providers/axios'

let instance: EcwidApi

export function useEcwidApi(): EcwidApi {
	if (!instance) {
		const http = new AxiosProvider(axios.create())

		instance = new EcwidApi(http)
	}

	return instance
}
