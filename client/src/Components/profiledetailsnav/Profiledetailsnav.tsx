import React from 'react';
import Contexts, { contexts } from "../../Context/Contexts";
import { useContext } from 'react';
type ProfiledetailsnavProps = {
    firstname: string |undefined
    lastname: string |undefined
    imageurl:string|undefined
}

const Profiledetailsnav = ({ firstname,lastname,imageurl }: ProfiledetailsnavProps) => {

  let contextsData = useContext(contexts);
  let usersFullData = contextsData.allData;
  console.log(usersFullData);
  
  return (
    <>
      <ul className="navbar-nav flex-row">
      <li className="nav-item me-3 me-lg-1">
        <a className="nav-link d-sm-flex align-items-sm-center" href="">
          <img
            // src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            src={`https://2mxff3.sharepoint.com${imageurl}`}
            className="rounded-circle"
            height="68px"
            width="68px"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
          <strong className="d-none d-sm-block ms-1">{firstname}{" "}{lastname}</strong>
        </a>
      </li>
      </ul>
    </>
  );
};

export default Profiledetailsnav;
