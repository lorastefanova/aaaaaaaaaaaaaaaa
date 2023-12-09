import "./Objects.css";
import React, {useEffect, useState} from "react";

type Props = {
    setCurrentPage: (page: string) => void;
    setInsObjectTypeId: (num: number) => void;
};

interface DataRowType {
    insObjectTypeId: number;
    insObjectTypeName: string;
}

const Objects = (props: Props) => {

    //for searching
    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>("");

    const [allData, setAllData] = useState<DataRowType[]>();

    const [showPopup, setShowPopup] = useState(false);

    //for adding new
    const [insObjectTypeName, setInsObjectTypeName] = useState<string>("");

    const [errorName, setErrorName] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [change, setChange] = useState<number>(0);

    const handleOnClickOnTable = (num: number) => {
        props.setInsObjectTypeId(num);
        props.setCurrentPage("ObjectDetails");
    }

    const addNew = () => {
        setShowPopup(true);
    }

    const close = () => {
        setShowPopup(false);
    }

    useEffect(() => {
        if(errorName){
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    },[errorName]);

    useEffect(() => {
        if(insObjectTypeName){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    },[insObjectTypeName])

    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsObjectTypeName(value);

        setErrorName(null);
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams();

        if (id) {
            queryParams.set('insObjectTypeId', id.toString());
        }
        if (name !== '') {
            queryParams.set('insObjectTypeName', name);
        }

        const apiUrl = `http://localhost:8080/ins-object-types?${queryParams}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAllData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const save = async () => {
        try {
            const response = await fetch('http://localhost:8080/ins-object-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    insObjectTypeName
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setChange(change + 1)
                setInsObjectTypeName("")
                setShowPopup(false)
            } else {
                setErrorName('Object name must be unique.');
            }
        } catch (error) {
            console.error('Failed to post data');
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8080/ins-object-types`)
            .then(response => response.json())
            .then(data => {
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
                        <input value={id} type="number" name="insObjectTypeId" onChange={(e) => setId(parseInt(e.target.value))} placeholder="Код на обект"/>
                    </div>
                    <div className="input-container">
                        <input value={name} type="text" name="insObjectTypeName" onChange={(e) => setName(e.target.value)} placeholder="Наименование"/>
                    </div>
                </form>
                <div className="btn-container">
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={handleSearch}>Търси</button>
                    </div>
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={addNew}>Добави нов.</button>
                    </div>
                </div>
            </div>
            <div className="table">
                {allData ? (
                    <table className="table">
                        <thead className="thead">
                        <tr className="trHead">
                            <th>Код на застрахован обект</th>
                            <th>Наименование</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">
                        {allData.map((row: DataRowType) => (
                            <tr
                                className="trBody"
                                onClick={() => handleOnClickOnTable(row.insObjectTypeId)}
                                key={row.insObjectTypeId}
                            >
                                <td>{row.insObjectTypeId}</td>
                                <td>{row.insObjectTypeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Потърсете застрахован обект...</p>
                )}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <form>
                            <div className="input-container">
                                <input type="text" name="name" placeholder="Наименование" onChange={(e) => handleNameChange(e)}/>
                            </div>
                            {errorName && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "25px" }}>{errorName}</p>}
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

export default Objects;