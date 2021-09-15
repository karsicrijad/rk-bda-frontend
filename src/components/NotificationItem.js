import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import cs from 'classnames';
import { Flag, X } from 'react-feather';
import { connect } from 'react-redux';
import ViewNotificationModal from './ViewNotificationItemModal';
import {
	deleteNotification,
	markNotificationAsRead,
	markNotificationAsUnread,
} from '../redux/actions/notificationActions';
import { getPermissions } from '../utils/auth';
import { PERMISSIONS } from '../constants';

const NotificationItem = ({
	id,
	text,
	isRead,
	isOdd,
	markNotificationAsRead,
	markNotificationAsUnread,
	deleteNotification,
}) => {
	const permissions = getPermissions();

	const [viewNotificationModalOpened, setViewNotificationModalOpened] =
		useState(false);

	return (
		<>
			<Row
				className={cs('d-flex role-tab-item py-3', {
					'role-tab-item-odd': isOdd,
				})}
			>
				<Col
					xs={10}
					className='my-auto cursor-pointer'
					onClick={async () => {
						if (
							!isRead &&
							permissions.includes(PERMISSIONS.USER_MARK_NOTIFICATION_AS_READ)
						) {
							await markNotificationAsRead(id);
						}
						setViewNotificationModalOpened(true);
					}}
				>
					{text}
				</Col>
				<Col xs={2} className='d-flex align-items-center justify-content-end'>
					<Flag
						size={16}
						fill={isRead ? 'transparent' : '#d32f2f'}
						strokeWidth={2}
						className='cursor-pointer mx-3'
						color='#d32f2f'
						onClick={async () => {
							if (isRead) {
								if (
									permissions.includes(
										PERMISSIONS.USER_MARK_NOTIFICATION_AS_UNREAD
									)
								) {
									await markNotificationAsUnread(id);
								}
							} else if (
								permissions.includes(PERMISSIONS.USER_MARK_NOTIFICATION_AS_READ)
							) {
								await markNotificationAsRead(id);
							}
						}}
					/>
					{permissions.includes(PERMISSIONS.USER_DELETE_NOTIFICATION) && (
						<X
							size={20}
							color='#000000'
							strokeWidth={1}
							className='cursor-pointer'
							onClick={async () => {
								await deleteNotification(id);
							}}
						/>
					)}
				</Col>
			</Row>
			<ViewNotificationModal
				isOpen={viewNotificationModalOpened}
				text={text}
				handleClose={() => setViewNotificationModalOpened(false)}
			/>
		</>
	);
};

export default connect(null, {
	markNotificationAsRead,
	markNotificationAsUnread,
	deleteNotification,
})(NotificationItem);
