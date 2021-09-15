import React, { useState } from 'react';
import cs from 'classnames';
import { Col, Row } from 'reactstrap';
import { X } from 'react-feather';
import { connect } from 'react-redux';
import { PERMISSIONS } from '../constants';
import { getPermissions } from '../utils/auth';
import DeleteMyAppointmentModal from './DeleteMyAppointmentModal';
import { deleteMyAppointment } from '../redux/actions/reservationActions';

const MyAppointmentItem = ({ id, isOdd, date, deleteMyAppointment }) => {
	const permissions = getPermissions();

	const [deleteMyAppointmentModalOpened, setDeleteMyAppointmentModalOpened] =
		useState(false);

	const handleDeleteMyAppointment = async () => {
		try {
			await deleteMyAppointment(id);
		} catch (e) {
			// Ignored
		}
	};

	return (
		<>
			<Row
				className={cs('d-flex role-tab-item py-3', {
					'role-tab-item-odd': isOdd,
				})}
			>
				<Col xs={10} className='my-auto'>
					{date}
				</Col>
				<Col xs={2} className='d-flex justify-content-end'>
					{permissions.includes(PERMISSIONS.USER_DELETE_NOTIFICATION) && (
						<X
							size={20}
							color='#000000'
							strokeWidth={1}
							className='cursor-pointer'
							onClick={() => setDeleteMyAppointmentModalOpened(true)}
						/>
					)}
				</Col>
			</Row>
			<DeleteMyAppointmentModal
				handleClose={() => setDeleteMyAppointmentModalOpened(false)}
				isOpen={deleteMyAppointmentModalOpened}
				date={date}
				handleDeleteMyAppointment={handleDeleteMyAppointment}
			/>
		</>
	);
};

export default connect(null, { deleteMyAppointment })(MyAppointmentItem);
