import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { X } from 'react-feather';
import { connect } from 'react-redux';
import { deleteRole } from '../redux/actions/roleActions';

const DeleteRoleModal = ({ id, name, isOpen, handleClose, deleteRole }) => {
	const handleDeleteRole = async () => {
		await deleteRole(id);
		handleClose();
	};

	return (
		<Modal size='lg' isOpen={isOpen} centered>
			<ModalBody className='delete-role-modal d-flex flex-column'>
				<div className='d-flex justify-content-end'>
					<X
						size={24}
						color='#000000'
						strokeWidth={1}
						className='cursor-pointer'
						onClick={handleClose}
					/>
				</div>
				<div className='d-flex justify-content-center'>
					Are you sure you want to delete this role?
				</div>
				<div className='flex-grow-1 d-flex align-items-center justify-content-center fw-bold'>
					{name}
				</div>
				<div className='d-flex justify-content-end'>
					<button
						className='delete-button px-3 py-1'
						onClick={handleDeleteRole}
					>
						DELETE
					</button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default connect(null, { deleteRole })(DeleteRoleModal);
