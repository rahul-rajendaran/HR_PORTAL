import React, { ChangeEvent, useContext } from "react";
import Form from "react-bootstrap/Form";
import Navbars from "../Navbars/Navbars";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, put } from "../../Api/Apis";
import {
  MDBBtn,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import "../../Styles/update.css";
import "../../Styles/profiledetailsnav.css";
import Loadspinner from "../../spinner/Loadspinner";
import Profiledetailsnav from "../profiledetailsnav/Profiledetailsnav";
import { Documentpost } from "../../Api/Apis";
import Updatetoast from "../../toast/Updatetoast";
import { contexts } from "../../Context/Contexts";
//interface setup
interface IUpdateUser {
  firstname?: string;
  lastname?: string;
  dateofbirth?: string;
  gender?: string;
  district?: string;
  pincode?: number;
  number?: number;
  email?: string;
  Id?: string;
  imageurl:string
  
}

const Update = () => {
  const [showToast, setShowToast] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // console.log(image);

  let contexdata = useContext(contexts);
  let places = contexdata.allPlaces;


  //setting update user data
  const [toUpdateData, setToUpdateData] = useState<IUpdateUser>();
  const [image, setImage] = useState<any>("");

  const navigate = useNavigate();

  //getting id from useparams
  let { id } = useParams();

  const getFunction = async () => {
    const singleUserData = get(`/getSingleUser/${id}`);
    setToUpdateData(await singleUserData);
  };

  useEffect(() => {
    setSpinner(() => true);
    const fetchData = async () => {
      await getFunction();
      setSpinner(false);
    };
    fetchData();
  }, [id]);
  //Updating person data functionalities

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setToUpdateData((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await put(`/${id}`, toUpdateData);
      setShowToast(true);
      getFunction();
    } catch (error) {
      // Handle any errors that may occur
    }
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  const formData = new FormData();
  formData.append("image", image);
  const handleFileSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await Documentpost(`/addImage/${id}`, formData);
      setShowToast(true);
      getFunction();
    } catch (error) {
      console.error("Error submitting document:", error);
    }
  };

  let props = {
    firstname: toUpdateData?.firstname,
    lastname: toUpdateData?.lastname,
    imageurl:toUpdateData?.imageurl
  };
const cancel=()=>{
navigate(`/singleview/${id}`)
}
  return (
    <>
      <Navbars />
      {spinner ? (
        <Loadspinner />
      ) : (
        <div className="row">
          <div className="col-2 profilenav">
            <Profiledetailsnav {...props} />
          </div>
          <div className="col-7">
            <MDBCardBody className="text-black d-flex flex-column justify-content-center">
              <h3 className="mb-5 text-uppercase fw-bold">
                Update User Details.
              </h3>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    size="lg"
                    id="form1"
                    type="text"
                    name="firstname"
                    value={toUpdateData?.firstname}
                    // value="10-12-1999"
                    onChange={handleChange}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    size="lg"
                    id="form2"
                    name="lastname"
                    type="text"
                    value={toUpdateData?.lastname}
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Date of Birth"
                size="lg"
                id="form3"
                type="date"
                name="dateofbirth"
                value={toUpdateData?.dateofbirth?.slice(0, 10)}
                // value="10-12-1999"
                onChange={handleChange}
              />

              <div className="d-md-flex ustify-content-start align-items-center mb-4">
                <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                <MDBRadio
                  name="gender"
                  id="inlineRadio1"
                  value="Female"
                  label="Female"
                  inline
                  checked={toUpdateData?.gender == "Female"}
                  onChange={handleChange}
                />
                <MDBRadio
                  name="gender"
                  id="inlineRadio2"
                  value="Male"
                  label="Male"
                  inline
                  checked={toUpdateData?.gender == "Male"}
                  onChange={handleChange}
                />
                <MDBRadio
                  name="gender"
                  id="inlineRadio3"
                  value="Other"
                  label="Other"
                  inline
                  checked={toUpdateData?.gender == "Other"}
                  onChange={handleChange}
                />
              </div>

              <MDBRow>
                <MDBCol md="6">
                  <Form.Select
                    size="lg"
                    style={{ marginBottom: "20px" }}
                    value={toUpdateData?.district}
                    name="district"
                    onChange={handleChange}
                  >
                    <option value="">District</option>
                    {places.map((place) => (
                      <option key={place.id} value={place.place}>
                        {place.place}
                      </option>
                    ))}
                  </Form.Select>
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Pincode"
                size="lg"
                id="form4"
                name="pincode"
                type="text"
                value={toUpdateData?.pincode}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Mobile"
                size="lg"
                id="form5"
                name="number"
                type="number"
                value={toUpdateData?.number}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email ID"
                size="lg"
                id="form6"
                name="email"
                type="text"
                value={toUpdateData?.email}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-end pt-3">
                <MDBBtn color="light" size="lg"
                onClick={cancel}>
                  Cancel
                </MDBBtn>
                <MDBBtn
                  onClick={handleSubmit}
                  className="ms-2"
                  color="warning"
                  size="lg"
                >
                  Submit form
                </MDBBtn>
              </div>
              {showToast && (
                <Updatetoast
                  message="Updated successfully!!!"
                  onClose={() => setShowToast(false)}
                />
              )}
            </MDBCardBody>
          </div>
          <div className="col-5">
            <div className="frame">
              <div className="center">
                  <h4>Upload Your Image </h4>
                <div className="title">
                </div>

                <div className="dropzone">
                  <img
                    src="http://100dayscss.com/codepen/upload.svg"
                    className="upload-icon"
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="upload-input"
                  />
                  <MDBBtn
                    onClick={handleFileSubmit}
                    className="ms-2"
                    color="warning"
                    size="lg"
                  >
                    Upload
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
