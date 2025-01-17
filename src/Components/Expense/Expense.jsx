import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Expense() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [isIncome, setIsIncome] = useState(false);
    const [recurringDate, setRecurring] = useState('');

    return (
        <>
        
        <div className='flex justify-center items-center min-h-screen bg-black'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
                <h1 className='text-2xl font-semibold text-center mb-6 text-black'>New Transaction</h1>
      
                    <form>
                        <div className='block text-black'>
           
                            <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block'>Amount
                                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}className='mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue' ></input>
                             </label>
           
                             <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Select if transaction is income: 
                                <input type="checkbox" checked={isIncome} onChange={(e) => setIsIncome(e.target.checked)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>
                            </label>
            
                            <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block' >Select if transaction is recurring: 
                                <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>
                            </label>
          
                            {isRecurring &&  (
                                <label    className='mt-2 p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' > Recurring Day's Date (1-31) 
                                    <input type="text" value={recurringDate} onChange={(e) => setRecurring(e.target.value)}className='mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue bg-white' ></input>
                                </label>    
                            )}
            

                            <label    className='mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' >Description 
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}className='mt-2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block' ></input>
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