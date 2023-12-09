import {useEffect, useState} from "react";

type Props = {
    insCompanyId: number;
    setCurrentPage: (page: string) => void;
};

const ProductsDetails = (props: Props) => {
    const [insCompanyName, setInsCompanyName] = useState<string>("");
    const [insCompanyBulstat, setInsCompanyBulstat] = useState<string>("");
    const [insCompanyAddr, setInsCompanyAddr] = useState<string>("");
    const [insCompanyContact, setInsCompanyContact] = useState<string>("");
    const [insCompanyTel, setInsCompanyTel] = useState<string>("");

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

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

    const show = () => {
        props.setCurrentPage("Products")
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
            } else {
                console.error('Failed to post data');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
        setIsDisabled(true);
    }

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input value={props.insCompanyId} type="text" name="insCompanyId" placeholder="Код на застрахователя" disabled={true}/>
                    </div>
                    <div className="input-container">
                        <input value={insCompanyName} type="text" name="insCompanyName" placeholder="Име на застраховател" onChange={(e) => setInsCompanyName(e.target.value)} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insCompanyBulstat} type="text" name="insCompanyBulstat" placeholder="Булстат" onChange={(e) => setInsCompanyBulstat(e.target.value)} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insCompanyAddr} type="text" name="insCompanyAddr" placeholder="Адрес" onChange={(e) => setInsCompanyAddr(e.target.value)} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insCompanyContact} type="text" name="insCompanyContact" placeholder="Адрес за контакт" onChange={(e) => setInsCompanyContact(e.target.value)} disabled={isDisabled}/>
                    </div>
                    <div className="input-container">
                        <input value={insCompanyTel} type="text" name="insCompanyTel" placeholder="Телефон" onChange={(e) => setInsCompanyTel(e.target.value)} disabled={isDisabled}/>
                    </div>
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
                        <div className="input-container">
                            <button type="button" className="submit-btn" onClick={show}>Продукти</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="table">

            </div>
        </div>
    );
}

export default ProductsDetails;