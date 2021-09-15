import React from 'react';
import {
	Row,
	Col,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Settings } from 'react-feather';
import { getPermissions, removeUserSession } from '../utils/auth';
import { PERMISSIONS } from '../constants';

const Navbar = () => {
	const history = useHistory();
	const permissions = getPermissions();

	return (
		<div className='navbar-container w-100'>
			<Row className='w-100 h-100 m-0'>
				<Col
					xs={12}
					className='d-flex justify-content-end align-items-center navbar-settings'
				>
					<UncontrolledDropdown>
						<DropdownToggle className='navbar-dropdown'>
							<Settings
								size={40}
								className='cursor-pointer'
								color='#000000'
								strokeWidth={1}
							/>
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem onClick={() => history.push('/home')}>
								Home
							</DropdownItem>
							{permissions.includes(PERMISSIONS.USER_EDIT_PROFILE) && (
								<DropdownItem onClick={() => history.push('/my-profile')}>
									My profile
								</DropdownItem>
							)}
							<DropdownItem
								className='navbar-sign-out'
								onClick={() => {
									removeUserSession();
									history.push('/login');
								}}
							>
								Sign out
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Col>
			</Row>
		</div>
	);
};

export default Navbar;
