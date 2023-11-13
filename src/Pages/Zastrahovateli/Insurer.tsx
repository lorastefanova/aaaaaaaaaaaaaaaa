import "./Insurer.css";
import {useState} from "react";
import Table from "../../Components/InsurerTable/Table";

type Props = {
    setCurrentPage: (page: string) => void;
    setNumber: (num: number) => void;
};

const Insurer = (props: Props) => {
    const [insuranceNumber, setInsuranceNumber] = useState<String>("");
    const [name, setName] = useState<String>("");
    const [bulstat, setBulstat] = useState<String>("");
    const [insuranceType, setInsuranceType] = useState<String>("");

    return (
        <div className="container">
            <div className="left-form-container">
                <form>
                    <div className="input-container">
                        <input type="text" name="insuranceNumber" placeholder="Код на застрахователя" onChange={(e) => setInsuranceNumber(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="name" placeholder="Наименование" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="bulstat" placeholder="Булстат" onChange={(e) => setBulstat(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="insuranceType" placeholder="Вид на застраховка" onChange={(e) => setInsuranceType(e.target.value)}/>
                    </div>
                    <div className="btn-container">
                        <div className="input-container">
                            <button className="submit-btn">Търси</button>
                        </div>
                        <div className="input-container">
                            <button className="submit-btn">Добави нов</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="table">
                <Table
                    setCurrentPage={props.setCurrentPage}
                    setNumber={props.setNumber}
                ></Table>
            </div>
        </div>
    );
}

export default Insurer;