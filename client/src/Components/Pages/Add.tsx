import React from "react";
import Navbars from "../Navbars/Navbars";
import Form from "react-bootstrap/Form";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  // MDBSelect
} from "mdb-react-ui-kit";

import { useState } from "react";
import { post } from "../../Api/Apis";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { contexts } from "../../Context/Contexts";
interface Iformdata {
  firstname: string;
  lastname: string;
  dateofbirth: string;
  gender: string;
  district: string;
  pincode?: number;
  number?: number;
  email: string;
}

const Add = () => {
  const [firstname, Setfirstname] = useState<string>("");
  const [lastname, Setlastname] = useState<string>("");
  const [dateofbirth, Setdateofbirth] = useState<string>("");
  const [gender, Setgender] = useState<string>("");
  const [district, Setdistrict] = useState<string>("");
  const [pincode, Setpincode] = useState<number>();
  const [number, Setnumber] = useState<number>();
  const [email, Setemail] = useState<string>("");

  let contexdata = useContext(contexts);
  let places = contexdata.allPlaces

  //for navigate
  let navigate = useNavigate();

  let FormData: Iformdata = {
    firstname: firstname,
    lastname: lastname,
    dateofbirth: dateofbirth,
    gender: gender,
    district: district,
    pincode: pincode,
    number: number,
    email: email,
  };
//submitting data from form.
  const submitData = async (e: any) => {
    e.preventDefault();
    try {
    let responseData = await post("/addUserData", FormData);
    console.log("Data submitted successfully");
    console.log(responseData.data.Id);
    navigate(`/singleview/${responseData.data.Id}`);
    } catch (error) {
    console.error("Error submitting data:", error);
    alert("Error submitting data. Please try again later.");
    }
    };
  
  return (
    <>
      <Navbars />
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6" style={{ marginTop: "30px" }}>
          <MDBContainer fluid className="bg-white">
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow className="g-0">
                    <MDBCol md="6" className="d-none d-md-block">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        alt="Sample photo"
                        className="rounded-start"
                        fluid
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                        <h3 className="mb-5 text-uppercase fw-bold">
                          User Registration Form.
                        </h3>

                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="First Name"
                              size="lg"
                              id="form1"
                              type="text"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => Setfirstname(e.target.value)}
                            />
                          </MDBCol>

                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Last Name"
                              size="lg"
                              id="form2"
                              type="text"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => Setlastname(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBInput
                          wrapperClass="mb-4"
                          label="Date of Birth"
                          size="lg"
                          id="form3"
                          type="date"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            Setdateofbirth(e.target.value)
                          }
                        />

                        <div className="d-md-flex ustify-content-start align-items-center mb-4">
                          <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                          <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio1"
                            value="Female"
                            label="Female"
                            inline
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => Setgender(e.target.value)}
                          />
                          <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio2"
                            value="Male"
                            label="Male"
                            inline
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => Setgender(e.target.value)}
                          />
                          <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio3"
                            value="Other"
                            label="Other"
                            inline
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => Setgender(e.target.value)}
                          />
                        </div>
                        <MDBRow>
                          <MDBCol md="6">
                            <Form.Select
                              size="lg"
                              style={{ marginBottom: "20px" }}
                              onChange={(e: any) => Setdistrict(e.target.value)}
                            >
                              <option> District</option>
                              {places?.map((place:any) => (
                                <option key={place?.id} value={place.place}>{place?.place}</option>
                              ))}
                            </Form.Select>
                          </MDBCol>
                        </MDBRow>


                        <MDBInput
                          wrapperClass="mb-4"
                          label="Pincode"
                          size="lg"
                          id="form4"
                          type="text"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            Setpincode(Number(e.target.value))
                          }
                        />
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Mobile"
                          size="lg"
                          id="form5"
                          type="number"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            Setnumber(Number(e.target.value))
                          }
                        />
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Email ID"
                          size="lg"
                          id="form6"
                          type="text"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            Setemail(e.target.value)
                          }
                        />

                        <div className="d-flex justify-content-end pt-3">
                          <MDBBtn color="light" size="lg">
                            Reset all
                          </MDBBtn>
                          <MDBBtn
                            onClick={submitData}
                            className="ms-2"
                            color="warning"
                            size="lg"
                          >
                            Submit form
                          </MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
};

export default Add;
