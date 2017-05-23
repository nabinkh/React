import React, {Component } from 'react';
import {userInfo,firebaseApp} from '../firebase';
import {connect } from 'react-redux';
import {addData } from '../actions/actions';
import ReactDOM from 'react-dom';
import moment from 'moment';

class Transactions extends Component{

	constructor(props){
		super(props);
		this.state={
			displayDetails:false,
			details:null
		}
	}
	componentDidMount(){
		userInfo.on('value',snap=>{
			let array=[];
			snap.forEach(each_value=>{
				if(each_value.getKey()===firebaseApp.auth().currentUser.uid){
					each_value.forEach(each_data=>{
                        const {id,to,amount,interestRate,deadline,date,type}=each_data.val();
                        array.push({id,to,amount,interestRate,deadline,date,type});
                    });
					
				}
			});

			this.props.AddData(array);
		})
	}


	analyze(){
		if(this.state.displayDetails===true){
			return(<div className='details'>
						<div className='details_row'>
							<strong>Time Remaining Till DeadLine :</strong>{this.state.details.time_deadline}
						</div>
						<div className='details_row'>
							<strong>The Interest till now is :</strong>{this.state.details.interest_now}
						</div>
						<div className='details_row'>
							<strong>Interest in the deadline will be :</strong>{this.state.details.interest_full}
						</div>
						<div className='details_row'>
							<strong>Total (Overall) transaction with </strong>{this.state.details.other_trans.to} <strong>is :</strong>{this.state.details.other_trans.total_money}
						</div> 
					</div>);
		}
		else{
			return null;
		}
	}


	tableRowClicked(transaction){
		let getTimeUptoDeadline=()=>{
			let nabin=moment(transaction.deadline).fromNow();
			return(nabin.replace('in ',''));
		}

		let getInterestTillNow=()=>{
			let difference=Math.abs(new Date()-new Date(transaction.date));
			let seconds=difference/1000;
			let years=seconds/(24*365*60*60);
			let interest=(transaction.amount*years*transaction.interestRate)/100;
			return(Math.round(interest));
		}
		let getOtherTransactions=()=>{
			let total_money=0;
			this.props.userReducer.map(all_transaction=>{
				if(all_transaction.to.toUpperCase()===transaction.to.toUpperCase()){
					if(all_transaction.type==='Given')
						total_money+=parseInt(all_transaction.amount,10);
					else
						total_money=total_money-parseInt(all_transaction.amount,10);
				}
			})
			return({total_money:total_money,to:transaction.to});

		}
		let getInterestInDeadline=()=>{
			let difference=Math.abs(new Date(transaction.deadline)-new Date(transaction.date));
			let seconds=difference/1000;
			let years=seconds/(24*365*60*60);
			let interest=(transaction.amount*years*transaction.interestRate)/100;
			return(Math.round(interest));
		}
		
		let time_deadline=getTimeUptoDeadline();
		let interest_now=getInterestTillNow();
		let interest_full=getInterestInDeadline();
		let other_trans=getOtherTransactions();
		if(this.state.displayDetails===false){
			this.setState({displayDetails:true, 
				details:{id:transaction.id,time_deadline,interest_now,interest_full,other_trans}
			});
		}
		else{
			if(this.state.details.id===transaction.id)
				this.setState({displayDetails:false});
			else
				this.setState({displayDetails:true, 
				details:{id:transaction.id,time_deadline,interest_now,interest_full,other_trans}
			});

		}
		
	}


	render(){
		return(
				<div className='Transactions'>
				<table className='table'>
				<tbody>
					<tr>
						<th>Id:</th>
						<th>To:</th>
						<th>Amount:</th>
						<th>Interest Rate:</th>
						<th>DeadLine:</th>
						<th>Date:</th>
						<th>Type:</th>
						
					</tr>
					{console.log(this.props.userReducer)}
					{this.props.userReducer.map((transaction,index)=>{
						
							return( 
										<tr  id='table_row' key={index} onClick={()=>this.tableRowClicked(transaction)}>
											<td>{transaction.id}</td>
											<td>{transaction.to}</td>
											<td>{transaction.amount} Ruppes</td>
											<td>{transaction.interestRate}</td>
											<td>{transaction.deadline}</td>
											<td>{transaction.date}</td>
											<td>{transaction.type}</td>
										</tr>
									
								);
								
						})
					}
					</tbody>
				</table>
				{this.analyze()}
				 </div>
					
					
			);
	}
}


const mapStateToProps=(state)=>{
		return {
			userReducer:state.userReducer
		};
}


const mapDispatchToProps=(dispatch)=>{
	return{
		AddData:(object)=>{
			dispatch(addData(object))
		}
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Transactions);