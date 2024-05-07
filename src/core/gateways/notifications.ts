export type NotificationServiceOptions = {
	theme: 'dark' | 'light'
}

export interface INotificationService {
	info(message: string): void
	success(message: string): void
	warning(message: string): void
	error(message: string): void
}
