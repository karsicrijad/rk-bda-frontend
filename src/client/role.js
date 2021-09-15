import axios from 'axios';
import { getToken } from '../utils/auth';

export const fetchRoles = () =>
	axios.get('https://rk-bda-backend.herokuapp.com/Roles', {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const deleteRole = (id) =>
	axios.delete(`https://rk-bda-backend.herokuapp.com/Roles/${id}`, {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const postCreateRole = (data) =>
	axios.post('https://rk-bda-backend.herokuapp.com/Roles/create', data, {
		headers: {
			'x-auth-token': getToken(),
		},
	});

export const postUpdateRole = (id, data) =>
	axios.post(`https://rk-bda-backend.herokuapp.com/Roles/update/${id}`, data, {
		headers: {
			'x-auth-token': getToken(),
		},
	});
