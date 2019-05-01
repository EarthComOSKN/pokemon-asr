import React from 'react';
import Recorder from 'react-mp3-recorder';
import styled from 'styled-components';

const Container = styled.div`
	position: fixed;
	left: 90%;
	top: 85%;
`;
const Mic = () => {
	const _onRecordingComplete = blob => {
		console.log('recording', blob);
		var csvURL = window.URL.createObjectURL(blob);
		var tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', 'test.mp3');
		tempLink.click();
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
