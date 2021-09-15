import * as types from '../constants';
import {
	deleteReservation,
	fetchCalendarReservations,
	fetchReservations,
	postCreateReservation,
} from '../../client/reservation';
import { getUserID } from '../../utils/auth';

export const getCalendarReservationsSuccess = (calendarReservations) => ({
	type: types.GET_CALENDAR_RESERVATIONS_SUCCESS,
	payload: {
		calendarReservations,
	},
});

export const createAnAppointmentSuccess = (calendarReservation) => ({
	type: types.CREATE_AN_APPOINTMENT_SUCCESS,
	payload: {
		calendarReservation,
	},
});

export const getMyAppointmentsSuccess = (myAppointments) => ({
	type: types.GET_MY_APPOINTMENTS_SUCCESS,
	payload: {
		myAppointments,
	},
});

export const deleteMyAppointmentSuccess = (id) => ({
	type: types.DELETE_MY_APPOINTMENT_SUCCESS,
	payload: {
		id,
	},
});

export const getCalendarReservations =
	({ year, month, day }) =>
	async (dispatch) => {
		const { data } = await fetchCalendarReservations({ year, month, day });
		dispatch(getCalendarReservationsSuccess(data));
	};

export const createAnAppointment =
	({ year, month, day, hour }) =>
	async (dispatch) => {
		const { data } = await postCreateReservation({
			year,
			month,
			day,
			hour,
			userID: getUserID(),
		});
		dispatch(createAnAppointmentSuccess(data));
	};

export const getMyAppointments = () => async (dispatch) => {
	const { data } = await fetchReservations();
	dispatch(getMyAppointmentsSuccess(data));
};

export const deleteMyAppointment = (id) => async (dispatch) => {
	await deleteReservation(id);
	dispatch(deleteMyAppointmentSuccess(id));
};
