import React, {useEffect, useState} from "react";

type Props = {
    clientId: number;
    setPolicyId: (num: number) => void;
    setCurrentPage: (page: string) => void;
};

interface InsuranceType {
    insTypeId: number;
    insTypeName: string;
}

interface Companies {
    insCompanyId: number;
    insCompanyName: string
    insCompanyBulstat: string
    insCompanyAddr: string
    insCompanyContact: string
    insCompanyTel: string
}

interface DataRowType {
    policyId:number
    policyNo:string
    policyDate: Date
    policyBeginDate:Date
    policyEndDate:Date
    objectDescription:string
    policyActive:string
    policySum:number
    policyPremia:number
    policyTax:number
    policyInsComiss:number
    policyNote:string
    maturityCount:number
}

interface InsObjectTypeDto {
    insObjectTypeId: number;
    insObjectTypeName: string;
  }

interface InsProductDto {
    insProdCode: number;
    insProdName: string;
    insTypeDto: any;
    insProdDeferred: string;
    insProdPremPerc: number;
    insProdComissPerc: number;
    insCompanyName: string;
}

interface ClientDto {
    clientId: number;
    clientType: string;
    clientEgnBulstat: string;
    clientFullname: string;
    email: string;
    telephone: string;
    adressText: string;
    clientNote: string;
}

