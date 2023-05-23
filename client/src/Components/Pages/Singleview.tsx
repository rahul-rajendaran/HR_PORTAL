import React from "react";
import Navbars from "../Navbars/Navbars";
import "../../Styles/singleview.css";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { get, deleteData, Documentpost } from "../../Api/Apis";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Contexts, { contexts } from "../../Context/Contexts";
import DeleteConfirmation from "../../modal/DeleteConfirmation";
import Loadspinner from "../../spinner/Loadspinner";
import Profiledetailsnav from "../profiledetailsnav/Profiledetailsnav";
import { FaDownload } from "react-icons/fa";
import { downloadDocument } from "../../Api/Apis";

interface IsingleUser {
  firstname: string;
  lastname: string;
  dateofbirth: string;
  gender: string;
  district: string;
  pincode?: number;
  number?: number;
  email: string;
  Id?: any;
  imageurl: string;
}

const Singleview = () => {
  const [documents, SetDocuments] = useState<any>();
  const [file, setFile] = useState<any>();
  //spinner state
  const [spinner, setSpinner] = useState(false);
  // Set up some additional local state
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = () => {
    setDeleteMessage(
      `Are you sure you want to delete ''${singleUser?.firstname}?`
    );
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const [singleUser, SetSingleUser] = useState<IsingleUser>();

  //function to goto home page
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  //To get sigle data of the user
  let { id } = useParams();
  const getFunction = async () => {
    try {
      const singleUserData = await get(`/getSingleUser/${id}`);
      SetSingleUser(singleUserData);
    } catch (error) {
      console.error("Error fetching single user data:", error);
      alert("Error fetching single user data. Please try again later.");
    }
  };
  useEffect(() => {
    setSpinner(() => true);
    const fetchData = async () => {
      try {
        await getFunction();
        setSpinner(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSpinner(false);
      }
    };
    fetchData();
  }, []);
//for deleting
  const handleDelete = async (id: any) => {
    try {
      await deleteData(`/${id}`);
      console.log("data deleted!!");
      navigate("/");
      setDisplayConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  
  let props = {
    firstname: singleUser?.firstname,
    lastname: singleUser?.lastname,
    imageurl: singleUser?.imageurl,
  };
  //for document upload

  let files: any;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    files = e.target.files?.[0];
    if (files) {
      setFile(files);
    }
  };
  const formData = new FormData();
  formData.append("file", file);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await Documentpost(`/addDocument/${id}`, formData);
      console.log("file submitted succesfully");
      getDecument();
      console.log("after getdocument");
      
    } catch (error) {
      console.error("Error submitting document:", error);
      alert("Error submitting data. Please try again later");
    }
  };
  //getting document
  const getDecument = async () => {
    try {
      const document = await get(`/getDecument/${id}`);
      SetDocuments(document);
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  useEffect(() => {
    getDecument();
  }, [id]);

  //download file
  const downloadFile = (ServerRelativeUrl:any) => {
    downloadDocument("/downloadfile", ServerRelativeUrl)
      .then((data) => {
        const blob = new Blob([data]);
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.setAttribute(
          "download",
          ServerRelativeUrl.split("/").pop() || ""
        );
        document.body.appendChild(downloadLink);
        downloadLink.click();
      })
      .catch((error) => {
        alert("Error occurred while downloading: " + error); 
      });
  };
  

  return (
    <>
      <Navbars />
      {spinner ? (
        <Loadspinner />
      ) : (
        <div className="container">
          <Profiledetailsnav {...props} />
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                onClick={toHome}
                className="nav-link "
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Back
              </button>

              <button
                className="nav-link active "
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Profile
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Documents
              </button>
            </div>
          </nav>

          {/* First tab starts */}
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              {/* single view card starts */}

              <div className="single-view-card-center">
                <div className="col-md-6 card-margin ">
                  <div className="card-body tohover-card text-center shadow">
                    <img
                      // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      // src="https://2mxff3.sharepoint.com/{singleUser?.imageurl}"
                      src={`https://2mxff3.sharepoint.com${singleUser?.imageurl}`}
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />
                    <h5 className="my-3">
                      Name:{"  "}
                      {singleUser?.firstname}
                      {"  "}
                      {singleUser?.lastname}
                    </h5>
                    <p className="text-muted mb-1">
                      {" "}
                      Date Of Birth:{"  "}
                      {singleUser?.dateofbirth?.slice(0, 10)}
                    </p>
                    <p className="text-muted mb-1">
                      Gender:{"  "}
                      {singleUser?.gender}
                    </p>
                    <p className="text-muted mb-1">
                      District:{"  "}
                      {singleUser?.district}
                    </p>
                    <p className="text-muted mb-1">
                      Pincode:{"  "}
                      {singleUser?.pincode}
                    </p>
                    <p className="text-muted mb-1">
                      Mobile:{"  "}
                      {singleUser?.number}
                    </p>
                    <p className="text-muted mb-1">
                      Email:{"  "}
                      {singleUser?.email}
                    </p>
                    <div className="d-flex justify-content-center mb-2 gap-2">
                      <button
                        onClick={() => showDeleteModal()}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-success"
                        to={`/update/${singleUser?.Id}`}
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <DeleteConfirmation
                showModal={displayConfirmationModal}
                hideModal={hideConfirmationModal}
                id={id}
                message={deleteMessage}
                confirmModal={handleDelete}
                type={""}
              />
            </div>

            {/* second tab starts */}

            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="container">
                <div className="row">
                  <div className="col-3"></div>

                  <div className="col-6 mt-4">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1>Update Your Document Details</h1>
                    </div>

                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: "black" }}>
                          Upload Document
                        </Form.Label>
                        <Form.Control
                          name="image"
                          type="file"
                          required
                          onChange={handleFileChange}
                          placeholder="Enter your full name"
                        />
                      </Form.Group>

                      <Button
                        style={{ marginBottom: "1rem" }}
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Form>
                    <Table
                      striped
                      bordered
                      hover
                      variant="dark"
                      className="document-table"
                    >
                      <thead>
                        <tr>
                          <th>Uploaded Document</th>
                          <th>Uploaded Date</th>
                          <th>Download</th>
                        </tr>
                      </thead>

                      <tbody>
                        {documents?.map(
                          (e: {
                            Name: string;
                            TimeCreated: string;
                            ServerRelativeUrl: string;
                          }) => (
                            <tr key={e.Name}>
                              <td>{e.Name}</td>
                              <td>
                                {typeof e.TimeCreated === "string"
                                  ? e.TimeCreated?.slice(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")
                                  : ""}
                              </td>
                              <td>
                                <div className="button-row  document-button">
                                  <button
                                    onClick={() => {
                                      downloadFile(e.ServerRelativeUrl);
                                    }}
                                    className="btn btn-primary"
                                  >
                                    <FaDownload />
                                  </button>
                                </div>
                              </td>
                              {/* <td>{e.ServerRelativeUrl}</td> */}
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Singleview;
