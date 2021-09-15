import axios from 'axios';

export const postLogin = (data) =>
	axios.post('https://rk-bda-backend.herokuapp.com/Auth/login', { ...data });

export const postRegister = (data) =>
	axios.post('https://rk-bda-backend.herokuapp.com/Auth/register', { ...data });
