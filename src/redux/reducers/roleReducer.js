import * as types from '../constants';
import initialState from '../initialState';

export default (state = initialState.role, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GET_ROLES_SUCCESS:
			return {
				...state,
				roles: payload.roles.reverse(),
			};
		case types.DELETE_ROLE_SUCCESS:
			return {
				...state,
				roles: state.roles.filter(({ _id }) => _id !== payload.id),
			};
		case types.ADD_ROLE_SUCCESS:
			return {
				...state,
				roles: [
					{
						...payload.role,
						isHighlighted: true,
					},
					...state.roles.map((role) => ({ ...role, isHighlighted: false })),
				],
			};
		case types.EDIT_ROLE_SUCCESS:
			return {
				...state,
				roles: [
					...state.roles.map((role) => {
						if (role._id === payload.id)
							return {
								...payload.role,
								_id: payload.id,
								isHighlighted: true,
							};
						return {
							...role,
							isHighlighted: false,
						};
					}),
				],
			};
		default:
			return state;
	}
};
