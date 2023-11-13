import React, {useEffect, useState} from 'react';
import './App.css';
import {Page} from "./pages";
import Login from "./Pages/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import Register from "./Pages/Register/Register";
import Clients from "./Pages/Clients/Clients";
import Policies from "./Pages/Policies/Policies";
import Products from "./Pages/Products/Products";
import Insurer from "./Pages/Zastrahovateli/Insurer";
import InsurerDetails from "./Pages/Zastrahovateli/InsurerDetails";


function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Login");
  const [number, setNumber] = useState<number>(0);

  const handlePageChange = (page: Page | string) => {
    setCurrentPage(page as Page);
  };

  const getContent = () => {
    switch (currentPage) {
      case "Insurer":
        return<Insurer setCurrentPage={handlePageChange} setNumber={setNumber}/>;
      case "Login":
        return<Login/>;
      case "Register":
        return<Register/>;
      case "Clients":
        return<Clients/>
      case "Policies":
        return<Policies/>
      case "Products":
        return<Products/>
      case "InsurerDetails":
        return<InsurerDetails/>
    }
  };

  useEffect(() => {
    document.body.style.background = "#e5efff";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <NavBar currentPage={currentPage}
                  setCurrentPage={handlePageChange}/>
        </header>
        <div className="content">
          {getContent()}
        </div>
      </div>
  );
}

export default App;
