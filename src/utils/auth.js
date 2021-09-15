export const setUserSession = ({ token, permissions, userID }) => {
	localStorage.setItem('token', token);
	localStorage.setItem('permissions', permissions);
	localStorage.setItem('userID', userID);
};

export const removeUserSession = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('permissions');
	localStorage.removeItem('userID');
};

export const getToken = () => localStorage.getItem('token');

export const getPermissions = () => localStorage.getItem('permissions');

export const getUserID = () => localStorage.getItem('userID');
