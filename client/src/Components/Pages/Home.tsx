import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../Styles/home.css";
import Navbars from "../Navbars/Navbars";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import Contexts, { contexts } from "../../Context/Contexts";
import Loadspinner from "../../spinner/Loadspinner";
import Nousermodal from "../../modal/Nousermodal";

interface IusersFullData {
  firstname: string;
  lastname: string;
  dateofbirth: string;
  gender: string;
  district: string;
  pincode?: number;
  number?: number;
  email: string;
  Id?: string;
  imageurl: string;
}
const Home = () => {
  const [spinner, setSpinner] = useState(false);
  const [searchData, setSerachData] = useState<string>("");
  const [userModal, setUsermodal] = useState(false);

  let contextsData = useContext(contexts);
  let usersFullData = contextsData.allData;

  useEffect(() => {
    setSpinner(true);
    const fetchData = async () => {
      try {
        await contextsData.getFunction();
        setSpinner(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSpinner(false);
        alert("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  //setting values according to search.
  const user = usersFullData.filter((data) =>
    data.firstname.toLowerCase().includes(searchData)
  );
  console.log(user);
  const value = user ? user : usersFullData;

  useEffect(() => {
    const checkUserModal = () => {
      try {
        if (user.length === 0 && spinner == false) {
          setUsermodal(true);
        } else {
          setUsermodal(false);
        }
      } catch (error) {
        console.error("Error checking user modal:", error);
      }
    };

    checkUserModal();
  }, [user]);

  const handleClose = () => {
    try {
      console.log("close modal");
      setSerachData("");
      contextsData.getFunction();
      setUsermodal(false);
    } catch (error) {
      console.error("Error occurred during handleClose:", error);
      alert(
        "An error occurred while closing the modal. Please try again later."
      );
    }
  };
  let props = {
    userModal,
    handleClose,
  };
  let totalPerson = usersFullData.length;

  return (
    <>
      <Navbars />
      <Header />
      <Nousermodal {...props} />
      {spinner ? (
        <Loadspinner />
      ) : (
        <div className="container card-first-div">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Form
                className="d-flex"
                style={{ width: "300px", height: "40px" }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSerachData(e.target.value)
                  }
                />
                <Button variant="outline-warning bg-white">Search</Button>
              </Form>
            </div>
            <div className="total">
              Total Number of Persons:{"  "}
              {totalPerson}
            </div>
          </div>
          <div className="row">
            {value.map((userData) => (
              <div key={userData.Id} className="col-md-3 card-margin ">
                <div className="card-body tohover-card text-center shadow">
                  <img
                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    src={`https://2mxff3.sharepoint.com${userData?.imageurl}`}
                    alt="avatar"
                    className="rounded-circle  profile-image"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">
                    <span className="card-data">Name:</span>
                    {"  "}
                    {userData.firstname}
                    {"  "}
                    {userData.lastname}
                  </h5>
                  <p className="text-muted card-data mb-4">
                    <span className="card-data">Mobile:</span>
                    {"  "}
                    {userData.number}
                  </p>
                  <p className="text-muted mb-4">
                    <span className="card-data">Email:</span>
                    {"  "}
                    {userData.email}
                  </p>
                  <div className="d-flex justify-content-center mb-2 gap-2">
                    <Link
                      className="btn btn-success"
                      to={`singleview/${userData.Id}`}
                    >
                      View Full Data
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
