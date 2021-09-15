import React from 'react';
import { Col, Modal, ModalBody, Row } from 'reactstrap';
import { X } from 'react-feather';

const CreateAnAppointmentModal = ({
	handleCreateAnAppointment,
	hour,
	year,
	month,
	day,
	isOpen,
	handleClose,
}) => (
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
			<div className='flex-grow-1 d-flex justify-content-center align-items-center'>
				<Row>
					<Col xs={12} className='d-flex justify-content-center'>
						Are you sure you want to create an appointment at
					</Col>
					<Col xs={12} className='d-flex justify-content-center'>
						<span className='fw-bold'>
							{`${hour > 9 ? '' : '0'}${hour}:00 ${day}/${month}/${year}`}
						</span>
						?
					</Col>
				</Row>
			</div>
			<div className='d-flex justify-content-end'>
				<button
					className='delete-button px-3 py-1'
					onClick={() => {
						handleCreateAnAppointment();
						handleClose();
					}}
				>
					CREATE
				</button>
			</div>
		</ModalBody>
	</Modal>
);

export default CreateAnAppointmentModal;
