import React ,{Component} from 'react';
import Header from './Header';
import AddTransaction from './AddTransaction';
import Transactions from './Transactions';
import {firebaseApp} from '../firebase';
import {connect} from 'react-redux';
import '../css/index.css';

let counter = 0;
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTransaction: null
    };
  }

  signOut() {
    firebaseApp.auth().signOut();
  }
  addTransaction() {
    counter++;
    if ((counter % 2) === 1)
      this.setState({addTransaction: <AddTransaction/>});
    else
      this.setState({addTransaction: null});

  }
    getDebit() {
    let total_debit = 0,
      total_credit = 0;
    this.props.userReducer.map(each_value => {
      if (each_value.type === "Given") {
        total_debit += parseInt(each_value.amount, 10);
      }
      if (each_value.type === "Taken") {
        total_credit += parseInt(each_value.amount, 10);
      }
    })
    return ({debit: total_debit, credit: total_credit});
  }

  display_or_not() {
    if (this.getDebit().debit === null || this.getDebit().credit === null) {
      return null;
    } else
      return (
        <div className='debit-credit'>
          <div className='debit'>Total Debit:{this.getDebit().debit}</div>
          <div className='credit'>Total Credit:{this.getDebit().credit}</div>
        </div>
      )
  }

  render() {
    return (
      <div>
        <Header className="header"/>
        <div className="first_row">
          <div className="welcome">
            <strong>
              Welcome: </strong>
            {this.props.emailReducer}
            <button className='btn btn-danger' onClick={this.signOut}>Sign Out</button>
          </div>

        </div>
        <Transactions/> {this.display_or_not()}
        <button className='btn btn-primary second' type='button' onClick={() => this.addTransaction()}>Add Transaction</button>
        <div>{this.state.addTransaction}</div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {userReducer: state.userReducer, emailReducer: state.emailReducer}
}

export default connect(mapStateToProps, null)(MainPage);
