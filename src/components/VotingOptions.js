import React, {
	useContext,
} from 'react';
import {
	UserContext
} from '../context/UserContext';


export const VotingOptions = ({socket}) => {
	const { userObj} = useContext(UserContext);

	const selectVotingRole = role => {
		socket.emit('voting role', {...userObj, ...{votingRole: role}})
	}

	return (
	<div>
		<div onClick={() => selectVotingRole(false)} style={{border: '1px solid black', width: '100px', height: '100px', backgroundColor: false ? 'blue' : 'white'}}>Spectator</div>
		<div onClick={() => selectVotingRole(true)} style={{border: '1px solid black', width: '100px', height: '100px',  backgroundColor: true ? 'blue' : 'white'}}>Voter</div>
	</div>)
}