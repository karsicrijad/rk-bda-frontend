import * as types from '../constants';
import {
	fetchNotifications,
	patchMarkNotificationAsRead,
	patchMarkNotificationAsUnread,
	deleteNotification as clientDeleteNotification,
} from '../../client/notification';

export const getNotificationsSuccess = (notifications) => ({
	type: types.GET_NOTIFICATIONS_SUCCESS,
	payload: {
		notifications,
	},
});

export const markNotificationAsReadSuccess = (id) => ({
	type: types.MARK_NOTIFICATION_AS_READ_SUCCESS,
	payload: {
		id,
	},
});

export const markNotificationAsUnreadSuccess = (id) => ({
	type: types.MARK_NOTIFICATION_AS_UNREAD_SUCCESS,
	payload: {
		id,
	},
});

export const deleteNotificationSuccess = (id) => ({
	type: types.DELETE_NOTIFICATION_SUCCESS,
	payload: {
		id,
	},
});

export const getNotifications = () => async (dispatch) => {
	const { data } = await fetchNotifications();
	dispatch(getNotificationsSuccess(data));
};

export const markNotificationAsRead = (id) => async (dispatch) => {
	await patchMarkNotificationAsRead(id);
	dispatch(markNotificationAsReadSuccess(id));
};

export const markNotificationAsUnread = (id) => async (dispatch) => {
	await patchMarkNotificationAsUnread(id);
	dispatch(markNotificationAsUnreadSuccess(id));
};

export const deleteNotification = (id) => async (dispatch) => {
	await clientDeleteNotification(id);
	dispatch(deleteNotificationSuccess(id));
};
