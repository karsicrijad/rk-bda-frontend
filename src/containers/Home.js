import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Img } from 'react-image';
import { Col, Row } from 'reactstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getPermissions, getToken } from '../utils/auth';
import { homeImage } from '../assets/images';
import RolesTab from '../components/RolesTab';
import { PERMISSIONS } from '../constants';
import RequestBloodDonationTab from '../components/RequestBloodDonationTab';
import NotificationsTab from '../components/NotificiationsTab';
import CreateAnAppointmentTab from '../components/CreateAnAppointmentTab';
import MyAppointmentsTab from '../components/MyAppointmentsTab';

const Home = () => {
	const history = useHistory();
	const permissions = getPermissions();

	if (!getToken()) {
		history.push('/login');
		return null;
	}

	return (
		<>
			<Sidebar />
			<div className='d-flex flex-grow-1'>
				<div className='w-100 d-flex flex-column'>
					<Navbar />
					<div className='flex-grow-1'>
						<Tabs className='h-100 w-100 flex-column d-flex'>
							<TabList>
								<Tab>HOME</Tab>
								{permissions.includes(PERMISSIONS.ADMIN_READ_ROLES) && (
									<Tab>ROLES</Tab>
								)}
								{permissions.includes(
									PERMISSIONS.ADMIN_CREATE_NOTIFICATION
								) && <Tab>REQUEST BLOOD DONATION</Tab>}
								{permissions.includes(PERMISSIONS.USER_READ_NOTIFICATIONS) && (
									<Tab>NOTIFICATIONS</Tab>
								)}
								{permissions.includes(PERMISSIONS.USER_CREATE_RESERVATION) && (
									<Tab>CREATE AN APPOINTMENT</Tab>
								)}
								{permissions.includes(PERMISSIONS.USER_READ_RESERVATIONS) && (
									<Tab>MY APPOINTMENTS</Tab>
								)}
							</TabList>
							<TabPanel className='w-100'>
								<div className='d-flex justify-content-center align-items-center'>
									<Row>
										<Col
											xs={12}
											className='d-flex justify-content-center align-items-center'
										>
											<Img src={homeImage} width={100} className='mr-5' />
											<span className='home-tab-welcome-message'>Welcome!</span>
										</Col>
										<Col
											xs={12}
											className='d-flex justify-content-center text-center home-tab-welcome-message-subtitle'
										>
											Purpose of this application is Blood Donation.
											<br />
											We are really happy to see You enroll yourself
											<br />
											into this process and possibly save someone's life.
											<br />
											Thank You for using our application. Have a nice day!
										</Col>
									</Row>
								</div>
							</TabPanel>
							{permissions.includes(PERMISSIONS.ADMIN_READ_ROLES) && (
								<TabPanel className='w-100'>
									<RolesTab />
								</TabPanel>
							)}
							{permissions.includes(PERMISSIONS.ADMIN_CREATE_NOTIFICATION) && (
								<TabPanel className='w-100'>
									<RequestBloodDonationTab />
								</TabPanel>
							)}
							{permissions.includes(PERMISSIONS.USER_READ_NOTIFICATIONS) && (
								<TabPanel className='w-100'>
									<NotificationsTab />
								</TabPanel>
							)}
							{permissions.includes(PERMISSIONS.USER_CREATE_RESERVATION) && (
								<TabPanel className='w-100'>
									<CreateAnAppointmentTab />
								</TabPanel>
							)}
							{permissions.includes(PERMISSIONS.USER_READ_RESERVATIONS) && (
								<TabPanel className='w-100'>
									<MyAppointmentsTab />
								</TabPanel>
							)}
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
