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
                            <button type="button" className="submit-btn" >Запази</button>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" >Редактирай</button>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" >Изтрий</button>
                        </div>
                        <div className="input-container">
                            <button type="button" className="submit-btn" >Продукти</button>
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