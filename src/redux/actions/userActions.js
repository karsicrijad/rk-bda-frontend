import { fetchMyProfile, postMyProfile } from '../../client/user';
import * as types from '../constants';

export const getMyProfileSuccess = (details) => ({
	type: types.GET_MY_PROFILE_SUCCESS,
	payload: {
		details,
	},
});

export const editMyProfileSuccess = (details) => ({
	type: types.EDIT_MY_PROFILE_SUCCESS,
	payload: {
		details,
	},
});

export const getMyProfile = () => async (dispatch) => {
	const { data } = await fetchMyProfile();
	dispatch(getMyProfileSuccess(data));
};

export const editMyProfile = (details) => async (dispatch) => {
	const { data } = await postMyProfile(details);
	dispatch(editMyProfileSuccess(data));
};
