import React, { useState } from "react";
import Recorder from "react-mp3-recorder";
import styled from "styled-components";
import Axios from "axios";
import { withRouter } from "react-router";
const Container = styled.div`
  position: fixed;
  left: 90%;
  top: 85%;
`;
const Mic = props => {
  const [loading, setLoading] = useState(false);
  const _onRecordingComplete = async blob => {
    try {
      console.log(props.location.pathname);
      // var csvURL = window.URL.createObjectURL(blob);
      // let tempLink = document.createElement("a");
      // tempLink.href = csvURL;
      // tempLink.setAttribute("download", "filename.mp3");
      // tempLink.click();
      console.log("recording", blob);
      var form_data = new FormData();
      form_data.append("file", blob);
      form_data.append("page", props.location.pathname);
      console.log("formdata", form_data);
      setLoading(true);
      const res = await Axios.post("http://localhost:5000/rec", form_data);
      console.log(res);
      props.getSpeech(res.data);
      setLoading(false);
    } catch (error) {}
  };

  const _onRecordingError = err => {
    console.log("recording error", err);
  };
  return (
    <Container>
      {!loading ? (
        <Recorder
          onRecordingComplete={_onRecordingComplete}
          onRecordingError={_onRecordingError}
        />
      ) : (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </Container>
  );
};

export default withRouter(Mic);
