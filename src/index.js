import React  from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers} from 'redux';
import {Provider } from 'react-redux';
import userReducer from './reducers/userReducer';
import emailReducer from './reducers/emailReducer';
import {Router, Route, browserHistory} from 'react-router';
import MainPage from './Components/MainPage';
import {firebaseApp,userInfo} from './firebase';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';


const main_store=createStore(combineReducers({userReducer,emailReducer}));


firebaseApp.auth().onAuthStateChanged(user=>{
	if(user && user.child===null){
		console.log(" A user has signed up");
		browserHistory.push('/mainpage');
		userInfo.child(user.uid).set(user.email);
		main_store.dispatch({
			type:'ADD_EMAIL',
			payload:user.email
		});
		browserHistory.push('/mainpage');
	}
	else if (user){
		console.log('Signed In ');
		main_store.dispatch({
			type:'ADD_EMAIL',
			payload:user.email
		})
		browserHistory.push('/mainpage');
	}
	else{
		console.log('No current User ');
		browserHistory.replace('/');
	}

})

ReactDOM.render(
	
	<Provider store={main_store}>
		<Router history={browserHistory}>
			<Route path='/' component={SignIn}/>
			<Route path='/mainpage' component={MainPage}/>
			<Route path='/signup' component={SignUp}/>
		</Router>
	</Provider>
	,document.getElementById('root')
);
	
