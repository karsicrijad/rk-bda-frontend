import axios from 'axios';
import { getToken } from '../utils/auth';

export const fetchCalendarReservations = ({ year, month, day }) =>
	axios.get(
		`https://rk-bda-backend.herokuapp.com/Reservations/calendar/year/${year}/month/${month}/day/${day}`,
		{
			headers: {
				'x-auth-token': getToken(),
			},
		}
	);

export const postCreateReservation = (data) =>
	axios.post('https://rk-bda-backend.herokuapp.com/Reservations/create', data, {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const fetchReservations = () =>
	axios.get('https://rk-bda-backend.herokuapp.com/Reservations', {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const deleteReservation = (id) =>
	axios.delete(`https://rk-bda-backend.herokuapp.com/Reservations/${id}`, {
		headers: {
			'x-auth-token': getToken(),
		},
	});
