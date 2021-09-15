import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from './Loader';
import { getNotifications } from '../redux/actions/notificationActions';
import NotificationItem from './NotificationItem';

const NotificationsTab = ({ notifications, getNotifications }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			await getNotifications();
			setLoading(false);
		})();
	}, []);

	return loading ? (
		<Loader />
	) : notifications?.length ? (
		<Row className='w-100'>
			<Col xs={12} className='appointments-container'>
				<Row className='role-tab-header'>
					<Col xs={10} className='d-flex align-items-center fw-bold'>
						Text
					</Col>
				</Row>
				{notifications.map(({ _id: id, isRead, text }, index) => (
					<NotificationItem
						kex={id}
						id={id}
						isRead={isRead}
						isOdd={index % 2 !== 0}
						text={text}
					/>
				))}
			</Col>
		</Row>
	) : (
		'No notifications'
	);
};

export default connect(
	({ notification }) => ({
		notifications: notification.notifications,
	}),
	{ getNotifications }
)(NotificationsTab);
