import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { X } from 'react-feather';

const ViewNotificationModal = ({ text, isOpen, handleClose }) => (
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
			<div className='flex-grow-1 d-flex justify-content-center align-items-center white-space-pre-wrap'>
				{text}
			</div>
		</ModalBody>
	</Modal>
);

export default ViewNotificationModal;
