import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getCalendarReservations } from '../redux/actions/reservationActions';
import Loader from './Loader';
import { APPOINTMENT_HOURS } from '../constants';
import CreateAnAppointmentItem from './CreateAnAppointmentItem';

const CreateAnAppointmentTab = ({
	calendarReservations,
	getCalendarReservations,
}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				setError('');
				await getCalendarReservations({
					year: startDate?.getFullYear(),
					month: startDate?.getMonth() + 1,
					day: startDate?.getDate(),
				});
			} catch (e) {
				setError(e?.response?.data?.message);
			}
			setLoading(false);
		})();
	}, [startDate]);

	return (
		<Row className='w-100'>
			<Col xs={2}>Pick a date here...</Col>
			<Col xs={10}>
				<DatePicker
					dateFormat='dd/MM/yyyy'
					selected={startDate}
					onChange={(date) => setStartDate(date)}
				/>
			</Col>
			{error && (
				<Col xs={12} className='login-error-message'>
					{error}
				</Col>
			)}
			<Col xs={12} className='appointments-container'>
				{loading ? (
					<Loader />
				) : (
					APPOINTMENT_HOURS.map((hour, index) => (
						<CreateAnAppointmentItem
							key={hour}
							hour={hour}
							year={startDate?.getFullYear()}
							month={startDate?.getMonth() + 1}
							day={startDate?.getDate()}
							isOdd={index % 2 !== 1}
							isAvailable={
								!calendarReservations?.find(
									({ hour: appointmentHour }) => hour === appointmentHour
								)
							}
							setError={(e) => setError(e)}
						/>
					))
				)}
			</Col>
		</Row>
	);
};

export default connect(
	({ reservation }) => ({
		calendarReservations: reservation.calendarReservations,
	}),
	{ getCalendarReservations }
)(CreateAnAppointmentTab);
