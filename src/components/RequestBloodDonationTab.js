import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Input, Row } from 'reactstrap';
import { Check } from 'react-feather';
import { BLOOD_TYPES } from '../constants';
import Loader from './Loader';
import { postCreateNotification } from '../client/notification';

const STEPS = {
	INITIAL: 'INITIAL',
	LOADING: 'LOADING',
	DONE: 'DONE',
};

const RequestBloodDonationTab = () => {
	const [message, setMessage] = useState('');
	const [bloodType, setBloodType] = useState(
		Object.values(BLOOD_TYPES)[0].label
	);
	const [step, setStep] = useState(STEPS.INITIAL);

	useEffect(() => {
		if (step === STEPS.DONE) {
			setTimeout(() => {
				setStep(STEPS.INITIAL);
				setMessage('');
				setBloodType(Object.values(BLOOD_TYPES)[0].label);
			}, 2500);
		}
	}, [step]);

	const handleSendRequest = async () => {
		try {
			setStep(STEPS.LOADING);
			await postCreateNotification({
				text: message,
				bloodType: Object.values(BLOOD_TYPES).find(
					({ label }) => label === bloodType
				)?.value,
			});
			setStep(STEPS.DONE);
		} catch (e) {
			setStep(STEPS.INITIAL);
		}
	};

	const createStep = () => {
		switch (step) {
			case STEPS.INITIAL:
				return (
					<Row className='d-flex justify-content-center align-items-center w-100 m-0 p-0 h-100'>
						<Col xs={8}>
							<Card>
								<CardBody className='d-flex flex-column request-blood-donation-tab-container'>
									<div className='d-flex justify-content-center request-blood-donation-tab-title'>
										Request blood donation
									</div>
									<div className='flex-grow-1'>
										<Row>
											<Col xs={12}>Message</Col>
											<Col xs={12}>
												<Input
													value={message}
													onChange={(e) => setMessage(e.target.value)}
													placeholder='Type your message here...'
													className='input-style description-text-area'
													type='textarea'
												/>
											</Col>
											<Col xs={12} className='mt-3'>
												Blood type
											</Col>
											<Col xs={12} className='mb-3'>
												<Input
													className='input-style'
													type='select'
													value={bloodType}
													onChange={(e) => setBloodType(e.target.value)}
												>
													{Object.values(BLOOD_TYPES).map(({ label }) => (
														<option>{label}</option>
													))}
												</Input>
											</Col>
										</Row>
									</div>
									<div className='d-flex justify-content-end'>
										<button
											className='login-button px-3 py-1'
											onClick={handleSendRequest}
										>
											SEND
										</button>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				);
			case STEPS.LOADING:
				return <Loader />;
			case STEPS.DONE:
				return (
					<div className='d-flex justify-content-center align-items-center request-blood-donation-tab-done'>
						<Check
							size={100}
							color='#d32f2f'
							strokeWidth={1}
							className='mx-2'
						/>
						Request sent!
					</div>
				);
			default:
				return null;
		}
	};

	return createStep();
};

export default RequestBloodDonationTab;
