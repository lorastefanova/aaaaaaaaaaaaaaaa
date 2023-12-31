import React, {useEffect, useState} from 'react';
import './App.css';
import {Page} from "./pages";
import Login from "./Pages/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import Register from "./Pages/Register/Register";
import Clients from "./Pages/Clients/Clients";
//import Policies from "./Pages/Policies/Policies";
import Products from "./Pages/Products/Products";
import Insurer from "./Pages/Zastrahovateli/Insurer";
import InsurerDetails from "./Pages/Zastrahovateli/InsurerDetails";
import ProductsDetails from "./Pages/Products/ProductsDetails";
import Objects from './Pages/Objects/Objects';
import ObjectDetails from './Pages/Objects/ObjectDetails';
import ClientsDetails from './Pages/Clients/ClientsDetails';


function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Login");
  const [insCompanyId, setInsCompanyId] = useState<number>(0);
  const [insProductId, setInsProductId] = useState<number>(0);
  const [insPolicyId, setInsPolicyId] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [insObjectTypeId, setInsObjectTypeId] = useState<number>(0);
  const [clientId, setClientId] = useState<number>(0);
  const [policyId, setPolicyId] = useState<number>(0);

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
        return<Clients setCurrentPage={handlePageChange} setClientId={setClientId}/>
      // case "Policies":
      //   return<Policies setCurrentPage={handlePageChange} setPolicyId={setPolicyId}/>
      //   case "PoliciesDetails":
      //     return<Policies setCurrentPage={handlePageChange} setPolicyId={setPolicyId}/>
      case "Products":
        return<Products setCurrentPage={handlePageChange} setInsProdCode={setInsProductId}/>
      case "InsurerDetails":
        return<InsurerDetails insCompanyId={insCompanyId} setCurrentPage={handlePageChange} setInsProductId={setInsProductId}/>
      case "ProductsDetails":
        return<ProductsDetails insProductId={insProductId} setCurrentPage={handlePageChange} setPolicyId={setInsPolicyId}/>
      case "Objects":
        return<Objects setCurrentPage={handlePageChange} setInsObjectTypeId={setInsObjectTypeId}/>
      case "ObjectDetails":
        return<ObjectDetails insObjectTypeId={insObjectTypeId} setCurrentPage={handlePageChange} />
      case "ClientsDetails":
        return<ClientsDetails setPolicyId={setInsPolicyId} clientId={clientId} setCurrentPage={handlePageChange} />
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
