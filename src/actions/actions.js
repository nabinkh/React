import {ADD_DATA} from '../constants';


export const addData=(object)=>{
	let action={};
	action={
		type:ADD_DATA,
		payload:object
	}
	return action;
}
