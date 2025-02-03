import React, {useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import api from '../../services/api.js';

function TransactionList({budget_id}) {

    console.log("Received budget ID", budget_id);

    const [transactions, setTransactions] = useState([]);
    const {transService} = api;

    useEffect(() => {

        const fetchAllTransactions = async() => {
            if (!budget_id) {
                console.error("No budget ID");
                return;
            }
            try{
                const results = await transService.getAll(budget_id);
                console.log("Fetched transactions", results, budget_id);

                const transactionsTag = await Promise.all(results.map( async (transaction) => {
                    console.log("Processing transaction", transaction);
                    if (transaction.tagId) {
                        const tagData = await transService.getTag(transaction.tagId);
                        console.log("Fetched tag data:", tagData);
                        return { ...transaction, tag: tagData};
                    } else {
                        return {...transaction, tag: null};
                    }
                }))


                setTransactions(transactionsTag);
            } catch (error) {
                console.error('Could not fetch transactions', error);
            }
        };
        if(budget_id){
            fetchAllTransactions();
        }
       
    }, [budget_id, transService]);

    const formatDate= (dateStr) => {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-US', {
            
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })
    }

    const handleDelete = async (transactionId) => {
        const confirmed = window.confirm("Are you sure you want to delete this transaction? This cannot be undone.")
        if(confirmed){
            try {
                await transService.delete(transactionId);
                setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
                alert('Transaction deleted successfully!');
                } catch (error) {
                console.error('Error deleting transaction', error);
                alert('Error deleting transaction. Plesae try again.');
            }
        } else {
            console.log("Did not delete transaction.")
        }
    }
    

    return(
        <div>
            <div class="my-8">
            <SearchBar setTransactions = {setTransactions} budget_id={budget_id} />
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">ID</th>
                        <th scope="col" class="px-6 py-3">Amount</th>
                        <th scope="col" class="px-6 py-3">Tag</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">Created On</th>
                        <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (<tr><td>No transactions available</td></tr>) : (
                    transactions.map((transaction,index) => (
                        <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <td class="px-6 py-4">{transaction.id}</td>
                            <td class="px-6 py-4">{transaction.amount}</td>
                            <td class="px-6 py-4">{transaction.tag ? transaction.tag.name : 'No tag'}</td>
                            <td class="px-6 py-4">{transaction.description}</td>
                            <td class="px-6 py-4">{transaction.createdDate ? formatDate(transaction.createdDate) : 'No Date'}</td>
                            <td class="px-6 py-4">
                                <button 
                                    onClick={() => handleDelete(transaction.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default TransactionList;