// import "./Products.css";
// import React, {useEffect, useState} from "react";

// type Props = {
//     setCurrentPage: (page: string) => void;
//     setPolicyId: (num: number) => void;
// };

// interface InsuranceType {
//     insTypeId: number;
//     insTypeName: string;
// }

// interface InsObjectTypeDto {
//     insObjectTypeId: number;
//     insObjectTypeName: string;
//   }

// interface Companies {
//     insCompanyId: number;
//     insCompanyName: string
//     insCompanyBulstat: string
//     insCompanyAddr: string
//     insCompanyContact: string
//     insCompanyTel: string
// }

// interface DataRowType {
//     insProdCode: number
//     insProdName: string
//     insTypeDto: {
//         insTypeId: number;
//         insTypeName: string;
//     }
//     insProdDeferred: string,
//     insProdPremPerc: number,
//     insProdComissPerc: number,
//     insCompanyName: string
// }

// interface ClientDto {
//     clientId: number;
//     clientType: string;
//     clientEgnBulstat: string;
//     clientFullname: string;
//     email: string;
//     telephone: string;
//     adressText: string;
//     clientNote: string;
// }

// interface InsProductDto {
//     insProdCode: number;
//     insProdName: string;
//     insTypeDto: any;
//     insProdDeferred: string;
//     insProdPremPerc: number;
//     insProdComissPerc: number;
//     insCompanyName: string;
// }

