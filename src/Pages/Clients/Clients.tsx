import "./Clients.css";
import React, {useEffect, useState} from "react";

type Props = {
    setCurrentPage: (page: string) => void;
    setClientId: (num: number) => void;
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
    clientId: number
    clientEgnBulstat: string
    clientType: string,
    clientFullname: string,
    email: number,
    telephone: string,
    adressText: string
}

const Clients = (props: Props) => {
    //for searching
    const [clientEgnBulstat, setClientEgnBulstat] = useState<string>("");
   // const [clientId, setClientId] = useState<number>("");
    const [clientType, setClientType] = useState<string>("");
    const [clientFullname, setClientFullname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    
    //for adding new
    const [clientTypeNew, setClientTypeNew] = useState<string>("");
    const [clientEgnBulstatNew, setClientEgnBulstatNew] = useState<string>("");
    const [clientFullnameNew, setClientFullnameNew] = useState<string>('');
    const [emailNew, setEmailNew] = useState<string>('');
    const [telephoneNew, setTelephoneNew] = useState<string>('');
    const [adressTextNew, setAdressTextNew] = useState<string>('');

    //other
    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
    const [allData, setAllData] = useState<DataRowType[]>();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errorName, setErrorName] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // fetch('http://localhost:8080/nomenclature/ins-types')
        //     .then(response => response.json())
        //     .then(data => setInsuranceTypes(data))
        //     .catch(error => console.error('Error fetching data:', error));

        // fetch('http://localhost:8080/ins-companies/get-all')
        //     .then(response => response.json())
        //     .then(data => setAllCompanies(data))
        //     .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if(error){
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    },[error]);

    useEffect(() => {
        if(clientTypeNew && clientEgnBulstatNew && clientFullnameNew && adressTextNew){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    },[clientTypeNew, clientEgnBulstatNew, clientFullnameNew, adressTextNew]);

    const save = async () => {
      //  const data = insuranceTypes.find(e => e.insTypeId === parseInt( selectedInsuranceTypeNew));

        // const insTypeDto = {
        //     insTypeId: data?.insTypeId,
        //     insTypeName: data?.insTypeName,
        // };

        try {
            const response = await fetch('http://localhost:8080/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientType: clientTypeNew,
                    clientEgnBulstat: clientEgnBulstatNew,
                    clientFullname: clientFullnameNew,
                    email: emailNew,
                    telephone: telephoneNew,
                    adressText: adressTextNew
                }),
            });

            if (response.ok) {
                const result = await response.json();
                props.setClientId(result.clientId)
                props.setCurrentPage("ClientsDetails");
            } else {
                //product name unique
            }

        } catch (error) {
            console.error('Failed to post data');
        }
    }

    const handleClientType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value && value == "Физическо лице") {
            setClientTypeNew("INDIVIDUAL");
        } else if (value && value == "Юридическо лице") {
            setClientTypeNew("CORPORATE");
        }
        // setErrorName(null);
    };
    const handleClientEgnBulstat = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientEgnBulstatNew(value);
        // setErrorName(null);
    };
    const handleClientFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientFullnameNew(value);

        // setErrorName(null);
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailNew(value);

        // if (value.length !== 9 && value.length !== 13) {
        //     setError('Bulstat must be either 9 or 13 symbols.');
        // } else {
        //     setError(null);
        // }
    };
    const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTelephoneNew(value);

        // if (value.length !== 9 && value.length !== 13) {
        //     setError('Bulstat must be either 9 or 13 symbols.');
        // } else {
        //     setError(null);
        // }
    };
    const handleAdressText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAdressTextNew(value);

        // if (value.length !== 9 && value.length !== 13) {
        //     setError('Bulstat must be either 9 or 13 symbols.');
        // } else {
        //     setError(null);
        // }
    };
    
    const addNew = () => {
        setShowPopup(true);
    }

    const close = () => {
        setShowPopup(false);
    }

    const handleOnClickOnTable = (num: number) => {
        props.setClientId(num);
        props.setCurrentPage("ClientsDetails");
    }

    const handleSearch = () => {
        const queryParams = new URLSearchParams();

        if (clientEgnBulstat !== '') {
            queryParams.set('clientEgnBulstat', clientEgnBulstat);
        }

        if (clientType !== '') {
            if (clientType == "Физическо лице") {
                queryParams.set('clientType', "INDIVIDUAL");
            } else if (clientType == "Юридическо лице") {
                queryParams.set('clientType', "CORPORATE");
            }
        }

        if (clientFullname !== '') {
            queryParams.set('clientFullname', clientFullname);
        }

        if (email !== '') {
            queryParams.set('email', email);
        }

        if (telephone !== '') {
            queryParams.set('telephone', telephone);
        }

        const apiUrl = `http://localhost:8080/clients?${queryParams}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAllData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // fetch(`http://localhost:8080/ins-products/ins-company?insCompanyName=${selectedCompany}`)
        //     .then(response => response.json())
        //     .then(data => setCompanies(data))
        //     .catch(error => console.error('Error fetching data:', error));
    };
    const showClientType = (clientType: string) => {
        if (clientType && clientType == "INDIVIDUAL") {
            clientType = "Физическо лице";
        } else if (clientType && clientType == "CORPORATE") {
            clientType = "Юридическо лице";
        }
        return clientType;
    }

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input value={clientEgnBulstat} type="text" name="clientEgnBulstat" placeholder="Егн или булстат" onChange={(e) => setClientEgnBulstat(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={clientType} type="text" name="clientType" placeholder="Тип на клиента" onChange={(e) => setClientType(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={clientFullname} type="text" name="clientFullname" placeholder="Име" onChange={(e) => setClientFullname(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={email} type="text" name="email" placeholder="Имейл" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={telephone} type="text" name="telephone" placeholder="Телефон" onChange={(e) => setTelephone(e.target.value)}/>
                    </div>
                    <div className="btn-container">
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={handleSearch}>Търси</button>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={addNew}>Добави нов</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="table">
                {allData ? (
                    <table className="table">
                        <thead className="thead">
                        <tr className="trHead">
                            <th>Егн или булстат</th>
                            <th>Тип на клиента</th>
                            <th>Име</th>
                            <th>Имейл</th>
                            <th>Телефон</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">
                        {allData.map((row: DataRowType) => (
                            <tr
                                className="trBody"
                                onClick={() => handleOnClickOnTable(row.clientId)}
                                key={row.clientId}
                            >
                                {/* <td>{row.clientId}</td> */}
                                <td>{row.clientEgnBulstat}</td>
                                <td>{showClientType(row.clientType)}</td>
                                <td>{row.clientFullname}</td>
                                <td>{row.email}</td>
                                <td>{row.telephone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Потърсете клиент...</p>
                )}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <form>
                            <div className="input-container">
                                <input type="text" name="clientType" placeholder="Тип на клиента" onChange={handleClientType}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="clientEgnBulstat" placeholder="Егн или булстат" onChange={handleClientEgnBulstat}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="clientFullname" placeholder="Име" onChange={handleClientFullname}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="email" placeholder="Имейл" onChange={handleEmail}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="telephone" placeholder="Телефон" onChange={handleTelephone}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="adressText" placeholder="Адрес" onChange={handleAdressText}/>
                            </div>
                            <div className="btn-container">
                                <div className="input-container">
                                    <button type="button" className="submit-btn" onClick={save} disabled={isDisabled}>Запази</button>
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

export default Clients;