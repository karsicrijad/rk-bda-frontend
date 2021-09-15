import * as types from '../constants';
import initialState from '../initialState';

export default (state = initialState.notification, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GET_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				notifications: payload.notifications.reverse(),
			};
		case types.MARK_NOTIFICATION_AS_READ_SUCCESS:
			return {
				...state,
				notifications: [
					...state.notifications.map((notification) => {
						if (payload.id === notification._id)
							return {
								...notification,
								isRead: true,
							};
						return notification;
					}),
				],
			};
		case types.MARK_NOTIFICATION_AS_UNREAD_SUCCESS:
			return {
				...state,
				notifications: [
					...state.notifications.map((notification) => {
						if (payload.id === notification._id)
							return {
								...notification,
								isRead: false,
							};
						return notification;
					}),
				],
			};
		case types.DELETE_NOTIFICATION_SUCCESS:
			return {
				...state,
				notifications: [
					...state.notifications.filter(({ _id }) => _id !== payload.id),
				],
			};
		default:
			return state;
	}
};
