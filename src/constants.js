export const OPTIONS = {
	SIGN_IN: 'SIGN_IN',
	SIGN_UP: 'SIGN_UP',
};

export const PERMISSIONS = {
	ADMIN_READ_USERS: 'admin:read_users',
	ADMIN_CREATE_USER: 'admin:create_user',
	ADMIN_UPDATE_USER: 'admin:update_user',
	ADMIN_DELETE_USER: 'admin:delete_user',
	ADMIN_READ_ROLES: 'admin:read_roles',
	ADMIN_CREATE_ROLE: 'admin:create_role',
	ADMIN_UPDATE_ROLE: 'admin:update_role',
	ADMIN_DELETE_ROLE: 'admin:delete_role',
	USER_READ_NOTIFICATIONS: 'user:read_notifications',
	ADMIN_CREATE_NOTIFICATION: 'admin:create_notification',
	USER_MARK_NOTIFICATION_AS_READ: 'user:mark_notification_as_read',
	USER_MARK_NOTIFICATION_AS_UNREAD: 'user:mark_notification_as_unread',
	USER_DELETE_NOTIFICATION: 'user:delete_notification',
	USER_READ_RESERVATIONS: 'user:read_reservations',
	USER_CREATE_RESERVATION: 'user:create_reservation',
	USER_READ_CALENDAR: 'user:read_calendar',
	USER_DELETE_RESERVATION: 'user:delete_reservation',
	USER_EDIT_PROFILE: 'user:edit_profile',
};

export const BLOOD_TYPES = {
	A_NEGATIVE: {
		label: 'A Negative',
		value: 'a:negative',
	},
	A_POSITIVE: {
		label: 'A Positive',
		value: 'a:positive',
	},
	B_NEGATIVE: {
		label: 'B Negative',
		value: 'b:negative',
	},
	B_POSITIVE: {
		label: 'A Positive',
		value: 'b:positive',
	},
	AB_NEGATIVE: {
		label: 'AB Negative',
		value: 'ab:negative',
	},
	AB_POSITIVE: {
		label: 'AB Positive',
		value: 'ab:positive',
	},
	ZERO_NEGATIVE: {
		label: 'Zero Negative',
		value: 'zero:negative',
	},
	ZERO_POSITIVE: {
		label: 'Zero Positive',
		value: 'zero:positive',
	},
};

export const APPOINTMENT_HOURS = [
	7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];
