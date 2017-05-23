import {ADD_DATA} from '../constants';
let default_state=[];


const userReducer=(state=default_state,action)=>{
	switch(action.type){
		case ADD_DATA:
			//return completely new state using the action.payload value 
			return action.payload;
		default:
			return state;
	}
}

export default userReducer;

