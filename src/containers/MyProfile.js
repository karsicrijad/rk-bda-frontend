import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Input, Row } from 'reactstrap';
import { Img } from 'react-image';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getToken } from '../utils/auth';
import { userImage } from '../assets/images';
import { getMyProfile, editMyProfile } from '../redux/actions/userActions';
import Loader from '../components/Loader';
import { BLOOD_TYPES } from '../constants';

const MyProfile = ({ details, getMyProfile, editMyProfile }) => {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [editable, setEditable] = useState(false);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	if (!getToken()) {
		history.push('/login');
		return null;
	}

	const handleEditProfile = async () => {
		try {
			setError('');
			setLoading(true);
			await editMyProfile({ name, surname, username, email });
			setEditable(false);
		} catch (e) {
			setError(e?.response?.data?.message);
			setName(details?.name);
			setSurname(details?.surname);
			setUsername(details?.username);
			setEmail(details?.email);
		}
		setLoading(false);
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				await getMyProfile();
			} catch (e) {
				// Ignored
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		if (details) {
			setName(details?.name);
			setSurname(details?.surname);
			setUsername(details?.username);
			setEmail(details?.email);
		}
	}, [details]);

	return (
		<>
			<Sidebar />
			<div className='d-flex flex-grow-1'>
				<div className='w-100 h-100 d-flex flex-column'>
					<Navbar />
					<div className='flex-grow-1 d-flex justify-content-center align-items-center'>
						<Card className='my-profile-container-card'>
							<CardBody>
								<Row>
									<Col xs={12} className='d-flex justify-content-center'>
										<Img src={userImage} width={100} height={100} />
									</Col>
									{loading ? (
										<Loader />
									) : (
										<>
											{error && (
												<Col xs={12} className='login-error-message'>
													{error}
												</Col>
											)}
											<Col xs={12}>Name</Col>
											<Col xs={12}>
												<Input
													disabled={!editable}
													value={name}
													onChange={(e) => setName(e.target.value)}
													placeholder='Name'
													className='input-style'
												/>
											</Col>
											<Col xs={12} className='mt-3'>
												Surname
											</Col>
											<Col xs={12}>
												<Input
													disabled={!editable}
													value={surname}
													onChange={(e) => setSurname(e.target.value)}
													placeholder='Surname'
													className='input-style'
												/>
											</Col>
											<Col xs={12} className='mt-3'>
												Username
											</Col>
											<Col xs={12}>
												<Input
													disabled={!editable}
													value={username}
													onChange={(e) => setUsername(e.target.value)}
													placeholder='Username'
													className='input-style'
												/>
											</Col>
											<Col xs={12} className='mt-3'>
												Email
											</Col>
											<Col xs={12}>
												<Input
													disabled={!editable}
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													placeholder='Email'
													className='input-style'
												/>
											</Col>
											<Col xs={12} className='mt-3'>
												Blood type
											</Col>
											<Col xs={12}>
												<Input
													disabled
													value={
														Object.values(BLOOD_TYPES).find(
															({ value }) => value === details?.bloodType
														)?.label
													}
													placeholder='Blood type'
													className='input-style'
												/>
											</Col>
											<Col xs={12} className='d-flex justify-content-end mt-3'>
												{!editable && (
													<button
														className='login-button my-profile-button'
														onClick={() => setEditable(true)}
													>
														EDIT
													</button>
												)}
												{editable && (
													<>
														<button
															className='login-button my-profile-cancel-button my-profile-button'
															onClick={() => {
																setEditable(false);
																if (details) {
																	setName(details?.name);
																	setSurname(details?.surname);
																	setUsername(details?.username);
																	setEmail(details?.email);
																	setError('');
																}
															}}
														>
															CANCEL
														</button>
														<button
															className='login-button my-profile-button'
															onClick={handleEditProfile}
														>
															SAVE
														</button>
													</>
												)}
											</Col>
										</>
									)}
								</Row>
							</CardBody>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(
	({ user }) => ({
		details: user.details,
	}),
	{ getMyProfile, editMyProfile }
)(MyProfile);
