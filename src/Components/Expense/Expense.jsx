import React, {useState} from 'react';
import RecurringDate from './RecurringDate';

function Expense() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);

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
                <input type="checkbox" value={isRecurring} onChange={(e) => setIsRecurring(e.value.isRecurring)}></input>
            </label>
            {/*Want to make the date input show only if isRecurring is checked. */}
            <label style= {isRecurring ? 'display' : 'display:none'}>Recurring Day's Date (1-31) 
                {<RecurringDate />}
            </label>

            <label>Description 
                <input type="text" value={description} onChange={(e) => setDescription(e.target.description)}></input>
            </label>

            <button>Submit</button>
        </form>
        </>
    )
}

export default Expense;