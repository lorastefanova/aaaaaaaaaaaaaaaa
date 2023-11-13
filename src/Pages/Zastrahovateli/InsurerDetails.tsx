import {useEffect, useState} from "react";
import Table from "../../Components/InsurerTable/Table";

type Props = {

};

const InsurerDetails = (props: Props) => {

    const [insuranceNumber, setInsuranceNumber] = useState<string>("101010");
    const [name, setName] = useState<string>("Застраховател 1");
    const [bulstat, setBulstat] = useState<string>("0001");
    const [insuranceType, setInsuranceType] = useState<string>("1");
    const [contactAddress, setContactAddress] = useState<string>("Адрес за контакт 1");
    const [address, setAddress] = useState<string>("Адрес на седалище 1");
    const [phone, setPhone] = useState<string>("08989");


return (
    <div className="container">
        <div className="left-form-container">
            <form>
                <div className="input-container">
                    <input value={insuranceNumber} type="text" name="insuranceNumber" placeholder="Код на застрахователя" onChange={(e) => setInsuranceNumber(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input value={name} type="text" name="name" placeholder="Наименование" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input value={bulstat} type="text" name="bulstat" placeholder="Булстат" onChange={(e) => setBulstat(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input value={insuranceType} type="text" name="insuranceType" placeholder="Вид на застраховка" onChange={(e) => setInsuranceType(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input value={contactAddress} type="text" name="contactAddress" placeholder="Адрес за контакт" onChange={(e) => setContactAddress(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input value={address} type="text" name="address" placeholder="Адрес за седалище" onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input value={phone} type="text" name="phone" placeholder="Телефон" onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="btn-container">
                    <div className="input-container">
                        <button className="submit-btn">Запази</button>
                    </div>
                    <div className="input-container">
                        <button className="submit-btn">Редактирай</button>
                    </div>
                </div>
            </form>
        </div>
        <div className="table">

        </div>
    </div>
    );
}

export default InsurerDetails;