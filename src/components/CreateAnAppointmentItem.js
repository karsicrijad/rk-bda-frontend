import React, { useState } from 'react';
import cs from 'classnames';
import { Col, Row } from 'reactstrap';
import { PlusCircle } from 'react-feather';
import { connect } from 'react-redux';
import { createAnAppointment } from '../redux/actions/reservationActions';
import CreateAnAppointmentModal from './CreateAnAppointmentModal';
import { getPermissions } from '../utils/auth';
import { PERMISSIONS } from '../constants';

const MakeAReservationItem = ({
	hour,
	year,
	day,
	month,
	isAvailable,
	isOdd,
	createAnAppointment,
	setError,
}) => {
	const permissions = getPermissions();

	const [makeAReservationModalOpened, setMakeAReservationModalOpened] =
		useState(false);

	const handleCreateAnAppointment = async () => {
		try {
			await createAnAppointment({ year, month, day, hour });
			setError('');
		} catch (e) {
			setError(e?.response?.data?.message);
		}
	};

	return (
		<>
			<Row
				className={cs('d-flex role-tab-item py-3', {
					'role-tab-item-odd': isOdd,
					'available-appointment': isAvailable,
					'unavailable-appointment': !isAvailable,
				})}
			>
				<Col xs={2}>{`${hour > 9 ? '' : '0'}${hour}:00`}</Col>
				<Col xs={8} className='appointment-text d-flex justify-content-center'>
					{isAvailable ? 'AVAILABLE' : 'RESERVED'}
				</Col>
				<Col
					xs={2}
					className='d-flex justify-content-end align-items-center cursor-pointer'
				>
					{isAvailable &&
						permissions.includes(PERMISSIONS.USER_CREATE_RESERVATION) && (
							<PlusCircle
								strokeWidth={1}
								size={20}
								color='black'
								onClick={() => setMakeAReservationModalOpened(true)}
							/>
						)}
				</Col>
			</Row>
			<CreateAnAppointmentModal
				isOpen={makeAReservationModalOpened}
				handleClose={() => setMakeAReservationModalOpened(false)}
				handleCreateAnAppointment={handleCreateAnAppointment}
				year={year}
				month={month}
				day={day}
				hour={hour}
			/>
		</>
	);
};

export default connect(null, { createAnAppointment })(MakeAReservationItem);
