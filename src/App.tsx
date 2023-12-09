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
import ProductsDetails from "./Pages/Products/ProductsDetails";


function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Login");
  const [insCompanyId, setInsCompanyId] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handlePageChange = (page: Page | string) => {
    setCurrentPage(page as Page);
  };

  const getContent = () => {
    switch (currentPage) {
      case "Insurer":
        return<Insurer setCurrentPage={handlePageChange} setInsCompanyId={setInsCompanyId}/>;
      case "Login":
        return<Login setCurrentPage={handlePageChange} setIsLoggedIn={setIsLogged}/>;
      case "Register":
        return<Register setCurrentPage={handlePageChange} setIsLoggedIn={setIsLogged}/>;
      case "Clients":
        return<Clients/>
      case "Policies":
        return<Policies/>
      case "Products":
        return<Products/>
      case "InsurerDetails":
        return<InsurerDetails insCompanyId={insCompanyId} setCurrentPage={handlePageChange}/>
      case "ProductsDetails":
        return<ProductsDetails insCompanyId={insCompanyId} setCurrentPage={handlePageChange}/>
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
                  setCurrentPage={handlePageChange}
          isLoggedIn={isLogged}/>
        </header>
        <div className="content">
          {getContent()}
        </div>
      </div>
  );
}

export default App;
