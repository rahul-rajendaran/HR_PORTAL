import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigations from "./Navigations/Navigations";
import "bootstrap/dist/css/bootstrap.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Contexts from "./Context/Contexts";
import Navbars from "./Components/Navbars/Navbars";

function App() {
  return (
    <>
      <Contexts>
        {/* <Navbars/> */}
        <Navigations />
      </Contexts>
    </>
  );
}

export default App;