const Policies = () => {
//     //for searching
//     const [policyNo, setPolicyNo] = useState<string>("");
//     const [policyDate, setPolicyDate] = useState<Date>();
//     const [selectedProduct, setSelectedProduct] = useState<string>('');
//     const [selectedClient, setSelectedClient] = useState<string>('');
//     const [selectedObjectType, setSelectedObjectType] = useState<string>('');
//     //for adding new
//     // const [insProdNameNew, setInsProdNameNew] = useState<string>("");
//     // const [insProdDeferredNew, setInsProdDeferredNew] = useState<string>("");
//     // const [selectedInsuranceTypeNew, setSelectedInsuranceTypeNew] = useState<string>('');
//     // const [companiesNew, setCompaniesNew] = useState<Companies[]>([]);
    
//     const [insProdPremPercNew, setInsProdPremPercNew] = useState<number>();
//     const [insProdComissPercNew, setInsProdComissPercNew] = useState<number>();

//     const [policyNoNew, setPolicyNoNew] = useState<string>("");
//     const [policyDateNew, setPolicyDateNew] = useState<Date>();
//     const [policyBeginDateNew, setPolicyBeginDateNew] = useState<Date>();
//     const [policyEndDateNew, setPolicyEndDateNew] = useState<Date>();
//     const [objectDescriptionNew, setObjectDescriptionNew] = useState<string>("");
//     const [policyActiveNew, setPolicyActiveNew] = useState<string>("");
//     const [policySumNew, setPolicySumNew] = useState<number>();
//     const [policyPremiaNew, setPolicyPremiaNew] = useState<number>();
//     const [policyTaxNew, setPolicyTaxNew] = useState<number>();
//     const [policyInsComissNew, setPolicyInsComissNew] = useState<number>();
//     const [policyNoteNew, setPolicyNoteNew] = useState<string>("");
//     const [maturityCountNew, setMaturityCountNew] = useState<number>();

//     //other
//     const [products, setProducts] = useState<InsProductDto[]>([]);
//     const [clients, setClients] = useState<ClientDto[]>([]);
//     const [objectTypes, setObjectTypes] = useState<InsObjectTypeDto[]>([]);
//     const [allData, setAllData] = useState<DataRowType[]>();
//     const [showPopup, setShowPopup] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [errorName, setErrorName] = useState<string | null>(null);
//     const [isDisabled, setIsDisabled] = useState(false);

//     useEffect(() => {
//         fetch('http://localhost:8080/ins-products/get-all')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error fetching data:', error));

//         fetch('http://localhost:8080/clients/get-all')
//             .then(response => response.json())
//             .then(data => setClients(data))
//             .catch(error => console.error('Error fetching data:', error));
        
//         fetch('http://localhost:8080/ins-object-types/get-all')
//             .then(response => response.json())
//             .then(data => setObjectTypes(data))
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     useEffect(() => {
//         if(error){
//             setIsDisabled(true)
//         } else {
//             setIsDisabled(false)
//         }
//     },[error]);

//     useEffect(() => {
//         if(policyNoNew && policyDateNew && policyBeginDateNew && policyEndDateNew && objectDescriptionNew && objectDescriptionNew &&
//             policyActiveNew && policySumNew && policyPremiaNew && policyTaxNew && policyInsComissNew && policyNoteNew && maturityCountNew && 
//             selectedClient && products && selectedObjectType){
//             setIsDisabled(false)
//         } else {
//             setIsDisabled(true)
//         }
//     },[policyNoNew, policyDateNew, policyBeginDateNew, policyEndDateNew, objectDescriptionNew, objectDescriptionNew,
//         policyActiveNew, policySumNew, policyPremiaNew, policyTaxNew, policyInsComissNew, policyNoteNew, maturityCountNew, selectedClient, products, selectedObjectType])

//     const save = async () => {
//         const product = products.find(e => e.insProdCode === parseInt( selectedProduct));
//         const objectType = objectTypes.find(e => e.insObjectTypeId === parseInt( selectedObjectType));
//         const client = clients.find(e => e.clientId === parseInt( selectedClient));
//         const objectTypeDto = {
//             insObjectTypeId: objectType?.insObjectTypeId,
//             insObjectTypeName: objectType?.insObjectTypeName
//         };
//         const clientDto = {
//             clientId: client?.clientId,
//             clientType: client?.clientType,
//             clientEgnBulstat: client?.clientEgnBulstat,
//             clientFullname: client?.clientFullname,
//             email: client?.email,
//             telephone: client?.telephone,
//             adressText: client?.adressText
//         }
//         const productDto = {
//             insProdCode: product?.insProdCode,
//     insProdName: product?.insProdName,
//     insTypeDto: product?.insTypeDto,
//     insProdDeferred: insProdDeferred,
//     insProdPremPerc: insProdPremPerc,
//     insProdComissPerc: insProdComissPerc,
//     insCompanyName: insCompanyName;
//         }
//         try {
//             const response = await fetch('http://localhost:8080/ins-products', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     insProdName: insProdNameNew,
//                     insProdDeferred: insProdDeferredNew,
//                     insTypeDto,
//                     insCompanyName: selectedCompanyNew,
//                     insProdComissPerc: insProdComissPercNew,
//                     insProdPremPerc: insProdPremPercNew
//                 }),
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 props.setInsProdCode(result.insProdCode)
//                 props.setCurrentPage("ProductsDetails");
//             } else {
//                 //product name unique
//             }

//         } catch (error) {
//             console.error('Failed to post data');
//         }
//     }

//     const handleInsProdDefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInsProdDeferredNew(value);

//         // setErrorName(null);
//     };
//     const handleInsProdPremPerc = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInsProdPremPercNew(parseFloat(value));

//         // setErrorName(null);
//     };
//     const handleInsProdComissPerc = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInsProdComissPercNew(parseFloat(value));

//         // setErrorName(null);
//     };

//     const handleInsProdNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInsProdNameNew(value);

//         // if (value.length !== 9 && value.length !== 13) {
//         //     setError('Bulstat must be either 9 or 13 symbols.');
//         // } else {
//         //     setError(null);
//         // }
//     };

//     const addNew = () => {
//         setShowPopup(true);
//     }

//     const close = () => {
//         setShowPopup(false);
//     }

//     const handleOnClickOnTable = (num: number) => {
//         props.setInsProdCode(num);
//         props.setCurrentPage("ProductsDetails");
//     }

//     const handleSearch = () => {
//         const queryParams = new URLSearchParams();

//         if (insProdCode !== '') {
//             queryParams.set('insProdCode', insProdCode);
//         }

//         if (insProdName !== '') {
//             queryParams.set('insProdName', insProdName);
//         }

//         if (insProdDeferred !== '') {
//             queryParams.set('insProdDeferred', insProdDeferred);
//         }

//         if (insProdPremPerc !== '') {
//             queryParams.set('insProdPremPerc', insProdPremPerc);
//         }

//         if (insProdComissPerc !== '') {
//             queryParams.set('insProdComissPerc', insProdComissPerc);
//         }

//         if (selectedInsuranceType !== '') {
//             queryParams.set('insTypeId', selectedInsuranceType);
//         }

//         if (selectedCompany !== '') {
//             queryParams.set('insCompanyName', selectedCompany);
//         }

//         const apiUrl = `http://localhost:8080/ins-products?${queryParams}`;

//         fetch(apiUrl)
//             .then(response => response.json())
//             .then(data => {
//                 setAllData(data)
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });

//         // fetch(`http://localhost:8080/ins-products/ins-company?insCompanyName=${selectedCompany}`)
//         //     .then(response => response.json())
//         //     .then(data => setCompanies(data))
//         //     .catch(error => console.error('Error fetching data:', error));
//     };

//     return (
//         <div className="container">
//             <div className="left-form-container">
//                 <form>
//                     <div className="input-container">
//                         <input value={insProdCode} type="text" name="insProdCode" placeholder="Код на продукт" onChange={(e) => setInsProdCode(e.target.value)}/>
//                     </div>
//                     <div className="input-container">
//                         <input value={insProdName} type="text" name="insProdName" placeholder="Наименование" onChange={(e) => setInsProdName(e.target.value)}/>
//                     </div>
//                     <div className="input-container">
//                         <input value={insProdDeferred} type="text" name="insProdDeferred" placeholder="Разсрочено плащане" onChange={(e) => setInsProdDeferred(e.target.value)}/>
//                     </div>
//                     <div className="input-container">
//                         <input value={insProdPremPerc} type="text" name="insProdPremPerc" placeholder="Застрахователна премия" onChange={(e) => setInsProdPermPerc(e.target.value)}/>
//                     </div>
//                     <div className="input-container">
//                         <input value={insProdComissPerc} type="text" name="insProdComissPerc" placeholder="Комисионна" onChange={(e) => setInsComissPerc(e.target.value)}/>
//                     </div>
//                     <div className="input-container">
//                         <select
//                             name="insuranceType"
//                             value={selectedInsuranceType}
//                             onChange={(e) => setSelectedInsuranceType(e.target.value)}
//                         >
//                             <option value="" disabled>Тип застраховка</option>
//                             {insuranceTypes.map((type) => (
//                                 <option key={type.insTypeId} value={type.insTypeId}>
//                                     {type.insTypeName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="input-container">
//                         <select
//                             name="insuranceType"
//                             value={selectedCompany}
//                             onChange={(e) => setSelectedCompany(e.target.value)}
//                         >
//                             <option value="" disabled>Компания</option>
//                             {allCompanies.map((type) => (
//                                 <option key={type.insCompanyName} value={type.insCompanyName}>
//                                     {type.insCompanyName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="btn-container">
//                         <div className="input-container">
//                             <button type="button" className="submit-btn" onClick={handleSearch}>Търси</button>
//                         </div>
//                         <div className="input-container">
//                             <button type="button" className="submit-btn" onClick={addNew}>Добави нов</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//             <div className="table">
//                 {allData ? (
//                     <table className="table">
//                         <thead className="thead">
//                         <tr className="trHead">
//                             <th>Код на продукт</th>
//                             <th>Наименование</th>
//                             <th>Разсрочено плащане</th>
//                             <th>Застрахователна премия</th>
//                             <th>Комисионна</th>
//                             <th>Тип застраховка</th>
//                         </tr>
//                         </thead>
//                         <tbody className="tbody">
//                         {allData.map((row: DataRowType) => (
//                             <tr
//                                 className="trBody"
//                                 onClick={() => handleOnClickOnTable(row.insProdCode)}
//                                 key={row.insProdCode}
//                             >
//                                 <td>{row.insProdCode}</td>
//                                 <td>{row.insProdName}</td>
//                                 <td>{row.insProdDeferred}</td>
//                                 <td>{row.insProdPremPerc}</td>
//                                 <td>{row.insProdComissPerc}</td>
//                                 <td>{row.insTypeDto.insTypeName}</td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>Потърсете продукт...</p>
//                 )}
//             </div>
//             {showPopup && (
//                 <div className="popup">
//                     <div className="popup-inner">
//                         <form>
//                             <div className="input-container">
//                                 <input type="text" name="insProdName" placeholder="Наименование" onChange={handleInsProdNameChange}/>
//                             </div>
//                             <div className="input-container">
//                                 <input type="text" name="insProdDeferred" placeholder="Разсрочено плащане" onChange={handleInsProdDefChange}/>
//                             </div>
//                             <div className="input-container">
//                                 <input type="text" name="insProdPremPerc" placeholder="Премия" onChange={handleInsProdPremPerc}/>
//                             </div>
//                             <div className="input-container">
//                                 <input type="text" name="insProdComissPerc" placeholder="Комисионна" onChange={handleInsProdComissPerc}/>
//                             </div>
//                             <div className="input-container">
//                                 <select
//                                     name="insuranceType"
//                                     value={selectedInsuranceTypeNew}
//                                     onChange={(e) => setSelectedInsuranceTypeNew(e.target.value)}
//                                 >
//                                     <option value="" disabled>Тип застраховка</option>
//                                     {insuranceTypes.map((type) => (
//                                         <option key={type.insTypeId} value={type.insTypeId}>
//                                             {type.insTypeName}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="input-container">
//                                 <select
//                                     name="insuranceType"
//                                     value={selectedCompanyNew}
//                                     onChange={(e) => setSelectedCompanyNew(e.target.value)}
//                                 >
//                                     <option value="" disabled>Компания</option>
//                                     {allCompanies.map((type) => (
//                                         <option key={type.insCompanyName} value={type.insCompanyName}>
//                                             {type.insCompanyName}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="btn-container">
//                                 <div className="input-container">
//                                     <button type="button" className="submit-btn" onClick={save} disabled={isDisabled}>Запази</button>
//                                 </div>
//                                 <div className="input-container">
//                                     <button type="button" className="submit-btn" onClick={close}>Откажи</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
}

export default Policies;