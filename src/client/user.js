import axios from 'axios';
import { getToken } from '../utils/auth';

export const fetchMyProfile = () =>
	axios.get('https://rk-bda-backend.herokuapp.com/Users/my-profile', {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const postMyProfile = (data) =>
	axios.post('https://rk-bda-backend.herokuapp.com/Users/my-profile', data, {
		headers: {
			'x-auth-token': getToken(),
		},
	});
