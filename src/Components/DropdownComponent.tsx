import React, { useState, useEffect } from 'react';

interface InsuranceType {
    id: number;
    name: string;
    // Add other properties as needed
}

const DropdownComponent: React.FC = () => {
    const [options, setOptions] = useState<InsuranceType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/nomenclature/ins-types');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setOptions(data as InsuranceType[]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <label htmlFor="insTypes">Select Insurance Type:</label>
            <select id="insTypes">
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownComponent;
