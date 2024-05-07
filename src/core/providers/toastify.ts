import type {
	toast,
	ToastType, 
} from 'vue3-toastify'

import type {
	INotificationService, NotificationServiceOptions, 
} from '../gateways/notifications'

enum NotificationType {
	Info,
	Success,
	Warning,
	Error,
}

const NOTIFICATION_TYPE_MAP: Record<NotificationType, ToastType> = {
	[NotificationType.Info]: 'info',
	[NotificationType.Success]: 'success',
	[NotificationType.Warning]: 'warning',
	[NotificationType.Error]: 'error',
}

export class ToastifyProvider implements INotificationService {
	constructor(private readonly toastify: typeof toast, private readonly options: NotificationServiceOptions) {}

	private notify(message: string, type: NotificationType): void {
		this.toastify(message, {
			type: NOTIFICATION_TYPE_MAP[type],
			theme: this.options.theme,
		})
	}

	info(message: string): void {
		return this.notify(message, NotificationType.Info)
	}
	success(message: string): void {
		return this.notify(message, NotificationType.Success)
	}
	warning(message: string): void {
		return this.notify(message, NotificationType.Warning)
	}
	error(message: string): void {
		return this.notify(message, NotificationType.Error)
	}
}
