import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Loader from './Loader';
import { getRoles } from '../redux/actions/roleActions';
import RoleItem from './RoleItem';
import { getPermissions } from '../utils/auth';
import { PERMISSIONS } from '../constants';
import AddEditRoleModal from './AddEditRoleModal';
import DeleteRoleModal from './DeleteRoleModal';

const RolesTab = ({ roles, getRoles }) => {
	const permissions = getPermissions();

	const [loading, setLoading] = useState(true);
	const [addRoleModalOpened, setAddRoleModalOpened] = useState(false);
	const [deleteRoleModalOpened, setDeleteRoleModalOpened] = useState(false);
	const [selectedRoleId, setSelectedRoleId] = useState('');
	const [selectedRoleName, setSelectedRoleName] = useState('');

	const handleOpenDeleteModal = ({ id, name }) => {
		setSelectedRoleId(id);
		setSelectedRoleName(name);
		setDeleteRoleModalOpened(true);
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				await getRoles();
			} catch (e) {
				// Ignored
			}
			setLoading(false);
		})();
	}, []);

	return loading ? (
		<Loader />
	) : roles.length ? (
		<>
			<Row className='w-100'>
				<Col xs={12} className='appointments-container p-0'>
					<Row className='role-tab-header w-100 py-3 m-0'>
						<Col xs={4} className='fw-bold d-flex align-items-center'>
							Name
						</Col>
						<Col xs={6} className='fw-bold d-flex align-items-center'>
							Description
						</Col>
						<Col
							xs={2}
							className='d-flex align-items-center justify-content-end'
						>
							{permissions.includes(PERMISSIONS.ADMIN_CREATE_ROLE) && (
								<button
									className='add-new-button d-flex align-items-center px-2 py-1'
									onClick={() => setAddRoleModalOpened(true)}
								>
									ADD NEW ROLE
								</button>
							)}
						</Col>
					</Row>
					{roles.map(
						(
							{ _id: id, name, description, permissions, isHighlighted },
							index
						) => (
							<RoleItem
								key={id}
								id={id}
								name={name}
								description={description}
								permissions={permissions}
								isOdd={index % 2 !== 0}
								isHighlighted={isHighlighted}
								handleOpenDeleteModal={handleOpenDeleteModal}
							/>
						)
					)}
				</Col>
			</Row>
			<AddEditRoleModal
				isOpen={addRoleModalOpened}
				handleClose={() => setAddRoleModalOpened(false)}
			/>
			<DeleteRoleModal
				id={selectedRoleId}
				isOpen={deleteRoleModalOpened}
				handleClose={() => {
					setDeleteRoleModalOpened(false);
					setSelectedRoleId('');
					setSelectedRoleName('');
				}}
				name={selectedRoleName}
			/>
		</>
	) : (
		'No roles'
	);
};

export default connect(({ role }) => ({ roles: role.roles }), { getRoles })(
	RolesTab
);
