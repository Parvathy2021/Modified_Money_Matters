import { split } from 'postcss/lib/list';
import React, {useState} from 'react';

function Expense() {
    const [amount, setAmount] = useState('');
    const [splitAmount, setSplitAmount] = useState('')
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [isIncome, setIsIncome] = useState(false);
    const [recurringDate, setRecurring] = useState('');
    const [frequency, setFrequency] = useState('monthly')
    const [tag, setTag] = useState('')
    const [splits, setSplits] = useState([]);   // Array to hold splits with tag and amount
    const [isSplits, setIsSplits] = useState(false);    // State for split Tags checkbox
 
    const handleAddSplit = () => {
        if(splitAmount && tag)   {
            const newSplit = {amount: parseFloat(splitAmount), tag};
            setSplits([...splits, newSplit]);   
            setSplitAmount('');
            setTag('');
        } else {
            alert('Please enter both split amount and tag for the split');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = [amount,date, splits, isIncome, isRecurring, recurringDate, frequency, description, tag];
        console.log(transaction)
        fetch("http://localhost:8080/expense", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        }).then(()=> {
            console.log("New transaction added.")
        });
        
    }

    return (
        <>
        
        <div className='flex justify-center items-center min-h-screen bg-black'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
                <h1 className='text-2xl font-semibold text-center mb-6 text-black'>New Transaction</h1>
      
                    <form onSubmit= {handleSubmit}>
                        <div className='block text-black'>
           
                            <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'>Amount
                                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}className='mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue' ></input>
                             </label>
                             <label htmlFor='date' className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'>Date
                                <input type="date" id='date' value={date} onChange={(e) => setDate(e.target.value)}className='mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue' ></input>
                             </label>
           
                             <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Select if transaction is income: 
                                <input type="checkbox" checked={isIncome} onChange={(e) => setIsIncome(e.target.checked)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>
                            </label>
                            <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block' >Select if transaction need Split Tags: 
                                <input type="checkbox" checked={isSplits} onChange={() =>setIsSplits(!isSplits)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>      
                            </label>
                                {isSplits && (     
                                    <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'>Amount (Split)
                                        <input type="text" value={splitAmount} onChange={(e) => setSplitAmount(e.target.value)}className='mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue' ></input>
                                        <label className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Tag (Split)
                                            <select className='mt-2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'  name="selectedTag" value={tag} onChange={(e) => setTag(e.target.value)}>
                                            {/* Placeholder options */}
                                            <option value="null">Please select a tag</option>
                                            <option value="Rent/Mortgage">Rent/Mortgage</option>
                                            <option value="Food">Food</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Misc.">Misc.</option>
                                            </select>
                                        </label>
                                        <button  className='w-full py-2 bg-lightblue text-white rounded-md hover:bg-green 
                                                 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue' type="button" onClick={handleAddSplit} > Add Split </button>
                                    </label>
                                )}   

                            <label className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block' >Select if transaction is recurring: 
                                <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>
                            </label>
          
                            {isRecurring &&  (
                                <label className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Frequency of Recurrence
                                <select className='mt-2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'  name="selectedTag" value={tag} onChange={(e) => setFrequency(e.target.value)}>
                                      {/* Placeholder options */}
                                      <option value="null">Set Frequency</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="daily">Daily</option>
                                </select>
                                <label    className='mt-2 p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' > Recurring Day's Date (1-31) 
                                    <input type="text" value={recurringDate} onChange={(e) => setRecurring(e.target.value)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue bg-white' ></input>
                                </label>
                           </label>                                
                            )}                           

                            <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Description 
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}className='mt-2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>
                            </label>

                           <label className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Tag
                                <select className='mt-2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'  name="selectedTag" value={tag} onChange={(e) => setTag(e.target.value)}>
                                      {/* Placeholder options */}
                                      <option value="null">Please select a tag</option>
                                    <option value="Rent/Mortgage">Rent/Mortgage</option>
                                    <option value="Food">Food</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Misc.">Misc.</option>
                                </select>

                           </label>

                            <button  className='w-full py-2 bg-lightblue text-white rounded-md hover:bg-green 
                            hover:text-black focus:outline-none focus:ring-2 focus:ring-blue'>
                                Submit
                            </button>
           
                        </div>
                    </form>
                </div>
            </div>
        </>
      
    )
}

export default Expense;