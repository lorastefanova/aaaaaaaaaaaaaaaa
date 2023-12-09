import "./Products.css";
import React, {useEffect, useState} from "react";

type Props = {
    setCurrentPage: (page: string) => void;
    setInsProdCode: (num: number) => void;
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
    insProdCode: number
    insProdName: string
    insTypeDto: {
        insTypeId: number;
        insTypeName: string;
    }
    insProdDeferred: string,
    insProdPremPerc: number,
    insProdComissPerc: number,
    insCompanyName: string
}

const Products = (props: Props) => {
    //for searching
    const [insProdCode, setInsProdCode] = useState<string>("");
    const [insProdName, setInsProdName] = useState<string>("");
    const [insProdDeferred, setInsProdDeferred] = useState<string>("");
    const [insProdPremPerc, setInsProdPermPerc] = useState<string>("");
    const [insProdComissPerc, setInsComissPerc] = useState<string>("");
    const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');
    const [allCompanies, setAllCompanies] = useState<Companies[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>('');

    //for adding new
    const [insProdNameNew, setInsProdNameNew] = useState<string>("");
    const [insProdDeferredNew, setInsProdDeferredNew] = useState<string>("");
    const [selectedInsuranceTypeNew, setSelectedInsuranceTypeNew] = useState<string>('');
    // const [companiesNew, setCompaniesNew] = useState<Companies[]>([]);
    const [selectedCompanyNew, setSelectedCompanyNew] = useState<string>('');

    //other
    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
    const [allData, setAllData] = useState<DataRowType[]>();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errorName, setErrorName] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/nomenclature/ins-types')
            .then(response => response.json())
            .then(data => setInsuranceTypes(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost:8080/ins-companies/get-all')
            .then(response => response.json())
            .then(data => setAllCompanies(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if(error){
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    },[error]);

    useEffect(() => {
        if(insProdNameNew && insProdDeferredNew && selectedCompanyNew){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    },[insProdNameNew, insProdDeferredNew, selectedCompanyNew]);

    const save = async () => {
        const data = insuranceTypes.find(e => e.insTypeId === parseInt( selectedInsuranceTypeNew));

        const insTypeDto = {
            insTypeId: data?.insTypeId,
            insTypeName: data?.insTypeName,
        };

        try {
            const response = await fetch('http://localhost:8080/ins-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    insProdName: insProdNameNew,
                    insProdDeferred: insProdDeferredNew,
                    insTypeDto,
                    insCompanyName: selectedCompanyNew
                }),
            });

            if (response.ok) {
                const result = await response.json();
                props.setInsProdCode(result.insProdCode)
                props.setCurrentPage("ProductsDetails");
            } else {
                //product name unique
            }

        } catch (error) {
            console.error('Failed to post data');
        }
    }

    const handleInsProdDefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsProdDeferredNew(value);

        // setErrorName(null);
    };

    const handleInsProdNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsProdNameNew(value);

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
        props.setInsProdCode(num);
        props.setCurrentPage("InsurerDetails");
    }

    const handleSearch = () => {
        const queryParams = new URLSearchParams();

        if (insProdCode !== '') {
            queryParams.set('insProdCode', insProdCode);
        }

        if (insProdName !== '') {
            queryParams.set('insProdName', insProdName);
        }

        if (insProdDeferred !== '') {
            queryParams.set('insProdDeferred', insProdDeferred);
        }

        if (insProdPremPerc !== '') {
            queryParams.set('insProdPremPerc', insProdPremPerc);
        }

        if (insProdComissPerc !== '') {
            queryParams.set('insProdComissPerc', insProdComissPerc);
        }

        if (selectedInsuranceType !== '') {
            queryParams.set('insTypeId', selectedInsuranceType);
        }

        if (selectedCompany !== '') {
            queryParams.set('insCompanyName', selectedCompany);
        }

        const apiUrl = `http://localhost:8080/ins-products?${queryParams}`;

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

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input value={insProdCode} type="text" name="insProdCode" placeholder="insProdCode" onChange={(e) => setInsProdCode(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdName} type="text" name="insProdName" placeholder="insProdName" onChange={(e) => setInsProdName(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdDeferred} type="text" name="insProdDeferred" placeholder="Разсрочено плащане" onChange={(e) => setInsProdDeferred(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdPremPerc} type="text" name="insProdPremPerc" placeholder="insProdPremPerc" onChange={(e) => setInsProdPermPerc(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdComissPerc} type="text" name="insProdComissPerc" placeholder="insProdComissPerc" onChange={(e) => setInsComissPerc(e.target.value)}/>
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
                    <div className="input-container">
                        <select
                            name="insuranceType"
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="" disabled>selectedCompany</option>
                            {allCompanies.map((type) => (
                                <option key={type.insCompanyName} value={type.insCompanyName}>
                                    {type.insCompanyName}
                                </option>
                            ))}
                        </select>
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
                            <th>Код на продукт</th>
                            <th>Наименование</th>
                            <th>Разсрочено плащане</th>
                            <th>Застрахователна премия</th>
                            <th>Комисионна</th>
                            <th>Тип застраховка</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">
                        {allData.map((row: DataRowType) => (
                            <tr
                                className="trBody"
                                onClick={() => handleOnClickOnTable(row.insProdCode)}
                                key={row.insProdCode}
                            >
                                <td>{row.insProdCode}</td>
                                <td>{row.insProdName}</td>
                                <td>{row.insProdDeferred}</td>
                                <td>{row.insProdPremPerc}</td>
                                <td>{row.insProdComissPerc}</td>
                                <td>{row.insTypeDto.insTypeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Потърсете продукт...</p>
                )}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <form>
                            <div className="input-container">
                                <input type="text" name="insProdName" placeholder="insProdName" onChange={handleInsProdNameChange}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="insProdDeferred" placeholder="insProdDeferred" onChange={handleInsProdDefChange}/>
                            </div>
                            <div className="input-container">
                                <select
                                    name="insuranceType"
                                    value={selectedInsuranceTypeNew}
                                    onChange={(e) => setSelectedInsuranceTypeNew(e.target.value)}
                                >
                                    <option value="" disabled>Тип застраховка</option>
                                    {insuranceTypes.map((type) => (
                                        <option key={type.insTypeId} value={type.insTypeId}>
                                            {type.insTypeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-container">
                                <select
                                    name="insuranceType"
                                    value={selectedCompanyNew}
                                    onChange={(e) => setSelectedCompanyNew(e.target.value)}
                                >
                                    <option value="" disabled>insCompanyNameNew</option>
                                    {allCompanies.map((type) => (
                                        <option key={type.insCompanyName} value={type.insCompanyName}>
                                            {type.insCompanyName}
                                        </option>
                                    ))}
                                </select>
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

export default Products;