import React, {useEffect, useState} from "react";

type Props = {
    insProductId: number;
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

const ProductsDetails = (props: Props) => {
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

    const [insObjectTypeDto, setInsObjectTypeDto] = useState<string>("");
    const [insProductDto, setInsProductDto] = useState<string>("");
    const [clientDto, setClientDto] = useState<string>("");

    const [insProdName, setInsProdName] = useState<string>("");
    const [insProdDeferred, setInsProdDeferred] = useState<string>("");
    const [insProdPremPerc, setInsProdPermPerc] = useState<string>("");
    const [insProdComissPerc, setInsProdComissPerc] = useState<string>("");

    const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [allCompanies, setAllCompanies] = useState<Companies[]>([]);
    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);

    const [allData, setAllData] = useState<DataRowType[]>();
    const [showPopup, setShowPopup] = useState(false);

    const [isDisableButton, setIsDisabledButton] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

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

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsProdName(value);

        // setErrorName(null);
    };

    const handleDefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsProdDeferred(value);

        // setErrorName(null);
    };

    const handlePermPercChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsProdPermPerc(value);

        // setErrorName(null);
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

    const handleComissPercChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsProdComissPerc(value);

        // setErrorName(null);
    };

    const save = () => {

    };

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
    };

    const del = () => {

    };

    const edit = () => {
        setIsDisabled(false);
    }

    const addPolicy = () => {
        setShowPopup(true);
    };

    const savePolicy = () => {

    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ins-products/${props.insProductId}`);

                if (response.ok) {
                    const result = await response.json();
                    setInsProdName(result.insProdName);
                    setInsProdDeferred(result.insProdDeferred);
                    setInsProdPermPerc(result.insProdPremPerc);
                    setInsProdComissPerc(result.insProdComissPerc);
                    setSelectedCompany(result.insCompanyName);
                } else {
                    console.error(`Error: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOnClickOnTable = (num: number) => {
        props.setPolicyId(num);
        props.setCurrentPage("PolicyDetails"); // nqma go
    }

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input value={props.insProductId} type="text" name="insProductId" placeholder="Код на продукт" disabled={true}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdName} type="text" name="insProdName" placeholder="Наименование" onChange={handleNameChange} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdDeferred} type="text" name="insProdDeferred" placeholder="Разсрочено плащане" onChange={handleDefChange} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdPremPerc} type="text" name="insProdPremPerc" placeholder="Застрахователна премия" onChange={handlePermPercChange} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insProdComissPerc} type="text" name="insProdComissPerc" placeholder="Комисионна" onChange={handleComissPercChange} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <select
                            name="insuranceType"
                            value={selectedInsuranceType}
                            disabled={isDisabled}
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
                            disabled={isDisabled}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="" disabled>Компания</option>
                            {allCompanies.map((type) => (
                                <option key={type.insCompanyName} value={type.insCompanyName}>
                                    {type.insCompanyName}
                                </option>
                            ))}
                        </select>
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
                            <button type="button" className="submit-btn" onClick={addPolicy}>Нова полица</button>
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
                                <input value={policyNo} type="text" name="policyNo" placeholder="policyNo" onChange={hanglePolicyNoChange}/>
                            </div>
                            <div className="input-container">
                                <input type="date" name="policyDate" placeholder="policyDate" onChange={handlePolicyDateChange}/>
                            </div>
                            <div className="input-container">
                                <input type="date" name="policyBeginDate" placeholder="policyBeginDate" onChange={handlepolicyBeginDate}/>
                            </div>
                            <div className="input-container">
                                <input type="date" name="policyEndDate" placeholder="policyEndDate" onChange={handlepolicyEndDate}/>
                            </div>
                            <div className="input-container">
                                <input value={objectDescription} type="text" name="objectDescription" placeholder="objectDescription" onChange={handleDescription}/>
                            </div>
                            <div className="input-container">
                                <input value={policyActive} type="text" name="policyActive" placeholder="policyActive" onChange={handlePolicyActive}/>
                            </div>
                            <div className="input-container">
                                <input value={policySum} type="number" name="policySum" placeholder="policySum" onChange={handlePolicySum}/>
                            </div>
                            <div className="input-container">
                                <input value={policyPremia} type="number" name="policyPremia" placeholder="policyPremia" onChange={handlePolicyPremia}/>
                            </div>
                            <div className="input-container">
                                <input value={policyTax} type="number" name="policyTax" placeholder="policyTax" onChange={handlePolicyTax}/>
                            </div>
                            <div className="input-container">
                                <input value={policyInsComiss} type="number" name="policyInsComiss" placeholder="policyInsComiss" onChange={handlePolicyInsComiss}/>
                            </div>
                            <div className="input-container">
                                <input value={policyNote} type="text" name="policyNote" placeholder="policyNote" onChange={handlePolicyNote}/>
                            </div>
                            <div className="input-container">
                                <input value={maturityCount} type="number" name="maturityCount" placeholder="maturityCount" onChange={handleMaturityCount}/>
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

export default ProductsDetails;