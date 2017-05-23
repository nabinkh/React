import React,{Component } from 'react';
import {userInfo,firebaseApp} from '../firebase';
import {connect } from 'react-redux';



class AddTransaction extends Component{

	constructor(props){
		super(props);
		this.state={
			id:null,
			to:null,
			amount:null,
			interestRate:null,
			deadline:null,
			date:null,
			type:null
		}
	}

	uploadData(){
		console.log(firebaseApp.auth().currentUser);
		this.setState({id:this.props.userReducer.length+1});
		console.log(firebaseApp.auth().currentUser.uid);
		if(this.state.amount!==null)
			userInfo.child(firebaseApp.auth().currentUser.uid).push(this.state);
	}
	
	
	render(){
		
		return(
				<div className='AddTransaction'>
					<div className='form-group'>

						<div className='single_input'>
							<div className='desc'>To:</div>
							<input 
								className='form-control'
								type='name'
								onChange={event=>this.setState({to:event.target.value})}
							/>

						</div>
						<div className='single_input'>
							<div className='desc'>Amount:</div>
							<input
								placeholder="enter the amount"
							 	className='form-control'
							 	type='numbers'
							 	onChange={event=>this.setState({amount:event.target.value})}
							 />
						</div>
						<div className="single_input">
							<div className='desc'>Interest Rate:</div>
							<input 
								className='form-control'
								type="numbers"
								onChange={event=>this.setState({interestRate:event.target.value})}							/>
						</div>
						<div className='single_input'>
							<div className='desc'>Deadline:</div>
							<input className='form-control'
								type="Date"
								onChange={event=>this.setState({deadline:event.target.value})}
							/>
						</div>
						<div className='single_input'>
							<div className='desc'>Date:</div>
							<input className='form-control'
								type='date'
								onChange={event=>this.setState({date:event.target.value})}
							/>
						</div>
						
						<div className='single_input'>
							<div className="radio" onClick={()=>this.setState({type:'Given'})}>
								  <label><input type="radio" name="optradio"/>Given </label>
							</div>
							<div className="radio" onClick={()=>this.setState({type:"Taken"})}>
								 <label><input type="radio" name="optradio"/>Taken </label>
							</div>
								
						</div>
					</div>		
						
					<button
						className='btn btn-success'
						type='button'
						onClick={()=>this.uploadData()}>Enter</button>
					
				</div>
			);
	}
}

const mapStateToProps=(state)=>{
	return{
		userReducer:state.userReducer
	}
}

export default connect(mapStateToProps,null)(AddTransaction);