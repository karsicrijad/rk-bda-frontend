import React, { useState } from 'react';
import { Card, CardBody, Input, Row, Col } from 'reactstrap';
import { Img } from 'react-image';
import { useHistory } from 'react-router-dom';
import { BLOOD_TYPES, OPTIONS } from '../constants';
import { bloodDropIcon } from '../assets/icons';
import { getToken, setUserSession } from '../utils/auth';
import { postLogin, postRegister } from '../client/auth';
import Loader from './Loader';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [option, setOption] = useState(OPTIONS.SIGN_IN);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [bloodType, setBloodType] = useState(
		Object.values(BLOOD_TYPES)[0].label
	);
	const history = useHistory();

	const handleRestartValues = () => {
		setUsername('');
		setPassword('');
		setName('');
		setSurname('');
		setEmail('');
		setError('');
		setBloodType(Object.values(BLOOD_TYPES)[0].label);
	};

	const handleLogin = async () => {
		setLoading(true);
		try {
			const { data } = await postLogin({ username, password });
			setUserSession({
				token: data.token,
				permissions: data.permissions,
				userID: data.user._id,
			});
			history.push('/home');
		} catch (e) {
			setError(e.response.data.message);
		}
		setLoading(false);
	};

	const handleRegister = async () => {
		setLoading(true);
		try {
			const { data } = await postRegister({
				username,
				password,
				name,
				surname,
				email,
				bloodType: Object.values(BLOOD_TYPES).find(
					({ label }) => label === bloodType
				)?.value,
			});

			setUserSession({
				token: data.token,
				permissions: data.permissions,
				userID: data.user._id,
			});
			history.push('/home');
		} catch (e) {
			setError(e.response.data.message);
		}
		setLoading(false);
	};

	const renderView = () => {
		switch (option) {
			case OPTIONS.SIGN_IN:
				return (
					<Row className='p-5'>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Username'
								className='input-style'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Col>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Password'
								className='input-style'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Col>
						<Col xs={12}>
							<button className='login-button w-100' onClick={handleLogin}>
								LOGIN
							</button>
						</Col>
					</Row>
				);
			case OPTIONS.SIGN_UP:
				return (
					<Row className='p-5'>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Name'
								className='input-style'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Col>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Surname'
								className='input-style'
								value={surname}
								onChange={(e) => setSurname(e.target.value)}
							/>
						</Col>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Username'
								className='input-style'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Col>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Password'
								className='input-style'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Col>
						<Col xs={12} className='mb-3'>
							<Input
								placeholder='Email'
								className='input-style'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
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
						<Col xs={12} className='mt-3'>
							<button className='login-button w-100' onClick={handleRegister}>
								REGISTER
							</button>
						</Col>
					</Row>
				);
			default:
				return null;
		}
	};

	if (getToken()) {
		history.push('/home');
		return null;
	}

	return (
		<div className='d-flex justify-content-center align-items-center w-100'>
			<Card className='login-container'>
				<CardBody className='p-0 flex-column d-flex'>
					<div className='d-flex align-items-center justify-content-center login-header'>
						<Img src={bloodDropIcon} width={24} />
						BLOOD DONATION APP
					</div>
					{error && (
						<div className='login-error-message d-flex justify-content-center'>
							{error}
						</div>
					)}
					<div className='d-flex flex-grow-1 justify-content-center align-items-center'>
						{loading ? <Loader /> : renderView()}
					</div>
					<div>
						<button
							className='w-50 sign-in-button'
							onClick={() => {
								setOption(OPTIONS.SIGN_IN);
								if (option !== OPTIONS.SIGN_IN) handleRestartValues();
							}}
						>
							SIGN IN
						</button>
						<button
							className='w-50 sign-up-button'
							onClick={() => {
								setOption(OPTIONS.SIGN_UP);
								if (option !== OPTIONS.SIGN_UP) handleRestartValues();
							}}
						>
							SIGN UP
						</button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default Login;
