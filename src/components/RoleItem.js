import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import cs from 'classnames';
import { Edit2, Trash2 } from 'react-feather';
import { getPermissions } from '../utils/auth';
import { PERMISSIONS } from '../constants';
import AddEditRoleModal from './AddEditRoleModal';

const RoleItem = ({
	id,
	name,
	description,
	permissions,
	isOdd,
	isHighlighted = false,
	handleOpenDeleteModal,
}) => {
	const userPermissions = getPermissions();

	const [editRoleModalOpened, setEditRoleModalOpened] = useState(false);

	return (
		<>
			<Row
				className={cs('d-flex w-100 role-tab-item py-3 m-0', {
					'role-tab-item-odd': isOdd,
					highlighted: isHighlighted,
				})}
			>
				<Col xs={4}>{name}</Col>
				<Col xs={6}>{description}</Col>
				<Col xs={2} className='d-flex align-items-center justify-content-end'>
					{userPermissions.includes(PERMISSIONS.ADMIN_UPDATE_ROLE) && (
						<Edit2
							size={24}
							strokeWidth={1}
							className='cursor-pointer mx-2'
							onClick={() => setEditRoleModalOpened(true)}
						/>
					)}
					{userPermissions.includes(PERMISSIONS.ADMIN_DELETE_ROLE) && (
						<Trash2
							size={24}
							strokeWidth={1}
							className='cursor-pointer'
							onClick={() => handleOpenDeleteModal({ id, name })}
						/>
					)}
				</Col>
			</Row>
			<AddEditRoleModal
				oldRole={{ id, name, description, permissions }}
				isOpen={editRoleModalOpened}
				handleClose={() => setEditRoleModalOpened(false)}
			/>
		</>
	);
};

export default RoleItem;
