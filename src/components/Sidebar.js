import React from 'react';
import { Row, Col } from 'reactstrap';
import { Img } from 'react-image';
import { bloodDropIcon } from '../assets/icons';

const Sidebar = () => (
	<div className='d-flex align-items-center sidebar-container justify-content-center'>
		<Row className='w-100'>
			<Col xs={12} className='p-0 d-flex justify-content-center'>
				<Img src={bloodDropIcon} width={54} />
			</Col>
			<Col xs={12} className='p-0 d-flex justify-content-center sidebar-text'>
				BLOOD
			</Col>
			<Col xs={12} className='p-0 d-flex justify-content-center sidebar-text'>
				DONATION
			</Col>
			<Col xs={12} className='p-0 d-flex justify-content-center sidebar-text'>
				APPLICATION
			</Col>
		</Row>
	</div>
);

export default Sidebar;
