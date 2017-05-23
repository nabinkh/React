import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import Header from './Header';
import {Link} from 'react-router';



class SignIn extends Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			error:''
		}
		console.log('props in sign in component',this.props);
	}

	buttonClicked(){
		console.log("button clicked called ",this.state);
		firebaseApp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
			.catch(error=>this.setState({error:error.message}));
		console.log('error message ',this.state.error);
	}
	render(){
		return(
			<div>
					<Header className="header"/>
					<div className='FirstUser'>
						<h2> Sign In: </h2>
						<div className='form-group'>
							<h4>Email:</h4>
							<input 
								type='email'
								className='form-control'
								placeholder='enter your Email'
								onChange={(event)=> this.setState({email:event.target.value})}/>
							<h4>Password:</h4>
							<input 
								type='Password'
								className='form-control'
								placeholder=' password'
								onChange={(event)=> this.setState({password:event.target.value})}
								onKeyPress={(event)=>{
									if(event.key==='Enter')
										this.buttonClicked()
								}}/>
							<div className="error_message"><strong>{this.state.error}</strong></div>
						</div>

						<button 

						className='btn btn-primary first'
						type='button'
						onClick={()=>this.buttonClicked()}>ENTER</button>
						
					</div>
					<div className='link'>
						<Link to='/signup'>Or Sign Up</Link>
					</div>
					
				</div>
			);
	}
}

export default SignIn;