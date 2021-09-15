import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from './Loader';
import MyAppointmentItem from './MyAppointmentItem';
import { getMyAppointments } from '../redux/actions/reservationActions';

const MyAppointmentsTab = ({ myAppointments, getMyAppointments }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			await getMyAppointments();
			setLoading(false);
		})();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<Row className='w-100'>
			<Col xs={12} className='appointments-container'>
				<Row className='role-tab-header'>
					<Col xs={10} className='d-flex align-items-center fw-bold'>
						Date
					</Col>
				</Row>
				{myAppointments.map(({ year, month, day, hour, _id }, index) => (
					<MyAppointmentItem
						key={_id}
						id={_id}
						date={`${hour > 9 ? '' : '0'}${hour}:00 ${day}/${month}/${year}`}
						isOdd={index % 2 !== 0}
					/>
				))}
			</Col>
		</Row>
	);
};

export default connect(
	({ reservation }) => ({
		myAppointments: reservation.myAppointments,
	}),
	{ getMyAppointments }
)(MyAppointmentsTab);
