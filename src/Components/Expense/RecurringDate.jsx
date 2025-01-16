import React, {useState} from 'react'

function RecurringDate() {

    const [recurringDate, setRecurring] = useState('');

    <input type="text" value={recurringDate} onChange={(e) => setRecurring(e.target.recurringDate)}></input>
 

}

export default RecurringDate;