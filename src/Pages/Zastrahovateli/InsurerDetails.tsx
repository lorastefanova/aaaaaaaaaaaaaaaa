import React, {useEffect, useState} from "react";

type Props = {
    insCompanyId: number;
    setCurrentPage: (page: string) => void;
};

interface DataRowType {
    insCompanyId: number;
    insCompanyName: string;
    insCompanyBulstat: string;
    insTypeId: number;
}

interface InsuranceType {
    insTypeId: number;
    insTypeName: string;
}

const InsurerDetails = (props: Props) => {
    const [insCompanyName, setInsCompanyName] = useState<string>("");
    const [insCompanyBulstat, setInsCompanyBulstat] = useState<string>("");
    const [insCompanyAddr, setInsCompanyAddr] = useState<string>("");
    const [insCompanyContact, setInsCompanyContact] = useState<string>("");
    const [insCompanyTel, setInsCompanyTel] = useState<string>("");

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isDisableButton, setIsDisabledButton] = useState<boolean>(true);
    const [allData, setAllData] = useState<DataRowType[]>();
    const [showPopup, setShowPopup] = useState(false);

    const [insProdCode, setInsProdCode] = useState<number>();
    const [insProdName, setInsProdName] = useState<string>("");
    const [insProdDeferred, setInsProdDeferred] = useState<string>("");
    const [insProdPremPerc, setInsProdPremPerc] = useState<number>();
    const [insProdComissPerc, setInsProdComissPerc] = useState<number>();

    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
    const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [errorName, setErrorName] = useState<string | null>(null);

    useEffect(() => {
        if(insProdCode && insProdName && insProdDeferred && insProdPremPerc && insProdComissPerc && selectedInsuranceType){
            setIsDisabledButton(false)
        } else {
            setIsDisabledButton(true)
        }
    },[insProdCode, insProdName, insProdDeferred, insProdPremPerc, insProdComissPerc, selectedInsuranceType])

    useEffect(() => {
        fetch('http://localhost:8080/ins-products')
            .then(response => response.json())
            .then(data => {
                setAllData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ins-companies/${props.insCompanyId}`);

                if (response.ok) {
                    const result = await response.json();
                    setInsCompanyName(result.insCompanyName);
                    setInsCompanyBulstat(result.insCompanyBulstat);
                    setInsCompanyAddr(result.insCompanyAddr);
                    setInsCompanyContact(result.insCompanyContact);
                    setInsCompanyTel(result.insCompanyTel);
                } else {
                    console.error(`Error: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const edit = () => {
        setIsDisabled(false);
    }

    const saveProduct = async () => {
        const data = insuranceTypes.find(e => e.insTypeId === 1);

        const insTypeDto = {
            insTypeId: data?.insTypeId,
            insTypeName: selectedInsuranceType,
        };

        try {
            const response = await fetch('http://localhost:8080/ins-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    insProdCode,
                    insProdName,
                    insProdDeferred,
                    insProdPremPerc,
                    insProdComissPerc,
                    insTypeDto
                }),
            });

            if (response.ok) {
                const result = await response.json();

            } else {

            }
        } catch (error) {
            console.error('Failed to post data');
        }
    }

    const handleBulstatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsCompanyBulstat(value);

        if (value.length !== 9 && value.length !== 13) {
            setError('Bulstat must be either 9 or 13 symbols.');
        } else {
            setError(null);
        }

    };

    const addProduct = () => {
        fetch('http://localhost:8080/nomenclature/ins-types')
            .then(response => response.json())
            .then(data => setInsuranceTypes(data))
            .catch(error => console.error('Error fetching data:', error));

        setShowPopup(true)
    }

    const del = () => {
        fetch(`http://localhost:8080/ins-companies/${props.insCompanyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    props.setCurrentPage("Insurer") //ne ti bachka deleta
                } else {
                    console.error('Error deleting insurance company');
                }
            })
            .catch(error => {
                console.error('Error deleting insurance company', error);
            });
    }

    const save = async () => {
        try {
            const response = await fetch('http://localhost:8080/ins-companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    insCompanyName,
                    insCompanyBulstat,
                    insCompanyAddr,
                    insCompanyContact,
                    insCompanyTel,
                }),
            });

            if (response.ok) {
                console.log('Data updated successfully');
                setIsDisabled(true);
                setErrorName(null)
            } else {
                setErrorName('Company name must be unique.');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    const close = () => {
        setShowPopup(false);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsCompanyName(value);

        setErrorName(null);
    };

    const handleCompanyAddrChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;
        setInsCompanyAddr(value);
    }

    const handleCompanyContactChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;
        setInsCompanyContact(value);
    }

    const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;
        setInsCompanyTel(value);

    }

return (
    <div className="container">
        <div className="left-form-container">
            <form>
                <div className="input-container">
                    <input value={props.insCompanyId} type="text" name="insCompanyId" placeholder="Код на застрахователя" disabled={true}/>
                </div>
                <div className="input-container">
                    <input value={insCompanyName} type="text" name="insCompanyName" placeholder="Име на застраховател" onChange={handleNameChange} disabled={isDisabled}/>
                </div>
                {errorName && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "45px" }}>{errorName}</p>}
                <div className="input-container">
                    <input value={insCompanyBulstat} type="text" name="insCompanyBulstat" placeholder="Булстат" onChange={handleBulstatChange} disabled={isDisabled}/>
                </div>
                {error && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "45px" }}>{error}</p>}
                <div className="input-container">
                    <input value={insCompanyAddr} type="text" name="insCompanyAddr" placeholder="Адрес" onChange={handleCompanyAddrChange} disabled={isDisabled}/>
                </div>
                <div className="input-container">
                    <input value={insCompanyContact} type="text" name="insCompanyContact" placeholder="Адрес за контакт" onChange={handleCompanyContactChange} disabled={isDisabled}/>
                </div>
                <div className="input-container">
                    <input value={insCompanyTel} type="text" name="insCompanyTel" placeholder="Телефон" onChange={handleTelChange} disabled={isDisabled}/>
                </div>
                <div className="btn-container">
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={save} >Запази</button>
                    </div>
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={edit}>Редактирай</button>
                    </div>
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={del}>Изтрий</button>
                    </div>
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={addProduct}>Добави прод.</button>
                    </div>
                </div>
            </form>
        </div>
        <div className="table">
            {allData ? (
                <table className="table">
                    <thead className="thead">
                    <tr className="trHead">
                        <th>Код на застрахователя</th>
                        <th>Наименование</th>
                        <th>Булстат</th>
                        <th>Вид на застраховка</th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                    {allData.map((row: DataRowType) => (
                        <tr
                            className="trBody"
                            key={row.insCompanyId}
                        >
                            <td>{row.insCompanyId}</td>
                            <td>{row.insCompanyName}</td>
                            <td>{row.insCompanyName}</td>
                            <td>{row.insTypeId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Няма продукти</p>
            )}
        </div>

        {showPopup && (
            <div className="popup">
                <div className="popup-inner">
                    <form>
                        <div className="input-container">
                            <input value={insCompanyName} type="text" name="insCompanyName" placeholder="Име на застраховател" onChange={(e) => setInsCompanyName(e.target.value)} disabled={true}/>
                        </div>
                        <div className="input-container">
                            <input value={insProdCode} type="number" name="insProdCode" placeholder="insProdCode" onChange={(e) => setInsProdCode(parseInt(e.target.value))}/>
                        </div>
                        <div className="input-container">
                            <input value={insProdName} type="text" name="insProdName" placeholder="insProdName" onChange={(e) => setInsProdName(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input value={insProdDeferred} type="text" name="insProdDeferred" placeholder="insProdDeferred" onChange={(e) => setInsProdDeferred(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input value={insProdPremPerc} type="number" name="insProdPremPerc" placeholder="insProdPremPerc" onChange={(e) => setInsProdPremPerc(parseInt(e.target.value))}/>
                        </div>
                        <div className="input-container">
                            <input value={insProdComissPerc} type="number" name="insProdComissPerc" placeholder="insProdComissPerc" onChange={(e) => setInsProdComissPerc(parseInt(e.target.value))}/>
                        </div>
                        <div className="input-container">
                            <select
                                name="insuranceType"
                                value={selectedInsuranceType}
                                onChange={(e) => setSelectedInsuranceType(e.target.value)}
                            >
                                <option value="" disabled>Тип застраховка</option>
                                {insuranceTypes.map((type) => (
                                    <option key={type.insTypeId} value={type.insTypeId}>
                                        {type.insTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="btn-container">
                            <div className="input-container">
                                <button type="button" className="submit-btn" onClick={saveProduct} disabled={isDisableButton}>Запази</button>
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

export default InsurerDetails;