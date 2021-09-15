import * as types from '../constants';
import initialState from '../initialState';

export default (state = initialState.reservation, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GET_CALENDAR_RESERVATIONS_SUCCESS:
			return {
				...state,
				calendarReservations: payload.calendarReservations,
			};
		case types.CREATE_AN_APPOINTMENT_SUCCESS:
			return {
				...state,
				calendarReservations: [
					...state.calendarReservations,
					payload.calendarReservation,
				],
			};
		case types.GET_MY_APPOINTMENTS_SUCCESS:
			return {
				...state,
				myAppointments: payload.myAppointments.reverse(),
			};
		case types.DELETE_MY_APPOINTMENT_SUCCESS:
			return {
				...state,
				myAppointments: [
					...state.myAppointments.filter(({ _id }) => payload.id !== _id),
				],
			};
		default:
			return state;
	}
};
