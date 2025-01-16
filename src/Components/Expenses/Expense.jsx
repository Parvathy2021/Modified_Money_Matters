import React, {useState} from 'react'

function Expense() {
    const [newAmount, setAmount] = useState('');
    const [newDate, setDate] = useState('');
    const [newDescription, setDescription] = useState('');

    return (
        <>
        <h1>New Transaction</h1>
        <form>
            <label>Amount 
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
            </label>
            <label>Select if transaction is income: 
                <input type="checkbox" value={isIncome}></input>
            </label>
            <label>Select if transaction is recurring: 
                <input type="checkbox" value={isRecurring}></input>
            </label>
            {/*Want to make the date input show only if isRecurring is checked. */}
            <label>Recurring Day's Date (1-31) 
                <input type="text" value={recurringDate} onChange={(e) => setDate(e.target.recurringDate)}></input>
            </label>
            <label>Description 
                <input type="text" value={description} onChange={(e) => setDescription(e.target.description)}></input>
            </label>

            <button>Submit</button>
        </form>
        </>
    )
}