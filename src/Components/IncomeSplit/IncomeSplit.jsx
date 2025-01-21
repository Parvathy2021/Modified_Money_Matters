import { useState } from "react";

function IncomeSplit(){
    const [totalIncome, setTotalIncome] = useState('');
    const [allocatedFunds, setAllocatedFunds] = useState('');

    const defaultAllocations = {
        'Rent/Mortage' : 40,
        'Food' : 30,
        'Clothing' : 10,
        'Misc.' : 20
    };

    return(
        <div>
            <h1> Income Split Allocator</h1>
            <div>
                <label>Total Income :
                    <input type="number" value={totalIncome} placeholder="Enter youe total income" />
                </label>
            </div>
            <h3>Allocate Funds for each tags</h3>
            {Object.keys(defaultAllocations).map((tag) =>(
                <div key={tag}>
                    <label> {tag} ({defaultAllocations[tag]}%):
                        <div>${allocatedFunds[tag].toFixed(2)}</div>
                    </label>
                </div>
            ))}
            /* Optional: Display Total Allocated (optional sum verification) */
                <div>
                    <label> Total Allocated: 
                        <div>${Object.values(allocatedFunds).reduce((acc, value) => acc + value, 0).toFixed(2)}</div>
                    </label>

                </div>

        </div>
    )
}
export default IncomeSplit;
