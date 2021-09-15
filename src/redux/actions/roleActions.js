import {
	fetchRoles,
	deleteRole as clientDeleteRole,
	postCreateRole,
	postUpdateRole,
} from '../../client/role';
import * as types from '../constants';

export const getRolesSuccess = (roles) => ({
	type: types.GET_ROLES_SUCCESS,
	payload: {
		roles,
	},
});

export const deleteRoleSuccess = (id) => ({
	type: types.DELETE_ROLE_SUCCESS,
	payload: {
		id,
	},
});

export const addRoleSuccess = (role) => ({
	type: types.ADD_ROLE_SUCCESS,
	payload: {
		role,
	},
});

export const editRoleSuccess = (id, role) => ({
	type: types.EDIT_ROLE_SUCCESS,
	payload: {
		id,
		role,
	},
});

export const getRoles = () => async (dispatch) => {
	const { data } = await fetchRoles();
	dispatch(getRolesSuccess(data));
};

export const deleteRole = (id) => async (dispatch) => {
	await clientDeleteRole(id);
	dispatch(deleteRoleSuccess(id));
};

export const addRole = (role) => async (dispatch) => {
	const { data } = await postCreateRole(role);
	dispatch(addRoleSuccess(data));
};

export const editRole = (id, role) => async (dispatch) => {
	await postUpdateRole(id, role);
	dispatch(editRoleSuccess(id, role));
};
