import { toast } from 'vue3-toastify'

import type { INotificationService } from '@/core/gateways/notifications'
import { ToastifyProvider } from '@/core/providers/toastify'

export function useNotificationService(): INotificationService {
	return new ToastifyProvider(toast, {
		theme: 'dark',
	})
}
