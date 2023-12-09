import React, {useEffect, useState} from "react";

type Props = {
    insObjectTypeId: number;
    setCurrentPage: (page: string) => void;
};


const ObjectDetails = (props: Props) => {

    const [insObjectTypeId, setInsObjectTypeId] = useState<number>();
    const [insObjectTypeName, setInsObjectTypeName] = useState<string>("");

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInsObjectTypeName(value);

        setError(null);
    };

    
    const edit = () => {
        setIsDisabled(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ins-object-types/${props.insObjectTypeId}`);

                if (response.ok) {
                    const result = await response.json();
                    setInsObjectTypeId(result.insObjectTypeId);
                    setInsObjectTypeName(result.insObjectTypeName);
                } else {
                    console.error(`Error: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const save = async () => {

        try {
            const response = await fetch('http://localhost:8080/ins-object-types', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    insObjectTypeId,
                    insObjectTypeName
                }),
            });

            if (response.ok) {
                console.log('Data updated successfully');
                setIsDisabled(true);
            } else {
                setError('Object name must be unique!');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    const del = () => {
        fetch(`http://localhost:8080/ins-object-types/${props.insObjectTypeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    props.setCurrentPage("Objects")
                } else {
                    console.error('Error deleting insurance company');
                }
            })
            .catch(error => {
                console.error('Error deleting insurance company', error);
            });
    }

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input value={insObjectTypeId} type="number" name="id" onChange={(e) => setInsObjectTypeId(parseInt(e.target.value))} disabled={true} placeholder="Код на обект"/>
                    </div>
                    <div className="input-container">
                        <input value={insObjectTypeName} type="text" name="insObjectTypeName" onChange={handleNameChange} disabled={isDisabled} placeholder="Наименование"/>
                    </div>
                    {error && <p style={{ color: 'red', margin: 0, fontSize: "12px", textAlign: "left", width: "100%", paddingLeft: "45px" }}>{error}</p>}
                </form>
                <div className="btn-container">
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={save}>Запази</button>
                    </div>
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={edit}>Редактирай</button>
                    </div>
                    <div className="input-container">
                        <button type="button" className="submit-btn" onClick={del}>Изтрий</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ObjectDetails;