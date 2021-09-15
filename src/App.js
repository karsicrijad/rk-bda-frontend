import React from 'react';
import './assets/scss/app.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col } from 'reactstrap';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Home from './containers/Home';
import MyProfile from './containers/MyProfile';
import configureStore from './redux/configureStore';

const App = () => (
	<Provider store={configureStore()}>
		<Container className='h-100 root-container'>
			<Row className='h-100 p-0'>
				<Col xs={12} className='h-100 d-flex p-0'>
					<BrowserRouter history={createBrowserHistory()}>
						<Switch>
							<Route path='/login' exact>
								<Login />
							</Route>
							<Route path='/home' exact>
								<Home />
							</Route>
							<Route path='/my-profile' exact>
								<MyProfile />
							</Route>
							<Redirect to='/login' exact />
						</Switch>
					</BrowserRouter>
				</Col>
			</Row>
		</Container>
	</Provider>
);

export default App;
