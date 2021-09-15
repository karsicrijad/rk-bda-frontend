import axios from 'axios';
import { getToken } from '../utils/auth';

export const postCreateNotification = (data) =>
	axios.post(
		'https://rk-bda-backend.herokuapp.com/Notifications/create',
		data,
		{
			headers: {
				'x-auth-token': getToken(),
			},
		}
	);

export const fetchNotifications = () =>
	axios.get('https://rk-bda-backend.herokuapp.com/Notifications', {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const patchMarkNotificationAsRead = (id) =>
	axios.patch(
		`https://rk-bda-backend.herokuapp.com/Notifications/mark_as_read/${id}`,
		null,
		{
			headers: {
				'x-auth-token': getToken(),
			},
		}
	);

export const patchMarkNotificationAsUnread = (id) =>
	axios.patch(
		`https://rk-bda-backend.herokuapp.com/Notifications/mark_as_unread/${id}`,
		null,
		{
			headers: {
				'x-auth-token': getToken(),
			},
		}
	);

export const deleteNotification = (id) =>
	axios.delete(`https://rk-bda-backend.herokuapp.com/Notifications/${id}`, {
		headers: {
			'x-auth-token': getToken(),
		},
	});
