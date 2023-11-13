import React from 'react';
import "./Table.css";
import {Mock} from "../../mock";

type Props = {
    setCurrentPage: (page: string) => void;
    setNumber: (num: number) => void;
}

const TableComponent = (props: Props) => {

    const handleOnClick = (num: number) => {
        props.setNumber(num);
        props.setCurrentPage("InsurerDetails");
    }

    return (
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
            {Mock.map((row) => (
                <tr className="trBody"
                    onClick={() => handleOnClick(row.insurerNumber)}
                    key={row.insurerNumber}
                >
                    <td>{row.insurerNumber}</td>
                    <td>{row.name}</td>
                    <td>{row.bulstat}</td>
                    <td>{row.insurerType}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
