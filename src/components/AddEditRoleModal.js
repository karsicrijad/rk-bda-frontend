import React, { useEffect, useState } from 'react';
import { Col, Input, Modal, ModalBody, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { X } from 'react-feather';
import Select from 'react-select';
import { PERMISSIONS } from '../constants';
import { addRole, editRole } from '../redux/actions/roleActions';

// eslint-disable-next-line no-unused-vars
const AddEditRoleModal = ({
	oldRole,
	isOpen,
	handleClose,
	addRole,
	editRole,
}) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [permissions, setPermissions] = useState([]);
	const [error, setError] = useState('');

	const handleCancelModal = () => {
		setName('');
		setDescription('');
		setPermissions([]);
		setError('');
		handleClose();
	};

	const handleAddRole = async () => {
		try {
			await addRole({ name, description, permissions });
			handleCancelModal();
		} catch (e) {
			setError(e.response.data.message);
		}
	};

	const handleEditRole = async () => {
		try {
			await editRole(oldRole?.id, { name, description, permissions });
			handleCancelModal();
		} catch (e) {
			setError(e.response.data.message);
		}
	};

	useEffect(() => {
		if (oldRole) {
			setName(oldRole?.name);
			setDescription(oldRole?.description);
			setPermissions(oldRole?.permissions);
		}
	}, [oldRole]);

	return (
		<Modal size='lg' isOpen={isOpen} centered>
			<ModalBody className='delete-role-modal d-flex flex-column'>
				<div className='d-flex justify-content-end'>
					<X
						size={24}
						color='#000000'
						strokeWidth={1}
						className='cursor-pointer'
						onClick={handleCancelModal}
					/>
				</div>
				<div className='d-flex justify-content-center'>
					{oldRole ? 'Edit role' : 'Add role'}
				</div>
				<div className='flex-grow-1 d-flex justify-content-center'>
					<div>
						<Row className='w-100 p-0 m-0'>
							{error && (
								<Col xs={12} className='login-error-message'>
									{error}
								</Col>
							)}
							<Col xs={12}>Name</Col>
							<Col xs={12}>
								<Input
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder='Name'
									className='input-style'
								/>
							</Col>
							<Col xs={12} className='mt-3'>
								Description
							</Col>
							<Col xs={12}>
								<Input
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder='Type your description here...'
									className='input-style description-text-area'
									type='textarea'
								/>
							</Col>
							<Col xs={12} className='mt-3'>
								Permissions
							</Col>
							<Col xs={12}>
								<Select
									className='permissions-select'
									isMulti
									options={Object.values(PERMISSIONS).map((permission) => ({
										value: permission,
										label: permission,
									}))}
									onChange={(options) =>
										setPermissions([...options.map(({ value }) => value)])
									}
									defaultValue={Object.values(permissions).map(
										(permission) => ({
											value: permission,
											label: permission,
										})
									)}
								/>
							</Col>
						</Row>
					</div>
				</div>
				<div className='d-flex justify-content-end'>
					<button
						className='delete-button px-3 py-1'
						onClick={oldRole ? handleEditRole : handleAddRole}
					>
						{oldRole ? 'SAVE' : 'ADD'}
					</button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default connect(null, { addRole, editRole })(AddEditRoleModal);
