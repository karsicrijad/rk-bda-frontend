import React from 'react';
import Spinner from 'react-loader-spinner';

const Loader = () => (
	<div className='py-5 d-flex justify-content-center align-items-center'>
		<Spinner type='Puff' color='#d32f2f' height={100} width={100} />
	</div>
);

export default Loader;
