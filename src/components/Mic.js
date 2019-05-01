import React from 'react';
import Recorder from 'react-mp3-recorder';
import styled from 'styled-components';
import Axios from 'axios';

const Container = styled.div`
	position: fixed;
	left: 90%;
	top: 85%;
`;
const Mic = () => {
	const _onRecordingComplete = async (blob) => {
		try {
			console.log('recording', blob);
			var form_data = new FormData();
			form_data.append('file', blob);
			const res = await Axios.post('http://localhost:5000/rec',form_data)
			console.log(res);
			
		} catch (error) {
			
		}
	};

	const _onRecordingError = err => {
		console.log('recording error', err);
	};
	return (
		<Container>
			<Recorder onRecordingComplete={_onRecordingComplete} onRecordingError={_onRecordingError} />
		</Container>
	);
};

export default Mic;