const ClientsDetails = (props: Props) => {
    const [policyNo, setPolicyNo] = useState<string>("");
    const [policyDate, setPolicyDate] = useState<Date>();
    const [policyBeginDate, setPolicyBeginDate] = useState<Date>();
    const [policyEndDate, setPolicyEndDate] = useState<Date>();
    const [objectDescription, setObjectDescription] = useState<string>("");
    const [policyActive, setPolicyActive] = useState<string>("");
    const [policySum, setPolicySum] = useState<number>();
    const [policyPremia, setPolicyPremia] = useState<number>();
    const [policyTax, setPolicyTax] = useState<number>();
    const [policyInsComiss, setPolicyInsComiss] = useState<number>();
    const [policyNote, setPolicyNote] = useState<string>("");
    const [maturityCount, setMaturityCount] = useState<number>();

    const [insObjectTypeDto, setInsObjectTypeDto] = useState<InsObjectTypeDto>();
    const [insProductDto, setInsProductDto] = useState<InsProductDto>();
    const [clientDto, setClientDto] = useState<ClientDto>();

    const [clientType, setClientType] = useState<string>("");
    const [clientEgnBulstat, setClientEgnBulstat] = useState<string>("");
    const [clientFullname, setClientFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [adressText, setAdressText] = useState<string>('');

    const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [allCompanies, setAllCompanies] = useState<Companies[]>([]);
    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);

    const [allData, setAllData] = useState<DataRowType[]>();
    const [showPopup, setShowPopup] = useState(false);

    const [isDisableButton, setIsDisabledButton] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [change, setChange] = useState<number>(0);

    const [objectTypes, setObjectTypes] = useState<InsObjectTypeDto[]>([]);
    const [selectedObjectType, setSelectedObjectType] = useState<string>('');

    const [products, setProducts] = useState<InsProductDto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const [clients, setClients] = useState<ClientDto>();
  //  const [selectedClient, setSelectedClient] = useState<string>('');

    const [errorName, setErrorName] = useState<string | null>(null);


    useEffect(() => {
        fetch('http://localhost:8080/nomenclature/ins-types')
            .then(response => response.json())
            .then(data => setInsuranceTypes(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost:8080/ins-companies/get-all')
            .then(response => response.json())
            .then(data => setAllCompanies(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost:8080/ins-object-types')
            .then(response => response.json())
            .then(data => setObjectTypes(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost:8080/ins-products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));

        // fetch('http://localhost:8080/clients')
        //     .then(response => response.json())
        //     .then(data => setClients(data))
        //     .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if(policyNo && policyDate && policyBeginDate && policyEndDate && objectDescription && objectDescription &&
            policyActive && policySum && policyPremia && policyTax && policyInsComiss && policyNote && maturityCount && 
            selectedProduct && clients && selectedObjectType){
            setIsDisabledButton(false)
        } else {
            setIsDisabledButton(true)
        }
    },[policyNo, policyDate, policyBeginDate, policyEndDate, objectDescription, objectDescription,
        policyActive, policySum, policyPremia, policyTax, policyInsComiss, policyNote, maturityCount, selectedProduct, clients, selectedObjectType])

        const handleClientType = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value && value == "Физическо лице") {
                setClientType("INDIVIDUAL");
            } else if (value && value == "Юридическо лице") {
                setClientType("CORPORATE");
            }
            // setErrorName(null);
        };
        const handleClientEgnBulstat = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setClientEgnBulstat(value);
            // setErrorName(null);
        };
        const handleClientFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setClientFullname(value);
    
            // setErrorName(null);
        };
    
        const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setEmail(value);
    
            // if (value.length !== 9 && value.length !== 13) {
            //     setError('Bulstat must be either 9 or 13 symbols.');
            // } else {
            //     setError(null);
            // }
        };
        const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setTelephone(value);
    
            // if (value.length !== 9 && value.length !== 13) {
            //     setError('Bulstat must be either 9 or 13 symbols.');
            // } else {
            //     setError(null);
            // }
        };
        const handleAdressText = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setAdressText(value);
    
            // if (value.length !== 9 && value.length !== 13) {
            //     setError('Bulstat must be either 9 or 13 symbols.');
            // } else {
            //     setError(null);
            // }
        };

    const hanglePolicyNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyNo(value);

        // setErrorName(null);
    };

    const handlePolicyDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyDate(new Date(value));
        // setErrorName(null);
    };

    const handlepolicyBeginDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyBeginDate(new Date(value));

        // setErrorName(null);
    };

    const handlepolicyEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyEndDate(new Date(value));

        // setErrorName(null);
    };

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setObjectDescription(value);

        // setErrorName(null);
    };

    const handlePolicyActive = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyActive(value);

        // setErrorName(null);
    };

    const handlePolicySum = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicySum(parseInt(value));

        // setErrorName(null);
    };

    const handlePolicyPremia = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyPremia(parseInt(value));

        // setErrorName(null);
    };

    const handlePolicyTax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyTax(parseInt(value));

        // setErrorName(null);
    };


    const handlePolicyInsComiss = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyInsComiss(parseInt(value));

        // setErrorName(null);
    };

    const handlePolicyNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPolicyNote(value);

        // setErrorName(null);
    };

    const handleMaturityCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaturityCount(parseInt(value));

        // setErrorName(null);
    };

    const save = async () => {

        try {
            const response = await fetch('http://localhost:8080/clients', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: props.clientId,
                    clientType,
                    clientEgnBulstat,
                    clientFullname,
                    email,
                    telephone,
                    adressText,
                }),
            });

            if (response.ok) {
                setIsDisabled(true);
                setErrorName(null)
            } else {
                setErrorName('Product name must be unique.');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    const close = () => {
        setShowPopup(false)
        setPolicyNo("")
        setPolicyDate(undefined)
        setPolicyBeginDate(undefined)
        setPolicyEndDate(undefined)
        setObjectDescription("")
        setPolicyActive("")
        setPolicySum(undefined)
        setPolicyPremia(undefined)
        setPolicyTax(undefined)
        setPolicyInsComiss(undefined)
        setPolicyNote("")
        setMaturityCount(undefined)
        //setSelectedClient("")
        setSelectedProduct("")
        setSelectedObjectType("")
    };

    const edit = () => {
        setIsDisabled(false);
    }

    const addPolicy = () => {
        setShowPopup(true);
    };

    const savePolicy = async () => {
     //   const client = clients.find(e => e.clientId === parseInt( selectedClient));
        const product = products.find(e => e.insProdCode === parseInt(selectedProduct));
        const objectType = objectTypes.find(e => e.insObjectTypeId === parseInt(selectedObjectType));

        try {
            const response = await fetch('http://localhost:8080/policies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    policyNo,
                    policyDate,
                    policyBeginDate,
                    policyEndDate,
                    objectDescription,
                    policyActive,
                    policySum,
                    policyPremia,
                    policyTax,
                    policyInsComiss,
                    policyNote,
                    maturityCount,
                    clientDto: clients,
                    insProductDto: product,
                    insObjectTypeDto: objectType
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setChange(change + 1)
                close()
            } else {

            }
        } catch (error) {
            console.error('Failed to post data');
        }
    }

    // useEffect(() => {
    //     fetch(`http://localhost:8080/ins-products/ins-company?insCompanyId=${props.insProductId}`, )
    //         .then(response => response.json())
    //         .then(data => {
    //             setAllData(data)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // },[change])
    const showClientType = (clientType: string) => {
        if (clientType && clientType == "INDIVIDUAL") {
            clientType = "Физическо лице";
        } else if (clientType && clientType == "CORPORATE") {
            clientType = "Юридическо лице";
        }
        return clientType;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/clients/${props.clientId}`);

                if (response.ok) {
                    const result = await response.json();
                    setClientType(showClientType(result.clientType));
                    setClientEgnBulstat(result.clientEgnBulstat);
                    setClientFullname(result.clientFullname);
                    setEmail(result.email);
                    setTelephone(result.telephone);
                    setAdressText(result.adressText);
                    setClients(result);
                } else {
                    console.error(`Error: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };

        fetchData();

    }, []);
    useEffect(() => {
        console.log(products)
    },[products])

    const handleOnClickOnTable = (num: number) => {
        props.setPolicyId(num);
        props.setCurrentPage("PolicyDetails"); // nqma go
    }

    useEffect(() => {
        fetch(`http://localhost:8080/policies/client?clientId=${props.clientId}`, )
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAllData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[change])

    return (
        <div className="container">
            <div className="left-form-container">
            <form>
                <div className="input-container">
                        <input value={props.clientId} type="text" name="clientId" placeholder="Номер на клиент" disabled={true}/>
                    </div>
                            <div className="input-container">
                                <input value={clientType} type="text" name="clientType" placeholder="Тип на клиента" onChange={handleClientType} disabled={isDisabled}/>
                            </div>
                            <div className="input-container">
                                <input value={clientEgnBulstat} type="text" name="clientEgnBulstat" placeholder="Егн или булстат" onChange={handleClientEgnBulstat} disabled={isDisabled}/>
                            </div>
                            <div className="input-container">
                                <input value={clientFullname} type="text" name="clientFullname" placeholder="Име" onChange={handleClientFullname} disabled={isDisabled}/>
                            </div>
                            <div className="input-container">
                                <input value={email} type="text" name="email" placeholder="Имейл" onChange={handleEmail} disabled={isDisabled}/>
                            </div>
                            <div className="input-container">
                                <input value={telephone} type="text" name="telephone" placeholder="Телефон" onChange={handleTelephone} disabled={isDisabled}/>
                            </div>
                            <div className="input-container">
                                <input value={adressText} type="text" name="adressText" placeholder="Адрес" onChange={handleAdressText} disabled={isDisabled}/>
                            </div>
                        </form>
                    <div className="btn-container">
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={save} >Запази</button>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={edit}>Редактирай</button>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={addPolicy}>Нова полица</button>
                        </div>
                    </div>
            </div>
            <div className="table">
                {allData ? (
                    <table className="table">
                        <thead className="thead">
                        <tr className="trHead">
                            <th>Номер на полица</th>
                            <th>Дата на сключване</th>
                            <th>Начална дата</th>
                            <th>Крайна дата</th>
                            <th>Описание</th>
                            <th>Активна</th>
                            <th>Сума на полица</th>
                            <th>Премия</th>
                            <th>Такса</th>
                            <th>Комисионна</th>
                            <th>Бележка</th>
                            <th>Брой вноски</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">
                        {allData.map((row: DataRowType) => (
                            <tr
                                className="trBody"
                                onClick={() => handleOnClickOnTable(row.policyId)}
                                key={row.policyId}
                            >
                                <td>{row.policyNo}</td>
                                <td>{row.policyDate.toString()}</td>
                                <td>{row.policyBeginDate.toString()}</td>
                                <td>{row.policyEndDate.toString()}</td>
                                <td>{row.objectDescription}</td>
                                <td>{row.policyActive}</td>
                                <td>{row.policySum}</td>
                                <td>{row.policyPremia}</td>
                                <td>{row.policyTax}</td>
                                <td>{row.policyInsComiss}</td>
                                <td>{row.policyNote}</td>
                                <td>{row.maturityCount}</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Няма полици</p>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <form>
                            <div className="input-container">
                                <input value={policyNo} type="text" name="policyNo" placeholder="Номер на полица" onChange={hanglePolicyNoChange}/>
                            </div>
                            <div className="input-container">
                                <input type="date" name="policyDate" placeholder="Дата на сключване" onChange={handlePolicyDateChange}/>
                            </div>
                            <div className="input-container">
                                <input type="date" name="policyBeginDate" placeholder="Начална дата" onChange={handlepolicyBeginDate}/>
                            </div>
                            <div className="input-container">
                                <input type="date" name="policyEndDate" placeholder="Крайна дата" onChange={handlepolicyEndDate}/>
                            </div>
                            <div className="input-container">
                                <input value={objectDescription} type="text" name="objectDescription" placeholder="Описание" onChange={handleDescription}/>
                            </div>
                            <div className="input-container">
                                <input value={policyActive} type="text" name="policyActive" placeholder="Активна" onChange={handlePolicyActive}/>
                            </div>
                            <div className="input-container">
                                <input value={policySum} type="number" name="policySum" placeholder="Сума на полица" onChange={handlePolicySum}/>
                            </div>
                            <div className="input-container">
                                <input value={policyPremia} type="number" name="policyPremia" placeholder="Премия" onChange={handlePolicyPremia}/>
                            </div>
                            <div className="input-container">
                                <input value={policyTax} type="number" name="policyTax" placeholder="Такса" onChange={handlePolicyTax}/>
                            </div>
                            <div className="input-container">
                                <input value={policyInsComiss} type="number" name="policyInsComiss" placeholder="Комисионна" onChange={handlePolicyInsComiss}/>
                            </div>
                            <div className="input-container">
                                <input value={policyNote} type="text" name="policyNote" placeholder="Бележка" onChange={handlePolicyNote}/>
                            </div>
                            <div className="input-container">
                                <input value={maturityCount} type="number" name="maturityCount" placeholder="Брой вноски" onChange={handleMaturityCount}/>
                            </div>
                            <div className="input-container">
                                <select
                                    name="objectType"
                                    value={selectedObjectType}
                                    onChange={(e) => setSelectedObjectType(e.target.value)}
                                >
                                    <option value="" disabled>Тип обект</option>
                                    {objectTypes.map((type) => (
                                        <option key={type.insObjectTypeId} value={type.insObjectTypeId}>
                                            {type.insObjectTypeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-container">
                                <input value={clients?.clientFullname} type="text" name="clients" placeholder="P" disabled={true} />
                            </div>
                            <div className="input-container">
                                <select
                                    name="product"
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                >
                                    <option value="" disabled>Продукт</option>
                                    {products.map((type) => (
                                        <option key={type.insProdCode} value={type.insProdCode}>
                                            {type.insProdName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="btn-container">
                                <div className="input-container">
                                    <button type="button" className="submit-btn" onClick={savePolicy} disabled={isDisableButton}>Запази</button>
                                </div>
                                <div className="input-container">
                                    <button type="button" className="submit-btn" onClick={close}>Откажи</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClientsDetails;