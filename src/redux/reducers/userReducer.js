import * as types from '../constants';
import initialState from '../initialState';

export default (state = initialState.user, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GET_MY_PROFILE_SUCCESS:
		case types.EDIT_MY_PROFILE_SUCCESS:
			return {
				...state,
				details: payload.details,
			};
		default:
			return state;
	}
};
