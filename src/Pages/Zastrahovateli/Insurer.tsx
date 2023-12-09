import "./Insurer.css";
import React, {useEffect, useState} from "react";

type Props = {
    setCurrentPage: (page: string) => void;
    setInsCompanyId: (num: number) => void;
};

interface InsuranceType {
    insTypeId: number;
    insTypeName: string;
}

interface DataRowType {
    insCompanyId: number;
    insCompanyName: string;
    insCompanyBulstat: string;
    insCompanyAddr: string,
    insCompanyContact: string,
    insCompanyTel: string


}

const Insurer = (props: Props) => {
    //for searching
    const [insuranceId, setInsuranceId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [bulstat, setBulstat] = useState<string>("");

    //for adding new
    const [insCompanyName, setInsCompanyName] = useState<string>("");
    const [insCompanyBulstat, setInsCompanyBulstat] = useState<string>("");
    const [insCompanyAddr, setInsCompanyAddr] = useState<string>("");
    const [insCompanyContact, setInsCompanyContact] = useState<string>("");
    const [insCompanyTel, setInsCompanyTel] = useState<string>("");

    //other
    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
    const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');

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
    }, []);

    useEffect(() => {
        if(error){
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    },[error]);

    useEffect(() => {
        if(insCompanyName && insCompanyBulstat && insCompanyAddr && insCompanyContact && insCompanyTel){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    },[insCompanyName, insCompanyBulstat, insCompanyAddr, insCompanyContact, insCompanyTel])

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
                const result = await response.json();
                props.setInsCompanyId(result.insCompanyId)
                props.setCurrentPage("InsurerDetails");
            } else {
                setErrorName('Company name must be unique.'); //tva gurmi za kakvato i da e greshka shtoto ne si mi slojil konkreten status
            }
        } catch (error) {
            console.error('Failed to post data');
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsCompanyName(value);

        setErrorName(null);
    };

    const handleBulstatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsCompanyBulstat(value);

        if (value.length !== 9 && value.length !== 13) {
            setError('Bulstat must be either 9 or 13 symbols.');
        } else {
            setError(null);
        }
    };

    const addNew = () => {
        setShowPopup(true);
    }

    const close = () => {
        setShowPopup(false);
    }

    const handleOnClickOnTable = (num: number) => {
        props.setInsCompanyId(num);
        props.setCurrentPage("InsurerDetails");
    }

    const handleSearch = () => {
        const queryParams = new URLSearchParams();

        if (insuranceId !== '') {
            queryParams.set('insCompanyId', insuranceId);
        }

        if (name !== '') {
            queryParams.set('insCompanyName', name);
        }

        if (bulstat !== '') {
            queryParams.set('insCompanyBulstat', bulstat);
        }

        if (selectedInsuranceType !== '') {
            queryParams.set('insTypeId', selectedInsuranceType);
        }

        const apiUrl = `http://localhost:8080/ins-companies?${queryParams}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAllData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input type="text" name="insuranceNumber" placeholder="Код на застрахователя" onChange={(e) => setInsuranceId(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="name" placeholder="Име на застраховател" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="bulstat" placeholder="Булстат" onChange={(e) => setBulstat(e.target.value)}/>
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
                            <th>Код на застрахователя</th>
                            <th>Име на застраховател</th>
                            <th>Булстат</th>
                            <th>Адрес</th>
                            <th>Контакт</th>
                            <th>Телефон</th>
                            <th>Тип застраховка</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">
                        {allData.map((row: DataRowType) => (
                            <tr
                                className="trBody"
                                onClick={() => handleOnClickOnTable(row.insCompanyId)}
                                key={row.insCompanyId}
                            >
                                <td>{row.insCompanyId}</td>
                                <td>{row.insCompanyName}</td>
                                <td>{row.insCompanyBulstat}</td>
                                <td>{row.insCompanyAddr}</td>
                                <td>{row.insCompanyContact}</td>
                                <td>{row.insCompanyTel}</td>
                                <td>НЕ СЕ ВРЪЩА ОТ БЕКЕНДА</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Потърсете застраховател...</p>
                )}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <form>
                            <div className="input-container">
                                <input type="text" name="name" placeholder="Име на застраховател" onChange={handleNameChange}/>
                            </div>
                            {errorName && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "25px" }}>{errorName}</p>}
                            <div className="input-container">
                                <input type="text" name="bulstat" placeholder="Булстат" onChange={handleBulstatChange}/>
                            </div>
                            {error && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "25px" }}>{error}</p>}
                            <div className="input-container">
                                <input type="text" name="address" placeholder="Адрес" onChange={(e) => setInsCompanyAddr(e.target.value)}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="contact" placeholder="Контакт" onChange={(e) => setInsCompanyContact(e.target.value)}/>
                            </div>
                            <div className="input-container">
                                <input type="text" name="tel" placeholder="Телефон" onChange={(e) => setInsCompanyTel(e.target.value)}/>
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

export default Insurer;