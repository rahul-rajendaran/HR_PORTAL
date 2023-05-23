import React from "react";
import { MDBSpinner, MDBBtn } from "mdb-react-ui-kit";
import "../Styles/loadspinner.css"

const Loadspinner = () => {
  return (
    <>
    <div className="container spinnercenter">

      <MDBBtn disabled className="me-2">
        <MDBSpinner size="sm" role="status" tag="span" />
        <span className="visually-hidden">Loading...</span>
      </MDBBtn>

      <MDBBtn disabled>
        <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
        Loading...
      </MDBBtn>
    </div>
    </>
  );
};

export default Loadspinner;
