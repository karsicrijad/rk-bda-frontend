import { combineReducers } from 'redux';
import user from './reducers/userReducer';
import role from './reducers/roleReducer';
import notification from './reducers/notificationReducer';
import reservation from './reducers/reservationReducer';

const reducer = combineReducers({ user, role, notification, reservation });

const rootReducer = (state, action) => reducer(state, action);

export default rootReducer;
